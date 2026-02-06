import { cn } from "@/shared/lib/utils";

export function Skeleton({ className }: { className?: string }): JSX.Element {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}
