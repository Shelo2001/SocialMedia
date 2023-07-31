import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useSearch = create(
    devtools((set) => ({
        users: [],
        searchUsers: async (query) => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/users/search?users=${query}`
                );
                set({ users: response.data.users });
            } catch (error) {
                console.error("Error searching users:", error);
            }
        },
    }))
);
