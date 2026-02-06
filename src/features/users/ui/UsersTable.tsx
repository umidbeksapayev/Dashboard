import { memo, useMemo } from "react";
import type { User } from "@/entities/user/types";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

type Props = {
  users: User[];
  onOpenUser: (id: number) => void;
};

function UsersTableComponent({ users, onOpenUser }: Props): JSX.Element {
  const columns = useMemo(() => ["Name", "Email", "Phone", "Role", "Action"], []);

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Badge>{user.role ?? "user"}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => onOpenUser(user.id)}>
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const UsersTable = memo(UsersTableComponent);
