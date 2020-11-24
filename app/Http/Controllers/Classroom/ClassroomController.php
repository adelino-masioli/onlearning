<?php

namespace App\Http\Controllers\Classroom;
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
use \App\Models\Classroom;
use \App\Models\Student;
use \App\Models\Course;
use \App\Models\Teacher;

class ClassroomController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Classroom', [
            "classrooms" => Classroom::with("course")->select("classrooms.*",  DB::raw("DATE_FORMAT(classrooms.created_at, '%d/%m/%Y') as date"))->get(),
            ]);
    }

    public function classrooms_by_course($uuid)
    {
        $course = Course::where("uuid", $uuid)->first();
        return Inertia::render('Classroom/Course', [
            "course" => $course,
            "classrooms" => Classroom::with("course")->select("classrooms.*",  DB::raw("DATE_FORMAT(classrooms.created_at, '%d/%m/%Y') as date"))->where("classrooms.course_id", $course->id)->get(),
            ]);
    }
    
    public function create()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $courses = Course::orderBy('title', 'asc')->where("teacher_id", $teacher->id)->get();
        

        return Inertia::render('Classroom/Create', [
            "courses" => $courses,
        ]);
    }

    public function create_by_course($uuid)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $courses = Course::orderBy('title', 'asc')->where("teacher_id", $teacher->id)->get();

        $course = Course::where("uuid", $uuid)->first();
        return Inertia::render('Classroom/Course/Create', [
            "course" => $course,
            "courses" => $courses,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'course_id'    => 'required',
            'title'        => 'required|max:255|unique:classrooms,title,'.(int)$request->input("course_id").',course_id',
            'description'  => 'required',
        ]);

        $data = $request->all();

        $classroom = Classroom::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('classrooms-edit', $classroom->uuid);
    }

    public function edit($uuid)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $courses = Course::orderBy('title', 'asc')->where("teacher_id", $teacher->id)->get();

        $classroom = Classroom::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Classroom/Edit', [
            'classroom' =>  $classroom,
            "courses" => $courses
        ]);
    }


    public function update(Request $request)
    {
        $classroom = Classroom::with("course")->where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'course_id'    => 'required',
            'title'        => 'required|max:255|unique:classrooms,title,'.(int)$request->input("course_id").',course_id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $classroom->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('classrooms-edit', $classroom->uuid);
    }


}
