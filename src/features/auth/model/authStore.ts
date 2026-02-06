import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/entities/user/types";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  isAuth: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  hydrateFromStorage: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuth: false,
      login: (token, user) => set({ token, user, isAuth: true }),
      logout: () => set({ token: null, user: null, isAuth: false }),
      hydrateFromStorage: () => {
        const state = get();
        if (state.token && state.user) {
          set({ isAuth: true });
        }
      }
    }),
    {
      name: "auth-storage"
    }
  )
);
