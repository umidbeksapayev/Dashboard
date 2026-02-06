import * as React from "react";
import { cn } from "@/shared/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn("inline-flex rounded-full bg-secondary px-2 py-1 text-xs font-medium", className)} {...props} />;
}
