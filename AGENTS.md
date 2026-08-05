<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Docs (本仓库约定)

有用户可见或架构相关改动时，**同一轮必须同步**更新 `docs/`：

1. [docs/CHANGELOG.md](docs/CHANGELOG.md) — 记 Added / Changed / Fixed，必要时升 `0.x.y`
2. [docs/DEVLOG.md](docs/DEVLOG.md) — 记背景、决策、验证（按模板追加）
3. 涉及数据流 / 目录 / 常见改法 → [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)
4. 涉及视觉 / 交互规范 → [docs/DESIGN.md](docs/DESIGN.md)
5. 版本号变更时同步 [docs/README.md](docs/README.md) 索引里的「当前版本」

索引见 [docs/README.md](docs/README.md)。不要只改代码不改文档。
