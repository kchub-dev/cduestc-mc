# 开发指南与技术要点

## 1. 环境要求

- Node.js 20+（当前开发环境为 22.x）
- npm 10+
- 需要能访问外网，以便拉取 Uptime Kuma 公开 API（构建期 / 运行期 ISR）

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

部署形态：**Node 运行时**（支持 Route Handler 与 ISR）。未启用 `output: 'export'`，不适合纯静态 Apache 托管；若必须静态导出，需改为浏览器直连 Uptime Kuma（并处理 CORS）。

---

## 2. 技术栈

| 层 | 选型 | 说明 |
|----|------|------|
| 框架 | Next.js 16 App Router | RSC + Route Handler |
| UI | React 19 + Tailwind CSS 4 | CSS 变量主题 |
| 组件 | shadcn/ui（base-nova / Radix Base UI） | 本地拷贝在 `components/ui` |
| 动效 | motion（原 Framer Motion） | `whileInView` / Hero 入场 |
| 图标 | lucide-react | 替代旧站 Font Awesome CDN |
| 状态 | Uptime Kuma REST | 公开 status-page / heartbeat |

---

## 3. 目录结构

```
app/
  layout.tsx              # 字体、SEO、Header/Footer 壳、favicon metadata
  page.tsx                # 首页（服务端拉状态 + SectionProgress）
  icon.png / favicon.ico  # App Router 站点图标（立方体标）
  docs/page.tsx           # 帮助文档
  api/status/route.ts     # 状态 BFF 代理
  globals.css             # 主题 token + MC 风格工具类 + 首页藏滚动条
  not-found.tsx           # 404
components/
  bits/                   # 第三方/开源 UI 位（LineSidebar 等）
  layout/                 # SiteHeader / SiteFooter / SectionProgress
  sections/               # 首页各区块
  status/                 # 状态徽章与格式化
  motion/reveal.tsx       # 滚动入场（尊重 reduced-motion）
  ui/                     # shadcn 组件
content/                  # 纯数据/文案，尽量不碰组件改字
  site.ts / servers.ts / faq.ts / team.ts / docs.ts
  section-progress.ts     # 首页章节侧栏 id / 文案
lib/
  uptime-kuma.ts          # 监控类型、拉取、合并 DTO
  utils.ts                # cn()
legacy/                   # 旧版静态 HTML/CSS/JS 备份
public/                   # 静态资源（logo、partners、验证文件等）
docs/                     # 本开发文档
```

---

## 4. 架构与数据流

```
┌─────────────┐   getMergedStatus("fresh")   ┌──────────────────────────┐
│  page.tsx   │ ───────────────────────────► │ status.cduestc.fun        │
│  (RSC SSR)  │                              │ /api/status-page/...      │
└──────┬──────┘                              │ /api/status-page/heartbeat│
       │ initialStatus                       └────────────▲─────────────┘
       ▼                                                  │
┌──────────────────┐     GET /api/status (no-store)       │
│ LiveStatusBlock  │ ─────────────────────────────────────┘
│ useLiveStatus    │     每 60s / 回前台 / 手动刷新
└────────┬─────────┘
         │
   ┌─────┴──────┐
   ▼            ▼
StatusStrip   ServersSection
(全部分组)     (卡片 + 公告 Modal)
```

### 职责划分

- **文案真相**：`content/*`（名称、简介、版本说明、FAQ、文档）
- **运行态真相**：Uptime Kuma（是否在线、延迟、可用性、赛季 pin incident）
- **映射**：`content/servers.ts` 的 `monitorId` 对齐监控项 ID

当前映射：

| 展示名 | monitorId | 分组 |
|--------|-----------|------|
| 香草纪元2 | 155（主）/ 154（解析） | Mod Server |
| 单程票（OWT） | 105 | Game Server |
| 官网 / 注册站 / 皮肤站 | 47 / 49 / 48 | Web |

心跳状态码：`0` 离线 · `1` 在线 · `2` 等待 · `3` 维护。

---

## 5. 代码技术点

### 5.1 服务端数据与实时刷新

- 首屏 SSR：`getMergedStatus("fresh")` 直连 Uptime Kuma（`cache: "no-store"`）
- 浏览器：`hooks/use-live-status.ts` 每 `siteConfig.statusPollIntervalMs`（默认 **60s**，对齐 Uptime Kuma 探测）请求 `GET /api/status`
- 监控条同时展示 **Mod Server / Game Server / Web** 全部分组；服务器卡片与监控条共用同一份 live state（`LiveStatusBlock`）
- `/api/status` 为 `force-dynamic`，上游始终 `fresh`，响应 `Cache-Control: no-store`
- 页签隐藏时暂停轮询；切回前台立即刷新；可手动点「刷新」
- 失败时保留上一份状态，并在监控条显示错误提示

官网轮询周期与 Kuma 探测同级（约 1 分钟）；状态变化最多延迟约一轮探测 + 一轮轮询。

### 5.2 公告 Modal（Uptime Kuma incident）

- 组件：`components/status/incident-announcement.tsx`
- 数据：`status.incident`（优先 pin + active）
- 交互：列表显示约 120 字摘要 → 点击打开 Dialog 全文
- 渲染：支持 `**加粗**`、`[文字](url)`、裸 `http(s)://` 自动成链
- UI：`components/ui/dialog.tsx`（Base UI Dialog）；页脚「打开监控页」「关闭」

### 5.3 shadcn / Base UI 用法注意

本仓库 shadcn 为 **base-nova** 预设，底层是 `@base-ui/react`，部分 API 与旧 Radix 写法不同：

- `Button` / `SheetTrigger` / `DialogClose` 等支持 `render={<Link href="..." />}` 做多态
- **`Button` 已内置**：存在 `render` 时默认 `nativeButton={false}`，避免控制台无障碍警告
- `DropdownMenuTrigger` / `DialogTrigger` 可直接当按钮用（带 className）
- `Accordion` 来自 Base UI Accordion，Item 使用 `value`

新增组件：

```bash
npx shadcn@latest add <component>
```

### 5.4 主题与视觉

- 强制暗色品牌站：`html` 带 `dark` class
- 设计 token 在 `app/globals.css`（背景 `#0e1630`、草绿 `#5d9c3f`、淡紫 `#a399fa`）
- 字体：Outfit（正文）+ Press Start 2P（小标签）+ Geist Mono
- 工具类：`.pixel-border`、`.heading-eyebrow`、`.status-dot-*`、`.container-site`

### 5.5 Motion

- Hero：`motion` 入场
- 区块：`components/motion/reveal.tsx`（`whileInView`）
- 状态点：在线时轻微呼吸动画
- 章节侧栏：右侧入场（opacity + `x`）；条目近距用 rAF `--effect`，非 CSS transition 堆叠
- 一律通过 `useReducedMotion()` 降级为无动画

### 5.6 章节侧栏进度（LineSidebar）

- UI：`components/bits/LineSidebar.tsx` + `LineSidebar.css`（参考 open-platform-landing；**不含**整页 snap）
- 挂载：`components/layout/section-progress.tsx`（仅首页 `app/page.tsx`）
- 数据：`content/section-progress.ts` 的 `{ id, href, label }[]`，DOM 上各 Section 须有对应 `id`
- 行为：滚动 spy 更新 `activeIndex`；点击 `scrollIntoView` / 回顶；`labelsOnHover` 悬停才展开文案
- 样式 token：`--link`、`--foreground-faint`、`--border-strong`（见 `globals.css`）
- 首页 `html.home-section-progress` 隐藏原生滚动条；`< lg` 不显示侧栏
- **不要**再引入 `HomeScrollSnap` 一类桌面翻页，除非产品明确要求

### 5.7 图片

`next.config.ts` 允许远程图：

- `q1.qlogo.cn`（QQ 头像）
- `tietu.mclists.cn`（列表站 banner）

本地资源放 `public/images/`。导航图标用 `public/logo.png`（立方体）；横版字标仍在 `public/images/logo.png`。

### 5.8 SEO 与合规

- `app/layout.tsx` 的 `metadata`（title / description / keywords / Open Graph / icons）
- App Router 图标：`app/favicon.ico`、`app/icon.png`
- 百度验证：`verification.other['baidu-site-verification']` + `public/baidu_verify_*.html`
- Footer 保留 ICP：蜀ICP备2025122461号

---

## 6. 常见改动 Checklist

### 改服务器文案或换整合包

1. 编辑 `content/servers.ts`
2. 确认 Uptime Kuma 上对应 monitor 的 **id** 是否变化，更新 `monitorId`
3. 本地 `npm run dev` 看服务器卡片与监控条状态是否正确

### 改轮询间隔

编辑 `content/site.ts` 的 `statusPollIntervalMs`（毫秒）。建议不低于 Uptime Kuma 探测间隔。

### 改站点外链 / QQ 群

编辑 `content/site.ts`（`qqGroupUrl`、`links`、`statusPageUrl` 等）。

### 改 FAQ / 团队 / 合作伙伴

分别编辑 `content/faq.ts`、`content/team.ts`。

### 改帮助文档

编辑 `content/docs.ts`（`docsNav` + `docsSections`），区块类型：`p` / `h3` / `ul` / `ol` / `command` / `callout`。

### 换监控源 slug

改 `content/site.ts` 中 `statusApiBase`、`statusSlug`。

### 改首页章节侧栏

1. 编辑 `content/section-progress.ts`（顺序即侧栏顺序）
2. 对应 Section 根节点设置相同 `id`（Hero 为 `hero`）
3. 桌面 `lg+` 预览近距悬停与滚动高亮；小屏侧栏隐藏属预期

---

## 7. ESLint 范围

`eslint.config.mjs` 忽略：

- `.next/**`、`out/**`、`build/**`
- `legacy/**`（旧静态站备份，不参与 lint）

请勿在业务代码中再引用 `legacy/` 内资源路径。

---

## 8. 关键文件速查

| 能力 | 路径 |
|------|------|
| 状态合并 / 类型 | `lib/uptime-kuma.ts` |
| 状态 API | `app/api/status/route.ts` |
| 客户端轮询 | `hooks/use-live-status.ts` |
| 监控 + 服务器挂载 | `components/sections/live-status-block.tsx` |
| 监控条 UI | `components/sections/status-strip.tsx` |
| 服务器卡片 | `components/sections/servers.tsx` |
| 公告 Modal | `components/status/incident-announcement.tsx` |
| Dialog 原语 | `components/ui/dialog.tsx` |
| 章节侧栏 | `components/layout/section-progress.tsx` |
| LineSidebar | `components/bits/LineSidebar.tsx` |
| 章节数据 | `content/section-progress.ts` |

---

## 9. 相关链接

- 监控页：https://status.cduestc.fun/status/cduestc
- Uptime Kuma Internal API 说明：https://github.com/louislam/uptime-kuma/wiki/Internal-API
- shadcn/ui：https://ui.shadcn.com
- Motion：https://motion.dev
- 设计规范：[DESIGN.md](./DESIGN.md)
- 变更历史：[CHANGELOG.md](./CHANGELOG.md)
