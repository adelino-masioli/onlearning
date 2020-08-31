<?php

namespace App\Http\Controllers\ExamQuestionAnswer;
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
use \App\Models\ExamQuestionAnswer;
use \App\Models\Classroom;
use \App\Models\Student;
use \App\Models\Course;

class ExamQuestionAnswerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {
        $question = ExamQuestion::with("exam")->where("uuid", $uuid)->first();

        return Inertia::render('ExamQuestionAnswer', [
            "question" => $question,
            "answers" => ExamQuestionAnswer::with("question")->select("exam_question_answers.*",  DB::raw("DATE_FORMAT(exam_question_answers.created_at, '%d/%m/%Y') as date"))->where("exam_question_answers.exam_question_id", $question->id)->get(),
            ]);
    }

    public function create($uuid)
    {
        $question = ExamQuestion::with("exam")->where("uuid", $uuid)->first();
        return Inertia::render('ExamQuestionAnswer/Create', [
            "question" => $question,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'answer'   => 'required|max:255|unique:exam_question_answers,answer,'.$request->input("exam_question_id").',exam_question_id',
        ]);

        $data = $request->all();

        $exam_question_answer = ExamQuestionAnswer::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-classroom-exam-question-answer-edit', $exam_question_answer->uuid);
    }


    public function edit($uuid)
    {
        $exam_question = ExamQuestionAnswer::where("uuid", $uuid)->first();
        $question = ExamQuestion::with("exam")->where("id", $exam_question->exam_question_id)->first();
        return Inertia::render('ExamQuestionAnswer/Edit', [
            'exam_question' =>  $exam_question,
            'question' =>  $question,
        ]);
    }


    public function update(Request $request)
    {
        $exam_question_answer = ExamQuestionAnswer::where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'answer'   => 'required|max:255|unique:exam_question_answers,answer,'.$request->input("exam_question_id").',exam_question_id',
        ]);

        $data = $request->all();

        $exam_question_answer->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-classroom-exam-question-answer-edit', $exam_question_answer->uuid);
    }


}
