<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class UserStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $id;
    public $is_online;

    public function __construct($id,$is_online)
    {
        $this->id = $id;
        $this->is_online = $is_online;
    }

    public function broadcastOn()
    {
        return ['user-status.' . $this->id];
    }

    public function broadcastAs()
    {
        return 'user.status.updated';
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->id,
            'is_online' => $this->is_online,
        ];
    }
}
