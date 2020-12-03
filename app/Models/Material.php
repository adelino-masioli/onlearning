<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Material extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'uuid',
        'teacher_id',
        'title',
        'description',
        'link',
        'status',
    ];
    

    public function teacher()
    {
        return $this->hasOne('App\Models\Teacher',  'id', 'teacher_id');
    }
    public function classrooms()
    {
        return $this->belongsToMany('App\Models\Classroom');
    }
    
}
