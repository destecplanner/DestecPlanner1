<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Auth\Controllers\CustomerAuthController;
use App\Modules\Auth\Controllers\OwnerAuthController;
use App\Modules\Auth\Controllers\LoginController;

Route::prefix('v1/auth')->group(function () {
    
    // Public Routes
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register/customer', [CustomerAuthController::class, 'register']);
    Route::post('/register/owner', [OwnerAuthController::class, 'register']);

    // Protected Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'logout']);
        
        // Identity / Check
        Route::get('/me', function (\Illuminate\Http\Request $request) {
            return response()->json([
                'status' => 'success',
                'data' => $request->user()
            ]);
        });
    });
});
