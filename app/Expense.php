<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'cost', 'quantity', 'description', 'date',
    ];

    /**
     * Default attributes.
     *
     * @var array
     */
    protected $attributes = [
        'user_id' => 1,
        'description' => '',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
