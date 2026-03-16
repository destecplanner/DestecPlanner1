<?php

namespace App\Modules\Services\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Services\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return response()->json(['status' => 'success', 'data' => $services]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'buffer_time_before' => 'sometimes|integer|min:0',
            'buffer_time_after' => 'sometimes|integer|min:0',
        ]);

        $service = Service::create($validated);

        return response()->json(['status' => 'success', 'data' => $service], 201);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json(['status' => 'success', 'data' => $service]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'sometimes|integer|min:1',
            'price' => 'sometimes|numeric|min:0',
            'buffer_time_before' => 'sometimes|integer|min:0',
            'buffer_time_after' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $service->update($validated);

        return response()->json(['status' => 'success', 'data' => $service]);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        
        return response()->json(['status' => 'success', 'message' => 'Service deleted.']);
    }
}
