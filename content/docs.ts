export type DocCallout = {
  type: "note" | "warning" | "tip";
  text: string;
};

export type DocBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "command"; text: string }
  | { kind: "callout"; callout: DocCallout };

export type DocSection = {
  id: string;
  title: string;
  blocks: DocBlock[];
};

export type DocNavGroup = {
  title: string;
  items: { id: string; label: string }[];
};

export const docsNav: DocNavGroup[] = [
  {
    title: "科成MC一本通",
    items: [
      { id: "preparation", label: "准备工作" },
      { id: "getting-started", label: "初入游戏" },
      { id: "commands", label: "简单指令" },
      { id: "advanced", label: "进阶配置" },
    ],
  },
  {
    title: "基础指南",
    items: [{ id: "server-rules", label: "服务器规则" }],
  },
  {
    title: "游戏系统",
    items: [
      { id: "economy", label: "经济系统" },
      { id: "protection", label: "领地保护" },
      { id: "crafting", label: "锻造系统" },
    ],
  },
  {
    title: "进阶内容",
    items: [
      { id: "plugins", label: "插件功能" },
      { id: "faq", label: "常见问题" },
      { id: "contact", label: "联系我们" },
    ],
  },
];

export const docsSections: DocSection[] = [
  {
    id: "preparation",
    title: "准备工作",
    blocks: [
      {
        kind: "callout",
        callout: {
          type: "warning",
          text: "当前核心玩法是原创射击副本《单程票》，请使用「科成MC公益服官方整合包」（Fabric 1.21.1）进入。下方部分指令（领地 /res、锻造、经济等）主要适用于香草纪元等生存向整合包，请以群公告为准。",
        },
      },
      { kind: "p", text: "欢迎来到科成MC服务器！在开始游戏前，您需要完成一些准备工作。" },
      { kind: "h3", text: "账号准备" },
      { kind: "p", text: "科成MC服务器需要正版账号或外置登录账号：" },
      {
        kind: "ol",
        items: [
          "如果您有 Minecraft 正版账号，可以直接使用",
          "如果没有正版账号，请访问皮肤站或注册站注册外置登录账号",
          "注册完成后，请妥善保管您的账号信息",
        ],
      },
      { kind: "h3", text: "启动器准备" },
      { kind: "p", text: "您需要使用支持外置登录的启动器：" },
      {
        kind: "ul",
        items: [
          "PCL2：设置 → 验证服务器 → 第三方登录（authlib-injector）→ https://skin.cduestc.fun/api/yggdrasil",
          "HMCL：账户 → 添加账户 → 外置登录（authlib-injector）→ 同上认证地址",
        ],
      },
      {
        kind: "callout",
        callout: {
          type: "note",
          text: "请确保 Minecraft 版本兼容（支持 1.8–1.21）。推荐 1.21 获得最佳体验。",
        },
      },
    ],
  },
  {
    id: "getting-started",
    title: "初入游戏",
    blocks: [
      { kind: "p", text: "完成账号和启动器设置后，您可以开始进入服务器并进行简单配置。" },
      { kind: "h3", text: "服务器简介" },
      {
        kind: "p",
        text: "科成MC是电子科技大学成都学院（CDUESTC）的 Minecraft 公益服务器，由科成MC同好会成员联合创办。我们提供原版生存、整合包等多种体验。",
      },
      { kind: "h3", text: "如何加入服务器" },
      {
        kind: "ol",
        items: [
          "加入 QQ 群：957464722",
          "在群公告中获取服务器地址和相关信息",
          "启动游戏，选择对应版本（推荐 1.21）",
          "多人游戏 → 添加服务器 → 输入地址并加入",
        ],
      },
      { kind: "h3", text: "初次登录设置" },
      {
        kind: "ol",
        items: [
          "按提示设置密码（外置登录通常无需此步骤）",
          "阅读并同意服务器规则",
          "如需：/register <密码> <确认密码>",
          "如需：/login <密码>",
        ],
      },
      { kind: "h3", text: "基本设置" },
      {
        kind: "ul",
        items: [
          "/sethome — 设置家",
          "/nick — 设置昵称（如支持）",
          "/tps — 查看服务器性能",
          "/bal 或 /money — 查看余额",
        ],
      },
      {
        kind: "callout",
        callout: {
          type: "note",
          text: "首次进入建议先熟悉周围环境，阅读公告，了解基本规则和指令。",
        },
      },
    ],
  },
  {
    id: "server-rules",
    title: "服务器规则",
    blocks: [
      { kind: "p", text: "为了维护良好的游戏环境，请所有玩家遵守以下规则：" },
      { kind: "h3", text: "基本规则" },
      {
        kind: "ul",
        items: [
          "尊重其他玩家，禁止辱骂、歧视等不文明行为",
          "禁止使用任何作弊客户端、模组或外挂",
          "禁止恶意破坏其他玩家的建筑和财产",
          "禁止利用漏洞获取不正当利益",
          "禁止发布违反法律法规的内容",
        ],
      },
      { kind: "h3", text: "建筑规则" },
      {
        kind: "ul",
        items: [
          "请在合适地点建造，不要过于靠近其他玩家",
          "禁止建造过于巨大的红石机器导致服务器卡顿",
          "禁止建造不良内容的建筑",
        ],
      },
      {
        kind: "callout",
        callout: {
          type: "warning",
          text: "违反服务器规则可能会导致临时或永久封禁。",
        },
      },
    ],
  },
  {
    id: "commands",
    title: "简单指令",
    blocks: [
      { kind: "p", text: "以下是服务器中常用的指令，帮助您更好地游玩：" },
      { kind: "h3", text: "基础指令" },
      { kind: "command", text: "/help - 查看帮助信息" },
      { kind: "command", text: "/spawn - 返回出生点" },
      { kind: "command", text: "/tpa <玩家名> - 请求传送到指定玩家身边" },
      { kind: "command", text: "/tpaccept - 接受传送请求" },
      { kind: "command", text: "/tpdeny - 拒绝传送请求" },
      { kind: "command", text: "/sethome - 设置家" },
      { kind: "command", text: "/home - 传送回家" },
      { kind: "command", text: "/back - 返回上一个位置（如死亡地点）" },
      { kind: "command", text: "/msg <玩家名> <消息> - 私聊玩家" },
      { kind: "command", text: "/r <消息> - 回复最后私聊你的玩家" },
      { kind: "h3", text: "经济指令" },
      { kind: "command", text: "/balance 或 /bal - 查看余额" },
      { kind: "command", text: "/pay <玩家名> <金额> - 向指定玩家转账" },
      { kind: "command", text: "/baltop - 查看服务器财富排行榜" },
      { kind: "h3", text: "领地指令" },
      { kind: "command", text: "/res create <领地名> - 创建领地" },
      { kind: "command", text: "/res info - 查看当前所在领地信息" },
      { kind: "command", text: "/res set <权限> <true/false> - 设置领地权限" },
      { kind: "command", text: "/res tp <领地名> - 传送到指定领地" },
      { kind: "command", text: "/res list - 查看自己的领地列表" },
      { kind: "command", text: "/res padd <领地名> <玩家名> - 添加玩家到领地" },
      { kind: "h3", text: "特色指令" },
      { kind: "command", text: "/tps - 查看服务器性能" },
      { kind: "command", text: "/hat - 将手中物品戴在头上" },
      { kind: "command", text: "/afk - 标记自己为暂时离开" },
      { kind: "command", text: "/mail read - 阅读邮件" },
      { kind: "command", text: "/mail send <玩家名> <内容> - 发送邮件" },
      { kind: "command", text: "/nick <昵称> - 设置昵称（如支持）" },
      {
        kind: "callout",
        callout: {
          type: "tip",
          text: "使用 /help <插件名> 可查看特定插件帮助。指令会不定期更新，请关注公告。",
        },
      },
    ],
  },
  {
    id: "advanced",
    title: "进阶配置",
    blocks: [
      { kind: "p", text: "熟悉基本操作后，您可以进行一些进阶配置，提升游戏体验。" },
      { kind: "h3", text: "玩家选项配置" },
      {
        kind: "ul",
        items: [
          "聊天格式：自定义聊天消息显示格式",
          "物品显示：调整物品信息显示方式",
          "游戏提示：开启或关闭各类提示",
          "界面设置：自定义界面元素显示",
        ],
      },
      { kind: "h3", text: "锻造系统进阶" },
      {
        kind: "ol",
        items: [
          "收集稀有材料，用于高级装备锻造",
          "了解不同附魔特性与适用场景",
          "合理搭配装备属性",
          "使用特殊锻造台制作专属装备",
        ],
      },
      { kind: "h3", text: "红石与自动化" },
      {
        kind: "ul",
        items: [
          "自动农场：提高资源收集效率",
          "自动分类系统：管理物品存储",
          "自动交易系统：便捷物品交换",
          "请合理控制红石规模，避免卡顿",
        ],
      },
      { kind: "h3", text: "社区参与" },
      {
        kind: "ul",
        items: [
          "参与服务器活动与比赛",
          "加入城镇或公会",
          "在 QQ 群分享游戏心得",
          "为服务器发展提供建议",
        ],
      },
      {
        kind: "callout",
        callout: {
          type: "warning",
          text: "进行高级操作时请了解相关规则，避免误操作或违规。如有疑问请咨询管理员。",
        },
      },
    ],
  },
  {
    id: "economy",
    title: "经济系统",
    blocks: [
      { kind: "p", text: "服务器采用虚拟货币系统，您可以通过多种方式获取和使用货币。" },
      { kind: "h3", text: "获取货币" },
      {
        kind: "ul",
        items: ["完成任务和成就", "在商店出售物品", "参与服务器活动", "与其他玩家交易"],
      },
      { kind: "h3", text: "使用货币" },
      {
        kind: "ul",
        items: ["购买物品和服务", "创建和扩展领地", "参与拍卖", "支付传送费用"],
      },
      { kind: "h3", text: "商店系统" },
      {
        kind: "ul",
        items: [
          "系统商店：基础物品买卖",
          "玩家商店：由其他玩家创建",
          "特殊商店：稀有物品与特殊服务",
        ],
      },
    ],
  },
  {
    id: "protection",
    title: "领地保护",
    blocks: [
      { kind: "p", text: "服务器使用领地插件保护您的建筑和财产不被破坏。" },
      { kind: "h3", text: "创建领地" },
      {
        kind: "ol",
        items: [
          "使用木锄选择两个对角点（左键第一点，右键第二点）",
          "输入 /res create <领地名> 创建领地",
          "创建领地需支付费用，费用与大小成正比",
        ],
      },
      { kind: "h3", text: "领地权限" },
      {
        kind: "ul",
        items: [
          "build - 建造权限",
          "destroy - 破坏权限",
          "use - 使用物品权限",
          "container - 使用容器权限",
          "pvp - PVP 权限",
        ],
      },
      { kind: "h3", text: "添加信任" },
      { kind: "command", text: "/res padd <领地名> <玩家名> - 添加玩家到领地" },
      { kind: "command", text: "/res pdel <领地名> <玩家名> - 从领地移除玩家" },
    ],
  },
  {
    id: "crafting",
    title: "锻造系统",
    blocks: [
      { kind: "p", text: "服务器拥有特色锻造系统，允许玩家制作和升级特殊装备。" },
      { kind: "h3", text: "基础锻造" },
      {
        kind: "ol",
        items: [
          "收集所需材料",
          "与铁匠 NPC 对话",
          "选择要锻造的装备类型",
          "支付相应费用",
        ],
      },
      { kind: "h3", text: "装备升级" },
      {
        kind: "ul",
        items: [
          "使用特殊材料和货币升级装备",
          "升级有成功率，失败可能导致降级或破损",
          "高级装备需要特殊升级材料",
        ],
      },
      { kind: "h3", text: "附魔系统" },
      {
        kind: "ul",
        items: [
          "自定义附魔可提供特殊效果",
          "某些附魔需要特殊附魔书",
          "附魔等级可超过原版限制",
        ],
      },
    ],
  },
  {
    id: "plugins",
    title: "插件功能",
    blocks: [
      { kind: "p", text: "服务器使用多种插件增强游戏体验，以下是主要插件介绍：" },
      { kind: "h3", text: "经济插件" },
      { kind: "p", text: "提供完整经济系统，包括货币、商店、拍卖等功能。" },
      { kind: "h3", text: "领地插件" },
      { kind: "p", text: "允许玩家创建和管理领地，保护建筑和财产。" },
      { kind: "h3", text: "传送插件" },
      { kind: "p", text: "提供传送到玩家、设置家等多种传送功能。" },
      { kind: "h3", text: "任务插件" },
      { kind: "p", text: "提供任务与成就，完成后可获得奖励。" },
      { kind: "h3", text: "聊天插件" },
      { kind: "p", text: "增强聊天功能，支持私聊、频道、彩色文字等。" },
    ],
  },
  {
    id: "faq",
    title: "常见问题",
    blocks: [
      { kind: "h3", text: "如何注册账号？" },
      { kind: "p", text: "首次进入服务器时，系统会提示您注册。按提示输入密码即可。" },
      { kind: "h3", text: "忘记密码怎么办？" },
      { kind: "p", text: "请联系服务器管理员重置密码。" },
      { kind: "h3", text: "服务器支持哪些版本？" },
      { kind: "p", text: "服务器支持 Java 版 1.8–1.21 客户端进入。" },
      { kind: "h3", text: "如何赚取游戏币？" },
      { kind: "p", text: "可通过完成任务、出售物品、参与活动等方式赚取。" },
      { kind: "h3", text: "遇到恶意玩家怎么办？" },
      { kind: "p", text: "请使用 /report <玩家名> <原因> 举报，管理员会尽快处理。" },
    ],
  },
  {
    id: "contact",
    title: "联系我们",
    blocks: [
      { kind: "p", text: "如果您有任何问题、建议或反馈，可以通过以下方式联系我们：" },
      { kind: "h3", text: "QQ群" },
      { kind: "p", text: "加入我们的 QQ 群：957464722" },
      { kind: "h3", text: "服务器内联系" },
      { kind: "p", text: "游戏内可使用 /mail send <管理员名> <内容> 向管理员发送邮件。" },
      { kind: "h3", text: "反馈建议" },
      { kind: "p", text: "我们欢迎所有玩家提出建设性意见，帮助改进服务器。" },
      {
        kind: "callout",
        callout: {
          type: "note",
          text: "管理员不会要求您提供账号密码，请注意账号安全。",
        },
      },
    ],
  },
];
