<?php

use App\Http\Controllers\ImagesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
require_once 'imageRoutes.php';
Route::get('/', function () {
    return Inertia::render('ImagesVersus', [
        'images' => \App\Models\Image::query()->inRandomOrder()->get(),
    ]);
});


