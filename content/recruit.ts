export type RecruitRole = {
  id: string;
  title: string;
  description: string;
  icon: "code" | "palette" | "megaphone" | "gamepad";
};

export type RecruitPoster = {
  src: string;
  alt: string;
};

export type RecruitFaq = {
  id: string;
  question: string;
  answer: string[];
};

/**
 * Seasonal club recruitment. Flip `enabled` to hide the homepage strip
 * and nav entry; `/recruit` then shows the ended state.
 */
export const recruitConfig = {
  enabled: true,
  navLabel: "2026招新",
  navHref: "/recruit",
  season: "2026 秋季招新",
  groupName: "金苹果社 | 2026招新群",
  groupNumber: "938184510",
  groupUrl: "https://qm.qq.com/q/ZUU8bivzqy",
  /** Cropped QR from the campaign poster. Omit until the asset exists. */
  qrSrc: null as string | null,
  /** Talk / booth schedule. Fill from the poster when available. */
  schedule: null as string | null,
  posters: [] as RecruitPoster[],
  seo: {
    title: "2026秋季招新",
    description:
      "电子科技大学成都学院金苹果社团 2026 秋季招新。技术、美术、运营，或者只是进来一起玩。校园公益，零门槛。",
  },
  strip: {
    liveLabel: "招新进行中",
    title: "2026招新中",
    description: "金苹果社团秋季招新。技术、美术、运营，或者只是进来一起玩。",
    cta: "招新详情",
  },
  home: {
    kicker: "2026招新中",
    bannerLead: "金苹果社团秋季招新",
    bannerCta: "查看详情",
    heroCta: "2026招新",
    dialogTitle: "2026招新中",
    dialogBody:
      "金苹果社团秋季招新已经开始。技术、美术、运营，或者只是进来一起玩。校园公益，零门槛。",
    dialogPrimary: "去招新页",
    dialogSecondary: "先逛主城",
    noticeStorageKey: "cducraft-recruit-2026-autumn",
  },
  hero: {
    eyebrow: "2026 AUTUMN",
    titleLines: ["金苹果社团", "秋季招新"] as const,
    subtitle:
      "做服务器、画资源、办活动，或者今晚就上线开黑。校园公益，零门槛。",
    primaryCta: "加入招新群",
    secondaryCta: "先看看科成 MC",
  },
  rolesEyebrow: "席位",
  rolesTitle: "你可以怎么加入",
  rolesLead: "对应社团现在的分工，不是另立一套部门。",
  roles: [
    {
      id: "tech",
      title: "技术",
      description: "插件、网页、运维。把服稳住，把玩法做出来。",
      icon: "code",
    },
    {
      id: "art",
      title: "美术",
      description: "海报、资源、场景。让方块世界看起来像我们的。",
      icon: "palette",
    },
    {
      id: "ops",
      title: "运营",
      description: "群务、活动、摊位。让同学知道这儿好玩，也愿意留下。",
      icon: "megaphone",
    },
    {
      id: "member",
      title: "社员",
      description: "不一定会做。想来玩、想认识人、想提一句意见，都算。",
      icon: "gamepad",
    },
  ] satisfies RecruitRole[],
  workEyebrow: "我们在做什么",
  workTitle: "科成 MC 就在这里长大",
  workLead: "金苹果社团运营的校园公益服，招新群报名，游戏群进服。",
  workItems: [
    {
      title: "原创《单程票》",
      description: "硬核丧尸射击副本：枪械、波次与肉鸽，配套自研客户端模组。",
    },
    {
      title: "整合包联机",
      description: "香草纪元等赛季轮换整合包，一起探索、建造与生存。",
    },
    {
      title: "校园公益",
      description: "免费联机。进服、整合包和地址请走官网「加入群聊」。",
    },
  ],
  joinEyebrow: "入群",
  joinTitle: "先加招新群",
  joinLead:
    "招新群用来报名和问社团；进服、整合包、地址仍走官网「加入群聊」。",
  joinCta: "加入招新群",
  faqsEyebrow: "招新问答",
  faqsTitle: "先看这几句",
  faqs: [
    {
      id: "skill",
      question: "不会技术可以来吗？",
      answer: [
        "可以。社员席就是为此留的——想来玩、想认识人、想提一句意见，都算。",
      ],
    },
    {
      id: "groups",
      question: "招新群和游戏群有什么不同？",
      answer: [
        "招新群是 2026 秋季报名和问社团的通道。",
        "游戏群发整合包、服地址和日常游玩通知，入口在官网「加入群聊」。",
      ],
    },
    {
      id: "account",
      question: "一定要正版吗？",
      answer: [
        "正版、科成 MC 皮肤站、MUA 联合皮肤站都可以，细节见帮助文档。",
      ],
    },
    {
      id: "when",
      question: "招到什么时候、宣讲在哪？",
      answer: ["以招新群公告为准。"],
    },
  ] satisfies RecruitFaq[],
  ended: {
    eyebrow: "2026 AUTUMN",
    title: "本季招新已结束",
    subtitle:
      "感谢关注金苹果社团。进服游玩请加入游戏群，下一季招新以群公告为准。",
    homeCta: "返回主城",
    gameCta: "加入游戏群",
  },
} as const;
