<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    /**
 * @OA\Get(
 *     path="/api/users/search?users={username}",
 *     summary="Get user by ID",
 *     tags={"Users"},
 *     @OA\Parameter(
 *         name="username",
 *         in="path",
 *         description="Username",
 *         required=true,
 *         @OA\Schema(type="string", example="john")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User retrieved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="user", type="object"),
 *         ),
 *     ),
 * )
 */
    public function search(Request $request)
    {
        $searchQuery = $request->get('users');

        $users = User::where('fullname', 'like', '%' . $searchQuery . '%')->get();

        return response()->json(['users' => $users]);
    }

    /**
 * @OA\Get(
 *     path="/api/users/{userId}",
 *     summary="Get user by ID",
 *     tags={"Users"},
 *     @OA\Parameter(
 *         name="userId",
 *         in="path",
 *         description="User ID",
 *         required=true,
 *         @OA\Schema(type="integer", example="1")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User retrieved successfully",
 *         @OA\JsonContent(
 *         ),
 *     ),
 * )
 */
    public function getUserById($userId)
    {
        $user = User::where('id',$userId)->with('following.followingUser')->with('followers.followerUser')->first();

        return response()->json(['user' => $user]);
    }
}
