import type { AppState, Order, User } from "./types";

export const SEED_USERS: User[] = [
  {
    id: "u-family-1",
    name: "张晓梅",
    role: "family",
    district: "杭州西湖区",
    bio: "照顾母亲王桂兰 (78岁)",
    phone: "138****2618",
    avatarChar: "张",
  },
  {
    id: "u-family-2",
    name: "李建国",
    role: "family",
    district: "杭州拱墅区",
    bio: "本人 (72岁) 自理为主",
    phone: "139****8842",
    avatarChar: "李",
  },
  {
    id: "u-companion-1",
    name: "陈一诺",
    role: "companion",
    district: "杭州西湖区",
    bio: "浙江大学 · 大三",
    phone: "158****3301",
    avatarChar: "陈",
  },
  {
    id: "u-companion-2",
    name: "王梓涵",
    role: "companion",
    district: "杭州拱墅区",
    bio: "全职 freestyle · 兼职陪伴",
    phone: "186****7715",
    avatarChar: "王",
  },
];

export const SEED_ORDERS: Order[] = [
  {
    id: "ord-001",
    familyId: "u-family-1",
    companionId: null,
    serviceType: "购物陪同",
    title: "陪妈妈去文三路菜市场买菜",
    description:
      "妈妈腿脚还行，但拎重物吃力。希望年轻人和她一起去，帮忙挑选并拎回家。大约 1.5 小时。",
    address: "杭州市西湖区文三路附近（具体到店后告知）",
    timeLabel: "明天上午 9:30",
    price: 60,
    status: "pending",
    createdAt: "2025-10-22T08:00:00.000Z",
  },
  {
    id: "ord-002",
    familyId: "u-family-1",
    companionId: null,
    serviceType: "手机教学",
    title: "教妈妈用微信视频和发红包",
    description:
      "新智能手机，会基本通话，想学会视频通话和给亲戚发红包。耐心讲解即可。",
    address: "杭州市西湖区文三路附近",
    timeLabel: "本周六下午",
    price: 80,
    status: "pending",
    createdAt: "2025-10-21T10:00:00.000Z",
  },
  {
    id: "ord-003",
    familyId: "u-family-1",
    companionId: "u-companion-1",
    serviceType: "聊天陪伴",
    title: "陪妈妈下午茶聊天",
    description: "陪妈妈在家附近茶馆坐坐、聊聊家常，约 1 小时。",
    address: "杭州市西湖区黄龙附近",
    timeLabel: "上周日下午 3:00",
    price: 50,
    status: "completed",
    createdAt: "2025-10-15T06:00:00.000Z",
  },
  {
    id: "ord-004",
    familyId: "u-family-2",
    companionId: null,
    serviceType: "就医陪护",
    title: "陪同去市一医院复查",
    description:
      "需要帮忙挂号、排队、记录医嘱。老人听力略弱，沟通请清楚耐心。",
    address: "杭州市拱墅区市一医院",
    timeLabel: "本周三下午 1:00",
    price: 120,
    status: "pending",
    createdAt: "2025-10-20T09:00:00.000Z",
  },
  {
    id: "ord-005",
    familyId: "u-family-2",
    companionId: "u-companion-2",
    serviceType: "打扫整理",
    title: "帮忙整理客厅和厨房",
    description: "轻度整理与擦拭，约 2 小时。老人在场，边做边聊即可。",
    address: "杭州市拱墅区湖墅南路附近",
    timeLabel: "今天下午 2:00",
    price: 90,
    status: "in_progress",
    createdAt: "2025-10-22T02:00:00.000Z",
  },
];

export function createSeedState(): AppState {
  return {
    users: SEED_USERS.map((u) => ({ ...u })),
    orders: SEED_ORDERS.map((o) => ({ ...o })),
    currentUserId: null,
  };
}
