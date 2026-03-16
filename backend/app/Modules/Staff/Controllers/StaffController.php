<?php

namespace App\Modules\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Staff\Models\Staff;
use App\Modules\Users\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    public function index()
    {
        $staff = Staff::with('user')->get();
        return response()->json(['status' => 'success', 'data' => $staff]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'services' => 'sometimes|array',
            'services.*' => 'exists:services,id',
        ]);

        return \Illuminate\Support\Facades\DB::transaction(function () use ($validated) {
            // 1. Create User
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'staff',
            ]);

            // 2. Create Staff
            $staff = Staff::create([
                'user_id' => $user->id,
                'title' => $validated['title'],
                'bio' => $validated['bio'],
            ]);

            // 3. Assign Services
            if (isset($validated['services'])) {
                $staff->services()->sync($validated['services']);
            }

            return response()->json(['status' => 'success', 'data' => $staff->load(['user', 'services'])], 201);
        });
    }

    public function show($id)
    {
        $staff = Staff::with(['user', 'workingHours', 'timeOffs', 'services'])->findOrFail($id);
        return response()->json(['status' => 'success', 'data' => $staff]);
    }

    public function update(Request $request, $id)
    {
        $staff = Staff::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'title' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'is_active' => 'sometimes|boolean',
            'services' => 'sometimes|array',
            'services.*' => 'exists:services,id',
        ]);

        if (isset($validated['name'])) {
            $staff->user->update(['name' => $validated['name']]);
        }

        $staff->update($request->only(['title', 'bio', 'is_active']));

        if (isset($validated['services'])) {
            $staff->services()->sync($validated['services']);
        }

        return response()->json(['status' => 'success', 'data' => $staff->load(['user', 'services'])]);
    }

    public function destroy($id)
    {
        $staff = Staff::findOrFail($id);
        $staff->delete(); // This will cascade to working_hours and time_off if DB level cascade set, User remains unless manually handled
        
        return response()->json(['status' => 'success', 'message' => 'Staff deleted.']);
    }
}
