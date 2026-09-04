# 开发日志

按时间记录重构过程中的关键决策、问题与结论。细节实现以代码与 [DEVELOPMENT.md](./DEVELOPMENT.md) 为准。

---

## 2026-09-04 — 2026 秋季招新（0.1.5）

### 背景

金苹果社团 2026 秋季招新需要可分享的落地页，同时官网仍是科成 MC 主城门户。招新群与游戏群分开。

### 改动

- `content/recruit.ts`：开关、双群、席位 / FAQ / 海报与宣讲槽位
- `/recruit`：像素标签 + Outfit 标题（不用 StrokeText）；Reveal 入场；结束态短页
- 首页 `RecruitStrip` 插在 Hero 与监控之间；顶栏「2026招新」受 `enabled` 过滤
- sitemap / JSON-LD / DESIGN 对照表同步

### 决策 / 原因

- 招新是季节战役，文案与开关单独成文件，结束后只改 `enabled`
- 条带不进章节侧栏，避免首页再多一章
- 海报为空不渲染画廊；二维码有 `qrSrc` 才出现，避免空框

### 验证

- 浏览器：首页 Hero「加入群聊」仍为游戏群 `957464722`；条带「招新详情」与顶栏进 `/recruit`
- `/recruit` 双处「加入招新群」均为 `https://qm.qq.com/q/ZUU8bivzqy`；「先看看科成 MC」回首页
- FAQ Accordion 可展开；手机 Sheet 含「2026招新」；章节侧栏无招新项
- 控制台无新增错误

### 后续

- 海报到位后裁 QR 写入 `public/images/recruit/`，补 `qrSrc` / `posters` / `schedule`

---

## 2026-09-04 — 首页招新加显

### 背景

独立 `/recruit` 保留；首页仅靠条带和顶栏不够醒目，需要横幅、标题和首次通知。

### 改动

- Hero：顶栏下草绿横幅、描边完成后出「2026招新中」、CTA 增加「2026招新」
- RecruitStrip 改为草绿底 + 大标题「2026招新中」
- `RecruitNoticeDialog`：约 1.6s 后弹出，关闭后写入 localStorage

### 决策 / 原因

- 游戏群「加入群聊」仍是主按钮；招新用横幅 / 标题 / 描边按钮
- Dialog 只出一次，避免每次刷新打断

### 验证

- 首页可见横幅与「2026招新中」；主按钮仍进游戏群
- Dialog 关闭后再刷新不再出现

### 后续

- 海报与宣讲时空仍待补

---

---

## 2026-08-13 — 51.la 应用统计

### 背景

接入 51.la JS SDK Pro 做全站访问与事件统计。

### 改动

- `components/analytics/la51.tsx`：`next/script` `afterInteractive`，`onLoad` 后 `LA.init`
- 保留官方 `id` / `ck` / `autoTrack`；按 51.la V6 对 React SPA 的说明开启 `hashMode`

### 决策 / 原因

- 不用裸 `<script>`，避免阻塞与 init 早于 SDK
- App Router 客户端跳转需要 SPA 模式，否则只记首屏

### 验证

- 网络面板出现 `js-sdk-pro.min.js`；控制台无 `LA is not defined`

### 后续

- 上线后在 51.la 后台确认 PV

---

## 2026-08-13 — 上线 canonical 与全站 SEO（0.1.4）

### 背景

准备正式部署。站点 origin 不能写进仓库：内网主机名在线上不可作为公网 canonical。

### 改动

- `getSiteUrl()`：只读 `NEXT_PUBLIC_SITE_URL`；`next dev` 未设时用 `localhost:3083`；生产构建未设则抛错
- Open Graph / Twitter、Organization + WebSite + FAQPage JSON-LD、`manifest.webmanifest`
- `robots` 禁止 `/api/`；404 `noindex`

### 决策 / 原因

- 域名属于部署环境，以 `.env.example` 为模板，不在 `siteConfig` 写死
- 构建时注入，保证 sitemap / OG 指向公网 origin

### 验证

- 未设 env 时 `next dev` 仍为 3083
- 未设 env 时 `next build` 应失败并提示复制 `.env.example`

### 后续

- 上线构建环境填入公网 `NEXT_PUBLIC_SITE_URL` 后提交 sitemap

---

## 2026-08-13 — 开发端口 3083

### 背景

本地启动改到固定端口 3083，避免占用默认 3000。

### 改动

- `package.json`：`next dev --port 3083`、`next start --port 3083`
- 本地 fallback canonical（无 `NEXT_PUBLIC_SITE_URL` 时）同步为 `http://localhost:3083`

### 验证

- 重启 `bun dev` / `npm run dev` 后监听 3083

### 后续

- 生产域名仍用 `NEXT_PUBLIC_SITE_URL`

---

## 2026-08-13 — Hero 对齐与第二行从右描边

### 背景

StrokeText 的 SVG viewBox 左侧按字号 10% 留白，副文案与 CTA 相对「电 / 金」偏左。第二行只需把原有描边方向改为从右开始，不要额外位移动画。

### 改动

- viewBox 左缘贴齐 `getBBox().x`，描边靠 `overflow: visible` 避免裁切
- 第二行 `reverse`：stagger 从末字开始，wipe 自右向左；字仍留在原位

### 验证

- 副文案首字与主标题首字左缘重合
- 「金苹果社团」在原位从右往左描边，无飞入

### 后续

- 帮助文档正文（领地/锻造）仍待按服拆分

---

## 2026-08-13 — Hero 描边字 + 审查项修复（0.1.3）

### 背景

首屏标题需要描边绘制特效（React Bits StrokeText / GSAP）。审查还发现：手机隐藏滚动条、SSR 同步等 Kuma、无心跳误标离线、文档与《单程票》错位。

### 改动

- `components/bits/StrokeText`：描边 + wipe；Hero 两行标题绘制完毕后渐显 CDUCRAFT 与副文案
- 滚动条仅 `lg+` 隐藏；SSR `cached` + 2.5s 超时；缺心跳 →「未知」
- `metadataBase` / OG / sitemap / robots；侧栏键盘 button；公告链接仅 http(s)
- 文档卷首 warning + FAQ 对齐官方整合包

### 决策 / 原因

- 两行标题各自 `stroke-text--fit`，避免短行被 `width:100%` 放大
- 首屏不必 `fresh`：客户端 1.5s 后会再拉 `/api/status`

### 验证

- 标题先描边再填充，随后 eyebrow / 副文案淡入
- 手机可见滚动条；桌面仍无条、侧栏仍在

### 后续

- 帮助文档正文（领地/锻造）仍待按服拆分
- 生产域名可用 `NEXT_PUBLIC_SITE_URL` 覆盖 sitemap / OG

---

## 2026-08-05 — 章节侧栏进度 + 首屏 / 品牌标（0.1.2）

### 背景

首屏 Hero 高度不足会露出下方监控；顶栏横版字标被压成方块过小；浏览器标签仍可能落到 Next 默认 favicon。需要首页章节进度轨（参考 open-platform-landing 的 LineSidebar），**只要侧栏进度，不要桌面整页翻页**。

### 改动

- Hero：`h-dvh` + `id="hero"`
- 顶栏：`/logo.png` 立方体 `size-12`；`app/favicon.ico` / `app/icon.png` 同步立方体标
- `components/bits/LineSidebar` + CSS（自 open-platform 拷贝并修好 rAF）
- `SectionProgress`：滚动 spy、点击 `scrollIntoView`、Motion 右侧入场、`labelsOnHover`
- `content/section-progress.ts` 章节表；首页挂载；`home-section-progress` 隐藏原生滚动条
- 曾误接 `HomeScrollSnap`，按需求整段撤回
- 单程票卡片改用 `content/promo/owt.md` 摘要；类型改为「射击副本」
- 团队新增 mutant / TENFEN，头像迁入 `public/images/team/{mutant,tenfen}.jpg`
- 团队区：改回 Swiper（legacy `teamSwiper`：fade / autoplay 3s / scrollbar / 箭头），恢复左右「成员 + 职责」布局；卡片统一高度与排版节奏
- Hero / About / Features：对齐金苹果社团定位与《单程票》宣传（`服务器宣传介绍.md` / `content/promo/owt.md`）
- 团队区取消「职责」右栏，介绍合并为一块；成员展示改为 shadcn Card **2×2 横版网格**（弃用单卡 Swiper）
- 团队 / 伙伴移动端响应式：手机紧凑横排（小头像），避免全宽大图；伙伴手机横排列表、`sm` 起三列
- Skilly 头像换为本地 `skilly.png`

### 决策 / 原因

- 进度高亮靠 `--effect` rAF，不另造一套选中 CSS；配色走 `--link` 等 token 对齐参考站用法
- 刻度默认收起，悬停展开标签，避免常驻挡内容
- 明确排除 snap：用户只要侧栏进度，滚动保持原生连续行为
- 团队区：4 人不宜单卡轮播或 4 列窄卡（中间空、两侧空）；对齐常见 marketing team 模式——全员同屏 + 横版媒体卡填满 `container-site`
- 移动端不用竖排大图：一屏只能看一人、滚动过长；改固定头像宽横排以提升信息密度

### 验证

- 选中章节 `--effect ≈ 1`，刻度变长变绿
- 悬停近距：相邻项 effect 呈梯度；标签在悬停侧栏时可见
- 入场：侧栏自右淡入滑入
- 无 `home-scroll-snap` 引用；控制台无相关 module-not-found

### 后续

- 增删首页章节时同步改 `content/section-progress.ts` 与对应 `id`
- 若以后要整页翻页，再单独评估，勿与侧栏进度绑死
- 待补：整合包轮换、生电服宣传文案写入 `content/servers.ts`（底稿可放 `content/promo/`）

---

## 2026-08-04 — 实时监控 + 公告 Modal（0.1.1）

### 背景

Uptime Kuma 探测周期约 1 分钟；此前首页状态偏静态/短缓存，游戏服与 Web 需同源实时刷新。赛季公告（pin incident）全文过长，不适合直接铺在列表区。

### 改动

- 客户端轮询：`useLiveStatus` → `/api/status`（60s，页签隐藏暂停，回前台立即刷新）
- 监控条覆盖 Mod / Game / Web；服务器卡片共用 live state
- 公告摘要可点击，Dialog 展示 Markdown 风格全文
- 修复 Button `render` 为链接时的 `nativeButton` 警告

### 决策 / 原因

- 轮询对齐 60s，避免无意义的过密请求（上游本身约 1 分钟才变）
- 公告用 Modal：列表保持干净，详情可滚动、可外链监控页
- Chrome DevTools 做了首页 Hero / 监控 / 服务器 / Modal 视觉核对

### 验证

- `npm run lint` / `npm run build` 通过
- 控制台无 Base UI button 警告
- 点击公告可打开 Dialog，内容含加粗与链接

### 后续

- 监控 ID / 赛季文案变更时同步改 `content/servers.ts` 并记日志
- 可考虑把「退休服」链接做成独立入口

---

## 2026-08-04 — Next.js 重构上线（0.1.0）

### 背景

原站为静态 HTML（Bootstrap 5 + jQuery + Swiper），维护成本高，服务器文案与真实开服状态不同步。目标架构确定为：

**Next.js + React + shadcn/ui + Motion**，视觉在现有深色紫蓝体系上做现代简约 / Minecraft 风格优化；整合包与运行状态对接 [Uptime Kuma 监控页](https://status.cduestc.fun/status/cduestc)。

### 调研结论

1. Uptime Kuma 公开接口可用、无需鉴权（status page 已发布）：
   - `GET /api/status-page/cduestc` → 分组、监控元数据、incident
   - `GET /api/status-page/heartbeat/cduestc` → 心跳与 24h uptime
2. 旧 HTML 服务器列表（化龙 / 宁然一隅）与监控页（香草纪元2 / 单程票）已漂移 → **运行态以 Kuma 为准，文案本地配置补全**。
3. 旧站 `.htaccess` 暗示曾用 Apache 静态托管；因需要服务端拉取与动态 API，新站采用 **Node 部署**，不做 `output: 'export'`。

### 实施过程摘要

| 阶段 | 内容 |
|------|------|
| 归档 | 将 `index.html`、`docs.html`、`assets/` 等移入 `legacy/` |
| 脚手架 | `create-next-app`（临时目录再合并到根）+ `shadcn init`（radix / base-nova）+ `motion` |
| 内容 | 抽离 `content/*`；静态资源进 `public/` |
| UI | Header/Footer + 各 Section；主题写入 `globals.css` |
| 状态 | `lib/uptime-kuma.ts` + `/api/status` + Servers / StatusStrip |
| 文档页 | `/docs` 消化 `docs.html` 结构 |
| 验收 | `npm run lint`、`npm run build` 通过；实网 API 验证分组 Mod/Game/Web |

### 设计决策

- **品牌优先 Hero**：全宽背景图 + CDUCRAFT/科成MC 一级信号 + 单主 CTA（加群）
- **少卡片装饰**：保留交互所需卡片（服务器、FAQ），去掉旧站大量漂浮 shape
- **颜色**：背景 `#0e1630`，强调用草绿（在线）而非通用「AI 紫渐变」模板；淡紫 `#a399fa` 作次要点缀（延续旧 token）
- **动效克制**：Hero 入场、区块 Reveal、状态点呼吸；`prefers-reduced-motion` 关闭动画

### 踩坑记录

1. **create-next-app 无法在非空目录直接初始化** → 使用临时 `web-tmp` 再合并到根目录。
2. **shadcn CLI v4**：`-b neutral` 无效，需 `-b radix` / `-d` 默认预设；组件基于 Base UI，`render` 多态与旧文档略有差异。
3. **ESLint 扫到 legacy / 临时目录** → `eslint.config.mjs` 忽略 `legacy/**`，并删除临时脚手架残留。
4. **首页依赖外网 API**：失败时 catch 降级，避免整站挂死。
5. **Base UI Button**：`render={<Link/>}` 须 `nativeButton={false}`（已在 `button.tsx` 自动处理）。

### 后续可跟进

- 监控 ID 变更时只改 `content/servers.ts`，并在本日志补一条映射变更记录
- 若运维侧新增「退休整合包」状态页（如 `cduestc-old`），可考虑第二数据源或文档链接
- 团队成员列表目前精简为有效成员；历史占位「管理员 B」未迁入

---

## 日志模板（后续追加）

```markdown
## YYYY-MM-DD — 标题

### 背景
### 改动
### 决策 / 原因
### 验证
### 后续
```
