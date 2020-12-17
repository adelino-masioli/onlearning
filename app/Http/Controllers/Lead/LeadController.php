<?php

namespace App\Http\Controllers\Lead;

use Illuminate\Http\Request;
use \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use Str;
use Image;
use \App\Models\Teacher;
use \App\Models\Lead;

class LeadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        return Inertia::render('Lead', [
            "leads" => Lead::with("teacher")->with("course")->with("student")->select("leads.*",  DB::raw("DATE_FORMAT(leads.created_at, '%d/%m/%Y') as date"))->where("teacher_id", $teacher->id)->get()
        ]);
    }


    public function status(Request $request)
    {
        $landing = Lead::where('id', $request->input("id"))->first();

        $landing->update(["status" => $request->input("status")]);

        if ($request->input("redirect")) {
            return Redirect::route($request->input("redirect"));
        } else {
            return Redirect::route('leads');
        }
    }
}
