export type ServerType = "vanilla" | "modpack";

export type ServerContent = {
  id: string;
  name: string;
  type: ServerType;
  typeLabel: string;
  description: string;
  version: string;
  addressHint: string;
  extra: string;
  /** Primary Uptime Kuma monitor id for live status */
  monitorId: number;
  /** Optional secondary monitors (e.g. DNS resolve) */
  relatedMonitorIds?: number[];
};

/**
 * Local marketing metadata mapped to Uptime Kuma monitors.
 * Running state comes from the status page; copy can be edited here.
 */
export const servers: ServerContent[] = [
  {
    id: "vanilla-era-2",
    name: "香草纪元2",
    type: "modpack",
    typeLabel: "整合包",
    description:
      "当前赛季轮换整合包。在更接近原版的模组体验中探索、建造与生存。",
    version: "整合包 · 公网节点",
    addressHint: "加群后公告获取",
    extra: "整合包获取：群公告链接",
    monitorId: 155,
    relatedMonitorIds: [154],
  },
  {
    id: "owt",
    name: "单程票（OWT）",
    type: "modpack",
    typeLabel: "射击副本",
    description:
      "原创硬核丧尸射击副本：现代化枪械、生还者波次与肉鸽双模式，支持 4 人小队救援开黑。请使用官方整合包进入。",
    version: "1.21.1 · Paper + Fabric",
    addressHint: "加群后公告获取",
    extra: "科成MC公益服官方整合包 v1.0 · 自研插件与客户端模组",
    monitorId: 105,
  },
];

export const features = [
  {
    title: "现代化枪械系统",
    description:
      "射击、换弹、爆头、后坐力与弹道拖尾齐全，抛弃冷兵器，沉浸式 FPS 手感。",
    icon: "crosshair",
  },
  {
    title: "生还者 · 波次防守",
    description:
      "30 回合波次生存，简单/普通/困难可选，精英与 BOSS 阶段逐步加压。",
    icon: "shield",
  },
  {
    title: "肉鸽节点挑战",
    description:
      "随机节点地图树：突袭与坚守交错，增益与诅咒并存，构筑你的流派。",
    icon: "map",
  },
  {
    title: "四人小队救援",
    description:
      "创建/加入队伍开黑，倒地可被拉起；安全屋团队机器可补给与急救。",
    icon: "users",
  },
  {
    title: "自研客户端模组",
    description:
      "官方整合包内置 OneWayTicket Mod：FPS HUD、3D 枪模、动态光与专属动画。",
    icon: "puzzle",
  },
  {
    title: "军械重构与藏品",
    description:
      "金色重构枪械与十余种藏品，配合 COIN 经济与生涯榜单、成就系统。",
    icon: "sparkles",
  },
] as const;

export const aboutCopy = {
  eyebrow: "关于我们",
  titleLines: ["电子科技大学成都学院", "金苹果社团"] as const,
  description:
    "科成 MC（CDUCRAFT）由电子科技大学成都学院金苹果社团成员运营，面向同学提供免费公益联机。当前以原创射击副本《单程票》为核心玩法，并持续轮换整合包等体验。",
} as const;

export const aboutFeatures = [
  {
    title: "原创《单程票》",
    description:
      "插件 + 客户端模组全自研的硬核丧尸射击副本：生还者波次与肉鸽双模式，别处玩不到。",
    icon: "crosshair",
  },
  {
    title: "校园公益运营",
    description:
      "金苹果社团组织维护，无需付费；加群获取整合包与服务器地址，同学一起开黑。",
    icon: "heart",
  },
  {
    title: "官方整合包",
    description:
      "「科成MC公益服官方整合包」对齐服务端版本，自带专属模组，减少配置踩坑。",
    icon: "package",
  },
  {
    title: "安全保障",
    description:
      "已开启正版验证与 MUA 验证，配合监控与运维，尽量保证公平、稳定的游玩环境。",
    icon: "shield",
  },
] as const;
