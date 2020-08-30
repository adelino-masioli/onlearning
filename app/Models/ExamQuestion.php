<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ExamQuestion extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'exam_id',
        'uuid',
        'question',
        'time',
        'status',
    ];

    public function exam()
    {
        return $this->belongsTo('App\Models\Exam');
    }

}
