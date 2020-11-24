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
use \App\Models\Classroom;
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
        $classroom = Classroom::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Material', [
            "classroom" => $classroom,
            "materials" => Material::with("classroom")->select("materials.*",  DB::raw("DATE_FORMAT(materials.created_at, '%d/%m/%Y') as date"))->where("materials.classroom_id", $classroom->id)->get(),
            ]);
    }

    public function create($uuid)
    {
        $classroom = Classroom::with("course")->where("uuid", $uuid)->first();
        return Inertia::render('Material/Create', [
            "classroom" => $classroom,
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:materials,title,'.$request->input("classroom_id").',classroom_id',
            'description'  => 'required',
        ]);

        $data = $request->all();

        $material = Material::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('materials-edit', $material->uuid);
    }


    public function edit($uuid)
    {
        $material = Material::with("classroom")->where("uuid", $uuid)->first();
        return Inertia::render('Material/Edit', [
            'material' =>  $material
        ]);
    }


    public function update(Request $request)
    {
        $material = Material::with("classroom")->where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:materials,title,'.$request->input("classroom_id").',classroom_id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $material->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('materials-edit', $material->uuid);
    }


}
