<?php

namespace App\Http\Controllers;

use App\Models\Following;
use Illuminate\Http\Request;

class FollowingController extends Controller
{
    public function follow(Request $request){
        $following = new Following();

        $following->follower_id = $request->follower_id;
        $following->following_id = $request->following_id;
        $following->save();
        return response(['success'=>true]);
    }

    public function unfollow(Request $request){
       $following = Following::where('following_id', $request->following_id)->where("follower_id", $request->follower_id)->first();

       $following->delete();
        
        return response(['success'=>true]);
    }
}
