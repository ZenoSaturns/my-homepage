"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createSeedState } from "./seed";
import { loadState, resetState, saveState } from "./storage";
import type {
  AppState,
  Order,
  OrderStatus,
  ServiceType,
  User,
} from "./types";

interface StoreValue {
  ready: boolean;
  users: User[];
  orders: Order[];
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
  resetDemo: () => void;
  updateProfile: (patch: Partial<Pick<User, "name" | "district" | "bio" | "phone">>) => void;
  createOrder: (input: {
    serviceType: ServiceType;
    title: string;
    description: string;
    address: string;
    timeLabel: string;
    price: number;
  }) => Order | null;
  acceptOrder: (orderId: string) => void;
  startService: (orderId: string) => void;
  completeOrder: (orderId: string) => void;
  reviewOrder: (orderId: string, rating: number, review: string) => void;
  getUser: (id: string) => User | undefined;
  getOrder: (id: string) => Order | undefined;
}

const StoreContext = createContext<StoreValue | null>(null);

function nextOrderId(orders: Order[]): string {
  const nums = orders
    .map((o) => Number(o.id.replace("ord-", "")))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return `ord-${String(max + 1).padStart(3, "0")}`;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(createSeedState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveState(state);
  }, [state, ready]);

  const persist = useCallback((updater: (prev: AppState) => AppState) => {
    setState((prev) => updater(prev));
  }, []);

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId) ?? null,
    [state.users, state.currentUserId],
  );

  const value: StoreValue = {
    ready,
    users: state.users,
    orders: state.orders,
    currentUser,
    login: (userId) =>
      persist((prev) => ({ ...prev, currentUserId: userId })),
    logout: () => persist((prev) => ({ ...prev, currentUserId: null })),
    resetDemo: () => {
      const fresh = resetState();
      setState(fresh);
    },
    updateProfile: (patch) =>
      persist((prev) => {
        if (!prev.currentUserId) return prev;
        return {
          ...prev,
          users: prev.users.map((u) =>
            u.id === prev.currentUserId
              ? {
                  ...u,
                  ...patch,
                  avatarChar: patch.name?.charAt(0) || u.avatarChar,
                }
              : u,
          ),
        };
      }),
    createOrder: (input) => {
      if (!currentUser || currentUser.role !== "family") return null;
      const order: Order = {
        id: nextOrderId(state.orders),
        familyId: currentUser.id,
        companionId: null,
        serviceType: input.serviceType,
        title: input.title.trim(),
        description: input.description.trim(),
        address: input.address.trim(),
        timeLabel: input.timeLabel.trim(),
        price: input.price,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      persist((prev) => ({ ...prev, orders: [order, ...prev.orders] }));
      return order;
    },
    acceptOrder: (orderId) =>
      persist((prev) => {
        if (!prev.currentUserId) return prev;
        const me = prev.users.find((u) => u.id === prev.currentUserId);
        if (!me || me.role !== "companion") return prev;
        return {
          ...prev,
          orders: prev.orders.map((o) =>
            o.id === orderId && o.status === "pending"
              ? {
                  ...o,
                  status: "accepted" satisfies OrderStatus,
                  companionId: me.id,
                }
              : o,
          ),
        };
      }),
    startService: (orderId) =>
      persist((prev) => ({
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === orderId &&
          o.status === "accepted" &&
          o.companionId === prev.currentUserId
            ? { ...o, status: "in_progress" }
            : o,
        ),
      })),
    completeOrder: (orderId) =>
      persist((prev) => ({
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === orderId &&
          o.status === "in_progress" &&
          o.companionId === prev.currentUserId
            ? { ...o, status: "completed" }
            : o,
        ),
      })),
    reviewOrder: (orderId, rating, review) =>
      persist((prev) => ({
        ...prev,
        orders: prev.orders.map((o) =>
          o.id === orderId &&
          o.status === "completed" &&
          o.familyId === prev.currentUserId
            ? { ...o, status: "reviewed", rating, review: review.trim() }
            : o,
        ),
      })),
    getUser: (id) => state.users.find((u) => u.id === id),
    getOrder: (id) => state.orders.find((o) => o.id === id),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
