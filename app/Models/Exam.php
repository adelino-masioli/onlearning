<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Exam extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'lesson_id',
        'uuid',
        'title',
        'description',
        'average',
        'status',
    ];

    public function lesson()
    {
        return $this->belongsTo('App\Models\Lesson');
    }
    public function question()
    {
        return $this->hasMany('App\Models\ExamQuestion');
    }
}
