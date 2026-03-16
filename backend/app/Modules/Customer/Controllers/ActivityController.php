<?php

namespace App\Modules\Customer\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Bookings\Models\Appointment;
use App\Modules\Businesses\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ActivityController extends Controller
{
    /**
     * Get customer appointment history across all businesses.
     */
    public function appointments(Request $request)
    {
        $user = $request->user();

        $query = Appointment::withoutGlobalScope(\App\Scopes\TenantScope::class)
            ->where('customer_email', $user->email) // Assuming email links cross-tenant bookings
            ->with(['business:id,name,logo_url', 'service:id,name', 'staff:id,user_id', 'staff.user:id,name'])
            ->orderBy('appointment_date', 'desc')
            ->orderBy('start_time', 'desc');

        return response()->json([
            'status' => 'success',
            'data' => $query->paginate(15)
        ]);
    }

    /**
     * Manage favorites.
     */
    public function toggleFavorite(Request $request, $business_id)
    {
        $user = $request->user();
        
        $exists = DB::table('favorites')
            ->where('user_id', $user->id)
            ->where('business_id', $business_id)
            ->exists();

        if ($exists) {
            DB::table('favorites')
                ->where('user_id', $user->id)
                ->where('business_id', $business_id)
                ->delete();
            $message = 'Removed from favorites.';
        } else {
            DB::table('favorites')->insert([
                'user_id' => $user->id,
                'business_id' => $business_id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $message = 'Added to favorites.';
        }

        return response()->json(['status' => 'success', 'message' => $message]);
    }

    public function listFavorites(Request $request)
    {
        $businessIds = DB::table('favorites')
            ->where('user_id', $request->user()->id)
            ->pluck('business_id');

        $businesses = Business::whereIn('id', $businessIds)->with('category')->get();

        return response()->json(['status' => 'success', 'data' => $businesses]);
    }
}
