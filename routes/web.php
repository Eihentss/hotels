<?php

use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReservationController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        '/' =>        Route::has('apartments.index'),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
    Route::get('/', [ApartmentController::class, 'index'])->name('apartments.index');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/', [ApartmentController::class, 'index'])->name('apartments.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/reservation/show', [ReservationController::class, 'check'])->name('reservations.show');
    Route::get("/apartments/create",[ApartmentController::class,"create"])->name("apartments.create");

});

require __DIR__.'/auth.php';
require __DIR__.'/apartments.php';
