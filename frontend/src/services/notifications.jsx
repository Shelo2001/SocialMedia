import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useNotifications = create(
    devtools((set) => ({
        setNotificationsToSeen: async (id) => {
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/notifications/${id}/seen`
            );
            console.log(data);
        },
        deleteNotifications: async (notifications) => {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/notifications/delete`,
                notifications
            );
            console.log(data);
        },
    }))
);
