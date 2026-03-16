<?php

namespace App\Modules\Auth\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Users\Models\User;
use App\Modules\Businesses\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

class OwnerAuthController extends Controller
{
    /**
     * Register a new business owner and their business.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            // User Data
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            
            // Business Data
            'business_name' => 'required|string|max:255',
            'business_category_id' => 'required|exists:business_categories,id',
            'business_phone' => 'nullable|string|max:20',
            'business_address' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($validated) {
            // 1. Create User
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'owner',
                'is_active' => true,
            ]);

            // 2. Create Business
            $business = Business::create([
                'owner_id' => $user->id,
                'category_id' => $validated['business_category_id'],
                'name' => $validated['business_name'],
                'slug' => Str::slug($validated['business_name']) . '-' . Str::random(5),
                'phone' => $validated['business_phone'] ?? null,
                'address' => $validated['business_address'] ?? null,
                'status' => 'active',
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'status' => 'success',
                'message' => 'Business owner and business registered successfully.',
                'data' => [
                    'user' => $user,
                    'business' => $business,
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ]
            ], 201);
        });
    }
}
