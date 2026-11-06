"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BottomNavProps {
  homeHref: string;
  profileHref: string;
}

export function BottomNav({ homeHref, profileHref }: BottomNavProps) {
  const pathname = usePathname();
  const homeActive =
    pathname === homeHref ||
    pathname.startsWith(`${homeHref}/orders`) ||
    pathname.startsWith(`${homeHref}/new`);
  const profileActive = pathname === profileHref || pathname.startsWith(profileHref);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200/80 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-6 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        <Link
          href={homeHref}
          className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs ${
            homeActive ? "font-semibold text-brand" : "text-stone-500"
          }`}
        >
          <HomeIcon active={homeActive} />
          首页
        </Link>
        <Link
          href={profileHref}
          className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs ${
            profileActive ? "font-semibold text-brand" : "text-stone-500"
          }`}
        >
          <UserIcon active={profileActive} />
          我的
        </Link>
      </div>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "currentColor" : "#78716c"}
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "currentColor" : "#78716c"}
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.8-3.2 4.2-4.5 7-4.5s5.2 1.3 7 4.5" />
    </svg>
  );
}
