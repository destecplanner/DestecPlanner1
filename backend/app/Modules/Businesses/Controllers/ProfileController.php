<?php

namespace App\Modules\Businesses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Businesses\Models\Business;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Get business profile.
     */
    public function show()
    {
        $business = Business::with('category')->firstOrFail();
        return response()->json(['status' => 'success', 'data' => $business]);
    }

    /**
     * Update business profile.
     */
    public function update(Request $request)
    {
        $business = Business::firstOrFail();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'district' => 'nullable|string',
            'logo_url' => 'nullable|string',
            'banner_url' => 'nullable|string',
            'settings' => 'nullable|array',
        ]);

        $business->update($validated);

        return response()->json(['status' => 'success', 'data' => $business]);
    }
}
