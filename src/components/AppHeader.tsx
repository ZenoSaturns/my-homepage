import Link from "next/link";
import type { Role } from "@/lib/types";

const ROLE_LABEL: Record<Role, string> = {
  family: "家属端",
  companion: "陪伴端",
};

export function AppHeader({ role, homeHref }: { role: Role; homeHref: string }) {
  return (
    <header className="flex items-center justify-between px-1 pb-4 pt-1">
      <Link href={homeHref} className="font-display text-xl font-bold tracking-tight text-stone-900">
        邻伴
      </Link>
      <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
        {ROLE_LABEL[role]}
      </span>
    </header>
  );
}
