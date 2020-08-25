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
        return Inertia::render('Teacher/Teacher/Edit', [
            'teacher' => Teacher::where("user_id", Auth::user()->id)->first()
        ]);
    }

    public function update(Request $request)
    {
        $validation = $request->validate([
            'name'  => ['required', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255']
        ]);
        if($request->input('password') != ""){
            $validation = $request->validate([
                'password' => 'sometimes|required|string|min:8',
                'confirmpassword' => 'sometimes|required_with:password|same:password',
            ]);
        }

        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $teacher->update($request->all());

        $user = User::findOrFail(Auth::user()->id);
        $data = ["name" => $request->input("name")];
        if($request->input('password') != ""){
            $data = ["password" => Hash::make($request->input('password'))];
        }
        $user->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-profile')->with('message', 'Saved successfully!');
    }
}
