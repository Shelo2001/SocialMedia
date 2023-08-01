<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
   
    public function sendMessage(Request $request)
    {
            $data = $request->validate([
                'sender_id' => 'required|integer',
                'recipient_id' => 'required|integer',
                'message' => 'required|string',
            ]);
    
            $channel = 'chat' . min($request->sender_id, $request->recipient_id)  . max($request->sender_id, $request->recipient_id);
            event(new MessageEvent($request->message, $channel));

            return response()->json(["success"=>true]);
    }
}
