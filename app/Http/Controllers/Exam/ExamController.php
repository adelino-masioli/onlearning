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
use \App\Models\Classroom;
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
        $classroom = Classroom::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Exam', [
            "classroom" => $classroom,
            "exams" => Exam::with("classroom")->select("exams.*",  DB::raw("DATE_FORMAT(exams.created_at, '%d/%m/%Y') as date"))->where("exams.classroom_id", $classroom->id)->get(),
            ]);
    }

    public function create($uuid)
    {
        $classroom = Classroom::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Exam/Create', [
            "classroom" => $classroom,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:exams,title,'.$request->input("classroom_id").',classroom_id',
            'description'  => 'required',
        ]);

        $data = $request->all();

        $exam = Exam::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('exams-edit', $exam->uuid);
    }


    public function edit($uuid)
    {
        $exam = Exam::with("classroom")->where("uuid", $uuid)->first();
        return Inertia::render('Exam/Edit', [
            'exam' =>  $exam
        ]);
    }


    public function update(Request $request)
    {
        $exam = Exam::with("classroom")->where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:exams,title,'.$request->input("classroom_id").',classroom_id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $exam->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('exams-edit', $exam->uuid);
    }


}
