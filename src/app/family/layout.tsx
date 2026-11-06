import { AuthGate } from "@/components/AuthGate";
import { RoleShell } from "@/components/RoleShell";

export default function FamilyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate role="family">
      <RoleShell role="family">{children}</RoleShell>
    </AuthGate>
  );
}
