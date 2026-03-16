<?php

namespace App\Modules\Bookings\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Bookings\Services\BookingEngineService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    protected $bookingEngine;

    public function __construct(BookingEngineService $bookingEngine)
    {
        $this->bookingEngine = $bookingEngine;
    }

    /**
     * Create a new appointment.
     */
    public function store(Request $request)
    {
        $businessId = $request->input('business_id');

        $validated = $request->validate([
            'business_id' => 'required|integer|exists:businesses,id',
            'service_id' => ['required', 'integer', new \App\Shared\Rules\BelongsToBusiness('services', $businessId)],
            'staff_id' => ['required', 'integer', new \App\Shared\Rules\BelongsToBusiness('staff', $businessId)],
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'appointment_date' => 'required|date_format:Y-m-d|after:yesterday',
            'start_time' => 'required|date_format:H:i',
            'notes' => 'nullable|string',
        ]);

        try {
            // 1. Create Appointment via service (Handles atomic validation and creation)
            $appointment = $this->bookingEngine->createBooking(array_merge($validated, [
                'customer_id' => auth('sanctum')->id(),
            ]));

            // 2. Send Notifications
            $notifService = app(\App\Modules\Notifications\Services\NotificationService::class);
            $message = "Sayın {$appointment->customer_name}, randevunuz başarıyla oluşturuldu. Tarih: {$appointment->appointment_date->format('d.m.Y')} Saat: {$appointment->start_time}.";
            
            $notifService->sendSms($appointment->customer_phone, $message, $appointment->business_id);
            $notifService->sendEmail($appointment->customer_email, 'Randevu Onayı', $message, $appointment->business_id);

            return response()->json([
                'status' => 'success',
                'message' => 'Appointment created successfully and notifications sent.',
                'data' => $appointment
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 422);
        }
    }
}
