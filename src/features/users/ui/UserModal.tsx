import { useUserQuery } from "@/features/users/hooks/useUserQuery";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";

type Props = {
  userId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UserModal({ userId, open, onOpenChange }: Props): JSX.Element {
  const { data, isLoading, isError } = useUserQuery(userId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <h3 className="mb-3 text-lg font-semibold">User details</h3>
        {isLoading && <Skeleton className="h-24 w-full" />}
        {isError && <p className="text-sm text-destructive">Failed to load user</p>}
        {data && (
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Name:</span> {data.firstName} {data.lastName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {data.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {data.phone}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
