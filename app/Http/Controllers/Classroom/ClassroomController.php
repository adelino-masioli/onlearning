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

class ClassroomController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {
        $course = Course::where("uuid", $uuid)->first();
        return Inertia::render('Classroom', [
            "course" => $course,
            "classrooms" => Classroom::with("course")->select("classrooms.*",  DB::raw("DATE_FORMAT(classrooms.created_at, '%d/%m/%Y') as date"))->where("classrooms.course_id", $course->id)->get(),
            ]);
    }

    public function create($uuid)
    {
        $course = Course::where("uuid", $uuid)->first();
        return Inertia::render('Classroom/Create', [
            "course" => $course,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:classrooms,title,'.$request->input("course_id").',course_id',
            'description'  => 'required',
        ]);

        $data = $request->all();

        $classroom = Classroom::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-classroom-edit', $classroom->uuid);
    }


    public function edit($uuid)
    {
        $classroom = Classroom::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Classroom/Edit', [
            'classroom' =>  $classroom
        ]);
    }


    public function update(Request $request)
    {
        $classroom = Classroom::with("course")->where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:classrooms,title,'.$request->input("course_id").',course_id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $classroom->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-classroom-edit', $classroom->uuid);
    }


}
