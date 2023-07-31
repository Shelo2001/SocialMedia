<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function search(Request $request)
    {
        $searchQuery = $request->get('users');

        $users = User::where('fullname', 'like', '%' . $searchQuery . '%')->get();

        return response()->json(['users' => $users]);
    }
}
