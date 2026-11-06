import { AuthGate } from "@/components/AuthGate";
import { RoleShell } from "@/components/RoleShell";

export default function CompanionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate role="companion">
      <RoleShell role="companion">{children}</RoleShell>
    </AuthGate>
  );
}
