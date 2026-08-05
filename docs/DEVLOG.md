# 开发日志

按时间记录重构过程中的关键决策、问题与结论。细节实现以代码与 [DEVELOPMENT.md](./DEVELOPMENT.md) 为准。

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

### 决策 / 原因

- 进度高亮靠 `--effect` rAF，不另造一套选中 CSS；配色走 `--link` 等 token 对齐参考站用法
- 刻度默认收起，悬停展开标签，避免常驻挡内容
- 明确排除 snap：用户只要侧栏进度，滚动保持原生连续行为

### 验证

- 选中章节 `--effect ≈ 1`，刻度变长变绿
- 悬停近距：相邻项 effect 呈梯度；标签在悬停侧栏时可见
- 入场：侧栏自右淡入滑入
- 无 `home-scroll-snap` 引用；控制台无相关 module-not-found

### 后续

- 增删首页章节时同步改 `content/section-progress.ts` 与对应 `id`
- 若以后要整页翻页，再单独评估，勿与侧栏进度绑死

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
