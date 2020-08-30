<?php

use Illuminate\Support\Facades\Route;



Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/user', ["as" => "user", "uses" => "UserController@index"]);

Route::get('images/{filename}', function ($filename)
{
    $path = storage_path() . '/app/public/' . $filename;

    if(!File::exists($path)) abort(404);

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});

//Teacher
Route::namespace('Teacher')->group(function () {
    Route::get('/teacher', ["as" => "teacher", "uses" => "TeacherController@index"]);
    Route::get('/teacher/profile', ["as" => "teacher-profile", "uses" => "TeacherController@edit"]);
    Route::put('/teacher/update', ["as" => "teacher-update", "uses" => "TeacherController@update"]);
});

//TeacherStudent
Route::namespace('TeacherStudent')->group(function () {
    Route::get('/teacher/students', ["as" => "teacher-student", "uses" => "TeacherStudentController@index"]);
    Route::get('/teacher/student/create', ["as" => "teacher-student-create", "uses" => "TeacherStudentController@create"]);
    Route::post('/teacher/student/store', ["as" => "teacher-student-store", "uses" => "TeacherStudentController@store"]);
    Route::get('/teacher/student/edit/{uuid}', ["as" => "teacher-student-edit", "uses" => "TeacherStudentController@edit"]);
    Route::put('/teacher/student/update', ["as" => "teacher-student-update", "uses" => "TeacherStudentController@update"]);
    Route::post('/teacher/student/status', ["as" => "teacher-student-update-status", "uses" => "TeacherStudentController@status"]);
});


//Course
Route::namespace('Course')->group(function () {
    Route::get('/teacher/courses', ["as" => "teacher-course", "uses" => "CourseController@index"]);
    Route::get('/teacher/courses/create', ["as" => "teacher-course-create", "uses" => "CourseController@create"]);
    Route::post('/teacher/courses/store', ["as" => "teacher-course-store", "uses" => "CourseController@store"]);
    Route::get('/teacher/courses/edit/{uuid}', ["as" => "teacher-course-edit", "uses" => "CourseController@edit"]);
    Route::post('/teacher/courses/update', ["as" => "teacher-course-update", "uses" => "CourseController@update"]);
    Route::post('/teacher/courses/status', ["as" => "teacher-course-update-status", "uses" => "CourseController@status"]);
    Route::post('/teacher/courses/show', ["as" => "teacher-course-update-show", "uses" => "CourseController@show"]);
});

//Lesson
Route::namespace('Lesson')->group(function () {
    Route::get('/teacher/courses/lessons/{courseuuid}', ["as" => "teacher-course-lesson", "uses" => "LessonController@index"]);
    Route::get('/teacher/courses/lesson/create/{uuid}', ["as" => "teacher-course-lesson-create", "uses" => "LessonController@create"]);
    Route::post('/teacher/courses/lesson/store', ["as" => "teacher-course-lesson-store", "uses" => "LessonController@store"]);
    Route::get('/teacher/courses/lesson/edit/{uuid}', ["as" => "teacher-course-lesson-edit", "uses" => "LessonController@edit"]);
    Route::post('/teacher/courses/lesson/update', ["as" => "teacher-course-lesson-update", "uses" => "LessonController@update"]);
});

//Material
Route::namespace('Material')->group(function () {
    Route::get('/teacher/courses/lessons/material/{lessonuuid}', ["as" => "teacher-course-lesson-material", "uses" => "MaterialController@index"]);
    Route::get('/teacher/courses/lesson/material/create/{uuid}', ["as" => "teacher-course-lesson-material-create", "uses" => "MaterialController@create"]);
    Route::post('/teacher/courses/lesson/material/store', ["as" => "teacher-course-lesson-material-store", "uses" => "MaterialController@store"]);
    Route::get('/teacher/courses/lesson/material/edit/{uuid}', ["as" => "teacher-course-lesson-material-edit", "uses" => "MaterialController@edit"]);
    Route::post('/teacher/courses/lesson/material/update', ["as" => "teacher-course-lesson-material-update", "uses" => "MaterialController@update"]);
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
