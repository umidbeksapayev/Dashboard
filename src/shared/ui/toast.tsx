import { useEffect } from "react";
import { create } from "zustand";

type Toast = { id: number; message: string };

type ToastStore = {
  toasts: Toast[];
  show: (message: string) => void;
  remove: (id: number) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  show: (message) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message }]
    })),
  remove: (id) => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) }))
}));

function ToastItem({ id, message }: Toast): JSX.Element {
  const remove = useToastStore((state) => state.remove);

  useEffect(() => {
    const timeout = window.setTimeout(() => remove(id), 2200);
    return () => window.clearTimeout(timeout);
  }, [id, remove]);

  return <div className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground shadow">{message}</div>;
}

export function ToastList(): JSX.Element {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed right-4 top-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
}
