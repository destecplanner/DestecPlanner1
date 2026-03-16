<?php

namespace App\Modules\Bookings\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Bookings\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentManagementController extends Controller
{
    /**
     * List appointments for the business.
     */
    public function index(Request $request)
    {
        $query = Appointment::with(['staff.user', 'service', 'customer']);

        // Filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        if ($request->has('date')) {
            $query->where('appointment_date', $request->date);
        }
        if ($request->has('staff_id')) {
            $query->where('staff_id', $request->staff_id);
        }

        $appointments = $query->orderBy('appointment_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->paginate(15);

        return response()->json(['status' => 'success', 'data' => $appointments]);
    }

    /**
     * Update appointment status.
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled,completed,no_show'
        ]);

        $appointment = Appointment::findOrFail($id);
        $appointment->update(['status' => $validated['status']]);

        return response()->json(['status' => 'success', 'data' => $appointment]);
    }
}
