import { AppHeader } from "./AppHeader";
import { BottomNav } from "./BottomNav";
import type { Role } from "@/lib/types";

export function RoleShell({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const homeHref = role === "family" ? "/family" : "/companion";
  const profileHref = `${homeHref}/profile`;

  return (
    <div className="relative mx-auto min-h-dvh max-w-lg px-5 pb-24 pt-6">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-10 top-40 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />
      </div>
      <AppHeader role={role} homeHref={homeHref} />
      {children}
      <BottomNav homeHref={homeHref} profileHref={profileHref} />
    </div>
  );
}
