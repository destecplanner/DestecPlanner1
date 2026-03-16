<?php

namespace App\Modules\Bookings\Services;

use App\Modules\Businesses\Models\Business;
use App\Modules\Staff\Models\WorkingHour;
use App\Modules\Businesses\Models\BusinessSchedule;
use App\Modules\Staff\Models\StaffTimeOff;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class SchedulingService
{
    /**
     * Get availability periods for a staff member on a specific date.
     * Respects: Business Hours, Staff Hours, Overrides (Business/Staff), Breaks, Time Off.
     */
    public function getStaffAvailabilityPeriods(int $staffId, int $businessId, string $date): array
    {
        $business = Business::findOrFail($businessId);
        $timezone = $business->timezone ?? config('app.timezone');
        
        // 1. Check for Overrides (Staff specific first, then Business general)
        $override = BusinessSchedule::where('business_id', $businessId)
            ->where('date', $date)
            ->where(function ($q) use ($staffId) {
                $q->where('staff_id', $staffId)->orWhereNull('staff_id');
            })
            ->orderBy('staff_id', 'desc') // Staff-specific overrides take precedence
            ->first();

        if ($override) {
            if ($override->is_closed) return [];
            return $this->formatPeriods($override->start_time, $override->end_time, $override->breaks, $date, $timezone);
        }

        // 2. Check for Weekly Working Hours
        $dayOfWeek = Carbon::parse($date)->dayOfWeek;
        $workingHour = WorkingHour::where('staff_id', $staffId)
            ->where('day_of_week', $dayOfWeek)
            ->first() ?? WorkingHour::where('business_id', $businessId)
            ->whereNull('staff_id')
            ->where('day_of_week', $dayOfWeek)
            ->first();

        if (!$workingHour || $workingHour->is_closed) {
            return [];
        }

        return $this->formatPeriods($workingHour->start_time, $workingHour->end_time, $workingHour->breaks, $date, $timezone);
    }

    /**
     * Subtract unavailabilities (appointments, time off) from availability periods.
     */
    public function excludeUnavailabilities(array $availability, Collection $appointments, Collection $timeOffs, string $date, string $timezone): array
    {
        $periods = collect($availability);

        // Filter by Time Off
        foreach ($timeOffs as $timeOff) {
            $periods = $this->subtractRange($periods, $timeOff->start_time->setTimezone($timezone), $timeOff->end_time->setTimezone($timezone));
        }

        // Filter by Appointments
        foreach ($appointments as $appointment) {
            // Actual boundaries
            $appStart = Carbon::parse($date . ' ' . $appointment->start_time, $timezone);
            $appEnd = Carbon::parse($date . ' ' . $appointment->end_time, $timezone);

            // Add buffers
            $checkStart = $appStart->copy()->subMinutes($appointment->service->buffer_time_before ?? 0);
            $checkEnd = $appEnd->copy()->addMinutes($appointment->service->buffer_time_after ?? 0);

            $periods = $this->subtractRange($periods, $checkStart, $checkEnd);
        }

        return $periods->toArray();
    }

    private function formatPeriods(string $start, string $end, ?array $breaks, string $date, string $timezone): array
    {
        $baseStart = Carbon::parse($date . ' ' . $start, $timezone);
        $baseEnd = Carbon::parse($date . ' ' . $end, $timezone);

        $periods = collect([['start' => $baseStart, 'end' => $baseEnd]]);

        if (!empty($breaks)) {
            foreach ($breaks as $break) {
                $breakStart = Carbon::parse($date . ' ' . $break['start'], $timezone);
                $breakEnd = Carbon::parse($date . ' ' . $break['end'], $timezone);
                $periods = $this->subtractRange($periods, $breakStart, $breakEnd);
            }
        }

        return $periods->toArray();
    }

    private function subtractRange(Collection $periods, Carbon $subStart, Carbon $subEnd): Collection
    {
        $newPeriods = collect();

        foreach ($periods as $period) {
            $pStart = $period['start'];
            $pEnd = $period['end'];

            // No overlap
            if ($subStart->gte($pEnd) || $subEnd->lte($pStart)) {
                $newPeriods->push($period);
                continue;
            }

            // SubRange fully covers period
            if ($subStart->lte($pStart) && $subEnd->gte($pEnd)) {
                continue;
            }

            // Period splits into two
            if ($subStart->gt($pStart) && $subEnd->lt($pEnd)) {
                $newPeriods->push(['start' => $pStart, 'end' => $subStart]);
                $newPeriods->push(['start' => $subEnd, 'end' => $pEnd]);
                continue;
            }

            // SubRange overlaps at start
            if ($subStart->lte($pStart) && $subEnd->gt($pStart)) {
                $newPeriods->push(['start' => $subEnd, 'end' => $pEnd]);
                continue;
            }

            // SubRange overlaps at end
            if ($subStart->lt($pEnd) && $subEnd->gte($pEnd)) {
                $newPeriods->push(['start' => $pStart, 'end' => $subStart]);
                continue;
            }
        }

        return $newPeriods;
    }
}
