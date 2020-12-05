<?php

use Illuminate\Support\Facades\Route;



Auth::routes();
Route::get('/', 'HomeController@index')->name('home');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/user', ["as" => "user", "uses" => "UserController@index"]);

Route::get('logout', function (){
    Auth::logout();
    return redirect('/');
});


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
    Route::post('/teacher/update', ["as" => "teacher-update", "uses" => "TeacherController@update"]);
});

//TeacherStudent
Route::namespace('TeacherStudent')->group(function () {
    Route::get('/teacher/students', ["as" => "teacher-student", "uses" => "TeacherStudentController@index"]);
    Route::get('/teacher/student/create', ["as" => "teacher-student-create", "uses" => "TeacherStudentController@create"]);
    Route::post('/teacher/student/store', ["as" => "teacher-student-store", "uses" => "TeacherStudentController@store"]);
    Route::get('/teacher/student/edit/{uuid}', ["as" => "teacher-student-edit", "uses" => "TeacherStudentController@edit"]);
    Route::post('/teacher/student/update', ["as" => "teacher-student-update", "uses" => "TeacherStudentController@update"]);
    Route::post('/teacher/student/status', ["as" => "teacher-student-update-status", "uses" => "TeacherStudentController@status"]);
});

//Course
Route::namespace('Course')->group(function () {
    Route::get('/courses', ["as" => "courses", "uses" => "CourseController@index"]);
    Route::get('/courses/create', ["as" => "courses-create", "uses" => "CourseController@create"]);
    Route::post('/courses/store', ["as" => "courses-store", "uses" => "CourseController@store"]);
    Route::get('/courses/edit/{uuid}', ["as" => "courses-edit", "uses" => "CourseController@edit"]);
    Route::post('/courses/update', ["as" => "courses-update", "uses" => "CourseController@update"]);
    Route::post('/courses/status', ["as" => "courses-update-status", "uses" => "CourseController@status"]);
    Route::post('/courses/show', ["as" => "courses-update-show", "uses" => "CourseController@show"]);
});


//Classroom
Route::namespace('Classroom')->group(function () {
    Route::get('/classrooms', ["as" => "classrooms", "uses" => "ClassroomController@index"]);
    Route::get('/classrooms/course/{courseuuid}', ["as" => "classrooms-by-course", "uses" => "ClassroomController@classrooms_by_course"]);
    Route::get('/classrooms/create', ["as" => "classrooms-create", "uses" => "ClassroomController@create"]);
    Route::get('/classrooms/create/course/{courseuuid}', ["as" => "classrooms-create-by-course", "uses" => "ClassroomController@create_by_course"]);
    Route::post('/classrooms/store', ["as" => "classrooms-store", "uses" => "ClassroomController@store"]);
    Route::get('/classrooms/edit/{uuid}', ["as" => "classrooms-edit", "uses" => "ClassroomController@edit"]);
    Route::get('/classrooms/room/{uuid}', ["as" => "classrooms-room", "uses" => "ClassroomController@room"]);
    Route::post('/classrooms/update', ["as" => "classrooms-update", "uses" => "ClassroomController@update"]);
});

//ClassroomStudent
Route::namespace('ClassroomStudent')->group(function () {
    Route::get('/classroom-students/{uuid}', ["as" => "classroom-students", "uses" => "ClassroomStudentController@index"]);
    Route::post('/classroom-students/store', ["as" => "classroom-students-store", "uses" => "ClassroomStudentController@store"]);
});

//ClassroomMaterial
Route::namespace('ClassroomMaterial')->group(function () {
    Route::get('/classroom-materials/{uuid}', ["as" => "classroom-materials", "uses" => "ClassroomMaterialController@index"]);
    Route::post('/classroom-materials/store', ["as" => "classroom-materials-store", "uses" => "ClassroomMaterialController@store"]);
});
//ClassroomExam
Route::namespace('ClassroomExam')->group(function () {
    Route::get('/classroom-exams/{uuid}', ["as" => "classroom-exams", "uses" => "ClassroomExamController@index"]);
    Route::post('/classroom-exams/store', ["as" => "classroom-exams-store", "uses" => "ClassroomExamController@store"]);
});

//Material
Route::namespace('Material')->group(function () {
    Route::get('/materials', ["as" => "materials", "uses" => "MaterialController@index"]);
    Route::get('/materials/create', ["as" => "materials-create", "uses" => "MaterialController@create"]);
    Route::post('/materials/store', ["as" => "materials-store", "uses" => "MaterialController@store"]);
    Route::get('/materials/edit/{uuid}', ["as" => "materials-edit", "uses" => "MaterialController@edit"]);
    Route::post('/materials/update', ["as" => "materials-update", "uses" => "MaterialController@update"]);
});

//Exam
Route::namespace('Exam')->group(function () {
    Route::get('/exams', ["as" => "exams", "uses" => "ExamController@index"]);
    Route::get('/exams/create', ["as" => "exams-create", "uses" => "ExamController@create"]);
    Route::post('/exams/store', ["as" => "exams-store", "uses" => "ExamController@store"]);
    Route::get('/exams/edit/{uuid}', ["as" => "exams-edit", "uses" => "ExamController@edit"]);
    Route::post('/exams/update', ["as" => "exams-update", "uses" => "ExamController@update"]);
});

//ExamQuestion
Route::namespace('ExamQuestion')->group(function () {
    Route::get('/questions/{uuid}', ["as" => "questions", "uses" => "ExamQuestionController@index"]);
    Route::get('/questions/create/{uuid}', ["as" => "questions-create", "uses" => "ExamQuestionController@create"]);
    Route::post('/questions/store', ["as" => "questions-store", "uses" => "ExamQuestionController@store"]);
    Route::get('/questions/edit/{uuid}', ["as" => "questions-edit", "uses" => "ExamQuestionController@edit"]);
    Route::post('/questions/update', ["as" => "questions-update", "uses" => "ExamQuestionController@update"]);
});

//ExamQuestionAnswer
Route::namespace('ExamQuestionAnswer')->group(function () {
    Route::get('/answers/{questionuuid}', ["as" => "answers", "uses" => "ExamQuestionAnswerController@index"]);
    Route::get('/answers/create/{uuid}', ["as" => "answers-create", "uses" => "ExamQuestionAnswerController@create"]);
    Route::post('/tanswers/store', ["as" => "answers-store", "uses" => "ExamQuestionAnswerController@store"]);
    Route::get('/answers/edit/{uuid}', ["as" => "answers-edit", "uses" => "ExamQuestionAnswerController@edit"]);
    Route::post('/answer/update', ["as" => "answers-update", "uses" => "ExamQuestionAnswerController@update"]);
});

//Booking
Route::namespace('Booking')->group(function () {
    Route::get('/bookings', ["as" => "bookings", "uses" => "BookingController@index"]);
    Route::post('/bookings/store', ["as" => "bookings-store", "uses" => "BookingController@store"]);
    Route::post('/bookings/status', ["as" => "bookings-update-status", "uses" => "BookingController@status"]);
});
//Payment
Route::namespace('Payment')->group(function () {
    Route::get('/payments', ["as" => "payments", "uses" => "PaymentController@index"]);
    Route::get('/payments/create', ["as" => "payments-create", "uses" => "PaymentController@create"]);
    Route::post('/payments/store', ["as" => "payments-store", "uses" => "PaymentController@store"]);
    Route::get('/payments/edit/{uuid}', ["as" => "payments-edit", "uses" => "PaymentController@edit"]);
    Route::post('/payments/update', ["as" => "payments-update", "uses" => "PaymentController@update"]);
    Route::post('/payments/duplicate', ["as" => "payments-duplicate", "uses" => "PaymentController@duplicate"]);
});


//Student
Route::namespace('Student')->group(function () {
    Route::get('/student', ["as" => "student", "uses" => "StudentController@index"]);
    Route::get('/student/create', ["as" => "student-create", "uses" => "StudentController@create"]);
    Route::post('/student/store', ["as" => "student-store", "uses" => "StudentController@store"]);
    Route::get('/student/edit/{id}', ["as" => "student-edit", "uses" => "StudentController@edit"]);
    Route::get('/student/profile', ["as" => "student-profile", "uses" => "StudentController@profile"]);
    Route::post('/student/update', ["as" => "student-update", "uses" => "StudentController@update"]);
});


//LandingPage
Route::namespace('LandingPage')->group(function () {
    Route::get('/landing-pages', ["as" => "landing-pages", "uses" => "LandingPageController@index"]);
    Route::get('/landing-pages/create', ["as" => "landing-pages-create", "uses" => "LandingPageController@create"]);
    Route::post('/landing-pages/store', ["as" => "landing-pages-store", "uses" => "LandingPageController@store"]);
    Route::get('/landing-pages/edit/{uuid}', ["as" => "landing-pages-edit", "uses" => "LandingPageController@edit"]);
    Route::post('/landing-pages/update', ["as" => "landing-pages-update", "uses" => "LandingPageController@update"]);
    Route::post('/landing-pages/status', ["as" => "landing-pages-update-status", "uses" => "LandingPageController@status"]);
    Route::post('/landing-pages/show', ["as" => "landing-pages-update-display", "uses" => "LandingPageController@display"]);
});