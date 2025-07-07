import { create } from "zustand";
import { getCurrentUser, signOut } from "../lib/appWrite";

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  setUser: (user) => set({ user }),

  setLoading: (value) => set({ isLoading: value }),

  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      console.log("ddddddddddddddd", user);
      if (user) {
        set({ isAuthenticated: true, user });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error("Auth error:", error.message);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await signOut();
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useAuthStore;
