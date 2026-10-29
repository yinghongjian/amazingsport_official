# 奇动 AMAZING SPORT 首页原型

阶段 3，仅首页。本地预览，无发布配置、支付、会员、CMS 或跟踪脚本。

## 技术栈

Astro 5 + TypeScript + 原生 CSS。静态输出保持正文、分类与款式资料可读取；交互仅覆盖菜单、筛选、折叠、场景与图片异常回退。依赖版本以 `pnpm-lock.yaml` 为准。构建只生成 `/`，未实现业务内页。

## 开发与检查

使用 Node.js 22+（本机验证 Node 24.19.0）和 pnpm 11：

```sh
pnpm install --frozen-lockfile
ASTRO_TELEMETRY_DISABLED=1 pnpm dev
pnpm lint
ASTRO_TELEMETRY_DISABLED=1 pnpm typecheck
ASTRO_TELEMETRY_DISABLED=1 pnpm build
pnpm preview
```

自动化检查针对构建产物，先运行 `python3 -m http.server 8766 --bind 127.0.0.1 --directory dist`，再执行 `pnpm test:ui`。默认用 macOS 系统 Chrome，可通过 `CHROME_PATH` 指定其他安装路径。测试使用独立浏览器上下文，不读取个人浏览器资料。

原型输出为 `dist/`；不要以 file:// 作为业务预览，因为资源按站点根路径引用。

## 内容与素材

- `src/data/home.ts`：导航、双维分类、手卡顺序的款式线索、场景、购买渠道配置。
- `src/components/`：品牌导航、响应式照片、系列模块。
- `src/styles/tokens.css`：A 方向语义 Token；`home.css`：首页布局。
- `src/scripts/home.ts`：轻量交互，未开发内页。
- `scripts/prepare-images.mjs`：从阶段 2 原始嵌图生成 WebP。运行 `node scripts/prepare-images.mjs`；不改变原始文件。
- `docs/Asset-Replacement.md`：逐项素材、事实和链接缺口。
- `docs/Homepage-QA.md`：本轮验收与截图索引。

用户本轮提供的 Logo 已替代文字占位。图片原片和授权状态分开管理；局部图使用 CSS 裁切，并标注来源。各类参数与证书未核验前不展示；店铺 URL 缺失时显示状态，不显示虚假购买按钮。正式发布前必须核对域名、主体、版权及渠道；当前 noindex 为有意设置。
