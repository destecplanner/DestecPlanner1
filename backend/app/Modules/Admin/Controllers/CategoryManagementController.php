<?php

namespace App\Modules\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Businesses\Models\BusinessCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryManagementController extends Controller
{
    public function index()
    {
        return response()->json(['status' => 'success', 'data' => BusinessCategory::all()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:business_categories,name',
            'icon' => 'nullable|string'
        ]);

        $category = BusinessCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'icon' => $validated['icon'] ?? null,
        ]);

        return response()->json(['status' => 'success', 'data' => $category], 201);
    }

    public function update(Request $request, $id)
    {
        $category = BusinessCategory::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:business_categories,name,' . $id,
            'icon' => 'nullable|string'
        ]);

        $category->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'icon' => $validated['icon'] ?? null,
        ]);

        return response()->json(['status' => 'success', 'data' => $category]);
    }

    public function destroy($id)
    {
        $category = BusinessCategory::findOrFail($id);
        
        // Check if there are businesses in this category
        if ($category->businesses()->count() > 0) {
            return response()->json([
                'status' => 'error', 
                'message' => 'Cannot delete category with associated businesses.'
            ], 422);
        }

        $category->delete();
        return response()->json(['status' => 'success', 'message' => 'Category deleted.']);
    }
}
