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

    public function material()
    {
        return $this->hasMany('App\Models\Material');
    }

    public function exame()
    {
        return $this->hasMany('App\Models\Exame');
    }

    public function course()
    {
        return $this->belongsTo('App\Models\Course');
    }
}
