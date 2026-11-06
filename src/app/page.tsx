"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import type { User } from "@/lib/types";

export default function HomePage() {
  const { ready, users, currentUser, login, resetDemo } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!ready || !currentUser) return;
    router.replace(currentUser.role === "family" ? "/family" : "/companion");
  }, [ready, currentUser, router]);

  const families = users.filter((u) => u.role === "family");
  const companions = users.filter((u) => u.role === "companion");

  function enter(user: User) {
    login(user.id);
    router.push(user.role === "family" ? "/family" : "/companion");
  }

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-sm text-stone-500">
        加载中…
      </div>
    );
  }

  return (
    <main className="relative mx-auto min-h-dvh max-w-lg overflow-hidden px-5 pb-10 pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute -right-16 top-48 h-56 w-56 rounded-full bg-amber-200/50 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231f4d3a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <section className="animate-fade-up mb-8">
        <p className="mb-3 text-sm font-medium tracking-wide text-brand">
          上门陪伴 · 演示版
        </p>
        <h1 className="font-display text-5xl font-bold tracking-tight text-stone-900">
          邻伴
        </h1>
        <p className="mt-3 text-lg font-medium text-stone-800">
          年轻人上门，陪老人过好每一天
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
          像打车一样发单：购物、做饭、打扫、教手机、就医陪护。不是养老院，是邻里般的陪伴。
        </p>
      </section>

      <section className="animate-fade-up-delay space-y-6">
        <AccountGroup
          title="家属 / 老人 · 发单"
          users={families}
          onEnter={enter}
        />
        <AccountGroup
          title="年轻人 · 接单"
          users={companions}
          onEnter={enter}
        />
      </section>

      <p className="animate-fade-up-delay-2 mt-10 text-center text-xs text-stone-500">
        演示账号，数据保存在本地浏览器 ·{" "}
        <button
          type="button"
          onClick={() => {
            resetDemo();
          }}
          className="underline underline-offset-2 hover:text-brand"
        >
          重置演示数据
        </button>
      </p>
    </main>
  );
}

function AccountGroup({
  title,
  users,
  onEnter,
}: {
  title: string;
  users: User[];
  onEnter: (user: User) => void;
}) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-stone-700">{title}</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-3 rounded-2xl border border-stone-200/70 bg-white/75 p-3.5 shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              {user.avatarChar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-stone-900">{user.name}</p>
              <p className="truncate text-xs text-stone-500">
                {user.district} · {user.bio}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEnter(user)}
              className="shrink-0 rounded-full bg-brand px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-brand-soft"
            >
              进入
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
