import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { AuthPage } from "@/pages/AuthPage";
import { OverviewPage } from "@/pages/OverviewPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { UsersPage } from "@/pages/UsersPage";
import { useAuthStore } from "@/features/auth/model/authStore";
import { AuthGuard } from "@/shared/providers/AuthGuard";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { ToastList } from "@/shared/ui/toast";
import { DashboardLayout } from "@/widgets/DashboardLayout";

function AppRoutes(): JSX.Element {
  const hydrate = useAuthStore((state) => state.hydrateFromStorage);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export function AppRouter(): JSX.Element {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastList />
      </BrowserRouter>
    </QueryProvider>
  );
}
