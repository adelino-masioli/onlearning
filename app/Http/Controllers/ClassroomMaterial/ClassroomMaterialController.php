<?php

namespace App\Http\Controllers\ClassroomMaterial;
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
use \App\Models\Student;
use \App\Models\Course;
use \App\Models\Teacher;
use \App\Models\Classroom;
use \App\Models\ClassroomMaterial;
use \App\Models\Material;

class ClassroomMaterialController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($uuid)
    {   
        
        $classrooms = [];
        $classroom_materials = Classroom::where('uuid', $uuid)->first()->materials;
        foreach ($classroom_materials as $classroom_material) {
            $classrooms[] = $classroom_material->pivot->material_id;
        }

        $materials = [];

        if(Teacher::where("user_id", Auth::user()->id)->first()->materials()->exists()){
            $teacher_materials= Teacher::where("user_id", Auth::user()->id)->first()->materials;
            foreach ($teacher_materials as $material) {
                $reg = [
                    'uuid'     => $material->uuid,
                    'id'       => $material->id,
                    'title'    => $material->title,
                    'link'     => $material->link,
                    'status'   => in_array($material->id, $classrooms) ? 1 : 0,
                ];
                $materials[] = $reg;
            }
        }
   

        return Inertia::render('ClassroomMaterial', [
            'materials'   => $materials,
            "classroom" => Classroom::where('uuid', $uuid)->first()
            ]);
    }

    public function store(Request $request)
    {
        //classroom material
        $material = Material::where('uuid', $request->input("material")["uuid"])->first();
        $classroom = Classroom::where('uuid', $request->input("classroom")["uuid"])->first();


        if($classroom->materials()->where('material_id', $material->id)->exists() > 0){
            $classroom->materials()->detach($material->id);
        }else{
            $classroom->materials()->attach($material->id);
        }

        $request->session()->flash('message', 'Saved successfully!');


        return Redirect::route('classroom-materials', $request->input("classroom")["uuid"]);
    }

}
