"use client";

import { OrderCard } from "@/components/OrderCard";
import { useStore } from "@/lib/store";

export default function CompanionHomePage() {
  const { currentUser, orders, getUser } = useStore();
  if (!currentUser) return null;

  const pending = orders.filter((o) => o.status === "pending");
  const mine = orders
    .filter((o) => o.companionId === currentUser.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="animate-fade-up space-y-8">
      <div>
        <p className="mb-1 text-stone-700">
          你好，
          <span className="font-semibold text-stone-900">{currentUser.name}</span>
        </p>
        <h2 className="text-lg font-semibold text-stone-900">可接订单</h2>
        <p className="mt-1 text-sm text-stone-500">
          抢单后上门陪伴，完成后等待家属评价。
        </p>
        <p className="mt-3 text-xs font-medium text-brand">
          附近待接单 · {pending.length}
        </p>
      </div>

      {pending.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-stone-300 bg-white/50 px-4 py-8 text-center text-sm text-stone-500">
          暂时没有可接订单。可切到家属端发布一单再回来。
        </p>
      ) : (
        <ul className="space-y-3">
          {pending.map((order) => (
            <li key={order.id}>
              <OrderCard
                order={order}
                href={`/companion/orders/${order.id}`}
                issuer={getUser(order.familyId)}
                showIssuer
              />
            </li>
          ))}
        </ul>
      )}

      <section>
        <h3 className="mb-3 text-base font-semibold text-stone-900">我的接单</h3>
        {mine.length === 0 ? (
          <p className="text-sm text-stone-500">还没有接过单。</p>
        ) : (
          <ul className="space-y-3">
            {mine.map((order) => (
              <li key={order.id}>
                <OrderCard
                  order={order}
                  href={`/companion/orders/${order.id}`}
                  issuer={getUser(order.familyId)}
                  showIssuer
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
