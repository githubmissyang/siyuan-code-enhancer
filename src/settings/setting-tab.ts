/**
 * Settings tab UI for Code Enhancer
 * Uses a custom dialog approach since SiYuan's addSetting API may not be available
 */

import { CodeEnhancerSettings } from "./defaults";
import { BUILT_IN_THEMES } from "../render/theme-manager";

export class SettingTab {
    private settings: CodeEnhancerSettings;
    private onSave: (settings: CodeEnhancerSettings) => void;
    private i18n: Record<string, string>;

    constructor(settings: CodeEnhancerSettings, i18n: Record<string, string>, onSave: (settings: CodeEnhancerSettings) => void) {
        this.settings = { ...settings };
        this.i18n = i18n;
        this.onSave = onSave;
    }

    /**
     * Create the settings UI element
     */
    createSettingsUI(): HTMLElement {
        const wrapper = document.createElement("div");
        wrapper.className = "ce-settings";

        // Theme selector section
        const themeSection = this.createSection(
            "🎨 " + this.i18n.theme,
            this.createThemeSelector()
        );

        // Window style section
        const windowSection = this.createSection(
            "🪟 " + this.i18n.windowStyle,
            this.createWindowStyleSelector()
        );

        // Advanced settings section
        const advancedSection = this.createSection(
            "📐 " + this.i18n.advancedSettings,
            this.createAdvancedSettings()
        );

        // Preview section
        const previewSection = this.createSection(
            "✨ " + this.i18n.themePreview,
            '<div class="ce-theme-preview" id="ce-theme-preview"></div>'
        );

        wrapper.appendChild(themeSection);
        wrapper.appendChild(windowSection);
        wrapper.appendChild(advancedSection);
        wrapper.appendChild(previewSection);

        this.bindEvents(wrapper);
        return wrapper;
    }

    private createSection(title: string, content: string | HTMLElement): HTMLElement {
        const section = document.createElement("div");
        section.className = "ce-settings-section";
        const h3 = document.createElement("h3");
        h3.textContent = title;
        section.appendChild(h3);
        if (typeof content === "string") {
            const contentDiv = document.createElement("div");
            contentDiv.innerHTML = content;
            section.appendChild(contentDiv);
        } else {
            section.appendChild(content);
        }
        return section;
    }

    private createThemeSelector(): string {
        const options = [
            `<option value="default" ${this.settings.theme === "default" ? "selected" : ""}>${this.i18n.themeDefault}</option>`,
            ...BUILT_IN_THEMES.map((t) =>
                `<option value="${t.id}" ${this.settings.theme === t.id ? "selected" : ""}>${t.name} (${t.isDark ? "Dark" : "Light"})</option>`
            ),
        ].join("");

        return `<select class="ce-select" id="ce-theme" data-setting="theme">${options}</select>`;
    }

    private createWindowStyleSelector(): string {
        const styles = [
            { value: "mac", label: this.i18n.windowMac },
            { value: "windows", label: this.i18n.windowWindows },
            { value: "none", label: this.i18n.windowNone },
        ];
        return styles
            .map(
                (s) => `
            <label class="ce-radio-label">
                <input type="radio" name="windowStyle" value="${s.value}" ${this.settings.windowStyle === s.value ? "checked" : ""} data-setting="windowStyle">
                ${s.label}
            </label>
        `
            )
            .join("");
    }

    private createAdvancedSettings(): string {
        return `
            <div class="ce-setting-row">
                <label>${this.i18n.borderRadius}</label>
                <input type="range" min="0" max="24" value="${this.settings.borderRadius}" class="ce-range" id="ce-border-radius" data-setting="borderRadius">
                <span id="ce-border-radius-value">${this.settings.borderRadius}px</span>
            </div>
            <div class="ce-setting-row">
                <label>${this.i18n.maxHeight}</label>
                <input type="number" min="0" max="2000" value="${this.settings.maxHeight}" class="ce-input" id="ce-max-height" data-setting="maxHeight" placeholder="0">
                <span class="ce-hint">${this.i18n.maxHeightTip}</span>
            </div>
            <div class="ce-setting-row">
                <label>${this.i18n.foldThreshold}</label>
                <input type="number" min="0" max="500" value="${this.settings.foldThreshold}" class="ce-input" id="ce-fold-threshold" data-setting="foldThreshold" placeholder="0">
                <span class="ce-hint">${this.i18n.foldThresholdTip}</span>
            </div>
            <div class="ce-setting-row">
                <label>${this.i18n.shadowIntensity}</label>
                <select class="ce-select" id="ce-shadow" data-setting="shadowIntensity">
                    <option value="none" ${this.settings.shadowIntensity === "none" ? "selected" : ""}>${this.i18n.shadowNone}</option>
                    <option value="light" ${this.settings.shadowIntensity === "light" ? "selected" : ""}>${this.i18n.shadowLight}</option>
                    <option value="medium" ${this.settings.shadowIntensity === "medium" ? "selected" : ""}>${this.i18n.shadowMedium}</option>
                    <option value="strong" ${this.settings.shadowIntensity === "strong" ? "selected" : ""}>${this.i18n.shadowStrong}</option>
                </select>
            </div>
            <div class="ce-setting-row ce-toggles">
                <label class="ce-toggle-label">
                    <input type="checkbox" ${this.settings.showLineNumbers ? "checked" : ""} data-setting="showLineNumbers">
                    ${this.i18n.showLineNumbers}
                </label>
                <label class="ce-toggle-label">
                    <input type="checkbox" ${this.settings.showLanguageIcon ? "checked" : ""} data-setting="showLanguageIcon">
                    ${this.i18n.showLanguageIcon}
                </label>
                <label class="ce-toggle-label">
                    <input type="checkbox" ${this.settings.showCopyButton ? "checked" : ""} data-setting="showCopyButton">
                    ${this.i18n.showCopyButton}
                </label>
                <label class="ce-toggle-label">
                    <input type="checkbox" ${this.settings.enableDiff ? "checked" : ""} data-setting="enableDiff">
                    ${this.i18n.enableDiff}
                </label>
                <label class="ce-toggle-label">
                    <input type="checkbox" ${this.settings.enableLineHighlight ? "checked" : ""} data-setting="enableLineHighlight">
                    ${this.i18n.enableLineHighlight}
                </label>
                <label class="ce-toggle-label">
                    <input type="checkbox" ${this.settings.enableTerminal ? "checked" : ""} data-setting="enableTerminal">
                    ${this.i18n.enableTerminal}
                </label>
                <label class="ce-toggle-label">
                    <input type="checkbox" ${this.settings.inlineCodeHighlight ? "checked" : ""} data-setting="inlineCodeHighlight">
                    ${this.i18n.inlineCodeHighlight}
                </label>
            </div>
        `;
    }

    private bindEvents(wrapper: HTMLElement): void {
        // Theme change
        wrapper.querySelector("#ce-theme")?.addEventListener("change", (e) => {
            this.settings.theme = (e.target as HTMLSelectElement).value;
            this.saveAndNotify();
            this.updatePreview(wrapper);
        });

        // Window style change
        wrapper.querySelectorAll('input[name="windowStyle"]').forEach((input) => {
            input.addEventListener("change", (e) => {
                this.settings.windowStyle = (e.target as HTMLInputElement).value;
                this.saveAndNotify();
            });
        });

        // Border radius
        const radiusRange = wrapper.querySelector("#ce-border-radius");
        const radiusValue = wrapper.querySelector("#ce-border-radius-value");
        radiusRange?.addEventListener("input", (e) => {
            this.settings.borderRadius = parseInt((e.target as HTMLInputElement).value, 10);
            if (radiusValue) radiusValue.textContent = `${this.settings.borderRadius}px`;
            this.saveAndNotify();
        });

        // Max height
        wrapper.querySelector("#ce-max-height")?.addEventListener("change", (e) => {
            this.settings.maxHeight = parseInt((e.target as HTMLInputElement).value, 10) || 0;
            this.saveAndNotify();
        });

        // Fold threshold
        wrapper.querySelector("#ce-fold-threshold")?.addEventListener("change", (e) => {
            this.settings.foldThreshold = parseInt((e.target as HTMLInputElement).value, 10) || 0;
            this.saveAndNotify();
        });

        // Shadow
        wrapper.querySelector("#ce-shadow")?.addEventListener("change", (e) => {
            this.settings.shadowIntensity = (e.target as HTMLSelectElement).value;
            this.saveAndNotify();
        });

        // Toggles
        wrapper.querySelectorAll('.ce-toggles input[type="checkbox"]').forEach((input) => {
            input.addEventListener("change", (e) => {
                const target = e.target as HTMLInputElement;
                const setting = target.dataset.setting;
                if (setting && setting in this.settings) {
                    (this.settings as any)[setting] = target.checked;
                    this.saveAndNotify();
                }
            });
        });

        // Initial preview
        setTimeout(() => this.updatePreview(wrapper), 100);
    }

    private updatePreview(wrapper: HTMLElement): void {
        const previewEl = wrapper.querySelector("#ce-theme-preview");
        if (!previewEl) return;

        const theme = BUILT_IN_THEMES.find((t) => t.id === this.settings.theme);

        if (!theme) {
            previewEl.innerHTML = `<div class="ce-preview-default">使用思源默认主题样式</div>`;
            return;
        }

        const c = theme.colors;
        previewEl.innerHTML = `
            <div class="ce-preview-block" style="
                background: ${c.background};
                color: ${c.foreground};
                border-radius: ${this.settings.borderRadius}px;
                font-family: 'JetBrains Mono', 'Fira Code', monospace;
            ">
                <div class="ce-preview-header" style="background: ${c.headerBg};">
                    <span class="ce-preview-btn" style="background: #ff5f57;"></span>
                    <span class="ce-preview-btn" style="background: #febc2e;"></span>
                    <span class="ce-preview-btn" style="background: #28c840;"></span>
                    <span style="color: ${c.headerFg}; margin-left: 8px; font-size: 12px;">app.py</span>
                </div>
                <pre class="ce-preview-code" style="padding: 12px; margin: 0; font-size: 13px; line-height: 1.6;">
<span style="color: ${c.keyword}">def</span> <span style="color: ${c.function}">hello</span><span style="color: ${c.punctuation}">(</span><span style="color: ${c.variable}">name</span><span style="color: ${c.operator}">=</span><span style="color: ${c.string}">"world"</span><span style="color: ${c.punctuation}">):</span>
    <span style="color: ${c.comment}"># Say hello</span>
    <span style="color: ${c.keyword}">return</span> <span style="color: ${c.string}">f"Hello, </span><span style="color: ${c.variable}">{name}</span><span style="color: ${c.string}">!"</span></pre>
            </div>
        `;
    }

    private saveAndNotify(): void {
        this.onSave({ ...this.settings });
    }
}