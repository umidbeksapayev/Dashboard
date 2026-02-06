import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/model/authStore";

export function AuthGuard(): JSX.Element {
  const isAuth = useAuthStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
