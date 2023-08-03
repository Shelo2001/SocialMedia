<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use App\Events\UserStatusUpdated;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
/**
 * @OA\Post(
 *     path="/api/register",
 *     summary="User Registration",
 *     tags={"Authentication"}, 
 *     @OA\RequestBody(
 *         description="User registration data",
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="fullname", type="string", example="John Doe"),
 *             @OA\Property(property="email", type="string", example="john@example.com"),
 *             @OA\Property(property="password", type="string", example="123456"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="User successfully registered",
 *         @OA\JsonContent(
 *             @OA\Property(property="token", type="string", example="Generated_token_here"),
 *             
 *         ),
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Validation error",
 *     ),
 * )
 */
    public function register(Request $request){
        $attr = $request->validate([
            'fullname' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'fullname' => $attr['fullname'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);
        $user->is_online=true;
        $user->save();

        event(new UserStatusUpdated($user->id,"Online"));

        $token = $user->createToken('Tokens')->plainTextToken;
        return response([
            "token"=>$token,
            "user"=>$user
        ],201);
    }

/**
 * @OA\Post(
 *     path="/api/login",
 *     summary="User Login",
 *     tags={"Authentication"}, 
 *     @OA\RequestBody(
 *         description="User login data",
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="email", type="string", example="john@example.com"),
 *             @OA\Property(property="password", type="string", example="123456"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User logged in successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="token", type="string", example="Generated_token_here"),
 *         ),
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthorized",
 *     ),
 * )
 */
    public function login(Request $request){
        $attr = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'error' => 'Credentials not match',
            ], 401);
        }

        $user = Auth::user();
        $user->is_online=true;
        $user->save();

        event(new UserStatusUpdated($user->id,"Online"));

        return response([
            'token' => auth()->user()->createToken('Tokens')->plainTextToken,
            'user' => auth()->user()
        ], 200);
    }

/**
     * @OA\Get(
     *     path="/api/logout",
     *     summary="User Logout",
     *     tags={"Authentication"}, 
     *     @OA\Response(
     *         response=200,
     *         description="User logged out successfully",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function logout(Request $request){
        auth()->user()->currentAccessToken()->delete();
        $user=auth()->user();
        $user->is_online=false;
        $user->save();

        event(new UserStatusUpdated($user->id,"Offline"));

        return response(["message"=>"Successfully logged out"],200);
    }
}