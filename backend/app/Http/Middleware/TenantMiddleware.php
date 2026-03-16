<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TenantMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user) {
            $businessId = null;

            if ($user->role === 'owner') {
                $businessId = $user->business?->id;
            } elseif ($user->role === 'staff') {
                $businessId = $user->staff?->business_id;
            }

            if ($businessId) {
                config(['app.active_business_id' => (int) $businessId]);
            }
        }

        return $next($request);
    }
}
