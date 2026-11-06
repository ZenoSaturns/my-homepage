"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export function ProfileForm() {
  const { currentUser, updateProfile, logout } = useStore();
  const router = useRouter();
  const [name, setName] = useState(currentUser?.name ?? "");
  const [district, setDistrict] = useState(currentUser?.district ?? "");
  const [bio, setBio] = useState(currentUser?.bio ?? "");
  const [phone, setPhone] = useState(currentUser?.phone ?? "");
  const [saved, setSaved] = useState(false);

  if (!currentUser) return null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    updateProfile({ name, district, bio, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white">
          {currentUser.avatarChar}
        </div>
        <div>
          <p className="text-lg font-semibold text-stone-900">{currentUser.name}</p>
          <p className="text-sm text-stone-500">
            {currentUser.role === "family" ? "家属 / 老人" : "年轻人陪伴者"}
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="昵称" value={name} onChange={setName} />
        <Field label="片区" value={district} onChange={setDistrict} />
        <Field label="简介" value={bio} onChange={setBio} />
        <Field label="电话" value={phone} onChange={setPhone} />
        <button
          type="submit"
          className="w-full rounded-2xl bg-brand py-3 font-semibold text-white hover:bg-brand-soft"
        >
          {saved ? "已保存" : "保存资料"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          logout();
          router.replace("/");
        }}
        className="mt-4 w-full rounded-2xl border border-stone-300 bg-white py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
      >
        退出并切换账号
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-stone-700">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}
