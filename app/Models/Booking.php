<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Str;

class Booking extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher_id',
        'course_id',
        'classroom_id',
        'student_id',
        'uuid',
        'observation',
        'status',
    ];

    public function teacher()
    {
        return $this->hasOne('App\Models\Teacher', 'id', 'teacher_id');
    }

    public function course()
    {
        return $this->hasOne('App\Models\Course', 'id', 'course_id');
    }


    public function classroom()
    {
        return $this->hasOne('App\Models\Classroom', 'id', 'classroom_id');
    }

    public function student()
    {
        return $this->hasOne('App\Models\Student', 'id', 'student_id');
    }
}
