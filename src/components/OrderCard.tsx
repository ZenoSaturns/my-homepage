import Link from "next/link";
import type { Order, User } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

interface OrderCardProps {
  order: Order;
  href: string;
  issuer?: User;
  companion?: User;
  showIssuer?: boolean;
  showCompanion?: boolean;
}

export function OrderCard({
  order,
  href,
  issuer,
  companion,
  showIssuer,
  showCompanion,
}: OrderCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-stone-200/80 bg-white/80 p-4 shadow-sm transition hover:border-brand/30 hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-brand">{order.serviceType}</span>
        <StatusBadge status={order.status} />
      </div>
      <h3 className="text-base font-semibold text-stone-900">{order.title}</h3>
      {showIssuer && issuer ? (
        <p className="mt-1 text-xs text-stone-500">发单：{issuer.name}</p>
      ) : null}
      {showCompanion && companion ? (
        <p className="mt-1 text-xs text-stone-500">陪伴者：{companion.name}</p>
      ) : null}
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-600">
        {order.description}
      </p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-stone-500">{order.timeLabel}</span>
        <span className="font-semibold text-stone-900">¥{order.price}</span>
      </div>
    </Link>
  );
}
