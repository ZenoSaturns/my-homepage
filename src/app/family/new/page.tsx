"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { SERVICE_TYPES, type ServiceType } from "@/lib/types";

export default function NewOrderPage() {
  const { createOrder } = useStore();
  const router = useRouter();
  const [serviceType, setServiceType] = useState<ServiceType>("购物陪同");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [timeLabel, setTimeLabel] = useState("");
  const [price, setPrice] = useState("60");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const priceNum = Number(price);
    if (!title.trim() || !description.trim() || !address.trim() || !timeLabel.trim()) {
      setError("请填写完整信息");
      return;
    }
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      setError("请填写有效金额");
      return;
    }
    const order = createOrder({
      serviceType,
      title,
      description,
      address,
      timeLabel,
      price: priceNum,
    });
    if (!order) {
      setError("发布失败，请重试");
      return;
    }
    router.push(`/family/orders/${order.id}`);
  }

  return (
    <div className="animate-fade-up">
      <Link
        href="/family"
        className="mb-4 inline-flex text-sm text-stone-500 hover:text-brand"
      >
        ← 返回列表
      </Link>
      <h2 className="mb-4 text-xl font-semibold text-stone-900">发布新需求</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-stone-700">
            服务类型
          </span>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value as ServiceType)}
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
          >
            {SERVICE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <Field
          label="标题"
          value={title}
          onChange={setTitle}
          placeholder="例如：陪妈妈去菜市场买菜"
        />
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-stone-700">
            详细说明
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="说明老人情况、需要帮助的内容和大概时长"
            className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </label>
        <Field
          label="地址"
          value={address}
          onChange={setAddress}
          placeholder="大致片区即可"
        />
        <Field
          label="期望时间"
          value={timeLabel}
          onChange={setTimeLabel}
          placeholder="例如：明天上午 9:30"
        />
        <Field
          label="预算（元）"
          value={price}
          onChange={setPrice}
          placeholder="60"
          type="number"
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-2xl bg-brand py-3.5 text-base font-semibold text-white hover:bg-brand-soft"
        >
          发布
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-stone-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}
