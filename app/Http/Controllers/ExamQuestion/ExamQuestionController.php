<?php

namespace App\Http\Controllers\ExamQuestion;
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
use \App\Models\ExamQuestion;
use \App\Models\Classroom;
use \App\Models\Student;
use \App\Models\Course;

class ExamQuestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {
        $exam = Exam::with("classroom")->where("uuid", $uuid)->first();

        return Inertia::render('ExamQuestion', [
            "exam" => $exam,
            "questions" => ExamQuestion::with("exam")->select("exam_questions.*",  DB::raw("DATE_FORMAT(exam_questions.created_at, '%d/%m/%Y') as date"))->where("exam_questions.exam_id", $exam->id)->get(),
            ]);
    }

    public function create($uuid)
    {
        $exam = Exam::with("classroom")->where("uuid", $uuid)->first();
        return Inertia::render('ExamQuestion/Create', [
            "exam" => $exam,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'question'     => 'required|max:255|unique:exam_questions,question,'.$request->input("exam_id").',exam_id',
        ]);

        $data = $request->all();

        $exam_question = ExamQuestion::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('questions-edit', $exam_question->uuid);
    }


    public function edit($uuid)
    {
        $exam_question = ExamQuestion::where("uuid", $uuid)->first();
        $exam = Exam::with("classroom")->where("id", $exam_question->exam_id)->first();
        return Inertia::render('ExamQuestion/Edit', [
            'exam_question' =>  $exam_question,
            'exam' =>  $exam,
        ]);
    }


    public function update(Request $request)
    {
        $exam_question = ExamQuestion::where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'question'     => 'required|max:255|unique:exam_questions,question,'.$request->input("exam_id").',exam_id',
        ]);

        $data = $request->all();

        $exam_question->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('questions-edit', $exam_question->uuid);
    }


}
