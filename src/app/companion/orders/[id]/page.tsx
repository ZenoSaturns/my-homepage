"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore } from "@/lib/store";

export default function CompanionOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const {
    getOrder,
    getUser,
    currentUser,
    acceptOrder,
    startService,
    completeOrder,
  } = useStore();
  const order = getOrder(params.id);
  const family = order ? getUser(order.familyId) : undefined;

  if (!order || !currentUser) {
    return (
      <div>
        <Link href="/companion" className="text-sm text-stone-500">
          ← 返回列表
        </Link>
        <p className="mt-6 text-sm text-stone-500">未找到该订单。</p>
      </div>
    );
  }

  const isMine = order.companionId === currentUser.id;
  const canAccept = order.status === "pending";
  const canStart = isMine && order.status === "accepted";
  const canComplete = isMine && order.status === "in_progress";

  return (
    <div className="animate-fade-up">
      <Link
        href="/companion"
        className="mb-4 inline-flex text-sm text-stone-500 hover:text-brand"
      >
        ← 返回列表
      </Link>

      <article className="rounded-2xl border border-stone-200/80 bg-white/85 p-5 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="text-sm font-medium text-brand">
            {order.serviceType}
          </span>
          <StatusBadge status={order.status} />
        </div>
        <h2 className="text-xl font-semibold text-stone-900">{order.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {order.description}
        </p>
        <dl className="mt-5 space-y-2 text-sm">
          <Row label="地址" value={order.address} />
          <Row label="时间" value={order.timeLabel} />
          <Row label="报酬" value={`¥${order.price}`} />
        </dl>
      </article>

      {family ? (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white/80 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
            {family.avatarChar}
          </div>
          <div>
            <p className="font-semibold text-stone-900">{family.name}</p>
            <p className="text-xs text-stone-500">{family.bio}</p>
            <p className="text-xs text-stone-500">电话 {family.phone}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-5 space-y-3">
        {canAccept ? (
          <button
            type="button"
            onClick={() => acceptOrder(order.id)}
            className="w-full rounded-2xl bg-brand py-3.5 text-base font-semibold text-white hover:bg-brand-soft"
          >
            立即接单
          </button>
        ) : null}
        {canStart ? (
          <button
            type="button"
            onClick={() => startService(order.id)}
            className="w-full rounded-2xl bg-brand py-3.5 text-base font-semibold text-white hover:bg-brand-soft"
          >
            开始服务
          </button>
        ) : null}
        {canComplete ? (
          <button
            type="button"
            onClick={() => completeOrder(order.id)}
            className="w-full rounded-2xl bg-brand py-3.5 text-base font-semibold text-white hover:bg-brand-soft"
          >
            完成服务
          </button>
        ) : null}
        {isMine && (order.status === "completed" || order.status === "reviewed") ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            本单已完成
            {order.status === "reviewed" && order.rating
              ? `，家属评价 ${order.rating} 星`
              : "，等待家属评价"}
            。
          </p>
        ) : null}
        {!canAccept && !isMine && order.status !== "pending" ? (
          <p className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-600">
            此单已被其他陪伴者接走。
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-14 shrink-0 text-stone-500">{label}</dt>
      <dd className="text-stone-800">{value}</dd>
    </div>
  );
}
