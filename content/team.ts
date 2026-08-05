export const teamMembers = [
  {
    name: "Skilly",
    role: "服主 / 管理",
    bio: "负责服务器的整体管理和维护",
    avatar: "/images/team/skilly.png",
    tags: ["服务器运维", "账号运营", "社区管理"],
    link: null as string | null,
  },
  {
    name: "浅巷墨黎",
    role: "技术 / 运维",
    bio: "负责服务器的技术运营和开发",
    avatar: "https://q1.qlogo.cn/g?b=qq&nk=2315823357&s=640",
    tags: ["技术支持", "Web开发", "设计/策划"],
    link: "https://qxml.ltd",
  },
  {
    name: "mutant",
    role: "技术",
    bio: "负责服务器插件的开发",
    avatar: "/images/team/mutant.jpg",
    tags: ["插件开发"],
    link: null as string | null,
  },
  {
    name: "TENFEN",
    role: "美术",
    bio: "负责服务器的美术资源",
    avatar: "/images/team/tenfen.jpg",
    tags: ["美术设计"],
    link: null as string | null,
  },
] as const;

export const partners = [
  {
    name: "电子科技大学成都学院",
    description: "我们的母校，提供了校园支持",
    image: "/images/partners/cduestc.png",
    href: "https://www.cduestc.cn/",
    tags: ["官方社团（申请中）", "校园活动"],
  },
  {
    name: "Mualliance",
    description: "我的世界高校联盟，提供校园联合支持",
    image: "/images/partners/mua.png",
    href: "https://www.mualliance.cn/",
    tags: ["合作支持", "技术交流", "活动支持"],
  },
  {
    name: "网络管理委员会",
    description: "科成校级部门，负责维护管理学生校园网络",
    image: "/images/partners/naic.png",
    href: "https://www.minebbs.com",
    tags: ["技术支持", "网络支持", "什邡校区人员支持"],
  },
] as const;
