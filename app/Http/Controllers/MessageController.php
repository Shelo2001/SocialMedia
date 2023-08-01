<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MessageController extends Controller
{
   
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

            return response()->json(["success"=>true]);
    }
}
