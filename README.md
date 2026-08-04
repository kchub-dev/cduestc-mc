# CDUCRAFT | 科成 MC 官网

电子科技大学成都学院 Minecraft 公益服务器官网。

## 技术栈

- Next.js (App Router) + React + TypeScript
- Tailwind CSS + shadcn/ui
- Motion
- Uptime Kuma 公开 API（服务/整合包运行状态）

## 开发

```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 脚本

- `npm run dev` — 开发服务器
- `npm run build` — 生产构建
- `npm run start` — 启动生产服务
- `npm run lint` — ESLint

## 状态数据

首页服务器与 Web 监控状态来自：

- `https://status.cduestc.fun/api/status-page/cduestc`
- `https://status.cduestc.fun/api/status-page/heartbeat/cduestc`

站点内代理：`GET /api/status`（约 60s 缓存）。

文案与监控映射见 `content/servers.ts`、`content/site.ts`。

## 目录说明

- `app/` — 路由与页面
- `components/` — UI 与区块组件
- `content/` — 站点文案配置
- `lib/uptime-kuma.ts` — 监控数据层
- `legacy/` — 旧版静态 HTML 备份
- `docs/` — 开发文档（指南 / 变更历史 / 开发日志）

## 开发文档

更完整的说明见：

- [设计规范](./docs/DESIGN.md)
- [开发指南与技术要点](./docs/DEVELOPMENT.md)
- [变更历史](./docs/CHANGELOG.md)
- [开发日志](./docs/DEVLOG.md)
- [文档索引](./docs/README.md)
