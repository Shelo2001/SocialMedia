<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FollowingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::get('/logout', [AuthController::class, 'logout']);
});
Route::get('/users/search', [UserController::class,'search']);
Route::get('/users/{userId}', [UserController::class,'getUserById']);
Route::post('/follow', [FollowingController::class, 'follow']);
Route::post('/unfollow', [FollowingController::class, 'unfollow']);