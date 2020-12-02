<?php

namespace App\Http\Controllers\ClassroomStudent;
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
use \App\Models\ClassroomStudent;

class ClassroomStudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {   $classrooms = [];
        $classroom_students = Classroom::where('uuid', $uuid)->first()->students;
        foreach ($classroom_students as $classroom_student) {
            $classrooms[] = $classroom_student->pivot->student_id;
        }

        $students = [];
        $teacher_students = Teacher::find(Auth::user()->id)->students;
        foreach ($teacher_students as $student) {
            $reg = [
                'uuid'     => $student->uuid,
                'id'       => $student->id,
                'name'     => $student->name,
                'email'    => $student->email,
                'phone'    => $student->phone,
                'status'   => in_array($student->id, $classrooms) ? 1 : 0,
            ];
            $students[] = $reg;
        }


        return Inertia::render('ClassroomStudent', [
            'students'   => $students,
            "classroom" => Classroom::where('uuid', $uuid)->first(),
            "classroom_students" => $classroom_students
            ]);
    }

    public function store(Request $request)
    {
        //classroom student
        $student = Student::where('uuid', $request->input("student")["uuid"])->first();
        $classroom = Classroom::where('uuid', $request->input("classroom")["uuid"])->first();


        if($classroom->students()->where('student_id', $student->id)->exists() > 0){
            $classroom->students()->detach($student->id);
        }else{
            $classroom->students()->attach($student->id);
        }

        $request->session()->flash('message', 'Saved successfully!');


        return Redirect::route('classroom-students', $request->input("classroom")["uuid"]);
    }

}
