<?php

namespace App\Http\Controllers\Course;
use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;


use Inertia\Inertia;
use Auth;
use DB;
use \App\Models\Student;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return Inertia::render('Course', ["courses" => Student::select("students.*",  DB::raw("DATE_FORMAT(students.created_at, '%d/%m/%Y') as date"))->get()]);
    }

    public function create()
    {
        return Inertia::render('Course/Create', []);
    }

    public function store(Request $request)
    {
        $file = $request->file("cover");
        $path = $file->store('covers');

        return $path;

        $destinationPath = 'uploads';
        $file->move($destinationPath,$file->getClientOriginalName());

        return $request;
        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-create');
    }
}
