/**
 * Theme Manager — manages syntax highlighting themes for code blocks
 * Provides 10+ built-in themes and supports dynamic switching
 */

import { CodeEnhancerSettings, DEFAULT_SETTINGS } from "../settings/defaults";

export interface ThemeDefinition {
    id: string;
    name: string;
    isDark: boolean;
    cssClass: string;
    colors: {
        background: string;
        foreground: string;
        keyword: string;
        string: string;
        number: string;
        comment: string;
        function: string;
        variable: string;
        type: string;
        operator: string;
        punctuation: string;
        property: string;
        tag: string;
        attrName: string;
        attrValue: string;
        headerBg: string;
        headerFg: string;
        lineHighlight: string;
        insertBg: string;
        deleteBg: string;
    };
}

export const BUILT_IN_THEMES: ThemeDefinition[] = [
    {
        id: "one-dark",
        name: "One Dark Pro",
        isDark: true,
        cssClass: "ce-theme-one-dark",
        colors: {
            background: "#282c34",
            foreground: "#abb2bf",
            keyword: "#c678dd",
            string: "#98c379",
            number: "#d19a66",
            comment: "#5c6370",
            function: "#61afef",
            variable: "#e06c75",
            type: "#e5c07b",
            operator: "#56b6c2",
            punctuation: "#abb2bf",
            property: "#e06c75",
            tag: "#e06c75",
            attrName: "#d19a66",
            attrValue: "#98c379",
            headerBg: "#21252b",
            headerFg: "#9da5b4",
            lineHighlight: "rgba(255, 213, 79, 0.12)",
            insertBg: "rgba(80, 200, 120, 0.15)",
            deleteBg: "rgba(224, 108, 117, 0.15)",
        },
    },
    {
        id: "dracula",
        name: "Dracula",
        isDark: true,
        cssClass: "ce-theme-dracula",
        colors: {
            background: "#282a36",
            foreground: "#f8f8f2",
            keyword: "#ff79c6",
            string: "#f1fa8c",
            number: "#bd93f9",
            comment: "#6272a4",
            function: "#50fa7b",
            variable: "#f8f8f2",
            type: "#8be9fd",
            operator: "#ff79c6",
            punctuation: "#f8f8f2",
            property: "#66d9ef",
            tag: "#ff79c6",
            attrName: "#50fa7b",
            attrValue: "#f1fa8c",
            headerBg: "#21222c",
            headerFg: "#6272a4",
            lineHighlight: "rgba(255, 213, 79, 0.12)",
            insertBg: "rgba(80, 250, 123, 0.15)",
            deleteBg: "rgba(255, 85, 85, 0.15)",
        },
    },
    {
        id: "nord",
        name: "Nord",
        isDark: true,
        cssClass: "ce-theme-nord",
        colors: {
            background: "#2e3440",
            foreground: "#d8dee9",
            keyword: "#81a1c1",
            string: "#a3be8c",
            number: "#b48ead",
            comment: "#616e88",
            function: "#88c0d0",
            variable: "#d8dee9",
            type: "#8fbcbb",
            operator: "#81a1c1",
            punctuation: "#eceff4",
            property: "#88c0d0",
            tag: "#81a1c1",
            attrName: "#8fbcbb",
            attrValue: "#a3be8c",
            headerBg: "#272c36",
            headerFg: "#616e88",
            lineHighlight: "rgba(136, 192, 208, 0.1)",
            insertBg: "rgba(163, 190, 140, 0.15)",
            deleteBg: "rgba(191, 97, 106, 0.15)",
        },
    },
    {
        id: "catppuccin-mocha",
        name: "Catppuccin Mocha",
        isDark: true,
        cssClass: "ce-theme-catppuccin-mocha",
        colors: {
            background: "#1e1e2e",
            foreground: "#cdd6f4",
            keyword: "#cba6f7",
            string: "#a6e3a1",
            number: "#fab387",
            comment: "#6c7086",
            function: "#89b4fa",
            variable: "#cdd6f4",
            type: "#f9e2af",
            operator: "#89dceb",
            punctuation: "#bac2de",
            property: "#89b4fa",
            tag: "#f38ba8",
            attrName: "#fab387",
            attrValue: "#a6e3a1",
            headerBg: "#181825",
            headerFg: "#6c7086",
            lineHighlight: "rgba(249, 226, 175, 0.1)",
            insertBg: "rgba(166, 227, 161, 0.15)",
            deleteBg: "rgba(243, 139, 168, 0.15)",
        },
    },
    {
        id: "tokyo-night",
        name: "Tokyo Night",
        isDark: true,
        cssClass: "ce-theme-tokyo-night",
        colors: {
            background: "#1a1b26",
            foreground: "#a9b1d6",
            keyword: "#bb9af7",
            string: "#9ece6a",
            number: "#ff9e64",
            comment: "#565f89",
            function: "#7aa2f7",
            variable: "#c0caf5",
            type: "#2ac3de",
            operator: "#89ddff",
            punctuation: "#a9b1d6",
            property: "#73daca",
            tag: "#f7768e",
            attrName: "#ff9e64",
            attrValue: "#9ece6a",
            headerBg: "#16161e",
            headerFg: "#565f89",
            lineHighlight: "rgba(187, 154, 247, 0.1)",
            insertBg: "rgba(158, 206, 106, 0.15)",
            deleteBg: "rgba(247, 118, 142, 0.15)",
        },
    },
    {
        id: "gruvbox-dark",
        name: "Gruvbox Dark",
        isDark: true,
        cssClass: "ce-theme-gruvbox-dark",
        colors: {
            background: "#282828",
            foreground: "#ebdbb2",
            keyword: "#fe8019",
            string: "#b8bb26",
            number: "#d3869b",
            comment: "#665c54",
            function: "#fabd2f",
            variable: "#ebdbb2",
            type: "#83a598",
            operator: "#fe8019",
            punctuation: "#ebdbb2",
            property: "#689d6a",
            tag: "#fe8019",
            attrName: "#fabd2f",
            attrValue: "#b8bb26",
            headerBg: "#1d2021",
            headerFg: "#665c54",
            lineHighlight: "rgba(250, 189, 47, 0.1)",
            insertBg: "rgba(184, 187, 38, 0.15)",
            deleteBg: "rgba(251, 73, 52, 0.15)",
        },
    },
    {
        id: "monokai",
        name: "Monokai Pro",
        isDark: true,
        cssClass: "ce-theme-monokai",
        colors: {
            background: "#2d2a2e",
            foreground: "#fcfcfa",
            keyword: "#ff6188",
            string: "#ffd866",
            number: "#ab9df2",
            comment: "#727072",
            function: "#a9dc76",
            variable: "#fcfcfa",
            type: "#78dce8",
            operator: "#ff6188",
            punctuation: "#939293",
            property: "#78dce8",
            tag: "#ff6188",
            attrName: "#78dce8",
            attrValue: "#ffd866",
            headerBg: "#221f22",
            headerFg: "#727072",
            lineHighlight: "rgba(255, 216, 102, 0.1)",
            insertBg: "rgba(169, 220, 118, 0.15)",
            deleteBg: "rgba(255, 97, 136, 0.15)",
        },
    },
    {
        id: "rose-pine",
        name: "Rosé Pine",
        isDark: true,
        cssClass: "ce-theme-rose-pine",
        colors: {
            background: "#191724",
            foreground: "#e0def4",
            keyword: "#31748f",
            string: "#f6c177",
            number: "#ebbcba",
            comment: "#6e6a86",
            function: "#c4a7e7",
            variable: "#e0def4",
            type: "#9ccfd8",
            operator: "#31748f",
            punctuation: "#908caa",
            property: "#9ccfd8",
            tag: "#eb6f92",
            attrName: "#c4a7e7",
            attrValue: "#f6c177",
            headerBg: "#1f1d2e",
            headerFg: "#6e6a86",
            lineHighlight: "rgba(246, 193, 119, 0.1)",
            insertBg: "rgba(246, 193, 119, 0.15)",
            deleteBg: "rgba(235, 111, 146, 0.15)",
        },
    },
    {
        id: "solarized-dark",
        name: "Solarized Dark",
        isDark: true,
        cssClass: "ce-theme-solarized-dark",
        colors: {
            background: "#002b36",
            foreground: "#839496",
            keyword: "#859900",
            string: "#2aa198",
            number: "#d33682",
            comment: "#586e75",
            function: "#268bd2",
            variable: "#b58900",
            type: "#b58900",
            operator: "#859900",
            punctuation: "#839496",
            property: "#268bd2",
            tag: "#268bd2",
            attrName: "#b58900",
            attrValue: "#2aa198",
            headerBg: "#073642",
            headerFg: "#586e75",
            lineHighlight: "rgba(181, 137, 0, 0.1)",
            insertBg: "rgba(42, 161, 152, 0.15)",
            deleteBg: "rgba(211, 54, 130, 0.15)",
        },
    },
    {
        id: "github-dark",
        name: "GitHub Dark",
        isDark: true,
        cssClass: "ce-theme-github-dark",
        colors: {
            background: "#0d1117",
            foreground: "#c9d1d9",
            keyword: "#ff7b72",
            string: "#a5d6ff",
            number: "#79c0ff",
            comment: "#8b949e",
            function: "#d2a8ff",
            variable: "#ffa657",
            type: "#ff7b72",
            operator: "#ff7b72",
            punctuation: "#c9d1d9",
            property: "#79c0ff",
            tag: "#7ee787",
            attrName: "#79c0ff",
            attrValue: "#a5d6ff",
            headerBg: "#010409",
            headerFg: "#8b949e",
            lineHighlight: "rgba(210, 168, 255, 0.1)",
            insertBg: "rgba(63, 185, 80, 0.15)",
            deleteBg: "rgba(248, 81, 73, 0.15)",
        },
    },
    {
        id: "github-light",
        name: "GitHub Light",
        isDark: false,
        cssClass: "ce-theme-github-light",
        colors: {
            background: "#f6f8fa",
            foreground: "#24292f",
            keyword: "#cf222e",
            string: "#0a3069",
            number: "#0550ae",
            comment: "#6e7781",
            function: "#8250df",
            variable: "#953800",
            type: "#cf222e",
            operator: "#cf222e",
            punctuation: "#24292f",
            property: "#0550ae",
            tag: "#116329",
            attrName: "#0550ae",
            attrValue: "#0a3069",
            headerBg: "#f6f8fa",
            headerFg: "#6e7781",
            lineHighlight: "rgba(130, 80, 223, 0.08)",
            insertBg: "rgba(84, 174, 93, 0.15)",
            deleteBg: "rgba(205, 34, 46, 0.15)",
        },
    },
    {
        id: "solarized-light",
        name: "Solarized Light",
        isDark: false,
        cssClass: "ce-theme-solarized-light",
        colors: {
            background: "#fdf6e3",
            foreground: "#657b83",
            keyword: "#859900",
            string: "#2aa198",
            number: "#d33682",
            comment: "#93a1a1",
            function: "#268bd2",
            variable: "#b58900",
            type: "#b58900",
            operator: "#859900",
            punctuation: "#657b83",
            property: "#268bd2",
            tag: "#268bd2",
            attrName: "#b58900",
            attrValue: "#2aa198",
            headerBg: "#eee8d5",
            headerFg: "#93a1a1",
            lineHighlight: "rgba(181, 137, 0, 0.1)",
            insertBg: "rgba(42, 161, 152, 0.15)",
            deleteBg: "rgba(211, 54, 130, 0.15)",
        },
    },
];

export class ThemeManager {
    private settings: CodeEnhancerSettings;
    private currentThemeId: string;

    constructor(settings: CodeEnhancerSettings) {
        this.settings = { ...settings };
        this.currentThemeId = settings.theme;
        this.applyThemeToDOM();
    }

    /**
     * Update settings and reapply theme
     */
    updateSettings(settings: CodeEnhancerSettings): void {
        const oldTheme = this.settings.theme;
        this.settings = { ...settings };

        if (oldTheme !== settings.theme) {
            this.applyThemeToDOM();
        }
    }

    /**
     * Get the CSS class for the current theme
     */
    getCurrentThemeClass(): string {
        const theme = BUILT_IN_THEMES.find((t) => t.id === this.currentThemeId);
        return theme?.cssClass || "";
    }

    /**
     * Get a specific setting value
     */
    getSetting<K extends keyof CodeEnhancerSettings>(key: K): CodeEnhancerSettings[K] {
        return this.settings[key];
    }

    /**
     * Get the current theme definition
     */
    getCurrentTheme(): ThemeDefinition | undefined {
        return BUILT_IN_THEMES.find((t) => t.id === this.currentThemeId);
    }

    /**
     * Apply the current theme to the DOM by injecting a style element
     */
    private applyThemeToDOM(): void {
        // Remove any existing theme style element
        const existingEl = document.getElementById("ce-theme-style");
        if (existingEl) {
            existingEl.remove();
        }

        if (this.currentThemeId === "default") {
            // Use SiYuan's default theme, no override needed
            return;
        }

        const theme = this.getCurrentTheme();
        if (!theme) return;

        // Generate CSS that overrides highlight.js token colors for this theme
        const css = this.generateThemeOverrideCSS(theme);

        const styleEl = document.createElement("style");
        styleEl.id = "ce-theme-style";
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
    }

    /**
     * Generate CSS that overrides highlight.js token colors for a given theme
     */
    private generateThemeOverrideCSS(theme: ThemeDefinition): string {
        const c = theme.colors;
        const cls = theme.cssClass;
        return `
.${cls} {
    background: ${c.background} !important;
    border-radius: var(--ce-border-radius, 12px);
}
.${cls} .hljs {
    background: transparent !important;
    color: ${c.foreground} !important;
}
.${cls} .hljs-keyword,
.${cls} .hljs-selector-tag,
.${cls} .hljs-literal { color: ${c.keyword} !important; }
.${cls} .hljs-string,
.${cls} .hljs-addition,
.${cls} .hljs-template-tag { color: ${c.string} !important; }
.${cls} .hljs-number { color: ${c.number} !important; }
.${cls} .hljs-comment,
.${cls} .hljs-quote { color: ${c.comment} !important; font-style: italic; }
.${cls} .hljs-title,
.${cls} .hljs-title.function_,
.${cls} .hljs-section { color: ${c.function} !important; }
.${cls} .hljs-variable,
.${cls} .hljs-template-variable { color: ${c.variable} !important; }
.${cls} .hljs-type,
.${cls} .hljs-built_in { color: ${c.type} !important; }
.${cls} .hljs-operator { color: ${c.operator} !important; }
.${cls} .hljs-property,
.${cls} .hljs-attr { color: ${c.property} !important; }
.${cls} .hljs-tag { color: ${c.tag} !important; }
.${cls} .hljs-attribute { color: ${c.attrName} !important; }
.${cls} .hljs-meta { color: ${c.comment} !important; }
.${cls} .hljs-name { color: ${c.tag} !important; }
.${cls} .hljs-symbol,
.${cls} .hljs-bullet { color: ${c.variable} !important; }
.${cls} .hljs-subst { color: ${c.foreground} !important; }
.${cls} .hljs-deletion { color: ${c.attrValue} !important; background: ${c.deleteBg}; }
.${cls} .hljs-regexp { color: ${c.string} !important; }
.${cls} .ce-header { background: ${c.headerBg}; border-color: rgba(128,128,128,0.1); }
.${cls} .ce-header .ce-header-title,
.${cls} .ce-header .ce-lang-badge { color: ${c.headerFg}; }
.${cls} .ce-expand-btn { background: ${c.headerBg}; color: ${c.headerFg}; border-color: rgba(128,128,128,0.1); }
.${cls} .ce-line-insert { background: ${c.insertBg} !important; }
.${cls} .ce-line-delete { background: ${c.deleteBg} !important; }
`.trim();
    }
}

/**
 * Get theme by ID
 */
export function getThemeById(id: string): ThemeDefinition | undefined {
    return BUILT_IN_THEMES.find((t) => t.id === id);
}

/**
 * Get themes by dark/light mode
 */
export function getThemesByMode(isDark: boolean): ThemeDefinition[] {
    return BUILT_IN_THEMES.filter((t) => t.isDark === isDark);
}