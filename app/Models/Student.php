<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    use HasFactory;
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'uuid',
        'name',
        'email',
        'phone',
        'instagram',
        'facebook',
        'youtube',
        'linkedin',
        'country',
        'state',
        'city',
        'level',
        'about',
        'status',
    ];


    public function user()
    {
        return $this->hasOne('App\User');
    }

    public function teachers()
    {
        return $this->belongsToMany('App\Models\Teacher');
    }
    public function courses()
    {
        return $this->belongsToMany('App\Models\Course');
    }
    public function classrooms()
    {
        return $this->belongsToMany('App\Models\Classroom');
    }
}
