<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Student extends Model
{
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
}
