<?php

namespace App\Http\Controllers\Exam;
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
use \App\Models\Exam;
use \App\Models\Lesson;
use \App\Models\Student;
use \App\Models\Course;

class ExamController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {
        $lesson = Lesson::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Exam', [
            "lesson" => $lesson,
            "exams" => Exam::with("lesson")->select("exams.*",  DB::raw("DATE_FORMAT(exams.created_at, '%d/%m/%Y') as date"))->where("exams.lesson_id", $lesson->id)->get(),
            ]);
    }

    public function create($uuid)
    {
        $lesson = Lesson::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Exam/Create', [
            "lesson" => $lesson,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:exams,title,'.$request->input("lesson_id").',lesson_id',
            'description'  => 'required',
        ]);

        $data = $request->all();

        $exam = Exam::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-lesson-exam-edit', $exam->uuid);
    }


    public function edit($uuid)
    {
        $exam = Exam::with("lesson")->where("uuid", $uuid)->first();
        return Inertia::render('Exam/Edit', [
            'exam' =>  $exam
        ]);
    }


    public function update(Request $request)
    {
        $exam = Exam::with("lesson")->where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:exams,title,'.$request->input("lesson_id").',lesson_id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $exam->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-lesson-exam-edit', $exam->uuid);
    }


}
