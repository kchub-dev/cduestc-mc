# 设计规范（Design）

科成 MC / CDUCRAFT 官网视觉与交互规范。实现以 [`app/globals.css`](../app/globals.css) 与各 Section 组件为准。

---

## 1. 设计定位

| 维度 | 定义 |
|------|------|
| 气质 | 现代简约 × Minecraft 夜空氛围 |
| 基调 | 强制深色品牌站（非跟随系统亮色） |
| 继承 | 旧站 token：`#0e1630` / `#a399fa` / `#171f38` / `#808dad` |
| 强化 | 草绿「在线 / 生机」、像素边、方块网格底纹 |
| 避免 | 通用 AI 紫渐变模板、厚重玻璃拟态、首屏信息过载 |

一句话：**像夜间主城门户——干净、可辨识、能一眼看出是科成 MC。**

---

## 2. 品牌与信息层级

### 2.1 品牌测试

去掉导航后，首屏仍应能识别品牌。品牌名（科成 MC / CDUCRAFT）必须是 Hero 一级信号，标题不得压过品牌。

### 2.2 Hero 预算（首屏）

只保留：

1. 品牌标识（像素小标签）
2. 一句主标题
3. 一句短支撑文案
4. 一组 CTA（主：加群；次：查看服务器）
5. 一张全宽氛围底图

不放：统计条、赛程、地址块、促销贴纸、浮动 badge。

### 2.3 区块原则

每个 Section **一个目的、一个主标题、通常一句说明**。

| Section | 目的 |
|---------|------|
| Hero | 品牌与入群 |
| StatusStrip（`#status`） | 游戏服 + Web 实时健康一览 |
| Servers | 游玩入口 + 实时状态 + 公告摘要/Modal |
| Features | 特色能力 |
| About | 社团 / 服务器定位 |
| FAQ | 常见问题 |
| Team / Partners | 人与合作 |
| Footer | 备案与友情链接 |

---

## 3. 色彩

### 3.1 核心色板

| Token | 色值 | 用途 |
|-------|------|------|
| `--background` | `#0e1630` | 页面底 |
| `--card` / `--muted` | `#171f38` | 卡片、区块面 |
| `--accent` | `#1f2a4a` | 轻强调面 |
| `--foreground` | `#f3f5fb` | 主文字 |
| `--muted-foreground` | `#808dad` | 次要文字 |
| `--primary` / `--mc-grass` | `#5d9c3f` | 主按钮、在线、生机强调 |
| `--secondary` / `--mc-lavender` | `#a399fa` | 次级强调、eyebrow、链接点缀 |
| `--mc-dirt` | `#8b6b4a` | 泥土褐（备用边框 / 质感） |
| `--destructive` | `#eb4a4a` | 离线、错误、危险提示 |
| `--border` | `rgba(163, 153, 250, 0.22)` | 细边 |

### 3.2 语义色（状态）

| 状态 | 表现 |
|------|------|
| 在线 (up) | 草绿圆点 / Badge `default` |
| 离线 (down) | 红色圆点 / Badge `destructive` |
| 等待 / 维护 / 未知 | 琥珀点 `#f0c040` / Badge `secondary` |

### 3.3 类型标签（服务器）

- **原版生存**：草绿半透明底 + 草绿字
- **整合包**：琥珀半透明底 + 琥珀字

### 3.4 使用规则

- Primary（草绿）用于：**主 CTA、在线态、关键成功语义**
- Secondary（淡紫）用于：**装饰线、图标、次级边框 hover**，不作整页大面积渐变底
- 不要用高饱和紫→靛的大块渐变作为主视觉

---

## 4. 字体

| 角色 | 字体 | 用法 |
|------|------|------|
| 正文 / 标题 | **Outfit**（`--font-outfit`） | 全站默认 sans |
| 像素标签 | **Press Start 2P**（`--font-pixel`） | Hero / Docs 小标签，字号宜小（≈10–12px） |
| 等宽 | **Geist Mono** | 指令、地址条、代码块 |

规则：

- 正文避免 Inter / Roboto / 系统默认栈作为品牌字体
- 像素字体仅作点缀，不做大段正文
- 标题层级：`text-3xl`–`text-6xl`（Hero），Section 标题约 `text-3xl`–`text-4xl`

---

## 5. 布局与间距

| 项 | 约定 |
|----|------|
| 内容宽 | `.container-site` → `max-w-6xl` + 水平 padding |
| Section 垂直 | `.section-pad` → `py-16 md:py-24` |
| 锚点偏移 | `scroll-mt-20` / `scroll-mt-24`（避开固定导航） |
| 圆角 | 偏小：`--radius: 0.35rem`（方块感，非大胶囊） |
| 导航高度 | 固定顶栏 `h-16` |

网格：页面底使用 24px 淡紫细网格叠加（见 `body` background），营造方块平面感，不抢内容。

---

## 6. 组件与材质

### 6.1 何时用「卡片」

- **默认少用卡片**
- 允许：服务器列表、FAQ 容器、文档文章块、团队/伙伴条目（承载交互或分组信息）
- Hero **禁止**卡片包裹主视觉

### 6.2 像素边（`.pixel-border`）

硬阴影 + 微内高光，模拟方块边缘，而非多层柔光：

```css
box-shadow:
  3px 3px 0 0 rgba(0, 0, 0, 0.35),
  inset 0 1px 0 rgba(255, 255, 255, 0.04);
```

### 6.3 区块小标题（`.heading-eyebrow`）

左侧短横线 + 淡紫小字，对应旧站 `heading-title h3::before` 语言。

### 6.4 按钮

- 主按钮：草绿底（`Button` default）
- 次按钮：描边（`outline`）
- 避免过大圆角 pill；保持与 `--radius` 一致

### 6.5 shadcn 组件

在暗色 token 下使用；新增组件后检查暗色对比度（文字 / 边框 / focus ring）。

### 6.6 监控与公告 Modal

- 监控条：按 Kuma 分组（Mod / Game / Web）列出状态点 + 可用性 + 延迟；显示「实时同步 · 60s」与更新时间
- 服务器公告：列表仅摘要（约 120 字）+「查看全文」；点击打开 Dialog
- Modal：标题 = incident.title；正文可滚动；支持加粗与链接；页脚主操作「关闭」（草绿）、次操作「打开监控页」
- 遮罩：半透明黑 + 轻 blur，内容区使用 `.pixel-border` 与卡片面色

---

## 7. 图像与装饰

| 资源 | 用途 |
|------|------|
| `/images/bc.png` | Hero 全宽氛围底（加左右/上下暗色渐变保证可读） |
| `/images/logo.png` | 导航品牌标 |
| `/images/partners/*` | 合作伙伴 Logo |
| QQ / mclists 远程图 | 头像与列表站 banner（`next.config` 白名单） |

规则：

- Hero 图必须 **edge-to-edge**，不要缩成圆角媒体卡
- 不在 Hero 上叠浮动贴纸、促销 chip
- 旧站大量漂浮 shape PNG **不再作为主装饰**，减少视觉噪音

---

## 8. 动效（Motion）

意图克制，默认 **2–3 类主动画**：

1. **Hero 入场**：opacity + 轻位移
2. **区块 Reveal**：`whileInView` 渐入（`components/motion/reveal.tsx`）
3. **状态点呼吸**：仅在线态轻微 opacity 脉冲

约束：

- `useReducedMotion()` / `prefers-reduced-motion` 时关闭位移与循环动画
- 不为装饰而堆叠无限旋转、光晕闪烁
- 时长约 0.4–0.7s，缓动偏 `ease-out`（如 `[0.22, 1, 0.36, 1]`）

---

## 9. 响应式

| 断点思路 | 行为 |
|----------|------|
| `< lg` | 顶栏收为 Sheet 菜单 |
| 服务器 / 特色 / 关于 | 单列 → 双列网格 |
| 文档 | 侧栏在桌面 sticky；小屏改为上方导航块 |
| Hero 标题 | `text-4xl` → `sm:text-5xl` → `md:text-6xl` |

触摸目标：按钮与导航链接保持可点区域，避免过密。

---

## 10. 文案语气

- 简洁、校园公益、偏「一起玩」而非商业营销腔
- 服务器地址统一：**加群后公告获取**（不在官网裸奔 IP）
- 状态文案用「在线 / 离线 / 等待 / 维护」，避免生造词

---

## 11. 实现对照表

| 设计意图 | 代码位置 |
|----------|----------|
| 色板与工具类 | `app/globals.css` |
| 字体加载 | `app/layout.tsx` |
| Hero | `components/sections/hero.tsx` |
| 实时监控挂载 | `components/sections/live-status-block.tsx` |
| 监控条 | `components/sections/status-strip.tsx` |
| 服务器卡片 | `components/sections/servers.tsx` |
| 状态徽章 | `components/status/status-badge.tsx` |
| 公告 Modal | `components/status/incident-announcement.tsx` |
| Dialog | `components/ui/dialog.tsx` |
| 滚动入场 | `components/motion/reveal.tsx` |
| 文档页版式 | `app/docs/page.tsx` |

改色优先改 CSS 变量，避免在组件里散落硬编码色值（Hero 遮罩渐变可保留与 `--background` 同色的局部值）。

---

## 12. 设计变更记录

| 日期 | 说明 |
|------|------|
| 2026-08-04 | 初版：由静态 HTML 深色站重构为 Next.js 设计系统，确立草绿主色与像素边语言 |
| 2026-08-04 | 监控条扩展为游戏服+Web；公告改为摘要 + Modal 全文 |
