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
use \App\Models\ClassRoomStudent;

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
            "classrooms" => Classroom::with("students")->where("course_id", $course->id)->get(),
            ]);
    }

    public function store(Request $request)
    {
        //course student
        $course  = Course::where('uuid', $request->input("course"))->first();
        $student = Student::where('uuid', $request->input("student"))->first();
        $classroom = Classroom::where('uuid', $request->input("classroom"))->first();

        if($student->courses->count() > 0){
            $course->students()->detach($student->id);
        }else{
            $course->students()->attach($student->id);
        }

        if($student->classrooms->count() > 0){
            $classroom->students()->detach($student->id);
        }else{
            $classroom->students()->attach($student->id);
        }

        $request->session()->flash('message', 'Saved successfully!');


        return Redirect::route('teacher-course-student', $course->uuid);
    }

    public function book(Request $request)
    {
        return Classroom::with("students")->where("id", $request->input("classroom"))->count();
    }


}
