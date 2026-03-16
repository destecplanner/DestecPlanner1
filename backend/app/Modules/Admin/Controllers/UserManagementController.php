<?php

namespace App\Modules\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Users\Models\User;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    /**
     * List all users with basic filtering.
     */
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'ILIKE', "%{$request->search}%")
                  ->orWhere('email', 'ILIKE', "%{$request->search}%");
            });
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->paginate(20)
        ]);
    }

    /**
     * Update user status or details.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'is_active' => 'sometimes|boolean',
            'role' => 'sometimes|in:admin,owner,customer,staff',
        ]);

        $user->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully.',
            'data' => $user
        ]);
    }

    /**
     * Permanent user deletion.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        if ($user->id === auth()->id()) {
            return response()->json(['status' => 'error', 'message' => 'You cannot delete yourself.'], 422);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted permanently.'
        ]);
    }
}
