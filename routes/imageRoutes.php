<?php


use App\Http\Controllers\ImagesController;

Route::group(['prefix' => 'images'], function () {

    Route::post('versus', [ImagesController::class, 'versus']);
});
