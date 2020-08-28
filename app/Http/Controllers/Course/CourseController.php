<?php

namespace App\Http\Controllers\Course;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;


use Inertia\Inertia;
use Auth;
use DB;
use Str;
use \App\Models\Student;
use \App\Models\Course;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Course', ["courses" => Course::select("courses.*",  DB::raw("DATE_FORMAT(courses.created_at, '%d/%m/%Y') as date"))->get()]);
    }

    public function create()
    {
        return Inertia::render('Course/Create', []);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:courses,title,'.Auth::user()->id.',teacher_id',
            'level'        => 'required',
            'description'  => 'required',
            'image'        => 'required'
        ]);

        $file = $request->file("image");
        $path = $file ? $file->store('public') : NULL;

        $data = $request->all();
        $data += ["teacher_id" => Auth::user()->id];
        $data += ["cover" => $path];

        $course = Course::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-edit', $course->uuid);
    }


    public function edit($uuid)
    {
        $course = Course::where("uuid", $uuid)->first();
        return Inertia::render('Course/Edit', [
            'course' => [
                "register" => $course,
                "cover" => url("images", Str::of($course->cover)->explode('/')[1]),
            ]
        ]);
    }


    public function update(Request $request)
    {
        $course = Course::where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:courses,title,'.Auth::user()->id.',teacher_id',
            'level'        => 'required',
            'description'  => 'required'
        ]);


        $file = $request->file("image");
        $path = $file ? $file->store('public') : $course->cover;

        $data = $request->all();
        $data += ["cover" => $path];

        $course->update($data);


        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-edit', $course->uuid);
    }

    public function status(Request $request)
    {
        $course = Course::where('id', $request->input("id"))->first();

        $status = $course->status == 0 ? 1 : 0;
        $course->update(["status" => $status]);

        return Redirect::route('teacher-course');
    }

    public function show(Request $request)
    {
        $course = Course::where('id', $request->input("id"))->first();

        $show = $course->show == 0 ? 1 : 0;
        $course->update(["show" => $show]);

        return Redirect::route('teacher-course');
    }

}
