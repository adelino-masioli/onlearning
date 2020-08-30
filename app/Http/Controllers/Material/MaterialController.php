<?php

namespace App\Http\Controllers\Material;
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
use \App\Models\Material;
use \App\Models\Lesson;
use \App\Models\Student;
use \App\Models\Course;

class MaterialController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {
        $lesson = Lesson::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Material', [
            "lesson" => $lesson,
            "materials" => Material::with("lesson")->select("materials.*",  DB::raw("DATE_FORMAT(materials.created_at, '%d/%m/%Y') as date"))->where("materials.lesson_id", $lesson->id)->get(),
            ]);
    }

    public function create($uuid)
    {
        $lesson = Lesson::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Material/Create', [
            "lesson" => $lesson,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:materials,title,'.$request->input("lesson_id").',lesson_id',
            'description'  => 'required',
        ]);

        $data = $request->all();

        $material = Material::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-lesson-material-edit', $material->uuid);
    }


    public function edit($uuid)
    {
        $material = Material::with("lesson")->where("uuid", $uuid)->first();
        return Inertia::render('Material/Edit', [
            'material' =>  $material
        ]);
    }


    public function update(Request $request)
    {
        $material = Material::with("lesson")->where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:materials,title,'.$request->input("lesson_id").',lesson_id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $material->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('teacher-course-lesson-material-edit', $material->uuid);
    }


}
