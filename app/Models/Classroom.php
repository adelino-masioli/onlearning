<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Classroom extends Model
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
        'uuid',
        'title',
        'description',
        'video',
        'download',
        'status',
    ];

    public function teacher()
    {
        return $this->hasOne('App\Models\Teacher');
    }

    public function course()
    {
        return $this->belongsTo('App\Models\Course');
    }

    public function material()
    {
        return $this->hasMany('App\Models\Material');
    }

    public function exame()
    {
        return $this->hasMany('App\Models\Exame');
    }

    public function students()
    {
        return $this->belongsToMany('App\Models\Student');
    }
}
