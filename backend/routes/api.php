<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Load Module Routes
foreach (glob(app_path('Modules/*/routes.php')) as $routeFile) {
    require $routeFile;
}
