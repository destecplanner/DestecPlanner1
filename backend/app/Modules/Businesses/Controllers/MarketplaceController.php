<?php

namespace App\Modules\Businesses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Businesses\Models\Business;
use App\Modules\Businesses\Models\BusinessCategory;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    /**
     * List all active businesses with optional filters.
     */
    public function index(Request $request)
    {
        $query = Business::where('status', 'active')->with(['category']);

        // Filter by Category
        if ($request->has('category_slug')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category_slug);
            });
        }

        // Search by Name or City
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ILIKE', "%{$search}%")
                  ->orWhere('city', 'ILIKE', "%{$search}%")
                  ->orWhere('district', 'ILIKE', "%{$search}%");
            });
        }

        $businesses = $query->paginate(12);

        return response()->json([
            'status' => 'success',
            'data' => $businesses
        ]);
    }

    /**
     * Get categories list for landing page.
     */
    public function categories()
    {
        $categories = BusinessCategory::all();
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ]);
    }

    /**
     * Get business details for the public profile page.
     */
    public function show($slug)
    {
        $business = Business::where('slug', $slug)
            ->where('status', 'active')
            ->with(['category', 'services' => function($q) {
                $q->where('is_active', true);
            }, 'staff' => function($q) {
                $q->where('is_active', true);
            }])
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $business
        ]);
    }
}
