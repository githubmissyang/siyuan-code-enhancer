// @ts-nocheck — SiYuan's Plugin types are resolved at runtime via externals
/**
 * Code Enhancer — SiYuan Note Plugin
 * Makes code blocks beautiful with themes, titles, line highlighting, diff markers, and more
 *
 * @author songyaocode
 * @link https://github.com/songyaocode/siyuan-code-enhancer
 */

import Plugin from "siyuan";
import { CodeRenderer } from "./render/code-renderer";
import { ThemeManager } from "./render/theme-manager";
import { SettingTab } from "./settings/setting-tab";
import { CodeEnhancerSettings, DEFAULT_SETTINGS } from "./settings/defaults";
import "./index.scss";

export default class CodeEnhancerPlugin extends Plugin {
    private renderer: CodeRenderer | null = null;
    private themeManager: ThemeManager | null = null;
    private settings: CodeEnhancerSettings = { ...DEFAULT_SETTINGS };
    private settingsTab: SettingTab | null = null;

    async onload() {
        // Load saved settings
        await this.loadSettings();

        // Initialize theme manager
        this.themeManager = new ThemeManager(this.settings);

        // Initialize renderer
        this.renderer = new CodeRenderer(this.themeManager);

        // Register settings panel
        this.settingsTab = new SettingTab(
            this.settings,
            this.i18n,
            (newSettings) => {
                this.settings = newSettings;
                this.saveSettings();
                this.applySettings();
            }
        );

        // Add top bar icon
        this.addTopBar({
            icon: "iconCode",
            title: this.i18n.pluginName,
            position: "right",
            callback: () => {
                this.toggleAllCodeBlocks();
            },
        });

        // Register command for re-rendering code blocks
        this.addCommand({
            langKey: "rerenderCodeBlocks",
            hotkey: "⇧⌘R",
            callback: () => {
                this.renderer?.rerenderAll();
            },
        });

        // Wait for layout ready, then start rendering
        this.eventBus.on("switch-protyle", () => {
            setTimeout(() => {
                this.renderer?.scanAndDecorate();
            }, 300);
        });

        // Listen for theme changes
        this.eventBus.on("click-editoricon", () => {
            setTimeout(() => {
                this.renderer?.scanAndDecorate();
            }, 500);
        });
    }

    async onLayoutReady() {
        // Start the code block renderer after the layout is fully ready
        setTimeout(() => {
            this.renderer?.start();
            this.applySettings();
        }, 500);
    }

    onunload() {
        this.renderer?.stop();
        this.renderer = null;
        this.themeManager = null;
        this.settingsTab = null;
    }

    /**
     * Load settings from persistent storage
     */
    private async loadSettings(): Promise<void> {
        try {
            const savedData = await this.loadData("settings.json");
            if (savedData) {
                this.settings = { ...DEFAULT_SETTINGS, ...savedData };
            }
        } catch (e) {
            console.warn("[Code Enhancer] Failed to load settings, using defaults", e);
            this.settings = { ...DEFAULT_SETTINGS };
        }
    }

    /**
     * Save settings to persistent storage
     */
    private async saveSettings(): Promise<void> {
        try {
            await this.saveData("settings.json", this.settings);
        } catch (e) {
            console.error("[Code Enhancer] Failed to save settings", e);
        }
    }

    /**
     * Apply current settings to the renderer and DOM
     */
    private applySettings(): void {
        // Update CSS variables based on settings
        document.documentElement.style.setProperty(
            "--ce-border-radius",
            `${this.settings.borderRadius}px`
        );

        // Shadow intensity
        const shadowMap: Record<string, string> = {
            none: "none",
            light: "0 2px 8px rgba(0,0,0,0.06)",
            medium: "0 4px 12px rgba(0,0,0,0.1)",
            strong: "0 8px 24px rgba(0,0,0,0.15)",
        };
        document.documentElement.style.setProperty(
            "--ce-shadow",
            shadowMap[this.settings.shadowIntensity] || shadowMap.medium
        );

        // Apply window style
        document.body.setAttribute("data-ce-window", this.settings.windowStyle);

        // Apply shadow attribute to decorated code blocks
        document.querySelectorAll(".code-block[data-ce-decorated]").forEach((block) => {
            if (this.settings.shadowIntensity !== "none") {
                block.setAttribute("data-ce-shadow", this.settings.shadowIntensity);
            } else {
                block.removeAttribute("data-ce-shadow");
            }
        });

        // Update theme
        if (this.themeManager) {
            this.themeManager.updateSettings(this.settings);
        }

        // Re-render all code blocks with new settings
        this.renderer?.rerenderAll();
    }

    /**
     * Toggle visibility of all decorations
     */
    private toggleAllCodeBlocks(): void {
        const decoratedBlocks = document.querySelectorAll(".code-block[data-ce-decorated]");
        const firstBlock = decoratedBlocks[0];
        if (!firstBlock) {
            this.renderer?.scanAndDecorate();
            return;
        }

        const isHidden = firstBlock.classList.contains("ce-decorations-hidden");
        decoratedBlocks.forEach((block) => {
            if (isHidden) {
                block.classList.remove("ce-decorations-hidden");
            } else {
                block.classList.add("ce-decorations-hidden");
            }
        });
    }
}