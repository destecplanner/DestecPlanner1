Route::middleware(['auth:sanctum', 'role:owner'])->prefix('v1/business')->group(function () {
    // Stats & Overview
    Route::get('/stats', [BusinessDashboardController::class, 'stats']);
    
    // Profile Management
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    
    // Schedule & Working Hours
    Route::get('/schedule', [ScheduleController::class, 'index']);
    Route::put('/schedule', [ScheduleController::class, 'updateWeekly']);
    Route::get('/schedule/overrides', [ScheduleController::class, 'listOverrides']);
    Route::post('/schedule/overrides', [ScheduleController::class, 'storeOverride']);
    Route::delete('/schedule/overrides/{id}', [ScheduleController::class, 'destroyOverride']);
});

// Marketplace (Public)
Route::prefix('v1/marketplace')->group(function () {
    Route::get('/businesses', [\App\Modules\Businesses\Controllers\MarketplaceController::class, 'index']);
    Route::get('/categories', [\App\Modules\Businesses\Controllers\MarketplaceController::class, 'categories']);
    Route::get('/business/{slug}', [\App\Modules\Businesses\Controllers\MarketplaceController::class, 'show']);
});
