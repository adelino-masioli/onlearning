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

//Classroom
Route::namespace('Classroom')->group(function () {
    Route::get('/teacher/courses/classrooms/{courseuuid}', ["as" => "teacher-course-classroom", "uses" => "ClassroomController@index"]);
    Route::get('/teacher/courses/classroom/create/{uuid}', ["as" => "teacher-course-classroom-create", "uses" => "ClassroomController@create"]);
    Route::post('/teacher/courses/classroom/store', ["as" => "teacher-course-classroom-store", "uses" => "ClassroomController@store"]);
    Route::get('/teacher/courses/classroom/edit/{uuid}', ["as" => "teacher-course-classroom-edit", "uses" => "ClassroomController@edit"]);
    Route::post('/teacher/courses/classroom/update', ["as" => "teacher-course-classroom-update", "uses" => "ClassroomController@update"]);
});

//Material
Route::namespace('Material')->group(function () {
    Route::get('/teacher/courses/classrooms/material/{classroomuuid}', ["as" => "teacher-course-classroom-material", "uses" => "MaterialController@index"]);
    Route::get('/teacher/courses/classroom/material/create/{uuid}', ["as" => "teacher-course-classroom-material-create", "uses" => "MaterialController@create"]);
    Route::post('/teacher/courses/classroom/material/store', ["as" => "teacher-course-classroom-material-store", "uses" => "MaterialController@store"]);
    Route::get('/teacher/courses/classroom/material/edit/{uuid}', ["as" => "teacher-course-classroom-material-edit", "uses" => "MaterialController@edit"]);
    Route::post('/teacher/courses/classroom/material/update', ["as" => "teacher-course-classroom-material-update", "uses" => "MaterialController@update"]);
});

//Exam
Route::namespace('Exam')->group(function () {
    Route::get('/teacher/courses/classrooms/exam/{classroomuuid}', ["as" => "teacher-course-classroom-exam", "uses" => "ExamController@index"]);
    Route::get('/teacher/courses/classroom/exam/create/{uuid}', ["as" => "teacher-course-classroom-exam-create", "uses" => "ExamController@create"]);
    Route::post('/teacher/courses/classroom/exam/store', ["as" => "teacher-course-classroom-exam-store", "uses" => "ExamController@store"]);
    Route::get('/teacher/courses/classroom/exam/edit/{uuid}', ["as" => "teacher-course-classroom-exam-edit", "uses" => "ExamController@edit"]);
    Route::post('/teacher/courses/classroom/exam/update', ["as" => "teacher-course-classroom-exam-update", "uses" => "ExamController@update"]);
});

//ExamQuestion
Route::namespace('ExamQuestion')->group(function () {
    Route::get('/teacher/courses/classrooms/exam/question/{examuuid}', ["as" => "teacher-course-classroom-exam-question", "uses" => "ExamQuestionController@index"]);
    Route::get('/teacher/courses/classroom/exam/create/question/{uuid}', ["as" => "teacher-course-classroom-exam-question-create", "uses" => "ExamQuestionController@create"]);
    Route::post('/teacher/courses/classroom/exam/question/store', ["as" => "teacher-course-classroom-exam-question-store", "uses" => "ExamQuestionController@store"]);
    Route::get('/teacher/courses/classroom/exam/edit/question/{uuid}', ["as" => "teacher-course-classroom-exam-question-edit", "uses" => "ExamQuestionController@edit"]);
    Route::post('/teacher/courses/classroom/exam/update/question', ["as" => "teacher-course-classroom-exam-question-update", "uses" => "ExamQuestionController@update"]);
});

//ExamQuestionAnswer
Route::namespace('ExamQuestionAnswer')->group(function () {
    Route::get('/teacher/courses/classrooms/exam/question/answer/{questionuuid}', ["as" => "teacher-course-classroom-question-exam-answer", "uses" => "ExamQuestionAnswerController@index"]);
    Route::get('/teacher/courses/classroom/exam/create/question/answer/{uuid}', ["as" => "teacher-course-classroom-exam-question-answer-create", "uses" => "ExamQuestionAnswerController@create"]);
    Route::post('/teacher/courses/classroom/exam/question/answer/store', ["as" => "teacher-course-classroom-exam-question-answer-store", "uses" => "ExamQuestionAnswerController@store"]);
    Route::get('/teacher/courses/classroom/exam/edit/question/answer/{uuid}', ["as" => "teacher-course-classroom-exam-question-answer-edit", "uses" => "ExamQuestionAnswerController@edit"]);
    Route::post('/teacher/courses/classroom/exam/update/question/answer', ["as" => "teacher-course-classroom-exam-question-answer-update", "uses" => "ExamQuestionAnswerController@update"]);
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
