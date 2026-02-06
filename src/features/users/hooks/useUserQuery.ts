import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/features/users/api/usersApi";

export function useUserQuery(userId: number | null) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId as number),
    enabled: userId !== null,
    staleTime: 30_000
  });
}
