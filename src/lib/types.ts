export type Role = "family" | "companion";

export type OrderStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "reviewed";

export type ServiceType =
  | "购物陪同"
  | "做饭帮忙"
  | "打扫整理"
  | "手机教学"
  | "就医陪护"
  | "聊天陪伴";

export interface User {
  id: string;
  name: string;
  role: Role;
  district: string;
  bio: string;
  phone: string;
  avatarChar: string;
}

export interface Order {
  id: string;
  familyId: string;
  companionId: string | null;
  serviceType: ServiceType;
  title: string;
  description: string;
  address: string;
  timeLabel: string;
  price: number;
  status: OrderStatus;
  createdAt: string;
  rating?: number;
  review?: string;
}

export interface AppState {
  users: User[];
  orders: Order[];
  currentUserId: string | null;
}

export const SERVICE_TYPES: ServiceType[] = [
  "购物陪同",
  "做饭帮忙",
  "打扫整理",
  "手机教学",
  "就医陪护",
  "聊天陪伴",
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "待接单",
  accepted: "已接单",
  in_progress: "服务中",
  completed: "已完成",
  reviewed: "已评价",
};
