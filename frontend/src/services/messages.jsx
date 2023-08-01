import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useMessages = create(
    devtools((set) => ({
        loading: false,
        sendMessage: async (data) => {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/sendmessage`,
                data
            );
        },
    }))
);
