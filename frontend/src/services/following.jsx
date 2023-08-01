import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useFollowing = create(
    devtools((set) => ({
        loading: false,
        follow: async (data) => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/follow`,
                    data
                );
                console.log(response);
            } catch (error) {
                console.error("Error searching users:", error);
            }
        },
        unfollow: async (data) => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/unfollow`,
                    data
                );
                console.log(response);
            } catch (error) {
                console.error("Error searching users:", error);
            }
        },
    }))
);
