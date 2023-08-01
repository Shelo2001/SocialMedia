<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notifications;

class NotificationsController extends Controller
{
    public function getNotifications($userId){
        $notifications = Notifications::where('user_id', $userId)->get();
        return response(["notifications" => $notifications],200);
    }
    public function setNotificationsToSeen($notificationsId){
        $notification=Notifications::where('id', $notificationsId)->first();
        $notification->update(['is_seen' => true]);
        return response(["success" => true],200);
    }
    public function deleteNotifications(Request $request){
        $notifications = $request->request;
        try {
            collect($notifications)->each(function ($notification) {
                Notifications::where('id',$notification['id'])->delete();
            });

            return response(["success" => true], 200);
        } catch (Exception $e) {
            return response(["success" => false, "error" => $e->getMessage()], 500);
        }
    }
}
