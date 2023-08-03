<?php

namespace App\Http\Controllers;

use App\Models\Following;
use Illuminate\Http\Request;
use App\Models\Notifications;
use App\Events\NotificationsEvent;

class FollowingController extends Controller
{

    /**
     * @OA\Post(
     *     path="/api/follow",
     *     summary="Follow a user",
     *     tags={"Following"}, 
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="follower_id", type="integer", example="1"),
     *             @OA\Property(property="following_id", type="integer", example="2"),
     *             @OA\Property(property="username", type="string", example="john_doe"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully followed the user",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *         ),
     *     ),
     * )
     */
    public function follow(Request $request){
        $following = new Following();
        $following->follower_id = $request->follower_id;
        $following->following_id = $request->following_id;
        $following->save();
        
        event(new NotificationsEvent($following->following_id,$request->username,"started following",$following->follower_id));
        $notification = new Notifications();
        $notification->action = "started following";
        $notification->user_id = $request->following_id;
        $notification->action_user_id = $request->follower_id;
        $notification->username = $request->username;
        $notification->save();
        
        
        return response(['success'=>true]);
    }

    /**
     * @OA\Post(
     *     path="/api/unfollow",
     *     summary="Unfollow a user",
     *     tags={"Following"}, 
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="follower_id", type="integer", example="1"),
     *             @OA\Property(property="following_id", type="integer", example="2"),
     *             @OA\Property(property="username", type="string", example="john_doe"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully unfollowed the user",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *         ),
     *     ),
     * )
     */
    public function unfollow(Request $request){
       $following = Following::where('following_id', $request->following_id)->where("follower_id", $request->follower_id)->first();
       $following->delete();
       $notification= Notifications::where('user_id',$following->following_id)->first();
       $notification->delete();
       event(new NotificationsEvent($following->following_id,$request->username,"unfollowed",$following->follower_id));

        
       return response(['success'=>true]);
    }
}
