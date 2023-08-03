<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationsEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user_id;
    public $username;
    public $action;
    public $action_user_id;

    public function __construct($user_id,$username,$action,$action_user_id)
    {
        $this->user_id = $user_id;
        $this->username = $username;
        $this->action = $action;
        $this->action_user_id = $action_user_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return ['useractions.'.$this->user_id];
    }

    public function broadcastAs()
    {
        return 'new-action';
    }
}