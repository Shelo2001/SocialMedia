<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $message;
    public $channel;
    public $sender_id;
    public $recipient_id;
    public $created_at;

    public function __construct($message,$channel,$sender_id,$recipient_id,$created_at)
    {
        $this->message = $message;
        $this->channel = $channel;
        $this->sender_id = $sender_id;
        $this->recipient_id = $recipient_id;
        $this->created_at = $created_at;
    }
  
    public function broadcastOn()
    {
        return [$this->channel];
    }
  
    public function broadcastAs()
    {
        return 'sendmessage';
    }

    public function broadcastWith()
    {
        return [
            'message' => $this->message,
            'sender_id' => $this->sender_id,
            'recipient_id' => $this->recipient_id,
            'created_at' => $this->created_at,
        ];
    }
}
