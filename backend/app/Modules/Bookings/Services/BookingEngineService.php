<?php

namespace App\Modules\Bookings\Services;

use App\Modules\Bookings\Models\Appointment;
use App\Modules\Staff\Models\Staff;
use App\Modules\Staff\Models\WorkingHour;
use App\Modules\Staff\Models\StaffTimeOff;
use App\Modules\Services\Models\Service;
use App\Modules\Businesses\Models\Business;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class BookingEngineService
{
    protected $schedulingService;

    public function __construct(SchedulingService $schedulingService)
    {
        $this->schedulingService = $schedulingService;
    }

    /**
     * Generate available slots for a given business, staff, and service on a specific date.
     */
    public function getAvailableSlots(int $businessId, int $serviceId, ?int $staffId, string $date): array
    {
        $business = Business::findOrFail($businessId);
        $service = Service::findOrFail($serviceId);
        
        // 1. Basic Business Check
        if ($business->status !== 'active') {
            return [];
        }

        // 2. Identify Staff
        $staffMembers = $staffId 
            ? Staff::where('id', $staffId)->where('business_id', $businessId)->get() 
            : Staff::where('business_id', $businessId)->where('is_active', true)->get();
        
        $allSlots = [];

        foreach ($staffMembers as $staff) {
            /** @var Staff $staff */
            $slots = $this->generateStaffSlots($staff, $service, $date);
            if (!empty($slots)) {
                $allSlots[] = [
                    'staff_id' => $staff->id,
                    'staff_name' => $staff->user->name,
                    'slots' => $slots
                ];
            }
        }

        return $allSlots;
    }

    /**
     * Validate if a specific slot is still available (used before final checkout).
     */
    public function validateSlot(int $businessId, int $staffId, int $serviceId, string $date, string $startTime): bool
    {
        $staff = Staff::findOrFail($staffId);
        $service = Service::findOrFail($serviceId);
        $business = Business::findOrFail($businessId);
        $timezone = $business->timezone ?? config('app.timezone');

        $slotStart = Carbon::parse($date . ' ' . $startTime, $timezone);
        $slotEnd = $slotStart->copy()->addMinutes($service->duration_minutes);

        // 1. Get Base Availability
        $periods = $this->schedulingService->getStaffAvailabilityPeriods($staffId, $businessId, $date);
        if (empty($periods)) return false;

        // 2. Filter by Appointments & Time-offs
        $appointments = $this->getExistingAppointments($staff, $date);
        $timeOffs = $this->getStaffTimeOffs($staff, $date);
        
        $availablePeriods = $this->schedulingService->excludeUnavailabilities($periods, $appointments, $timeOffs, $date, $timezone);

        // 3. Check if slot fits in any available period
        foreach ($availablePeriods as $period) {
            if ($slotStart->gte($period['start']) && $slotEnd->lte($period['end'])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Generate slots for a specific staff member.
     */
    private function generateStaffSlots(Staff $staff, Service $service, string $date): array
    {
        $business = Business::find($staff->business_id);
        $timezone = $business->timezone ?? config('app.timezone');

        // 1. Get Base Availability Periods (Working hours minus breaks/overrides)
        $periods = $this->schedulingService->getStaffAvailabilityPeriods($staff->id, $staff->business_id, $date);
        if (empty($periods)) return [];

        // 2. Filter by Appointments and Time-offs
        $appointments = $this->getExistingAppointments($staff, $date);
        $timeOffs = $this->getStaffTimeOffs($staff, $date);

        $availablePeriods = $this->schedulingService->excludeUnavailabilities($periods, $appointments, $timeOffs, $date, $timezone);

        // 3. Generate Slots from remaining periods
        $slotInterval = 15; // Could be dynamic
        $slots = [];

        $now = Carbon::now($timezone)->addMinutes(30); // Buffer for short-notice

        foreach ($availablePeriods as $period) {
            $current = $period['start']->copy();
            $pEnd = $period['end'];

            // Fast-forward if today
            if ($current->isToday() && $current->lt($now)) {
                $minute = (int) ceil($now->minute / $slotInterval) * $slotInterval;
                $current = $now->copy()->minute($minute)->second(0);
                if ($minute === 60) {
                    $current->addHour()->minute(0);
                }
                // Ensure we are still within the period after fast-forward
                if ($current->lt($period['start'])) $current = $period['start']->copy();
            }

            while ($current->copy()->addMinutes($service->duration_minutes)->lte($pEnd)) {
                $slots[] = [
                    'start' => $current->format('H:i'),
                    'end' => $current->copy()->addMinutes($service->duration_minutes)->format('H:i'),
                ];
                $current->addMinutes($slotInterval);
            }
        }

        return $slots;
    }

    /**
     * Create a booking atomically to prevent race conditions.
     */
    public function createBooking(array $data): Appointment
    {
        return \Illuminate\Support\Facades\DB::transaction(function () use ($data) {
            $business = Business::findOrFail($data['business_id']);
            $service = Service::findOrFail($data['service_id']);
            $staff = Staff::findOrFail($data['staff_id']);
            $timezone = $business->timezone ?? config('app.timezone');

            // 1. Lock the staff record (shared lock) to prevent concurrent bookings for this specific staff 
            // during the validation phase. In some DBs, selective locking on slots might be better, 
            // but locking the staff/date scope is safer for conflict detection.
            $staff->lockForUpdate()->get();

            // 2. Validate Slot availability again inside transaction
            $isAvailable = $this->validateSlot(
                $data['business_id'],
                $data['staff_id'],
                $data['service_id'],
                $data['appointment_date'],
                $data['start_time']
            );

            if (!$isAvailable) {
                throw new \Exception('The selected slot is no longer available.');
            }

            // 3. Calculate times
            $start = Carbon::parse($data['appointment_date'] . ' ' . $data['start_time'], $timezone);
            $endTime = $start->copy()->addMinutes($service->duration_minutes)->format('H:i');

            // 4. Create the record
            return Appointment::create([
                'business_id' => $data['business_id'],
                'customer_id' => $data['customer_id'] ?? null,
                'staff_id' => $data['staff_id'],
                'service_id' => $data['service_id'],
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'appointment_date' => $data['appointment_date'],
                'start_time' => $data['start_time'],
                'end_time' => $endTime,
                'total_price' => $service->price,
                'status' => \App\Modules\Bookings\Enums\AppointmentStatus::CONFIRMED,
                'notes' => $data['notes'] ?? null,
            ]);
        });
    }

    private function getExistingAppointments(Staff $staff, string $date): Collection
    {
        return Appointment::with('service')
            ->where('staff_id', $staff->id)
            ->where('appointment_date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->get();
    }

    private function getStaffTimeOffs(Staff $staff, string $date): Collection
    {
        return StaffTimeOff::where('staff_id', $staff->id)
            ->whereDate('start_time', '<=', $date)
            ->whereDate('end_time', '>=', $date)
            ->get();
    }
}
