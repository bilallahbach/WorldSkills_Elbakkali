<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Anecdote extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'category',
        'content',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
