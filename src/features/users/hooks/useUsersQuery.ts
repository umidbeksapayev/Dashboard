import { useQuery } from "@tanstack/react-query";
import { getUsers, type UsersParams } from "@/features/users/api/usersApi";

export function useUsersQuery(params: UsersParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    staleTime: 30_000
  });
}
