<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Services\Controllers\ServiceController;

Route::middleware(['auth:sanctum', 'role:owner'])->prefix('v1/services')->group(function () {
    Route::get('/', [ServiceController::class, 'index']);
    Route::post('/', [ServiceController::class, 'store']);
    Route::get('/{id}', [ServiceController::class, 'show']);
    Route::put('/{id}', [ServiceController::class, 'update']);
    Route::delete('/{id}', [ServiceController::class, 'destroy']);
});
