<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Staff\Controllers\StaffController;

Route::middleware(['auth:sanctum', 'role:owner'])->prefix('v1/staff')->group(function () {
    Route::get('/', [StaffController::class, 'index']);
    Route::post('/', [StaffController::class, 'store']);
    Route::get('/{id}', [StaffController::class, 'show']);
    Route::put('/{id}', [StaffController::class, 'update']);
    Route::delete('/{id}', [StaffController::class, 'destroy']);
});
