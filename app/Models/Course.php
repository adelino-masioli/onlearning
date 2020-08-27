<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Course extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher_id',
        'uuid',
        'title',
        'description',
        'level',
        'cover',
        'status',
    ];

    public function teacher()
    {
        return $this->hasOne('App\Teacher');
    }
}
