<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class LandingPageLayout extends Model
{
    use \App\Http\Traits\UsesUuid;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'uuid',
        'title',
        'description',
        'thumbnail',
        'status',
    ];
}
