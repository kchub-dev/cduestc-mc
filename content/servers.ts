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
    type: "vanilla",
    typeLabel: "原版生存",
    description:
      "正式服生存体验。基于原版，高于原版——适合建筑、养老与校园联机。",
    version: "Java Edition · 正式服",
    addressHint: "加群后公告获取",
    extra: "基于原版，高于原版",
    monitorId: 105,
  },
];

export const features = [
  {
    title: "玩家选项可配置",
    description: "服务器提供丰富的可配置项，按需定制个人体验。",
    icon: "settings",
  },
  {
    title: "便民群机器人",
    description: "QQ 群机器人辅助查询与社区服务。",
    icon: "bot",
  },
  {
    title: "多版本支持登录",
    description: "支持 1.8–1.21 Java 版客户端进入服务器。",
    icon: "monitor",
  },
  {
    title: "でんでん 锻造系统",
    description: "特色锻造玩法，打造属于你的装备。",
    icon: "hammer",
  },
  {
    title: "神器更改 · 彩色名",
    description: "个性展示与神器自定义。",
    icon: "sparkles",
  },
  {
    title: "剧情与邮件系统",
    description: "特色剧情推进与站内邮件沟通。",
    icon: "mail",
  },
  {
    title: "武器绑定系统",
    description: "可召回、可查看持有者的装备绑定。",
    icon: "link",
  },
] as const;

export const aboutFeatures = [
  {
    title: "原版生存",
    description:
      "纯净的原版生存玩法，保留最原汁原味的 MC 体验。在这里建造家园，与同学们一起探索世界。",
    icon: "book",
  },
  {
    title: "基础插件",
    description:
      "仅添加基础实用插件，包括领地、传送等，兼顾原版乐趣与财产安全。",
    icon: "plug",
  },
  {
    title: "网络环境",
    description:
      "德阳与成都双节点部署，保证两个校区同学都能获得良好体验。",
    icon: "network",
  },
  {
    title: "安全保障",
    description:
      "已开启正版验证与 MUA 验证，确保游戏环境安全公平。",
    icon: "shield",
  },
] as const;
