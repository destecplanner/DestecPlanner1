<?php

namespace App\Modules\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Businesses\Models\Business;
use Illuminate\Http\Request;

class BusinessManagementController extends Controller
{
    /**
     * List all businesses with filtering.
     */
    public function index(Request $request)
    {
        $query = Business::with(['owner', 'category']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $query->where('name', 'ILIKE', "%{$request->search}%");
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->paginate(20)
        ]);
    }

    /**
     * Update business status (Moderate/Suspend).
     */
    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:active,inactive,suspended'
        ]);

        $business = Business::findOrFail($id);
        $business->update(['status' => $validated['status']]);

        return response()->json([
            'status' => 'success',
            'message' => "Business status updated to {$validated['status']}.",
            'data' => $business
        ]);
    }

    /**
     * Delete a business (Super Admin only).
     */
    public function destroy($id)
    {
        $business = Business::findOrFail($id);
        $business->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Business deleted permanently.'
        ]);
    }
}
