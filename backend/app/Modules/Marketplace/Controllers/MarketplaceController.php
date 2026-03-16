<?php

namespace App\Modules\Marketplace\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Businesses\Models\Business;
use App\Modules\Businesses\Models\BusinessCategory;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    /**
     * Search and list businesses.
     */
    public function index(Request $request)
    {
        $query = Business::query()->where('status', 'active');

        // Filter by Category
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Search by Name or City/District
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'ILIKE', "%{$search}%")
                  ->orWhere('city', 'ILIKE', "%{$search}%")
                  ->orWhere('district', 'ILIKE', "%{$search}%");
            });
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->with('category')->paginate(12)
        ]);
    }

    /**
     * Get business details by slug.
     */
    public function show($slug)
    {
        $business = Business::where('slug', $slug)
            ->where('status', 'active')
            ->with(['category', 'services', 'staff.user'])
            ->firstOrFail();

        // Get recent reviews
        $reviews = \App\Modules\Reviews\Models\Review::where('business_id', $business->id)
            ->where('is_published', true)
            ->with('customer:id,name,avatar_url')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => [
                'business' => $business,
                'reviews' => $reviews
            ]
        ]);
    }

    /**
     * Get all categories.
     */
    public function categories()
    {
        return response()->json([
            'status' => 'success',
            'data' => BusinessCategory::all()
        ]);
    }
}
