<?php

namespace App\Http\Controllers\ClassroomStudent;

use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;


use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use \App\Models\Student;
use \App\Models\Teacher;
use \App\Models\Classroom;


class ClassroomStudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {

        $classrooms = [];
        $classroom_students = Classroom::where('uuid', $uuid)->first()->students;
        foreach ($classroom_students as $classroom_student) {
            $classrooms[] = $classroom_student->pivot->student_id;
        }

        $students = [];


        if (Teacher::where("user_id", Auth::user()->id)->first()->students()->exists()) {
            $teacher_students = Teacher::where("user_id", Auth::user()->id)->first()->students;
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


        if ($classroom->students()->where('student_id', $student->id)->exists() > 0) {
            $classroom->students()->detach($student->id);
        } else {
            $classroom->students()->attach($student->id);
        }

        $request->session()->flash('message', 'Saved successfully!');


        return Redirect::route('classroom-students', $request->input("classroom")["uuid"]);
    }
}
