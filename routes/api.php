<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\FollowingController;
use App\Http\Controllers\NotificationsController;

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
Route::post('/sendmessage', [MessageController::class, 'sendMessage']);
Route::post('/getmessages', [MessageController::class, 'getMessages']);
Route::put('/notifications/{notificationsId}/seen',[NotificationsController::class, 'setNotificationsToSeen']);
Route::post('/notifications/delete',[NotificationsController::class, 'deleteNotifications']);
Route::get('/notifications/{userId}',[NotificationsController::class, 'getNotifications']);