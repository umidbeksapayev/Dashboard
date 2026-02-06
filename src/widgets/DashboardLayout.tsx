import { Outlet } from "react-router-dom";
import { Sidebar } from "@/widgets/Sidebar";
import { Topbar } from "@/widgets/Topbar";

export function DashboardLayout(): JSX.Element {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
