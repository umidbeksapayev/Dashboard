import { useState } from "react";
import { useAuthStore } from "@/features/auth/model/authStore";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { useToastStore } from "@/shared/ui/toast";

export function ProfileForm(): JSX.Element {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const showToast = useToastStore((state) => state.show);

  const [name, setName] = useState(user ? `${user.firstName} ${user.lastName}` : "");
  const [email, setEmail] = useState(user?.email ?? "");

  const onSave = (): void => {
    if (!user || !token) return;
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ") || "Updated";
    login(token, { ...user, firstName, lastName, email });
    showToast("Profile updated");
  };

  return (
    <Card className="max-w-lg space-y-4">
      <h2 className="text-lg font-semibold">Profile settings</h2>
      <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" />
      <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
      <Button onClick={onSave}>Save changes</Button>
    </Card>
  );
}
