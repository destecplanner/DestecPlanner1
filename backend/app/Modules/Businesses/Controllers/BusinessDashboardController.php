<?php

namespace App\Modules\Businesses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Businesses\Models\Business;
use App\Modules\Bookings\Models\Appointment;
use App\Modules\Services\Models\Service;
use App\Modules\Staff\Models\Staff;
use App\Modules\Users\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BusinessDashboardController extends Controller
{
    /**
     * Get overview statistics for the business dashboard.
     */
    public function stats()
    {
        $businessId = config('app.active_business_id');
        
        if (!$businessId) {
            return response()->json(['status' => 'error', 'message' => 'No business context.'], 400);
        }

        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();

        // 1. Core Metrics
        $totalAppointments = Appointment::count();
        $pendingAppointments = Appointment::where('status', 'pending')->count();
        $todayAppointments = Appointment::where('appointment_date', $today->toDateString())->count();
        
        $totalRevenue = Appointment::where('status', 'confirmed')
            ->orWhere('status', 'completed')
            ->sum('total_price');

        $monthlyRevenue = Appointment::whereIn('status', ['confirmed', 'completed'])
            ->where('appointment_date', '>=', $thisMonth->toDateString())
            ->sum('total_price');

        // 2. Upcoming Appointments (limit 5)
        $upcoming = Appointment::with(['staff.user', 'service'])
            ->where('appointment_date', '>=', $today->toDateString())
            ->where('status', 'confirmed')
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get();

        // 3. Performance Chart Data (Last 7 days)
        $chartData = Appointment::select(
            DB::raw('appointment_date'),
            DB::raw('count(*) as count'),
            DB::raw('sum(total_price) as revenue')
        )
        ->where('appointment_date', '>=', Carbon::now()->subDays(7)->toDateString())
        ->whereIn('status', ['confirmed', 'completed'])
        ->groupBy('appointment_date')
        ->orderBy('appointment_date')
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'metrics' => [
                    'total_count' => $totalAppointments,
                    'pending_count' => $pendingAppointments,
                    'today_count' => $todayAppointments,
                    'total_revenue' => $totalRevenue,
                    'monthly_revenue' => $monthlyRevenue,
                ],
                'upcoming_appointments' => $upcoming,
                'performance_chart' => $chartData
            ]
        ]);
    }

    /**
     * Get business settings.
     */
    public function settings()
    {
        $business = Business::with('category')->first(); // Multi-tenant scope handles filtering
        return response()->json(['status' => 'success', 'data' => $business]);
    }

    /**
     * Update business settings.
     */
    public function updateSettings(Request $request)
    {
        $business = Business::first();
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'settings' => 'nullable|array',
        ]);

        $business->update($validated);

        return response()->json(['status' => 'success', 'data' => $business]);
    }
}
