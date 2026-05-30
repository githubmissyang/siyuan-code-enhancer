# Code Enhancer for SiYuan Note ✨

> Make code blocks in SiYuan Note beautiful, professional, and feature-rich.

[中文文档](./README_zh_CN.md)

## Features

### 🎨 Visual Enhancements
- **Mac/Windows style window decoration** — Code blocks look like real editor windows with traffic light buttons
- **Code block titles** — Display filenames above code blocks with `title:"app.js"` syntax
- **Language icon badges** — Show language name + emoji icon (🐍 Python, ⚡ JavaScript, 🦀 Rust...)
- **10+ syntax highlight themes** — One Dark Pro, Dracula, Nord, Catppuccin, Tokyo Night, Gruvbox, Monokai, Rosé Pine, Solarized, GitHub Light/Dark
- **Rounded corners & shadows** — Modern, polished appearance with configurable border radius and shadow intensity

### 📝 Practical Enhancements
- **Line highlighting** — Highlight specific lines with `hl:3` or `hl:3-5` syntax, support multiple colors
- **Diff markers** — Mark added/deleted lines in green/red with `ins:3` and `del:5` parameters
- **Code folding** — Long code blocks auto-collapse with expand button, use `fold` to force fold
- **Line number offset** — Start line numbers from any value with `ln:10`
- **Terminal simulation** — `terminal` parameter for shell-style code blocks
- **Enhanced copy button** — Visual feedback on click

### ⚙️ Customization
- **Settings panel** — Configure theme, window style, shadow, border radius, etc.
- **Theme preview** — Live preview themes before applying
- **Per-block parameters** — Fine-grained control over each code block

## Parameter Syntax

Add parameters after the language name in code blocks:

```
```language [title:"filename"] [hl:lines] [ln:start] [fold] [terminal] [ins:lines] [del:lines] [wrap] [noline]
```

### Examples

| Syntax | Effect |
|--------|--------|
| ` ```python title:"app.py" ` | Show filename "app.py" in header |
| ` ```javascript hl:3-5 ` | Highlight lines 3-5 in yellow |
| ` ```rust hl:3,7,10-12 ` | Highlight lines 3, 7, and 10-12 |
| ` ```go title:"main.go" hl:5-8 fold ` | Title + highlight + default folded |
| ` ```bash terminal ` | Terminal simulation style |
| ` ```diff ins:3 del:5 ` | Diff markers on lines 3 and 5 |
| ` ```sql ln:50 ` | Start line numbers from 50 |
| ` ```python wrap ` | Enable line wrapping |

### Colored Highlights

Use `hl#color:lines` for different highlight colors:

| Color | Syntax | Example |
|-------|--------|---------|
| Red | `hl#red:3` | ` ```python hl#red:3 ` |
| Green | `hl#green:5-7` | ` ```js hl#green:5-7 ` |
| Blue | `hl#blue:10` | ` ```ts hl#blue:10 ` |
| Yellow | `hl#yellow:2-4` | ` ```go hl#yellow:2-4 ` |
| Orange | `hl#orange:6` | ` ```py hl#orange:6 ` |
| Purple | `hl#purple:1,3` | ` ```rb hl#purple:1,3 ` |
| Pink | `hl#pink:8` | ` ```c hl#pink:8 ` |
| Cyan | `hl#cyan:4-6` | ` ```java hl#cyan:4-6 ` |

## Built-in Themes

### Dark Themes
| Theme | Preview Colors |
|-------|----------------|
| One Dark Pro | Purple keywords, green strings, orange numbers |
| Dracula | Pink keywords, yellow strings, purple numbers |
| Nord | Blue keywords, green strings, purple numbers |
| Catppuccin Mocha | Mauve keywords, green strings, peach numbers |
| Tokyo Night | Purple keywords, green strings, orange numbers |
| Gruvbox Dark | Orange keywords, green strings, purple numbers |
| Monokai Pro | Pink keywords, yellow strings, purple numbers |
| Rosé Pine | Iris keywords, gold strings, foam types |
| Solarized Dark | Green keywords, cyan strings, magenta numbers |
| GitHub Dark | Red keywords, blue strings, blue numbers |

### Light Themes
| Theme | Preview Colors |
|-------|----------------|
| GitHub Light | Red keywords, blue strings, blue numbers |
| Solarized Light | Green keywords, cyan strings, magenta numbers |

## Installation

### From SiYuan Marketplace (Recommended)
1. Open SiYuan Note → Settings → Marketplace
2. Search for "Code Enhancer" or "代码增强"
3. Click Install

### Manual Installation
1. Download the latest `package.zip` from [Releases](https://github.com/songyaocode/siyuan-code-enhancer/releases)
2. Extract to your SiYuan workspace: `{workspace}/data/plugins/siyuan-code-enhancer/`
3. Restart SiYuan or enable the plugin in Settings → Marketplace → Downloaded

## Development

```bash
# Install dependencies
pnpm install

# Development mode (watch)
pnpm run dev

# Production build
pnpm run build
```

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Theme | Follow SiYuan | Syntax highlight theme |
| Window Style | Mac | Header decoration style |
| Border Radius | 12px | Code block corner radius |
| Shadow | Medium | Shadow intensity |
| Max Height | 0 (unlimited) | Auto-collapse height |
| Fold Threshold | 20 lines | Auto-fold line count |
| Show Line Numbers | ✅ | Display line numbers |
| Show Language Icon | ✅ | Language emoji badges |
| Enable Diff | ✅ | Diff markers support |
| Enable Line Highlight | ✅ | Line highlighting support |
| Enable Terminal | ✅ | Terminal simulation |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⇧⌘R` | Re-render all code blocks |

## Compatibility

- SiYuan Note ≥ 3.0.12
- All platforms: Windows, macOS, Linux, Docker, Android, iOS
- All frontends: Desktop, Mobile, Browser

## License

MIT License

## Acknowledgments

Inspired by:
- [Obsidian Code Styler](https://github.com/mayurankv/Obsidian-Code-Styler)
- [Obsidian CodeblockCustomizer](https://github.com/mugiwara85/CodeblockCustomizer)
- [Obsidian Shiki Highlighter](https://github.com/mProjectsCode/obsidian-shiki-plugin)
- [Expressive Code](https://github.com/expressive-code/expressive-code)
