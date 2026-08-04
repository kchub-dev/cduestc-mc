export const siteConfig = {
  name: "CDUCRAFT",
  brand: "科成MC",
  title: "CDUCRAFT | 官网",
  description:
    "电子科技大学成都学院（CDUESTC）Minecraft公益服务器是由科成MC同好会成员联合创办的公益服务器，旨在打造一个简单稳定的多人联机平台。",
  keywords: [
    "cducraft",
    "cduestc",
    "minecraft",
    "电子科技大学成都学院",
    "科成",
    "我的世界",
    "我的世界服务器",
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
