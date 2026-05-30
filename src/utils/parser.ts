/**
 * Code block parameter parser
 * Parses extended parameters from the code block language tag
 *
 * Syntax: ```language [title:"filename"] [hl:3-5] [ln:10] [fold] [terminal] [ins:3] [del:5] [wrap] [noline]
 */

export interface CodeBlockParams {
    language: string;
    title?: string;
    highlightLines?: number[];
    highlightRanges?: Array<[number, number]>;
    lineStart?: number;
    fold?: boolean;
    terminal?: boolean;
    insertLines?: number[];
    deleteLines?: number[];
    wrap?: boolean;
    noLineNumbers?: boolean;
    highlightColors?: Map<number, string>;
}

const COLOR_MAP: Record<string, string> = {
    "red": "#ff6b6b",
    "green": "#51cf66",
    "blue": "#339af0",
    "yellow": "#fcc419",
    "orange": "#ff922b",
    "purple": "#cc5de8",
    "pink": "#f06595",
    "cyan": "#22b8cf",
};

/**
 * Parse a code block language tag with extended parameters
 * @param rawTag The raw language tag string (e.g. "python title:\"app.py\" hl:3-5 fold")
 * @returns Parsed parameters
 */
export function parseCodeBlockParams(rawTag: string): CodeBlockParams {
    const params: CodeBlockParams = {
        language: "",
        highlightLines: [],
        highlightRanges: [],
        highlightColors: new Map(),
        insertLines: [],
        deleteLines: [],
    };

    if (!rawTag || rawTag.trim() === "") {
        return params;
    }

    let remaining = rawTag.trim();

    // Extract language (first word)
    const langMatch = remaining.match(/^(\w+)/);
    if (langMatch) {
        params.language = langMatch[1];
        remaining = remaining.slice(langMatch[0].length).trim();
    }

    // Parse title parameter: title:"filename" or title:filename
    const titleMatch = remaining.match(/title:"([^"]+)"|title:(\S+)/);
    if (titleMatch) {
        params.title = titleMatch[1] || titleMatch[2];
        remaining = remaining.replace(titleMatch[0], "").trim();
    }

    // Parse line highlight: hl:3 or hl:3-5 or hl:3,5,7 or hl:3-5,8,10-12
    const hlMatch = remaining.match(/hl:([\d,\-]+)/);
    if (hlMatch) {
        parseHighlightSpec(hlMatch[1], params);
        remaining = remaining.replace(hlMatch[0], "").trim();
    }

    // Parse colored highlights: hl#color:3 or hl#red:3-5
    const colorHlMatches = remaining.matchAll(/hl#(\w+):([\d,\-]+)/g);
    for (const m of colorHlMatches) {
        const colorName = m[1];
        const color = COLOR_MAP[colorName] || colorName;
        const lines = parseLineSpec(m[2]);
        if (!params.highlightColors) params.highlightColors = new Map();
        for (const line of lines) {
            params.highlightColors.set(line, color);
        }
        remaining = remaining.replace(m[0], "").trim();
    }

    // Parse line start: ln:10
    const lnMatch = remaining.match(/ln:(\d+)/);
    if (lnMatch) {
        params.lineStart = parseInt(lnMatch[1], 10);
        remaining = remaining.replace(lnMatch[0], "").trim();
    }

    // Parse insert lines: ins:3 or ins:3,5,7
    const insMatch = remaining.match(/ins:([\d,\-]+)/);
    if (insMatch) {
        params.insertLines = parseLineSpec(insMatch[1]);
        remaining = remaining.replace(insMatch[0], "").trim();
    }

    // Parse delete lines: del:3 or del:3,5,7
    const delMatch = remaining.match(/del:([\d,\-]+)/);
    if (delMatch) {
        params.deleteLines = parseLineSpec(delMatch[1]);
        remaining = remaining.replace(delMatch[0], "").trim();
    }

    // Parse boolean flags
    if (remaining.includes("fold")) {
        params.fold = true;
        remaining = remaining.replace("fold", "").trim();
    }
    if (remaining.includes("terminal")) {
        params.terminal = true;
        remaining = remaining.replace("terminal", "").trim();
    }
    if (remaining.includes("wrap")) {
        params.wrap = true;
        remaining = remaining.replace("wrap", "").trim();
    }
    if (remaining.includes("noline")) {
        params.noLineNumbers = true;
        remaining = remaining.replace("noline", "").trim();
    }

    return params;
}

/**
 * Parse a line specification like "3,5,7" or "3-5,8" into individual line numbers
 */
function parseLineSpec(spec: string): number[] {
    const lines: number[] = [];
    const parts = spec.split(",");
    for (const part of parts) {
        if (part.includes("-")) {
            const [start, end] = part.split("-").map(Number);
            for (let i = start; i <= end; i++) {
                lines.push(i);
            }
        } else {
            lines.push(parseInt(part, 10));
        }
    }
    return lines;
}

/**
 * Parse highlight spec into lines and ranges
 */
function parseHighlightSpec(spec: string, params: CodeBlockParams): void {
    const parts = spec.split(",");
    for (const part of parts) {
        if (part.includes("-")) {
            const [start, end] = part.split("-").map(Number);
            if (params.highlightRanges) params.highlightRanges.push([start, end]);
            // Also add individual lines for easier lookup
            for (let i = start; i <= end; i++) {
                if (params.highlightLines) params.highlightLines.push(i);
            }
        } else {
            if (params.highlightLines) params.highlightLines.push(parseInt(part, 10));
        }
    }
}

/**
 * Language icon mapping — returns a unicode/emoji icon for common languages
 */
export function getLanguageIcon(language: string): string {
    const icons: Record<string, string> = {
        "python": "🐍",
        "py": "🐍",
        "javascript": "⚡",
        "js": "⚡",
        "typescript": "🔷",
        "ts": "🔷",
        "java": "☕",
        "c": "🔵",
        "cpp": "🔵",
        "c++": "🔵",
        "csharp": "🟣",
        "cs": "🟣",
        "c#": "🟣",
        "go": "🐹",
        "golang": "🐹",
        "rust": "🦀",
        "ruby": "💎",
        "rb": "💎",
        "php": "🐘",
        "swift": "🦅",
        "kotlin": "🟠",
        "kt": "🟠",
        "scala": "🔴",
        "r": "📊",
        "sql": "🗃️",
        "shell": "🖥️",
        "bash": "🖥️",
        "sh": "🖥️",
        "zsh": "🖥️",
        "powershell": "🖥️",
        "html": "🌐",
        "css": "🎨",
        "scss": "🎨",
        "sass": "🎨",
        "less": "🎨",
        "xml": "📄",
        "json": "📋",
        "yaml": "📋",
        "yml": "📋",
        "toml": "📋",
        "markdown": "📝",
        "md": "📝",
        "dockerfile": "🐳",
        "docker": "🐳",
        "lua": "🌙",
        "perl": "🐪",
        "vim": "✏️",
        "diff": "🔄",
        "git": "🔀",
        "latex": "📖",
        "matlab": "📈",
        "elixir": "🧪",
        "erlang": "📞",
        "haskell": "λ",
        "clojure": "🪄",
        "dart": "🎯",
        "vue": "💚",
        "react": "⚛️",
        "svelte": "🔥",
        "angular": "🅰️",
        "graphql": "◈",
        "protobuf": "📦",
        "makefile": "🔧",
        "gradle": "🧱",
        "nginx": "🌐",
        "terraform": "🏗️",
        "ansible": "🤖",
    };
    return icons[language.toLowerCase()] || "💻";
}

/**
 * Get display-friendly language name
 */
export function getLanguageDisplayName(language: string): string {
    const names: Record<string, string> = {
        "py": "Python",
        "js": "JavaScript",
        "ts": "TypeScript",
        "rb": "Ruby",
        "cs": "C#",
        "kt": "Kotlin",
        "sh": "Shell",
        "yml": "YAML",
        "md": "Markdown",
        "cpp": "C++",
        "go": "Go",
    };
    return names[language.toLowerCase()] || language.toUpperCase();
}