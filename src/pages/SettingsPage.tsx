import { ProfileForm } from "@/features/settings/ui/ProfileForm";

export function SettingsPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <ProfileForm />
    </div>
  );
}
