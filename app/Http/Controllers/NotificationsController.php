<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notifications;

class NotificationsController extends Controller
{
    /**
 * @OA\Get(
 *     path="/api/notifications/{userId}",
 *     summary="Get notifications",
 *     tags={"Notifications"},
 *     @OA\Parameter(
 *         name="userId",
 *         in="path",
 *         description="User ID",
 *         required=true,
 *         @OA\Schema(type="integer", example="1")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Notifications retrieved successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="notifications", type="array", @OA\Items(type="object")),
 *         ),
 *     ),
 * )
 */
    public function getNotifications($userId){
        $notifications = Notifications::where('user_id', $userId)->get();
        return response(["notifications" => $notifications],200);
    }

    /**
 * @OA\Post(
 *     path="/api/notifications/{notificationsId}/seen",
 *     summary="Set notifications to seen",
 *     tags={"Notifications"},
 *     @OA\Parameter(
 *         name="notificationsId",
 *         in="path",
 *         description="Notifications ID",
 *         required=true,
 *         @OA\Schema(type="integer", example="1")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Notifications updated successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="success", type="boolean", example=true),
 *         ),
 *     ),
 * )
 */
    public function setNotificationsToSeen($notificationsId){
        $notification=Notifications::where('id', $notificationsId)->first();
        $notification->update(['is_seen' => true]);
        return response(["success" => true],200);
    }

    /**
 * @OA\Post(
 *     path="/api/notifications/delete",
 *     summary="Delete notifications",
 *     tags={"Notifications"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="notifications", type="array", @OA\Items(type="object")),
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Notifications deleted successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="success", type="boolean", example=true),
 *         ),
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error deleting notifications",
 *         @OA\JsonContent(
 *             @OA\Property(property="success", type="boolean", example=false),
 *             @OA\Property(property="error", type="string", example="Error message"),
 *         ),
 *     ),
 * )
 */
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
