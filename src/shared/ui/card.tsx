import * as React from "react";
import { cn } from "@/shared/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return <div className={cn("rounded-lg border bg-white p-5 shadow-sm", className)} {...props} />;
}
