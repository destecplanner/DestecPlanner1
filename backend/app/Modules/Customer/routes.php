<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Customer\Controllers\ActivityController;
use App\Modules\Customer\Controllers\ReviewController;

Route::middleware(['auth:sanctum', 'role:customer'])->prefix('v1/customer')->group(function () {
    
    // Activity & Appointments
    Route::get('/appointments', [ActivityController::class, 'appointments']);
    
    // Favorites
    Route::get('/favorites', [ActivityController::class, 'listFavorites']);
    Route::post('/favorites/{business_id}/toggle', [ActivityController::class, 'toggleFavorite']);
    
    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store']);
});
