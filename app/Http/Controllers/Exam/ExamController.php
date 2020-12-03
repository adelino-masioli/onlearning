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
use \App\Models\Student;
use \App\Models\Course;
use \App\Models\Teacher;

class ExamController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Exam', [
            "exams" => Exam::with("teacher")->with("questions")->select("exams.*",  DB::raw("DATE_FORMAT(exams.created_at, '%d/%m/%Y') as date"))->get(),
            ]);
    }

    public function create()
    {
        return Inertia::render('Exam/Create');
    }

    public function store(Request $request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:exams,title,'.$teacher->id.',teacher_id',
            'description'  => 'required',
        ]);

        $data = $request->all();
        $data += ["teacher_id" => $teacher->id];

        $exam = Exam::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('exams-edit', $exam->uuid);
    }


    public function edit($uuid)
    {
        $exam = Exam::with("teacher")->where("uuid", $uuid)->first();
        return Inertia::render('Exam/Edit', [
            'exam' =>  $exam
        ]);
    }


    public function update(Request $request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $exam = Exam::where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:exams,title,'.$teacher->id.',teacher_id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $exam->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('exams-edit', $exam->uuid);
    }


}
