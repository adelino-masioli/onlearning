<?php

namespace App\Http\Controllers\LandingPage;
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
use \App\Models\LandingPageLayout;
use \App\Models\LandingPage;

class LandingPageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        return Inertia::render('LandingPage', [
            "landing_pages" => LandingPage::select("landing_pages.*",  DB::raw("DATE_FORMAT(landing_pages.created_at, '%d/%m/%Y') as date"))->where("teacher_id", $teacher->id)->get()
            ]);
    }

    public function create()
    {
        return Inertia::render('LandingPage/Create', [
            "themes" => LandingPageLayout::where("status", 1)->get()
        ]);
    }

    public function store(Request $request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:courses,title,'.$teacher->id.',teacher_id',
            'template_id'  => 'required',
            'tags'         => 'required',
            'description'  => 'required',
            'hero'         => 'required',
            'description'  => 'required',
            'image'        => 'required'
        ]);

        //upload image
        $image = Self::upload($request->file("image"));

        $data = $request->all();
        $data += ["teacher_id" => $teacher->id];
        $data += ["cover"      => $image ? $image : NULL];
        $data["slug"]          = Str::of($request->title)->slug('-');

        $landing = LandingPage::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('landing-pages-edit', $landing->uuid);
    }


    public function edit($uuid)
    {
        $landing = LandingPage::where("uuid", $uuid)->first();
        return Inertia::render('LandingPage/Edit', [
            'landing' => [
                "register" => $landing,
                "cover" => url("/uploads/landingpages/pages/", $landing->cover),
            ],
            "themes" => LandingPageLayout::where("status", 1)->get()
        ]);
    }


    public function update(Request $request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $landing = LandingPage::where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'title'        => 'required|max:255|unique:landing_pages,title,'.$teacher->id.',teacher_id',
            'template_id'  => 'required',
            'tags'         => 'required',
            'description'  => 'required',
            'hero'         => 'required',
            'description'  => 'required'
        ]);

        //upload image
        $image = Self::upload($request->file("image"));

        $data = $request->all();
        $data += ["cover" => $image ? $image : $landing->cover];
        $data["slug"]   = Str::of($request->title)->slug('-');


        $landing->update($data);


        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('landing-pages-edit', $landing->uuid);
    }

    public function status(Request $request)
    {
        $landing = LandingPage::where('id', $request->input("id"))->first();

        $status = $landing->status == 0 ? 1 : 0;
        $landing->update(["status" => $status]);

        return Redirect::route('landing-pages');
    }

    public function display(Request $request)
    {
        $landing = LandingPage::where('id', $request->input("id"))->first();

        $display = $landing->default == 0 ? 1 : 0;
        $landing->update(["default" => $display]);

        return Redirect::route('landing-pages');
    }

    public function upload($file)
    {
        if($file){
            $imagename = time().'.'.$file->extension();
            $destinationPath = public_path('/uploads/landingpages/pages/thumbnail');

            //create thumb
            $img = Image::make($file->path());
            $img->resize(400, 150, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPath.'/'.$imagename);

            //create full image
            $destinationPath = public_path('/uploads/landingpages/pages/');
            $file->move($destinationPath, $imagename);

        }else{
            $imagename = NULL;
        }

        return $imagename;
    }

}
