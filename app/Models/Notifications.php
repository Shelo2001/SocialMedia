<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    use HasFactory;

    protected $fillable=[
        "action",
        "user_id",
        "username",
        "action_user_id",
        "is_seen",
    ];
}
