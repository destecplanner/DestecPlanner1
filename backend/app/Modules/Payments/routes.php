<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Payments\Controllers\PaymentController;

Route::middleware(['auth:sanctum', 'role:owner'])->prefix('v1/payments')->group(function () {
    Route::post('/subscribe', [PaymentController::class, 'subscribe'])->name('api.payments.subscribe');
});

// Public callback (Provider to Server)
Route::post('/payments/callback/{provider}', [PaymentController::class, 'callback'])->name('api.payments.callback');
