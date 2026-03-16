<?php

namespace App\Modules\Customer\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Reviews\Models\Review;
use App\Modules\Bookings\Models\Appointment;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Create a review for a completed appointment.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $user = $request->user();

        // Security check: Verify appointment belongs to this customer
        $appointment = Appointment::withoutGlobalScope(\App\Scopes\TenantScope::class)
            ->where('id', $validated['appointment_id'])
            ->where('customer_email', $user->email)
            ->firstOrFail();

        // Check if already reviewed
        if (Review::where('appointment_id', $appointment->id)->exists()) {
            return response()->json(['status' => 'error', 'message' => 'Review already submitted for this appointment.'], 422);
        }

        $review = Review::create([
            'business_id' => $appointment->business_id,
            'customer_id' => $user->id,
            'appointment_id' => $appointment->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_published' => true,
        ]);

        return response()->json(['status' => 'success', 'data' => $review], 201);
    }
}
