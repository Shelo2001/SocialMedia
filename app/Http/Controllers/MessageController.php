<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\MessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MessageController extends Controller
{
   
/**
 * @OA\Post(
 *     path="/api/sendmessage",
 *     summary="Send a message",
 *     tags={"Messages"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="sender_id", type="integer", example="1"),
 *             @OA\Property(property="recipient_id", type="integer", example="2"),
 *             @OA\Property(property="message", type="string", example="Hello, how are you?"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Message sent successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="success", type="boolean", example=true),
 *         ),
 *     ),
 * )
 */
    public function sendMessage(Request $request)
    {
            $data = $request->validate([
                'sender_id' => 'required|integer',
                'recipient_id' => 'required|integer',
                'message' => 'required|string',
            ]);
    
            $timestamp = Carbon::now()->toIso8601String();

            $channel = 'chat' . min($request->sender_id, $request->recipient_id)  . max($request->sender_id, $request->recipient_id);
            event(new MessageEvent($request->message, $channel, $request->sender_id, $request->recipient_id,$timestamp));

            $message=new Message();

            $message->sender_id=$request->sender_id;
            $message->recipient_id=$request->recipient_id;
            $message->message=$request->message;
            $message->save();

            return response()->json(["success"=>true]);
    }

/**
 * @OA\Post(
 *     path="/api/getmessages",
 *     summary="Get messages",
 *     tags={"Messages"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="sender_id", type="integer", example="1"),
 *             @OA\Property(property="recipient_id", type="integer", example="2"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Messages retrieved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="messages", type="array", @OA\Items(type="object")),
 *         ),
 *     ),
 * )
 */    
    public function getMessages(Request $request)
    {
            $sender_id = $request->sender_id;
            $recipient_id = $request->recipient_id;

            $messages = Message::where(function ($query) use ($sender_id, $recipient_id) {
                $query->where('sender_id', $sender_id)
                    ->where('recipient_id', $recipient_id);
            })
            ->orWhere(function ($query) use ($sender_id, $recipient_id) {
                $query->where('sender_id', $recipient_id)
                    ->where('recipient_id', $sender_id);
            })
            ->get();
            return response()->json(["messages"=>$messages]);
    }
}
