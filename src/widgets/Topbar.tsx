import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

export function Topbar(): JSX.Element {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-3">
      <p className="text-sm text-muted-foreground">Welcome back</p>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md border px-3 py-2 text-sm">
          {user?.firstName ?? "User"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer rounded px-2 py-1 text-sm outline-none hover:bg-muted" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
