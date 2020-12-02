<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ClassroomStudent extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'classroom_id',
        'student_id',
        'status'
    ];



    public function classroom()
    {
        return $this->belongsTo('App\Models\Classroom');
    }

    public function student()
    {
        return $this->belongsTo('App\Models\Student');
    }

}
