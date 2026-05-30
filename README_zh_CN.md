# 思源代码增强 ✨

> 让思源笔记中的代码块更好看、更专业、兼容性更强。

## 功能特性

### 🎨 视觉美化
- **Mac/Windows 风格窗口装饰** — 代码块顶部显示红黄绿圆点，像真正的编辑器窗口
- **代码块标题/文件名** — 用 `title:"app.js"` 语法在代码块头部显示文件名
- **语言图标徽章** — 显示语言名称 + Emoji 图标（🐍 Python、⚡ JavaScript、🦀 Rust...）
- **10+ 语法高亮主题** — One Dark Pro、Dracula、Nord、Catppuccin、Tokyo Night、Gruvbox、Monokai、Rosé Pine、Solarized、GitHub Light/Dark
- **圆角阴影** — 现代化外观，可自定义圆角大小和阴影强度

### 📝 实用增强
- **行高亮** — 用 `hl:3` 或 `hl:3-5` 高亮指定行，支持多种颜色
- **Diff 标记** — 用 `ins:3` 和 `del:5` 标记新增行（绿色）和删除行（红色）
- **代码折叠** — 长代码块自动折叠 + 展开按钮，用 `fold` 参数强制折叠
- **行号偏移** — 用 `ln:10` 从第 10 行开始编号
- **终端模拟** — `terminal` 参数模拟终端样式
- **复制按钮增强** — 点击后显示反馈提示

### ⚙️ 自定义配置
- **设置面板** — 可配置主题、窗口风格、阴影、圆角等
- **主题预览** — 实时预览主题效果后再应用
- **逐块参数** — 对每个代码块进行精细控制

## 参数语法

在代码块语言标记后添加参数：

```
```language [title:"文件名"] [hl:行号] [ln:起始行号] [fold] [terminal] [ins:行号] [del:行号] [wrap] [noline]
```

### 使用示例

| 语法 | 效果 |
|------|------|
| ` ```python title:"app.py" ` | 在标题栏显示文件名 "app.py" |
| ` ```javascript hl:3-5 ` | 黄色高亮第 3-5 行 |
| ` ```rust hl:3,7,10-12 ` | 高亮第 3、7、10-12 行 |
| ` ```go title:"main.go" hl:5-8 fold ` | 文件名 + 高亮 + 默认折叠 |
| ` ```bash terminal ` | 终端模拟样式 |
| ` ```diff ins:3 del:5 ` | Diff 标记：第3行新增、第5行删除 |
| ` ```sql ln:50 ` | 行号从 50 开始 |
| ` ```python wrap ` | 启用行自动换行 |

### 多彩行高亮

用 `hl#颜色:行号` 实现不同颜色的高亮：

| 颜色 | 语法 | 示例 |
|------|------|------|
| 红色 | `hl#red:3` | ` ```python hl#red:3 ` |
| 绿色 | `hl#green:5-7` | ` ```js hl#green:5-7 ` |
| 蓝色 | `hl#blue:10` | ` ```ts hl#blue:10 ` |
| 黄色 | `hl#yellow:2-4` | ` ```go hl#yellow:2-4 ` |
| 橙色 | `hl#orange:6` | ` ```py hl#orange:6 ` |
| 紫色 | `hl#purple:1,3` | ` ```rb hl#purple:1,3 ` |
| 粉色 | `hl#pink:8` | ` ```c hl#pink:8 ` |
| 青色 | `hl#cyan:4-6` | ` ```java hl#cyan:4-6 ` |

## 内置主题

### 深色主题
One Dark Pro、Dracula、Nord、Catppuccin Mocha、Tokyo Night、Gruvbox Dark、Monokai Pro、Rosé Pine、Solarized Dark、GitHub Dark

### 浅色主题
GitHub Light、Solarized Light

## 安装

### 从思源集市安装（推荐）
1. 打开思源笔记 → 设置 → 集市
2. 搜索 "代码增强" 或 "Code Enhancer"
3. 点击安装

### 手动安装
1. 从 [Releases](https://github.com/songyaocode/siyuan-code-enhancer/releases) 下载最新 `package.zip`
2. 解压到思源工作空间：`{workspace}/data/plugins/siyuan-code-enhancer/`
3. 重启思源或在 设置 → 集市 → 已下载 中启用插件

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（实时编译）
pnpm run dev

# 生产构建
pnpm run build
```

## 设置项

| 设置 | 默认值 | 描述 |
|------|--------|------|
| 主题 | 跟随思源 | 语法高亮主题 |
| 窗口风格 | Mac | 头部装饰风格 |
| 圆角 | 12px | 代码块圆角大小 |
| 阴影 | 中等 | 阴影强度 |
| 最大高度 | 0（不限） | 超过自动折叠 |
| 折叠阈值 | 20 行 | 超过行数自动折叠 |
| 显示行号 | ✅ | 是否显示行号 |
| 语言图标 | ✅ | 语言 Emoji 徽章 |
| Diff 标记 | ✅ | 是否启用 Diff |
| 行高亮 | ✅ | 是否启用行高亮 |
| 终端模拟 | ✅ | 是否启用终端样式 |

## 快捷键

| 快捷键 | 操作 |
|--------|------|
| `⇧⌘R` | 重新渲染所有代码块 |

## 兼容性

- 思源笔记 ≥ 3.0.12
- 全平台：Windows、macOS、Linux、Docker、Android、iOS
- 全前端：桌面端、移动端、浏览器端

## 许可证

MIT License

## 致谢

灵感来源：
- [Obsidian Code Styler](https://github.com/mayurankv/Obsidian-Code-Styler)
- [Obsidian CodeblockCustomizer](https://github.com/mugiwara85/CodeblockCustomizer)
- [Obsidian Shiki Highlighter](https://github.com/mProjectsCode/obsidian-shiki-plugin)
- [Expressive Code](https://github.com/expressive-code/expressive-code)