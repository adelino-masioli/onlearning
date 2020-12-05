<?php

namespace App\Http\Controllers\Booking;
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
use \App\Models\Booking;
use \App\Models\Classroom;
use \App\Models\Payment;

class BookingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        return Inertia::render('Booking', [
            "courses"  => Course::where("teacher_id", $teacher->id)->get(),
            "classrooms"  => Classroom::where("teacher_id", $teacher->id)->get(),
            "students" => Teacher::where("user_id", Auth::user()->id)->first()->students,
            "bookings" => Booking::with("course")->with("classroom")->with("student")->where("teacher_id", $teacher->id)->get()
            ]);
    }

    public function store(Request $request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $validation = $request->validate([
            'course_id'      => 'required',
            'classroom_id'   => 'required',
            'student_id'     => 'required',
        ]);

        $data = $request->all();
        $data += ["teacher_id" => $teacher->id];

        $booking = Booking::create($data);

        if($booking){
            Self::payment($request);
        }

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('bookings');
    }


    public function payment($request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $course = Course::find($request->course_id);

        $data['teacher_id']   = $teacher->id;
        $data['course_id']    = $request->course_id;
        $data['classroom_id'] = $request->classroom_id;
        $data['student_id']   = $request->student_id;
        $data['price']        = $course->price;
        $data['payment']      = "";
        $data['date']         = "";
        $data['next_date']    = "";
        $data['observation']  = "";
        $data['status']       = 0;

        Payment::create($data);
    }





    public function status(Request $request)
    {
        $booking = Booking::where('id', $request->input("id"))->first();

        $status = $booking->status == 0 ? 1 : 0;
        $booking->update(["status" => $status]);

        return Redirect::route('bookings');
    }



}
