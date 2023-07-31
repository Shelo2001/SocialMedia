import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useAuth = create(
    devtools((set) => ({
        user: {},
        token: null,
        success: false,
        loading: false,
        errorAuth: null,
        login: async (data) => {
            try {
                set({ loading: true });
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/login`,
                    data
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                set({
                    user: await res.data.user,
                    token: await res.data.token,
                    success: true,
                });
            } catch (error) {
                set({
                    loading: false,
                    errorAuth:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorAuth: null,
                    });
                }, 3000);
            }
        },
        register: async (data) => {
            try {
                set({ loading: true });
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/register`,
                    data
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                set({
                    success: true,
                    user: await res.data.user,
                    token: await res.data.token,
                });
            } catch (error) {
                set({
                    loading: false,
                    errorAuth:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorAuth: null,
                    });
                }, 3000);
            }
        },
        logout: async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
        },
    }))
);
