<?php

namespace App\Modules\Users\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Bookings\Models\Appointment;
use Illuminate\Http\Request;

class CustomerProfileController extends Controller
{
    /**
     * Get current user's profile info.
     */
    public function show(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'data' => $request->user()
        ]);
    }

    /**
     * Update current user's profile.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'avatar_url' => 'nullable|string',
        ]);

        $user->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    /**
     * List current user's appointment history.
     */
    public function appointments(Request $request)
    {
        $user = $request->user();
        
        $appointments = Appointment::withoutGlobalScope(\App\Scopes\TenantScope::class)
            ->where('customer_id', $user->id)
            ->with(['business', 'staff.user', 'service'])
            ->orderBy('appointment_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->paginate(10);

        return response()->json([
            'status' => 'success',
            'data' => $appointments
        ]);
    }
}
