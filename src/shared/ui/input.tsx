import * as React from "react";
import { cn } from "@/shared/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return <input className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", className)} ref={ref} {...props} />;
});
Input.displayName = "Input";

export { Input };
