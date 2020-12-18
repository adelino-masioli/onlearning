<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Course;
use \App\Models\LandingPage;
use \App\Models\Student;
use \App\Models\Teacher;
use \App\Models\Lead;
use \App\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index()
    {
        return redirect("/login");
    }
    public function home()
    {
        return redirect(Auth::user()->profile);
    }
    public function landing($teacher, $slug)
    {
        $landing = LandingPage::with("teacher")->where("slug", $teacher . "/" . $slug)->first();
        if ($landing) {
            $courses = Course::with("classrooms")->where("teacher_id", $landing->teacher_id)->where("status", "!=", "0")->where("show", "!=", "0")->get();
            return view('themes.default.index', with(['landing' => $landing, 'courses' => $courses]));
        } else {
            return redirect("/login");
        }
    }
    public function booking(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name'            => ['required', 'max:255'],
                'email'           => ['required', 'string', 'email', 'max:255'],
                'password'        => ['required', 'string', 'min:8'],
                'confirmpassword' => ['required_with:password', 'same:password']
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            } else {
                $course  =  Course::where("uuid", $request->course_uuid)->first();
                $teacher =  Teacher::find($course->teacher_id);

                $user = User::create([
                    'name'     => $request->input('name'),
                    'email'    => $request->input('email'),
                    'profile'  => 'student',
                    'password' => Hash::make($request->input('password')),
                ]);

                $data = $request->all();
                $data["status"]  = 0;
                $data["user_id"] = $user->id;
                $data["level"]   = $course->level;

                Student::create($data);
                $teacher->students()->attach(Student::latest()->first()->id);

                $this->lead($course, Student::latest()->first());

                return response()->json(['success' => 'Saved successfully!']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to save. Please contact the Administrator'], 422);
        }
    }


    public function lead($course, $student)
    {
        $data["teacher_id"]   = $course->teacher_id;
        $data["course_id"]    = $course->id;
        $data["student_id"]   = $student->id;
        $data["status"]       = 0;

        Lead::create($data);
    }

    public function contact(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name'                => ['required', 'max:255'],
                'email'               => ['required', 'string', 'email', 'max:255'],
                'subject'             => ['required'],
                'message'             => ['required'],
                'question_security'   => ['required'],
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            } else {
                if ($request->question_security == "London") {
                    $teacher =  Teacher::find($request->teacher);

                    //  Send mail 
                    Mail::send('emails.contact_teacher', array(
                        'name'    => $request->name,
                        'email'   => $request->email,
                        'subject' => $request->subject,
                        'message' => $request->message,
                    ), function ($message) use ($request, $teacher) {
                        $message->from($request->email);
                        $message->to($teacher->email, 'Site contact')->subject($request->subject);
                    });

                    return response()->json(['success' => 'Contact sent successfully!']);
                } else {
                    return response()->json(['error' => 'Wrong answer: The capital of England?'], 422);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send. Please contact the Administrator'], 422);
        }
    }
}
