<?php

namespace App\Http\Controllers\ClassroomExam;
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
use \App\Models\ClassroomExam;
use \App\Models\Exam;

class ClassroomExamController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {   
        
        $classrooms = [];
        $classroom_exams = Classroom::where('uuid', $uuid)->first()->exams;
        foreach ($classroom_exams as $classroom_exam) {
            $classrooms[] = $classroom_exam->pivot->exam_id;
        }

        $exams = [];

        if(Teacher::where("user_id", Auth::user()->id)->first()->exams()->exists()){
            $teacher_exams= Teacher::where("user_id", Auth::user()->id)->first()->exams;
            foreach ($teacher_exams as $exam) {
                $reg = [
                    'uuid'     => $exam->uuid,
                    'id'       => $exam->id,
                    'title'    => $exam->title,
                    'average'  => $exam->average,
                    'status'   => in_array($exam->id, $classrooms) ? 1 : 0,
                ];
                $exams[] = $reg;
            }
        }
   

        return Inertia::render('ClassroomExam', [
            'exams'   => $exams,
            "classroom" => Classroom::where('uuid', $uuid)->first()
            ]);
    }

    public function store(Request $request)
    {
        //classroom material
        $exam = Exam::where('uuid', $request->input("exam")["uuid"])->first();
        $classroom = Classroom::where('uuid', $request->input("classroom")["uuid"])->first();


        if($classroom->exams()->where('exam_id', $exam->id)->exists() > 0){
            $classroom->exams()->detach($exam->id);
        }else{
            $classroom->exams()->attach($exam->id);
        }

        $request->session()->flash('message', 'Saved successfully!');


        return Redirect::route('classroom-exams', $request->input("classroom")["uuid"]);
    }

}
