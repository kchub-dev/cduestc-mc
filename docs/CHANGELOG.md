# 变更历史

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循语义化思路（当前为预发布 `0.x`）。

## [0.1.0] — 2026-08-04

### Added

- 基于 **Next.js 16 App Router + React 19 + TypeScript** 重建官网
- 接入 **Tailwind CSS 4 + shadcn/ui（base-nova）+ Motion**
- 首页区块：Hero、Web 服务监控条、服务器列表、特色、关于、FAQ、团队、合作伙伴、页脚
- 帮助文档路由 `/docs`（由旧 `docs.html` 内容迁移）
- Uptime Kuma 集成：
  - `lib/uptime-kuma.ts` 拉取 status-page + heartbeat 并合并
  - `GET /api/status` BFF（约 60s 缓存）
  - 服务器卡片展示在线状态、24h 可用性、延迟
  - Web 组监控条（官网 / 注册站 / 皮肤站）
  - Pin incident 摘要展示
- 文案配置层 `content/*`（site / servers / faq / team / docs）
- 深色 Minecraft 风格主题（草绿在线色、像素边框、网格底纹）
- SEO：`metadata`、百度站点验证文件、ICP 备案展示
- 自定义 404 页
- 开发文档：`docs/DEVELOPMENT.md`、`docs/CHANGELOG.md`、`docs/DEVLOG.md`

### Changed

- 服务器列表以监控页当前赛季为准：
  - 整合包：**香草纪元2**（monitor `155`）
  - 生存服：**单程票 OWT**（monitor `105`）
- 导航「帮助文档」改为站内 `/docs`（仍保留外链 mcio.dev 作为补充）
- 团队/合作伙伴由 Swiper 轮播改为静态网格布局

### Removed

- 生产路径对 Bootstrap / jQuery / Swiper / Font Awesome CDN 的依赖
- 预加载 GIF、损坏的 `status.js` 引用
- 旧站地图引导、社交账号等已注释未启用区块（未迁入新站）

### Migrated / Archived

- 原静态站点整体迁入 `legacy/`（含 `index.html`、`docs.html`、`assets/` 等），供对照与回滚参考

### Notes

- 部署需 **Node 服务**（ISR + Route Handler），非纯静态导出
- 远程图片域名白名单：`q1.qlogo.cn`、`tietu.mclists.cn`

---

## [Unreleased]

### Planned

- （按需）客户端定时刷新状态，无需整页 ISR
- （按需）赛季切换时的文档/服务器元数据后台化
- （按需）清理仓库内临时脚手架残留目录（若仍存在 `web-tmp/`）
