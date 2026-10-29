# 阶段 2 静态提案检查

日期：2026-10-30。范围仅为三套本地评审画板，非官网上线验收。

## 目标与上下文

比较三种视觉方向，保留真实产品图像、可读中文及移动端专门排版。画板导航文字和菜单为样式示意；主 CTA 跳到本页信息样式区。没有业务路由、购物或会员功能。

## 实际执行

本地启动：`python3 -m http.server 8765 --bind 127.0.0.1 --directory design/stage-2`。

检查命令：`/Users/andydexia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node design/stage-2/check-preview.cjs`。

最终退出码 **0**，输出 `cases: 15, failed: []`。环境为 macOS、系统 Google Chrome、Playwright、deviceScaleFactor 1；初始视口高度 900。HERO 截图高度为内容实际高度，不代表一屏内全部可见。截图调整视口后等待绘制完成，避免截图拼接伪影。

初次尝试遇到 Playwright 内置 Chromium 缺失，改用本机 Chrome；沙箱阻止本地监听和浏览器启动后，经工具自动审批运行隔离浏览器。未使用用户日常浏览器资料。

## 验收结果

| 项目 | 结果 | 证据/边界 |
|---|---|---|
| 三案 × 1440/1280/768/390/375 | PASS | [逐案例记录](preview-checks.json) |
| HTTP、图片加载、页面脚本错误、横向溢出、页内锚点 | PASS | 15 项案例均满足脚本断言 |
| 1440 与 390 截图 | PASS | [三案对照](screenshots/comparison.png)，screenshots 内各案 HERO/全稿 |
| 中文换行和主体裁切人工检查 | PASS（本轮可见范围） | C 手机字号调整为 36px，避免末字孤行；A/C 保留全身主体，B 半身素材保持鹅绒服完整 |
| B 图注可读性 | PASS（视觉复核） | 已加浅色底，避免深色裤装降低可读性；非全站对比度自动审计 |
| 五份原图完整性 | PASS | SHA256 与 assets/manifest.json 一致；原素材未修改 |
| 完整业务交互、正式字体、跨浏览器、屏幕阅读器 | NOT TESTED | 留待选定方向后的实现阶段 |
| lint/typecheck/build | NOT TESTED | 当前无业务应用和对应脚本，不编造构建结果 |
| Lighthouse、线上 LCP/INP/CLS、GEO 收录表现 | NOT TESTED | 本地原始大图画板不用于生产性能或平台效果结论 |
| 摄影/肖像授权、正式 Logo、SKU 映射 | 待品牌核验 | 视觉提案不代替授权与商品资料审批 |

## 约束与下一步

原图合计约 22MB，仅评审使用；正式站点需要响应式图片处理。紫色图片分辨率有限，需补原片。当前字体使用本机字体回退，候选字体及许可来源见 Design-System。三套样式保持各自语言，不在方向确认前混成完整首页。

方向选择由品牌决定；本次不进入阶段 3，不注册或部署 Sites。评审服务结束后关闭，HTML 与 PNG 保留，可直接打开 index.html 或另行启动本地预览。
