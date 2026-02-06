import { useAuthStore } from "@/features/auth/model/authStore";

export function useAuth() {
  return useAuthStore((state) => ({
    token: state.token,
    user: state.user,
    isAuth: state.isAuth,
    logout: state.logout
  }));
}
