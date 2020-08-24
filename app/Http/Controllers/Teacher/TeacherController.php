<?php

namespace App\Http\Controllers\Teacher;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;


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

    public function show()
    {
        return Inertia::render('Teacher/Show', [
            'teacher' => Teacher::where("user_id", Auth::user()->id)->first()
        ]);
    }

    public function update(Request $request)
    {
        $validation = $request->validate([
            'name'  => ['required', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);

        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $teacher->update($request->all());

        $user = User::findOrFail(Auth::user()->id);
        $user->update(["name" => $request->input("name")]);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-profile')->with('message', 'Saved successfully!');
    }
}
