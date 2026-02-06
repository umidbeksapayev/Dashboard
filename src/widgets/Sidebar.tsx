import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

const navItems = [
  { label: "Overview", to: "/" },
  { label: "Users", to: "/users" },
  { label: "Settings", to: "/settings" }
];

export function Sidebar(): JSX.Element {
  return (
    <aside className="w-full border-b bg-white p-4 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
      <h2 className="mb-4 text-lg font-semibold">Mini Dashboard</h2>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn("block rounded-md px-3 py-2 text-sm", isActive && "bg-muted font-medium")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
