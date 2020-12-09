<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classroom extends Model
{
    use HasFactory;
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher_id',
        'course_id',
        'uuid',
        'title',
        'description',
        'video',
        'download',
        'meet',
        'status',
    ];

    public function teacher()
    {
        return $this->hasOne('App\Models\Teacher');
    }
    public function courses()
    {
        return $this->hasOne('App\Models\Course');
    }

    public function course()
    {
        return $this->belongsTo('App\Models\Course');
    }

    public function students()
    {
        return $this->belongsToMany('App\Models\Student');
    }

    public function materials()
    {
        return $this->belongsToMany('App\Models\Material');
    }

    public function exams()
    {
        return $this->belongsToMany('App\Models\Exam');
    }
}
