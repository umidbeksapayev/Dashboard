import { Card } from "@/shared/ui/card";

const metrics = [
  { label: "Revenue", value: "$12,430" },
  { label: "Active Users", value: "1,204" },
  { label: "Conversion", value: "4.2%" }
];

export function OverviewPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((item) => (
          <Card key={item.label}>
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-2xl font-bold">{item.value}</p>
          </Card>
        ))}
      </div>
      <Card>
        <h2 className="mb-2 text-lg font-semibold">Traffic trend</h2>
        <div className="h-40 rounded-md bg-gradient-to-r from-slate-100 to-slate-200" />
      </Card>
    </div>
  );
}
