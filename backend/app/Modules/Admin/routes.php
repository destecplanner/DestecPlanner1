<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Admin\Controllers\AdminDashboardController;
use App\Modules\Admin\Controllers\BusinessManagementController;
use App\Modules\Admin\Controllers\CategoryManagementController;

// All Admin routes should be protected and restricted to 'admin' role
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('v1/admin')->group(function () {
    
    // Dashboard Stats
    Route::get('/stats', [\App\Modules\Admin\Controllers\AdminDashboardController::class, 'stats']);

    // User Management
    Route::prefix('users')->group(function () {
        Route::get('/', [\App\Modules\Admin\Controllers\UserManagementController::class, 'index']);
        Route::put('/{id}', [\App\Modules\Admin\Controllers\UserManagementController::class, 'update']);
        Route::delete('/{id}', [\App\Modules\Admin\Controllers\UserManagementController::class, 'destroy']);
    });

    // Business Management
    Route::prefix('businesses')->group(function () {
        Route::get('/', [\App\Modules\Admin\Controllers\BusinessManagementController::class, 'index']);
        Route::patch('/{id}/status', [\App\Modules\Admin\Controllers\BusinessManagementController::class, 'updateStatus']);
        Route::delete('/{id}', [\App\Modules\Admin\Controllers\BusinessManagementController::class, 'destroy']);
    });

    // Review Moderation
    Route::prefix('reviews')->group(function () {
        Route::get('/', [\App\Modules\Admin\Controllers\ReviewModerationController::class, 'index']);
        Route::put('/{id}', [\App\Modules\Admin\Controllers\ReviewModerationController::class, 'update']);
        Route::delete('/{id}', [\App\Modules\Admin\Controllers\ReviewModerationController::class, 'destroy']);
    });

    // Subscription Overview
    Route::get('/subscriptions', [\App\Modules\Admin\Controllers\SubscriptionController::class, 'index']);

    // Marketplace Categories
    Route::prefix('categories')->group(function () {
        Route::get('/', [\App\Modules\Admin\Controllers\CategoryManagementController::class, 'index']);
        Route::post('/', [\App\Modules\Admin\Controllers\CategoryManagementController::class, 'store']);
        Route::put('/{id}', [\App\Modules\Admin\Controllers\CategoryManagementController::class, 'update']);
        Route::delete('/{id}', [\App\Modules\Admin\Controllers\CategoryManagementController::class, 'destroy']);
    });

});
