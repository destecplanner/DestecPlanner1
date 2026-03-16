<?php

namespace App\Modules\Businesses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Businesses\Models\BusinessSchedule;
use App\Modules\Staff\Models\WorkingHour;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    /**
     * Get weekly working hours.
     */
    public function index()
    {
        $workingHours = WorkingHour::whereNull('staff_id')->get();
        return response()->json(['status' => 'success', 'data' => $workingHours]);
    }

    /**
     * Update weekly working hours.
     */
    public function updateWeekly(Request $request)
    {
        $validated = $request->validate([
            'hours' => 'required|array',
            'hours.*.day_of_week' => 'required|integer|between:0,6',
            'hours.*.start_time' => 'required_if:hours.*.is_closed,false|nullable|date_format:H:i',
            'hours.*.end_time' => 'required_if:hours.*.is_closed,false|nullable|date_format:H:i',
            'hours.*.is_closed' => 'required|boolean',
        ]);

        foreach ($validated['hours'] as $hour) {
            WorkingHour::updateOrCreate(
                ['day_of_week' => $hour['day_of_week'], 'staff_id' => null, 'business_id' => config('app.active_business_id')],
                $hour
            );
        }

        return response()->json(['status' => 'success', 'message' => 'Weekly hours updated.']);
    }

    /**
     * List special overrides / holidays.
     */
    public function listOverrides()
    {
        $overrides = BusinessSchedule::orderBy('date')->get();
        return response()->json(['status' => 'success', 'data' => $overrides]);
    }

    /**
     * Add or update a special override.
     */
    public function storeOverride(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date_format:Y-m-d',
            'is_closed' => 'required|boolean',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i',
            'note' => 'nullable|string|max:255',
        ]);

        $override = BusinessSchedule::updateOrCreate(
            ['date' => $validated['date'], 'business_id' => config('app.active_business_id')],
            $validated
        );

        return response()->json(['status' => 'success', 'data' => $override]);
    }

    /**
     * Delete a special override.
     */
    public function destroyOverride($id)
    {
        BusinessSchedule::findOrFail($id)->delete();
        return response()->json(['status' => 'success', 'message' => 'Override deleted.']);
    }
}
