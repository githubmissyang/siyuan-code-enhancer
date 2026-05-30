/**
 * Code Block Renderer — observes DOM and applies decorations to code blocks
 */

import { parseCodeBlockParams } from "../utils/parser";
import { decorateCodeBlock, undecorateCodeBlock, findUndecoratedCodeBlocks, extractLanguageTag } from "../utils/dom";
import { ThemeManager } from "./theme-manager";

export class CodeRenderer {
    private observer: MutationObserver | null = null;
    private themeManager: ThemeManager;
    private debounceTimer: ReturnType<typeof setTimeout> | null = null;

    constructor(themeManager: ThemeManager) {
        this.themeManager = themeManager;
    }

    /**
     * Start observing the DOM for code blocks
     */
    start(): void {
        // Initial scan
        this.scanAndDecorate();

        // Observe DOM changes for dynamically loaded content
        this.observer = new MutationObserver((mutations) => {
            let shouldScan = false;

            for (const mutation of mutations) {
                // Check if code blocks were added
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node instanceof Element) {
                            if (node.classList?.contains("code-block") ||
                                node.querySelector?.(".code-block")) {
                                shouldScan = true;
                                break;
                            }
                        }
                    }
                }
                // Check if attributes changed on code blocks (e.g., language tag)
                if (mutation.type === "attributes" &&
                    mutation.target instanceof Element &&
                    mutation.target.classList?.contains("code-block")) {
                    shouldScan = true;
                }

                if (shouldScan) break;
            }

            if (shouldScan) {
                this.debouncedScan();
            }
        });

        // Observe the main content area
        const layout = document.querySelector(".layout") || document.querySelector("#layouts") || document.body;
        this.observer.observe(layout, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["data-language", "class"],
        });
    }

    /**
     * Stop observing
     */
    stop(): void {
        this.observer?.disconnect();
        this.observer = null;
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = null;
        }
    }

    /**
     * Scan all code blocks and apply decorations
     */
    scanAndDecorate(): void {
        const codeBlocks = document.querySelectorAll(".code-block");
        codeBlocks.forEach((block) => {
            if (block instanceof Element && !block.hasAttribute("data-ce-decorated")) {
                this.decorateSingleBlock(block);
            }
        });
    }

    /**
     * Force re-render all code blocks
     */
    rerenderAll(): void {
        const codeBlocks = document.querySelectorAll(".code-block");
        codeBlocks.forEach((block) => {
            if (block instanceof Element) {
                undecorateCodeBlock(block);
                this.decorateSingleBlock(block);
            }
        });
    }

    /**
     * Decorate a single code block
     */
    private decorateSingleBlock(block: Element): void {
        const rawTag = extractLanguageTag(block);
        const params = parseCodeBlockParams(rawTag);

        // Apply theme class
        const themeClass = this.themeManager.getCurrentThemeClass();
        if (themeClass) {
            block.classList.add(themeClass);
        }

        // Apply the decoration
        decorateCodeBlock(block, params);

        // Apply max height if configured
        const maxHeight = this.themeManager.getSetting("maxHeight");
        if (maxHeight && maxHeight > 0) {
            const codeContent = block.querySelector(".hljs") || block.querySelector(".protyle-code");
            if (codeContent instanceof HTMLElement) {
                codeContent.style.maxHeight = `${maxHeight}px`;
                codeContent.style.overflowY = "auto";
            }
        }
    }

    /**
     * Debounced scan to avoid excessive DOM operations
     */
    private debouncedScan(): void {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            this.scanAndDecorate();
            this.debounceTimer = null;
        }, 200);
    }
}
