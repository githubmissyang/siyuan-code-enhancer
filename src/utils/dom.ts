/**
 * DOM utilities for code block enhancement
 */

import { CodeBlockParams, getLanguageIcon, getLanguageDisplayName, parseCodeBlockParams } from "./parser";

const DECO_ATTR = "data-ce-decorated";
const PARAM_ATTR = "data-ce-params";

/**
 * Find all code blocks in a protyle container that haven't been decorated yet
 */
export function findUndecoratedCodeBlocks(container: Element): Element[] {
    return Array.from(container.querySelectorAll(".code-block")).filter(
        (el) => !el.hasAttribute(DECO_ATTR)
    );
}

/**
 * Parse the language tag from a code block element
 */
export function extractLanguageTag(codeBlock: Element): string {
    const langEl = codeBlock.querySelector(".protyle-action__language");
    if (langEl) {
        return langEl.textContent?.trim() || "";
    }
    const dataLang = codeBlock.getAttribute("data-language");
    if (dataLang) {
        return dataLang;
    }
    return "";
}

/**
 * Apply decorations to a code block based on parsed params
 */
export function decorateCodeBlock(codeBlock: Element, params: CodeBlockParams): void {
    // Mark as decorated
    codeBlock.setAttribute(DECO_ATTR, "true");
    codeBlock.setAttribute(PARAM_ATTR, JSON.stringify(params));

    // Add language class for theme targeting
    if (params.language) {
        codeBlock.classList.add(`ce-lang-${params.language.toLowerCase()}`);
    }

    // Apply window decoration (header bar)
    applyWindowDecoration(codeBlock, params);

    // Apply line highlighting
    applyLineHighlight(codeBlock, params);

    // Apply diff markers
    applyDiffMarkers(codeBlock, params);

    // Apply line number offset
    applyLineNumberOffset(codeBlock, params);

    // Apply terminal style
    if (params.terminal) {
        codeBlock.classList.add("ce-terminal");
    }

    // Apply fold
    if (params.fold) {
        codeBlock.classList.add("ce-folded");
        applyFold(codeBlock);
    }

    // Apply wrap
    if (params.wrap) {
        codeBlock.classList.add("ce-wrap");
    }
}

/**
 * Apply window decoration header bar (Mac/Windows style)
 */
function applyWindowDecoration(codeBlock: Element, params: CodeBlockParams): void {
    if (codeBlock.querySelector(".ce-header")) return;

    const header = document.createElement("div");
    header.className = "ce-header";

    // Window buttons (Mac style)
    const buttons = document.createElement("div");
    buttons.className = "ce-header-buttons";
    buttons.innerHTML = `
        <span class="ce-btn ce-btn-close"></span>
        <span class="ce-btn ce-btn-minimize"></span>
        <span class="ce-btn ce-btn-maximize"></span>
    `;
    header.appendChild(buttons);

    // Title / filename
    const titleEl = document.createElement("div");
    titleEl.className = "ce-header-title";
    if (params.title) {
        titleEl.textContent = params.title;
        titleEl.title = params.title;
    } else {
        const langIcon = getLanguageIcon(params.language);
        const langName = getLanguageDisplayName(params.language);
        titleEl.innerHTML = `<span class="ce-lang-icon">${langIcon}</span> ${langName}`;
    }
    header.appendChild(titleEl);

    // Language icon badge (shown when title is present)
    if (params.title) {
        const badge = document.createElement("div");
        badge.className = "ce-lang-badge";
        const langIcon = getLanguageIcon(params.language);
        badge.innerHTML = `${langIcon} ${getLanguageDisplayName(params.language)}`;
        header.appendChild(badge);
    }

    // Insert header before the code content
    const codeContent = codeBlock.querySelector(".hljs") || codeBlock.querySelector(".protyle-code");
    if (codeContent) {
        codeContent.parentElement?.insertBefore(header, codeContent);
    } else {
        codeBlock.insertBefore(header, codeBlock.firstChild);
    }
}

/**
 * Apply line highlighting to specific lines
 */
function applyLineHighlight(codeBlock: Element, params: CodeBlockParams): void {
    const highlightLines = params.highlightLines || [];
    const highlightColors = params.highlightColors;
    if (!highlightLines.length && !(highlightColors && highlightColors.size)) return;

    const lines = getCodeLines(codeBlock);
    const defaultHlColor = "rgba(255, 213, 79, 0.15)";

    for (let i = 0; i < lines.length; i++) {
        const lineNum = i + 1;
        const lineEl = lines[i] as HTMLElement;
        // Check for colored highlight first
        const color = highlightColors?.get(lineNum);
        if (color) {
            lineEl.classList.add("ce-line-highlight");
            lineEl.style.backgroundColor = hexToRgba(color, 0.15);
            continue;
        }
        // Default yellow highlight
        if (highlightLines.includes(lineNum)) {
            lineEl.classList.add("ce-line-highlight");
            lineEl.style.backgroundColor = defaultHlColor;
        }
    }
}

/**
 * Apply diff markers (insert/delete lines)
 */
function applyDiffMarkers(codeBlock: Element, params: CodeBlockParams): void {
    const insertLines = params.insertLines || [];
    const deleteLines = params.deleteLines || [];
    if (!insertLines.length && !deleteLines.length) return;

    const lines = getCodeLines(codeBlock);

    for (let i = 0; i < lines.length; i++) {
        const lineNum = i + 1;
        if (insertLines.includes(lineNum)) {
            lines[i].classList.add("ce-line-insert");
        }
        if (deleteLines.includes(lineNum)) {
            lines[i].classList.add("ce-line-delete");
        }
    }
}

/**
 * Apply line number offset
 */
function applyLineNumberOffset(codeBlock: Element, params: CodeBlockParams): void {
    if (!params.lineStart || params.lineStart <= 1) return;

    const lineNumEls = codeBlock.querySelectorAll(".protyle-linenumber__element");
    lineNumEls.forEach((el, i) => {
        const newNum = params.lineStart! + i;
        el.textContent = String(newNum);
    });
}

/**
 * Apply code fold — add a expand button and collapse content
 */
function applyFold(codeBlock: Element): void {
    const content = codeBlock.querySelector(".hljs") || codeBlock.querySelector(".protyle-code");
    if (!content) return;

    const expandBtn = document.createElement("div");
    expandBtn.className = "ce-expand-btn";
    expandBtn.innerHTML = "▸ 展开代码";
    expandBtn.title = "点击展开/折叠";

    expandBtn.addEventListener("click", () => {
        codeBlock.classList.toggle("ce-folded");
        codeBlock.classList.toggle("ce-expanded");
        expandBtn.innerHTML = codeBlock.classList.contains("ce-folded")
            ? "▸ 展开代码"
            : "▾ 折叠代码";
    });

    content.parentElement?.insertBefore(expandBtn, content.nextSibling);
}

/**
 * Get all code lines from a code block
 */
function getCodeLines(codeBlock: Element): Element[] {
    const lines = codeBlock.querySelectorAll(".hljs-line");
    if (lines.length > 0) return Array.from(lines);

    const hljs = codeBlock.querySelector(".hljs");
    if (hljs) {
        return Array.from(hljs.children).filter(
            (el) => el.tagName !== "BR" || el.classList.contains("hljs-line")
        );
    }

    return [];
}

/**
 * Convert hex color to rgba with alpha
 */
function hexToRgba(hex: string, alpha: number): string {
    if (!hex.startsWith("#")) return hex;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Remove all decorations from a code block (for cleanup/re-render)
 */
export function undecorateCodeBlock(codeBlock: Element): void {
    codeBlock.removeAttribute(DECO_ATTR);
    codeBlock.removeAttribute(PARAM_ATTR);

    // Remove injected elements
    codeBlock.querySelectorAll(".ce-header, .ce-expand-btn, .ce-lang-badge").forEach((el) => {
        el.remove();
    });

    // Remove injected classes
    codeBlock.classList.remove("ce-terminal", "ce-folded", "ce-expanded", "ce-wrap");
    const langClasses = Array.from(codeBlock.classList).filter((c) => c.startsWith("ce-lang-"));
    langClasses.forEach((c) => codeBlock.classList.remove(c));

    // Remove line-level decorations
    codeBlock.querySelectorAll(".ce-line-highlight, .ce-line-insert, .ce-line-delete").forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.classList.remove("ce-line-highlight", "ce-line-insert", "ce-line-delete");
        htmlEl.style.backgroundColor = "";
    });
}

/**
 * Re-decorate a code block (useful after content changes)
 */
export function redecorateCodeBlock(codeBlock: Element): void {
    undecorateCodeBlock(codeBlock);
    const rawTag = extractLanguageTag(codeBlock);
    if (rawTag) {
        const params = parseCodeBlockParams(rawTag);
        decorateCodeBlock(codeBlock, params);
    }
}