"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { useStore } from "@/lib/store";

export default function FamilyOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { getOrder, getUser, reviewOrder, currentUser } = useStore();
  const order = getOrder(params.id);
  const companion = order?.companionId ? getUser(order.companionId) : undefined;
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [done, setDone] = useState(false);

  if (!order || !currentUser || order.familyId !== currentUser.id) {
    return (
      <div>
        <Link href="/family" className="text-sm text-stone-500">
          ← 返回列表
        </Link>
        <p className="mt-6 text-sm text-stone-500">未找到该订单。</p>
      </div>
    );
  }

  function onReview(e: FormEvent) {
    e.preventDefault();
    reviewOrder(order!.id, rating, review);
    setDone(true);
  }

  return (
    <div className="animate-fade-up">
      <Link
        href="/family"
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
          <Row label="预算" value={`¥${order.price}`} />
          {companion ? <Row label="陪伴者" value={companion.name} /> : null}
          {order.rating ? (
            <Row label="评价" value={`${order.rating} 星 · ${order.review || "无文字"}`} />
          ) : null}
        </dl>
      </article>

      {order.status === "pending" ? (
        <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          已发布，等待年轻人接单。可切换到「陪伴端」演示账号去抢单。
        </p>
      ) : null}

      {order.status === "accepted" || order.status === "in_progress" ? (
        <p className="mt-4 rounded-2xl bg-sky-50 px-4 py-3 text-sm leading-relaxed text-sky-900">
          {order.status === "accepted"
            ? "已有陪伴者接单，等待对方开始服务。"
            : "服务进行中，完成后可回来评价。"}
        </p>
      ) : null}

      {order.status === "completed" && !done ? (
        <form
          onSubmit={onReview}
          className="mt-5 space-y-3 rounded-2xl border border-stone-200 bg-white/80 p-4"
        >
          <h3 className="font-semibold text-stone-900">评价本次服务</h3>
          <label className="block text-sm">
            <span className="mb-1.5 block text-stone-600">评分</span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} 星
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-stone-600">留言</span>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={3}
              placeholder="例如：很耐心，妈妈很开心"
              className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-brand py-3 font-semibold text-white hover:bg-brand-soft"
          >
            提交评价
          </button>
        </form>
      ) : null}

      {order.status === "reviewed" || done ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          已完成评价，感谢使用邻伴。
        </p>
      ) : null}
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
