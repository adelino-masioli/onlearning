<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;


use Inertia\Inertia;
use Auth;
use \App\Models\Teacher;
use \App\User;
use Image;

class TeacherController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }



    public function index()
    {
        return Inertia::render('Teacher', []);
    }

    public function edit()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();

        $courses = [];
        $classrooms = [];
        $materials = [];
        $students = [];
        $leads = [];
        $bookins = [];
        $payments = [];
        $landingpages = [];

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
