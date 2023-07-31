<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Following extends Model
{
    use HasFactory;

    public function followerUser()
    {
        return $this->belongsTo(User::class, 'follower_id', 'id');
    }

    public function followingUser()
    {
        return $this->belongsTo(User::class, 'following_id', 'id');
    }
}
