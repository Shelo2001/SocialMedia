<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Following extends Model
{
    use HasFactory;

    public function followers()
    {
        return $this->belongsTo(User::class);
    }
}
