<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class ClassroomMaterial extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'classroom_id',
        'material_id'
    ];



    public function classroom()
    {
        return $this->belongsTo('App\Models\Classroom');
    }

    public function material()
    {
        return $this->belongsTo('App\Models\Material');
    }

}
