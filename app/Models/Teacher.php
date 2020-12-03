<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Teacher extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'instagram',
        'facebook',
        'youtube',
        'linkedin',
        'description',
        'degree',
        'qualification',
        'seo',
        'avatar',
    ];


    public function user()
    {
        return $this->hasOne('App\User');
    }

    public function students()
    {
        return $this->belongsToMany('App\Models\Student');
    }

    public function materials()
    {
        return $this->hasMany('App\Models\Material');
    }
    public function exams()
    {
        return $this->hasMany('App\Models\Exam');
    }
}
