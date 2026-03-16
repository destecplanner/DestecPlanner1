<?php

namespace App\Modules\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Businesses\Models\Business;
use App\Modules\Users\Models\User;
use App\Modules\Bookings\Models\Appointment;
use App\Modules\Payments\Models\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    /**
     * Get system-wide statistics for super admins.
     */
    public function stats()
    {
        // Admin needs to see EVERYTHING, so we bypass TenantScope if it's somehow applied
        // But globally TenantScope is only applied to specific models via Trait.
        // Some models like User and Business don't have the trait anyway (Global tables).

        $totalBusinesses = Business::count();
        $totalUsers = User::count();
        $totalAppointments = Appointment::withoutGlobalScope(\App\Scopes\TenantScope::class)->count();
        $totalRevenue = Payment::withoutGlobalScope(\App\Scopes\TenantScope::class)
            ->where('status', 'succeeded')
            ->sum('amount');

        $newBusinessesThisMonth = Business::where('created_at', '>=', Carbon::now()->startOfMonth())->count();

        // Revenue Chart (Last 30 days)
        $revenueChart = Payment::withoutGlobalScope(\App\Scopes\TenantScope::class)
            ->select(
                DB::raw("DATE(created_at) as date"),
                DB::raw("SUM(amount) as total")
            )
            ->where('status', 'succeeded')
            ->where('created_at', '>=', Carbon::now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'metrics' => [
                    'total_businesses' => $totalBusinesses,
                    'total_users' => $totalUsers,
                    'total_appointments' => $totalAppointments,
                    'total_revenue' => $totalRevenue,
                    'new_businesses_month' => $newBusinessesThisMonth,
                ],
                'revenue_chart' => $revenueChart
            ]
        ]);
    }
}
