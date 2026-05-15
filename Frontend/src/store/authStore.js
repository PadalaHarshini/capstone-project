import { create } from "zustand";
import api from "../services/api";

const storedUser = localStorage.getItem("user");

const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem("token"),
  loading: false,
  login: async (payload) => {
    set({ loading: true });
    const response = await api.post("/auth/login", payload);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, loading: false });

    return user;
  },
  register: async (payload) => {
    set({ loading: true });
    const response = await api.post("/auth/register", payload);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, loading: false });

    return user;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, loading: false });
  },
  stopLoading: () => set({ loading: false })
}));

export default useAuthStore;
