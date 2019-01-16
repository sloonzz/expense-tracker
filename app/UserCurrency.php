<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCurrency extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Default attributes.
     *
     * @var array
     */
    protected $attributes = [
        'name' => 'units',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
