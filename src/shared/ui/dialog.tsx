import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

function DialogContent({ className, children, ...props }: DialogPrimitive.DialogContentProps): JSX.Element {
  return (
    <DialogPortal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
      <DialogPrimitive.Content
        className={cn("fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6", className)}
        {...props}
      >
        {children}
        <DialogClose className="absolute right-4 top-4">
          <X className="size-4" />
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export { Dialog, DialogTrigger, DialogContent };
