import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useSearch = create(
    devtools((set) => ({
        users: [],
        userProfile: {},
        loading: false,
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
        getUserById: async (id) => {
            try {
                set({ loading: true });
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/${id}`
                );
                set({ userProfile: response.data.user, loading: false });
            } catch (error) {
                console.error("Error searching users:", error);
            }
        },
    }))
);
