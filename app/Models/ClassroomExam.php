<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ClassroomExam extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'classroom_id',
        'exam_id'
    ];



    public function classroom()
    {
        return $this->belongsTo('App\Models\Classroom');
    }

    public function exam()
    {
        return $this->belongsTo('App\Models\Exam');
    }

}
