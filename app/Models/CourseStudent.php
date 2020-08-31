<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class CourseStudent extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_id',
        'student_id',
        'status',
    ];

    public function course()
    {
        return $this->belongsTo('App\Models\Course');
    }

    public function student()
    {
        return $this->belongsTo('App\Models\Student');
    }

}
