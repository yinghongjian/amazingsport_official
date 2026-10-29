# 阶段 3：首页原型验收

日期：2026-10-30。范围：仅首页；A 雪域极简主视觉 + B 技术信息排版。**工程与本轮交互检查通过，真实素材及购买资料未齐，不具备正式发布条件。**未进入子页面阶段，未部署或推送。

## 目标 → 上下文 → 约束 → 验收

- 目标：九章节品牌首页，双维分类，手机专门排版，真实可达的页内路径。
- 上下文：仓库此前只有文档与阶段 2 静态稿。新建 Astro + TypeScript + 原生 CSS；正文静态输出，少量脚本处理交互。采用用户本轮提供的 Logo。
- 约束：无已核验店铺 URL、完整场景原片、独立工艺特写与全部逐 SKU 证据；不虚构参数，不把原片局部说成微距实验，不把棚拍说成实景。内容缺口见 [素材替换清单](Asset-Replacement.md)。
- 验收：以下结论只对应本轮构建与浏览器范围，性能、跨浏览器和商业效果不外推。

## 命令与真实结果

运行环境：macOS，Node 24.19.0，pnpm 11.25.0；Astro 5.18.2。测试使用系统 Chrome 独立上下文、Playwright 1.64.1、axe-core Playwright；不读取个人浏览器数据。命令前设置 Node 所在 PATH 与 `ASTRO_TELEMETRY_DISABLED=1`。

| 检查 | 实际命令 | 最终退出码 | 证据 |
|---|---|---|---|
| lint | `node node_modules/eslint/bin/eslint.js src scripts astro.config.mjs` | 0 | [输出](evidence/stage-3/lint.txt)（无诊断输出） |
| 类型 | `node node_modules/astro/astro.js check` | 0 | [输出](evidence/stage-3/typecheck.txt)：0 errors / 0 warnings / 0 hints |
| 构建 | `node node_modules/astro/astro.js build` | 0 | [输出](evidence/stage-3/build.txt)：1 page，静态首页 |
| UI | `node scripts/check-home.mjs` | 0 | [输出](evidence/stage-3/ui-command.txt)、[逐宽度 JSON](evidence/stage-3/ui-results.json) |
| 图片转换 | `node scripts/prepare-images.mjs` | 0 | [原片与派生尺寸](../src/data/assets.json)，`public/images` 约 1.3MB |

这些命令对应 package.json 中 lint/typecheck/build/test:ui。构建预览通过 `python3 -m http.server 8766 --bind 127.0.0.1 --directory dist` 提供。预览服务仅用于本轮检查，交付后关闭；重新预览见 [README](../README.md)。

安装中遇到网络沙箱限制，经工具审批下载依赖；pnpm 首次因构建脚本白名单未配置而非零退出，配置仅允许 esbuild/sharp 后成功安装。首次 Astro 命令因用户目录 telemetry 写入受限失败，关闭 telemetry 后正常。UI 测试工具最初需显式 browser context，已修正。记录这些过程，不将失败尝试冒充最终通过。

## 逐项验收

| 项目 | 状态 | 结果与限制 |
|---|---|---|
| 01 导航 / Logo | PASS | 用户 Logo 保持比例；五项导航都指向实际首页章节；手机弹层可开关 |
| 02 HERO | PASS（原型） | 桌面左右构图、手机上文下图；单一主 CTA；响应式静态图为无视频回退。横版电影感实景/视频待补 |
| 03 品牌宣言 | PASS | 留白、大字号与少年探索叙事；不发布未经核验领导地位或数值承诺 |
| 04 旗舰系列 | PASS（原型） | 两维交叉筛选、16 款产品、展开/收起与真实空状态；保留手卡顺序；极寒不冒用其他款式。具体商品发布尚待核验 |
| 05 科技章节 | PARTIAL | 信息结构和证据说明可用；图片明确为衣身局部，尚无独立材料微距与可发布证明 |
| 06 生活方式 | PARTIAL | 校园/通勤/雪地/亲子四场景切换；棚拍标为穿搭示意；真实环境照片待补 |
| 07 工艺细节 | PARTIAL | 两组原片局部与错位排版；锁绒、缝制和功能验证需独立特写/资料 |
| 08 品牌世界 | PASS（原型） | 5–16 岁与家庭、鹅绒核心及搭配补充定位清楚；无虚构认证/奖项 |
| 09 购买渠道 / Footer | PARTIAL | 状态说明与回流路径可用；官方 URL 未提供，无购买按钮或虚假外跳 |
| 响应式 | PASS | 1440、1280、768、390、375 均无全页横向溢出、可见破图、失效锚点、页面脚本异常 |
| 交互 | PASS | 过滤组合、极寒空态、全部款式展开、资料折叠、四场景切换；菜单 Escape、关闭恢复焦点、Tab/Shift+Tab 循环、导航目标焦点 |
| 可访问性 | PASS（自动检查范围） | 五宽度 axe WCAG 2 A/AA、2.1 AA 无违规；一个 H1、语言标记、Alt、语义区域、焦点样式与减少动效。未做真人辅助技术测试 |
| 无动效偏好 | PASS | reduced-motion 下关闭平滑滚动及过渡，内容直接可读；不含自动播放视频、滚动劫持或强制横向滚动 |
| 降级 | PASS | 无 JS 时正文及 16 款产品仍在 HTML；模拟 HERO 图片请求失败时显示回退说明。分类和菜单完整交互需要 JS |
| SEO / GEO | PASS（原型基础） | title、description、lang、OG 基础文字及可读 HTML；所有分类/正文与可见内容同源。暂设 noindex；域名/canonical/OG 图及正式结构化数据留待发布配置 |
| 图片与素材保护 | PASS（来源记录） | 本地原片保留，WebP 等比缩放；不使用带 AI 标记的城市图或竞品素材。摄影/肖像发布授权仍待核验 |
| 性能 / RUM | NOT TESTED | 本轮未跑 Lighthouse、未测真实用户 LCP/INP/CLS；760KB 是全图片目录体积，不是首屏传输或性能成绩 |
| 正式站点其他功能 | NOT TESTED | 子页面、404、支付、会员、CMS、部署、安全/依赖全面审计、平台收录与购买成交均不属于本轮完成范围 |

## 人工截图复核与修正

已查看 1440/390 首屏与全页，并检查手机技术/工艺/品牌及菜单局部。修正了品牌章节装饰大字对比度、手机长标题平衡换行、HERO 图片高度；新增移动菜单首尾焦点循环后复测通过。桌面保留完整服装与靴子；手机整体图保持比例，长页面可正常滚动。实际设备与 Safari/Firefox 尚未验证。

| 画面 | 桌面 | 手机 |
|---|---|---|
| 首屏 | [1440](evidence/stage-3/home-1440-hero.png) | [390](evidence/stage-3/home-390-hero.png) |
| 全页 | [1440](evidence/stage-3/home-1440-full.png) | [390](evidence/stage-3/home-390-full.png) |
| 章节 | — | [科技](evidence/stage-3/mobile-technology.png)、[工艺](evidence/stage-3/mobile-craft.png)、[品牌](evidence/stage-3/mobile-brand.png)、[菜单](evidence/stage-3/mobile-menu.png) |

## 遗留项

1. P0 发布前：真实购买链接、产品/图片映射、逐款证据、摄影与肖像授权、主体与域名。
2. P1 视觉完善：高清透明 Logo、横版/手机专属大片、四场景实景、材料与工艺独立特写。
3. 下一阶段需用户验收首页后再授权；本轮停止在首页。没有自动建立子页面或发布站点。

## 用户追加要求：图名一一对应（本轮最终修订）

- PASS：16 款产品名称（仅合并排版空白）均匹配 PPT 原文；对应图片确实存在于指定幻灯片图片关系中，且人工复核联系表。见 [逐款映射](Product-Image-Mapping.md)。
- PASS：移除通用形象图与产品列表混排。每款显示独立缩略图，点击后主图、原名、货号与来源页同步；温区/系列交叉筛选会同步匹配图，空组合不显示错款大图。
- PASS：五宽度各逐一点击 16 款，断言主图路径、图片标题与该行数据相同；重新运行 lint/typecheck/build/UI，全部退出 0。
- PASS：HERO、科技和工艺局部、三张形象场景图均标注第 14–15 页对应旗舰款，不误称女生 ultra、云壳或校服神器。
- 来源事实不等同独立检测：保留照片权利、性能证明与购买 URL 的发布前核验。
- 最新系列截图：[1440](evidence/stage-3/collections-1440.png)、[390](evidence/stage-3/collections-390.png)。

### 截图说明

Chrome 版本 156.0.8078.73。章节截图为排版评审，截图时临时隐藏固定页眉与跳转正文链接，以免浏览器截取超出视口的元素时将其重复绘制在章节中；正式页面及完整首屏/全页截图未删除导航。工艺局部强制选择 1600px 源图，避免手机端 CSS 放大时误取 480px 图。

### 极寒补款 DER2659-AS（2026-10-30）

已增加品牌提供的“雪花泡芙5.0”图片及货号 DER2659-AS，归入极寒 / 雪花泡芙，独立于原 PPT 16 款记录，总计 17 款。来源标记为品牌补充资料，不伪造 PPT 页码。极寒单选展示该款，极寒×云壳仍为真实空态。图内宣传标注保留原样，没有复制为全品类参数。

验证：prepare-products 17 条映射完成；lint、typecheck（0 errors/warnings/hints）、build、五宽度 UI 均退出 0。五宽度逐款图名同步、极寒有图有款及不匹配空态通过，axe 未报告违规。新命令输出：[extreme-ui-command.txt](evidence/stage-3/extreme-ui-command.txt)。截图：[桌面](evidence/stage-3/extreme-1440.png)、[手机](evidence/stage-3/extreme-390.png)。Chrome 已刷新并选择极寒展示。

### 核心科技第 2–3 页增补验收

新增 MaterialTechnology.astro 与四张 PPT 内嵌原图的 WebP 副本；自研面料与甄选鹅绒正文可直接读取，原图可打开，轻量对比图可展开。保留材料适用边界，图内鼻炎宣传不作为医学承诺。lint/typecheck/build 均退出 0；五宽度 UI 检查退出 0，原图链接逐一返回 200，四张图片解码通过。初次测试误将折叠区未加载图片判为破图，已改为检查实际可见图片，并另行展开逐图验证。截图与日志位于 evidence/stage-3/technology/。Chrome 已刷新。
