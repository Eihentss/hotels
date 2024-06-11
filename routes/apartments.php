<?php
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RentController;


Route::get('/reservations/all', [ReservationController::class, 'checkAll'])->name('reservations.checkAll');

Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
Route::post('/reservations/{reservation}/accept', [ReservationController::class, 'accept']);
Route::post('/reservations/{reservation}/decline', [ReservationController::class, 'decline']);

Route::post('/rents', [RentController::class, 'store']);
Route::post('/api/reviews', [ReviewController::class, 'store']);
Route::get("/apartments",[ApartmentController::class,"index"])->name("apartments.index");
Route::post("/apartments",[ApartmentController::class,"store"])->name("apartments.store");
Route::get("/apartments/{id}",[ApartmentController::class,"show"])->name("apartments.show");
Route::get("/apartments/edit/{id}",[ApartmentController::class,"edit"])->name("apartments.edit");
Route::put("/apartments/{id}",[ApartmentController::class,"update"])->name("apartments.update");
Route::delete("/apartments/{id}",[ApartmentController::class,"destroy"])->name("apartments.delete");
Route::delete('/api/apartments/{id}', 'ApartmentController@destroy');
Route::get('/', [ApartmentController::class, 'index'])->name('apartments.index');
Route::resource('reviews', ReviewController::class);
