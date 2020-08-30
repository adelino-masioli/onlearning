<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ExamQuestionAnswer extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'exam_question_id',
        'uuid',
        'answer',
        'is_correct',
        'status',
    ];

    public function question()
    {
        return $this->belongsTo('App\Models\ExamQuestion');
    }

}
