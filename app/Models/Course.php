<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Course extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher_id',
        'uuid',
        'title',
        'price',
        'weeks',
        'hours',
        'timetable',
        'age',
        'size',
        'description',
        'level',
        'cover',
        'show',
        'status',
    ];

    public function teacher()
    {
        return $this->hasOne('App\Models\Teacher');
    }
    public function classrooms()
    {
        return $this->hasMany('App\Models\Classroom');
    }

    public function students()
    {
        return $this->belongsToMany('App\Models\Student');
    }
}
