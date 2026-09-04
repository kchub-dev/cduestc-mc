export const siteConfig = {
  name: "CDUCRAFT",
  brand: "科成MC",
  club: "电子科技大学成都学院金苹果社团",
  title: "科成MC | 电子科技大学成都学院 Minecraft 公益服",
  description:
    "电子科技大学成都学院金苹果社团（科成MC / CDUCRAFT）校园 Minecraft 公益服官网。原创射击副本《单程票》、香草纪元等整合包联机，以及规则、指令与帮助文档。",
  ogImage: "/images/bc.png",
  hero: {
    eyebrow: "CDUCRAFT",
    titleLines: ["电子科技大学成都学院", "金苹果社团"] as const,
    subtitle: "校园 Minecraft 公益服 · 原创玩法与同好联机",
  },
  keywords: [
    "cducraft",
    "cduestc",
    "minecraft",
    "电子科技大学成都学院",
    "金苹果社团",
    "科成",
    "科成MC",
    "我的世界",
    "我的世界服务器",
    "公益服",
    "单程票",
    "香草纪元",
  ],
  qqGroup: "957464722",
  qqGroupUrl:
    "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=tc5xw39rLjnUbkX5dMh2fHMMmchCKfmv&authKey=TfcTG52sHoyudCs22%2FS1RZO%2BnEW4zb8f5GrhvCZRQ%2B3O5%2FDxjOcgZxzgWyS2EE4Q&noverify=0&group_code=957464722",
  statusPageUrl: "https://status.cduestc.fun/status/cduestc",
  statusApiBase: "https://status.cduestc.fun",
  statusSlug: "cduestc",
  /** Client poll interval. Align with Uptime Kuma check (~60s). */
  statusPollIntervalMs: 60_000,
  beian: "蜀ICP备2025122461号",
  beianUrl: "https://beian.miit.gov.cn/",
  mclistsBanner: "https://tietu.mclists.cn/banner/purple/8117/1.jpg",
  mclistsUrl: "https://mclists.cn/server/8117.html",
  baiduVerification: "codeva-CpOURKdILY",
  /** 51.la 应用统计（公开掩码，随页面下发） */
  la51: {
    id: "LHnFeAD3bWE5vgow",
    ck: "LHnFeAD3bWE5vgow",
  },
  links: {
    skin: "https://skin.cduestc.fun",
    reg: "https://reg.cduestc.fun",
    planet: "https://www.cduestc.fun",
    school: "https://www.cduestc.cn/",
    muaDocs: "https://docs.mualliance.cn/",
    helpDocsExternal: "https://www.mcio.dev/docs",
  },
} as const;

export const navItems = [
  { label: "首页", href: "/" },
  { label: "2026招新", href: "/recruit" },
  { label: "监控", href: "/#status" },
  { label: "服务器", href: "/#servers" },
  { label: "关于我们", href: "/#about" },
  { label: "常见问题", href: "/#faq" },
  { label: "帮助文档", href: "/docs" },
  { label: "开发团队", href: "/#team" },
  { label: "合作伙伴", href: "/#partners" },
] as const;

export const externalSites = [
  { label: "皮肤站", href: siteConfig.links.skin },
  { label: "注册站", href: siteConfig.links.reg },
  { label: "服务器状态监控", href: siteConfig.statusPageUrl },
  { label: "科成星球", href: siteConfig.links.planet },
] as const;
