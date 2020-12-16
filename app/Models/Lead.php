<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Lead extends Model
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
        'student_id',
        'uuid',
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
    public function student()
    {
        return $this->hasOne('App\Models\Student', 'id', 'student_id');
    }
}
