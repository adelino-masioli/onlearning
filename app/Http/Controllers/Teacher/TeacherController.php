<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Image;
use Inertia\Inertia;
use \App\Models\Teacher;
use \App\Models\Course;
use \App\Models\Classroom;
use App\Models\Lead;
use \App\Models\Material;
use App\Models\Booking;
use \App\User;


class TeacherController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }



    public function index()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();

        $courses = Course::where("teacher_id", $teacher->id)->get();
        $classrooms = Classroom::where("teacher_id", $teacher->id)->get();
        $materials = Material::where("teacher_id", $teacher->id)->get();
        $students = $teacher->students;
        $last_students = $teacher->last_students;
        $leads = Lead::where("teacher_id", $teacher->id)->get();
        $last_leads = Lead::with("teacher")->with("course")->with("student")->select("leads.*",  DB::raw("DATE_FORMAT(leads.created_at, '%d/%m/%Y') as date"))->where("teacher_id", $teacher->id)->limit(5)->get();
        $bookings = Booking::where("teacher_id", $teacher->id)->get();


        return Inertia::render('Teacher', [
            "courses" => $courses,
            "classrooms" => $classrooms,
            "materials" => $materials,
            "students" => $students,
            "last_students" => $last_students,
            "leads" => $leads,
            "last_leads" => $last_leads,
            "bookings" => $bookings,
        ]);
    }

    public function edit()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();

        return Inertia::render('Teacher/Teacher/Edit', [
            'teacher' => [
                "register" => $teacher,
                "avatar" => $teacher->avatar && $teacher->avatar != NULL ? url("uploads/teachers/avatars", $teacher->avatar) : NULL,
            ]
        ]);
    }

    public function update(Request $request)
    {
        $validation = $request->validate([
            'name'  => ['required', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255']
        ]);
        if ($request->input('password') != "") {
            $validation = $request->validate([
                'password' => 'sometimes|required|string|min:8',
                'confirmpassword' => 'sometimes|required_with:password|same:password',
            ]);
        }

        //upload image
        $image = Self::upload($request->file("image"));
        $data_teacher = $request->all();
        $data_teacher += ["avatar" => $image ? $image : NULL];

        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $teacher->update($data_teacher);

        $user = User::findOrFail(Auth::user()->id);
        $data = ["name" => $request->input("name")];


        if ($request->input('password') != "") {
            $data = ["password" => Hash::make($request->input('password'))];
        }
        $user->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-profile')->with('message', 'Saved successfully!');
    }

    public function upload($file)
    {
        if ($file) {
            $imagename = time() . '.' . $file->extension();
            $destinationPath = public_path('/uploads/teachers/avatars/thumbnail');

            //create thumb
            $img = Image::make($file->path());
            $img->resize(400, 400, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPath . '/' . $imagename);

            //create full image
            $destinationPath = public_path('/uploads/teachers/avatars');
            $file->move($destinationPath, $imagename);
        } else {
            $imagename = NULL;
        }

        return $imagename;
    }
}
