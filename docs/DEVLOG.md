# 开发日志

按时间记录重构过程中的关键决策、问题与结论。细节实现以代码与 [DEVELOPMENT.md](./DEVELOPMENT.md) 为准。

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
3. 旧站 `.htaccess` 暗示曾用 Apache 静态托管；因需要服务端拉取与缓存，新站采用 **Node 部署**，不做 `output: 'export'`。

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
4. **首页构建期依赖外网 API**：失败时 catch 降级，避免整站构建挂死；正常情况 ISR 60s 刷新。

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
