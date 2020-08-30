<?php

namespace App\Http\Controllers\Lesson;
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
use \App\Models\Lesson;
use \App\Models\Student;
use \App\Models\Course;

class LessonController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {
        $course = Course::where("uuid", $uuid)->first();
        return Inertia::render('Lesson', [
            "course" => $course,
            "lessons" => Lesson::with("course")->select("lessons.*",  DB::raw("DATE_FORMAT(lessons.created_at, '%d/%m/%Y') as date"))->where("lessons.course_id", $course->id)->get(),
            ]);
    }

    public function create($uuid)
    {
        $course = Course::where("uuid", $uuid)->first();
        return Inertia::render('Lesson/Create', [
            "course" => $course,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:lessons,title,'.$request->input("course_id").',course_id',
            'description'  => 'required',
        ]);

        $data = $request->all();

        $lesson = Lesson::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-lesson-edit', $lesson->uuid);
    }


    public function edit($uuid)
    {
        $lesson = Lesson::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Lesson/Edit', [
            'lesson' =>  $lesson
        ]);
    }


    public function update(Request $request)
    {
        $lesson = Lesson::with("course")->where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:lessons,title,'.$request->input("course_id").',course_id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $lesson->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-lesson-edit', $lesson->uuid);
    }


}
