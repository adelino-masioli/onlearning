<?php

use Illuminate\Support\Facades\Route;



Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/user', ["as" => "user", "uses" => "UserController@index"]);


//Teacher
Route::namespace('Teacher')->group(function () {
    Route::get('/teacher', ["as" => "teacher", "uses" => "TeacherController@index"]);
    Route::get('/teacher/profile', ["as" => "teacher-profile", "uses" => "TeacherController@edit"]);
    Route::put('/teacher/update', ["as" => "teacher-update", "uses" => "TeacherController@update"]);
});


//TeacherStudent
Route::namespace('TeacherStudent')->group(function () {
    Route::get('/teacher/student', ["as" => "teacher-student", "uses" => "TeacherStudentController@index"]);
    Route::get('/teacher/student/create', ["as" => "teacher-student-create", "uses" => "TeacherStudentController@create"]);
    Route::post('/teacher/student/store', ["as" => "teacher-student-store", "uses" => "TeacherStudentController@store"]);
    Route::get('/teacher/student/edit/{uuid}', ["as" => "teacher-student-edit", "uses" => "TeacherStudentController@edit"]);
    Route::put('/teacher/student/update', ["as" => "teacher-student-update", "uses" => "TeacherStudentController@update"]);
});


//Student
Route::namespace('Student')->group(function () {
    Route::get('/student', ["as" => "student", "uses" => "StudentController@index"]);
    Route::get('/student/create', ["as" => "student-create", "uses" => "StudentController@create"]);
    Route::post('/student/store', ["as" => "student-store", "uses" => "StudentController@store"]);
    Route::get('/student/edit/{id}', ["as" => "student-edit", "uses" => "StudentController@edit"]);
    Route::get('/student/profile', ["as" => "student-profile", "uses" => "StudentController@profile"]);
    Route::put('/student/update', ["as" => "student-update", "uses" => "StudentController@update"]);
});
