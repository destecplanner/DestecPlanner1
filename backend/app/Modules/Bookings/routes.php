<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Bookings\Controllers\BookingController;

Route::prefix('v1/bookings')->group(function () {
    Route::get('/slots', [BookingController::class, 'getSlots']);
    Route::post('/', [BookingController::class, 'store']);
    
    // Management (Owner Protected)
    Route::middleware(['auth:sanctum', 'role:owner'])->group(function () {
        Route::get('/management', [\App\Modules\Bookings\Controllers\AppointmentManagementController::class, 'index']);
        Route::patch('/management/{id}/status', [\App\Modules\Bookings\Controllers\AppointmentManagementController::class, 'updateStatus']);
    });
});
