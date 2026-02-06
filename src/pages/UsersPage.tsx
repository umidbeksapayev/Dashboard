import { useCallback, useState } from "react";
import { useUsersQuery } from "@/features/users/hooks/useUsersQuery";
import { UserModal } from "@/features/users/ui/UserModal";
import { UsersTable } from "@/features/users/ui/UsersTable";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";

export function UsersPage(): JSX.Element {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"firstName" | "email">("firstName");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const debouncedQuery = useDebounce(query, 400);
  const { data, isLoading, isError } = useUsersQuery({ page, limit: 10, q: debouncedQuery, sort });

  const handleOpenUser = useCallback((id: number) => {
    setSelectedUserId(id);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <div className="flex flex-col gap-2 md:flex-row">
        <Input placeholder="Search user..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="h-10 rounded-md border px-3" value={sort} onChange={(event) => setSort(event.target.value as "firstName" | "email")}>
          <option value="firstName">Sort by name</option>
          <option value="email">Sort by email</option>
        </select>
      </div>

      {isLoading && <Skeleton className="h-64 w-full" />}
      {isError && <p className="text-sm text-destructive">Failed to fetch users</p>}
      {data && <UsersTable users={data.users} onOpenUser={handleOpenUser} />}

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
          Previous
        </Button>
        <span className="text-sm">Page {page}</span>
        <Button variant="outline" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>

      <UserModal userId={selectedUserId} open={selectedUserId !== null} onOpenChange={(open) => !open && setSelectedUserId(null)} />
    </div>
  );
}
