<?php

namespace App\Http\Controllers\TeacherStudent;

use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

use DB;
use Inertia\Inertia;
use Auth;
use \App\Models\Student;
use \App\Models\Teacher;
use \App\User;

class TeacherStudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index()
    {
        $all_students = Teacher::where("user_id", Auth::user()->id)->first()->students;

        $students = [];
        foreach ($all_students as $student) {
            $reg = [
                'id'              => $student->id,
                'uuid'            => $student->uuid,
                'name'            => $student->name,
                'email'           => $student->email,
                'phone'           => $student->phone,
                'country'         => $student->country,
                'level'           => $student->level,
                'status'          => $student->status == 1 ? "Active" : "Inactive",
            ];
            $students[] = $reg;
        }

        return Inertia::render('Teacher/Student', [
            'students' =>  $students
        ]);
    }

    public function create()
    {
        return Inertia::render('Teacher/Student/Create', []);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'name'            => ['required', 'max:255'],
            'email'           => ['required', 'string', 'email', 'max:255', 'unique:students'],
            'password'        => ['required', 'string', 'min:8'],
            'confirmpassword' => ['required_with:password', 'same:password']
        ]);

        $user = User::create([
            'name'     => $request->input('name'),
            'email'    => $request->input('email'),
            'profile'  => 'student',
            'password' => Hash::make($request->input('password')),
        ]);

        $data = $request->all();
        $data += ["user_id" => $user->id];

        $student = Student::create($data);

        $teacher =  Teacher::where("user_id", Auth::user()->id)->first();
        $teacher->students()->attach(Student::latest()->first()->id);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-student-edit', $student->uuid);
    }

    public function edit($uuid)
    {
        return Inertia::render('Teacher/Student/Edit', [
            'student' => Student::where("uuid", $uuid)->first()
        ]);
    }

    public function update(Request $request)
    {
        $student = Student::where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'name'  => 'required|max:255',
            'email' => 'required|string|max:255|email|unique:students,email,' . $student->id,
        ]);

        if ($request->input('password') != "") {
            $validation = $request->validate([
                'password' => 'sometimes|required|string|min:8',
                'confirmpassword' => 'sometimes|required_with:password|same:password',
            ]);
        }

        $student->update($request->all());

        $user = User::findOrFail($student->user_id);
        $data = ["name" => $request->input("name")];
        if ($request->input('password') != "") {
            $data = ["password" => Hash::make($request->input('password'))];
        }
        $user->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-student-edit', $student->uuid);
    }

    public function status(Request $request)
    {
        $student = Student::where('id', $request->input("id"))->first();

        $status = $student->status == 0 ? 1 : 0;
        $student->update(["status" => $status]);

        return Redirect::route('teacher-student');
    }
}
