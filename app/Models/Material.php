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
        'classroom_id',
        'uuid',
        'title',
        'description',
        'link',
        'status',
    ];

    public function classroom()
    {
        return $this->belongsTo('App\Models\Classroom');
    }
}
