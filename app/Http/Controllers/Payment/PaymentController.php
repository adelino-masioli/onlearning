<?php

namespace App\Http\Controllers\Payment;
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

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();

        $all_payments =  Payment::with("course")
            ->with("classroom")
            ->with("student")
            ->where("payments.teacher_id", $teacher->id)
            ->orderBy("payments.id", "asc")
            ->get();


        $payments = [];
        foreach ($all_payments as $payment) {

            $reg = [
                'uuid'            => $payment->uuid,
                'id'              => $payment->id,
                'course_name'     => $payment->course->title,
                'classroom_name'  => $payment->classroom->title,
                'student_name'    => $payment->student->name,
                'payment'         => $payment->payment,
                'price'           => $payment->price,
                'date'            => $payment->date,
                'next_date'       => $payment->next_date,
                'status'          => $payment->status == 1 ? "Paid" : "Waiting",
            ];
            $payments[] = $reg;
        }

        return Inertia::render('Payment', [
            "courses"  => Course::where("teacher_id", $teacher->id)->get(),
            "classrooms"  => Classroom::where("teacher_id", $teacher->id)->get(),
            "students" => Teacher::where("user_id", Auth::user()->id)->first()->students,
            "payments" => $payments
            ]);
    }

    public function create()
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        return Inertia::render('Payment/Create', [
            "courses"  => Course::where("teacher_id", $teacher->id)->get(),
            "classrooms"  => Classroom::where("teacher_id", $teacher->id)->get(),
            "students" => Teacher::where("user_id", Auth::user()->id)->first()->students
            ]);
    }

    public function edit($uuid)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        return Inertia::render('Payment/Edit', [
            "courses"  => Course::where("teacher_id", $teacher->id)->get(),
            "classrooms"  => Classroom::where("teacher_id", $teacher->id)->get(),
            "students" => Teacher::where("user_id", Auth::user()->id)->first()->students,
            "payment" => Payment::with("course")->with("classroom")->with("student")->where("uuid", $uuid)->first()
            ]);
    }

    public function store(Request $request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $course =  Course::find($request->course_id);
        $validation = $request->validate([
            'course_id'      => 'required',
            'classroom_id'   => 'required',
            'student_id'     => 'required',
            'payment'        => 'required',
            'date'           => 'required',
        ]);

        $data = $request->all();
        $data += ["teacher_id" => $teacher->id];
        $data += ["price" => $course->price];

        Payment::create($data);

        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('payments');
    }

    public function update(Request $request)
    {
        $teacher = Teacher::where("user_id", Auth::user()->id)->first();
        $payment = Payment::where('id', $request->input("id"))->first();
        $validation = $request->validate([
            'course_id'      => 'required',
            'classroom_id'   => 'required',
            'student_id'     => 'required',
            'payment'        => 'required',
            'date'           => 'required',
        ]);


        $data = $request->all();


        $payment->update($data);


        $request->session()->flash('message', 'Saved successfully!');

        return Redirect::route('payments-edit', $payment->uuid);
    }


    public function duplicate(Request $request)
    {
        $payment = Payment::find($request->id);
        $newpayment = $payment->replicate();
        $newpayment["status"] = 0;
        $newpayment->save();

        return Redirect::route('payments');
    }



}
