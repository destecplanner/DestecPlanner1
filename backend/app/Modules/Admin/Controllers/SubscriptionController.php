<?php

namespace App\Modules\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Payments\Models\Subscription;
use App\Modules\Payments\Models\Plan;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    /**
     * High-level view of platform subscriptions.
     */
    public function index()
    {
        // Bypass tenant scope to see all subscriptions
        $totalActive = Subscription::withoutGlobalScope(\App\Scopes\TenantScope::class)
            ->where('status', 'active')
            ->count();
            
        $plans = Plan::all();

        return response()->json([
            'status' => 'success',
            'data' => [
                'summary' => [
                    'active_subscriptions' => $totalActive,
                ],
                'plans' => $plans
            ]
        ]);
    }
}
