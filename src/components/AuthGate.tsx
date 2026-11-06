"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import type { Role } from "@/lib/types";

export function AuthGate({
  role,
  children,
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { ready, currentUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!currentUser) {
      router.replace("/");
      return;
    }
    if (currentUser.role !== role) {
      router.replace(currentUser.role === "family" ? "/family" : "/companion");
    }
  }, [ready, currentUser, role, router]);

  if (!ready || !currentUser || currentUser.role !== role) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-stone-500">
        加载中…
      </div>
    );
  }

  return <>{children}</>;
}
