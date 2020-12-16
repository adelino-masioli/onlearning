<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class LandingPage extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher_id',
        'template_id',
        'uuid',
        'title',
        'tags',
        'description',
        'slug',
        'hero',
        'cover',
        'video',
        'default',
        'status',
    ];

    public function teacher()
    {
        return $this->hasOne('App\Models\Teacher', 'id', 'teacher_id');
    }
    public function layout()
    {
        return $this->hasOne('App\Models\LandingPageLayout');
    }
}
