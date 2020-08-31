<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class StudentTeacher extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher_id',
        'student_id',
        'status',
    ];

    public function teacher()
    {
        return $this->belongsTo('App\Models\Teacher');
    }

    public function student()
    {
        return $this->belongsTo('App\Models\Student');
    }

}
