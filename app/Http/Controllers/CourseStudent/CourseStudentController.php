<?php

namespace App\Http\Controllers\CourseStudent;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;


use Inertia\Inertia;
use Auth;
use DB;
use Str;
use Image;
use \App\Models\Student;
use \App\Models\Course;
use \App\Models\Teacher;
use \App\Models\Classroom;
use \App\Models\CourseStudent;

class CourseStudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {
        $course = Course::where('uuid', $uuid)->first();
        $students =  Teacher::find(Auth::user()->id)->students;
        return Inertia::render('CourseStudent', [
            'course'     => $course,
            'students'   => $students,
            "classrooms" => Classroom::where("course_id", $course->id)->get()
            ]);
    }

    public function store(Request $request)
    {
        //course student
        $course  = Course::where('uuid', $request->input("course"))->first();
        $student = Student::where('uuid', $request->input("student"))->first();

        $course->students()->detach($student->id);
        $course->students()->attach($student->id);



        return Redirect::route('teacher-course-student', $course->uuid);
    }


}
