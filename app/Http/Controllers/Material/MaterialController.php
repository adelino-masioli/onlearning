<?php

namespace App\Http\Controllers\Material;

use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;


use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Str;
use Image;
use \App\Models\Material;
use \App\Models\Student;
use \App\Models\Course;
use \App\Models\Teacher;

class MaterialController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();

        $all_materials = Material::with("teacher")->select("materials.*",  DB::raw("DATE_FORMAT(materials.created_at, '%d/%m/%Y') as date"))->where("teacher_id", $teacher->id)->get();

        $materials = [];
        foreach ($all_materials as $material) {

            $reg = [
                'uuid'            => $material->uuid,
                'id'              => $material->id,
                'title'           => $material->title,
                'teacher'         => $material->teacher->name,
                'link'            => $material->link,
                'date'            => $material->date,
                'status'          => $material->status == 1 ? "Published" : "Draft",
            ];
            $materials[] = $reg;
        }

        return Inertia::render('Material', [
            "materials" => $materials,
        ]);
    }

    public function create()
    {
        return Inertia::render('Material/Create');
    }

    public function store(Request $request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:materials,title,' . $teacher->id . ',teacher_id',
            'description'  => 'required',
        ]);

        $data = $request->all();
        $data += ["teacher_id" => $teacher->id];

        $material = Material::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('materials-edit', $material->uuid);
    }


    public function edit($uuid)
    {
        $material = Material::with("teacher")->where("uuid", $uuid)->first();
        return Inertia::render('Material/Edit', [
            'material' =>  $material
        ]);
    }


    public function update(Request $request)
    {
        $material = Material::with("teacher")->where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:materials,title,' . $request->input("id") . ',id',
            'description'  => 'required'
        ]);

        $data = $request->all();

        $material->update($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('materials-edit', $material->uuid);
    }
}
