<?php

use Illuminate\Support\Facades\Route;

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

// Route::get('/', function () {
//     return view('welcome');
// });

//Teacher
Route::namespace('Teacher')->group(function () {
    Route::get('/teacher', ["as" => "teacher", "uses" => "TeacherController@index"]);
    Route::get('/teacher/profile', ["as" => "teacher-profile", "uses" => "TeacherController@edit"]);
    Route::put('/teacher/update', ["as" => "teacher-update", "uses" => "TeacherController@update"]);
});



Route::get('/', ["as" => "home", "uses" => "EventsController@index"]);
Route::get('/show/{id}', ["as" => "show", "uses" => "EventsController@show"]);


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/user', ["as" => "user", "uses" => "UserController@index"]);
