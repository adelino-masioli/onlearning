<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Lesson extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_id',
        'uuid',
        'title',
        'description',
        'video',
        'download',
        'status',
    ];

    public function course()
    {
        return $this->belongsTo('App\Models\Course');
    }
}
