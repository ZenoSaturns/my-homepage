"use client";

import Link from "next/link";
import { OrderCard } from "@/components/OrderCard";
import { useStore } from "@/lib/store";

export default function FamilyHomePage() {
  const { currentUser, orders, getUser } = useStore();
  if (!currentUser) return null;

  const mine = orders
    .filter((o) => o.familyId === currentUser.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="animate-fade-up">
      <p className="mb-4 text-stone-700">
        你好，<span className="font-semibold text-stone-900">{currentUser.name}</span>
      </p>

      <Link
        href="/family/new"
        className="mb-6 flex w-full items-center justify-center rounded-2xl bg-brand px-4 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand-soft"
      >
        发布新需求
      </Link>

      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-base font-semibold text-stone-900">我的需求</h2>
        <span className="text-xs text-stone-500">{mine.length} 单</span>
      </div>

      {mine.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white/50 px-4 py-8 text-center text-sm text-stone-500">
          还没有需求，点上方按钮发布第一单。
        </p>
      ) : (
        <ul className="space-y-3">
          {mine.map((order) => (
            <li key={order.id}>
              <OrderCard
                order={order}
                href={`/family/orders/${order.id}`}
                companion={
                  order.companionId ? getUser(order.companionId) : undefined
                }
                showCompanion={Boolean(order.companionId)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
