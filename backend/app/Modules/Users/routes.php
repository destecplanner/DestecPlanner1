<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Users\Controllers\CustomerProfileController;

Route::middleware('auth:sanctum')->prefix('v1/customer')->group(function () {
    Route::get('/profile', [CustomerProfileController::class, 'show']);
    Route::put('/profile', [CustomerProfileController::class, 'update']);
    Route::get('/appointments', [CustomerProfileController::class, 'appointments']);
});
