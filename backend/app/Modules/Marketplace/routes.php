<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Marketplace\Controllers\MarketplaceController;

Route::prefix('v1/marketplace')->group(function () {
    Route::get('/search', [MarketplaceController::class, 'index']);
    Route::get('/categories', [MarketplaceController::class, 'categories']);
    Route::get('/business/{slug}', [MarketplaceController::class, 'show']);
});
