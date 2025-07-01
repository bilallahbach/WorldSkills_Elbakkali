<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserAuthController;
use App\Http\Controllers\API\AnecdoteController;
use App\Http\Controllers\API\VoteController;

Route::post('register', [UserAuthController::class, 'register']);
Route::post('login', [UserAuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [UserAuthController::class, 'logout']);

    Route::post('anecdotes', [AnecdoteController::class, 'store']);
    Route::delete('anecdotes/{id}', [AnecdoteController::class, 'destroy']);

    Route::post('anecdotes/{id}/vote', [VoteController::class, 'vote']);
});

Route::get('anecdotes', [AnecdoteController::class, 'index']);
