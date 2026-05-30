/**
 * Default settings for Code Enhancer
 */

export interface CodeEnhancerSettings {
    theme: string;          // Theme ID or "default"
    windowStyle: string;    // "mac" | "windows" | "none"
    showLineNumbers: boolean;
    showLanguageIcon: boolean;
    showCopyButton: boolean;
    maxHeight: number;      // in px, 0 = no limit
    foldThreshold: number;  // line count threshold for auto-fold, 0 = no auto-fold
    borderRadius: number;   // in px
    shadowIntensity: string; // "none" | "light" | "medium" | "strong"
    enableDiff: boolean;
    enableLineHighlight: boolean;
    enableTerminal: boolean;
    inlineCodeHighlight: boolean;
    customCSS: string;
}

export const DEFAULT_SETTINGS: CodeEnhancerSettings = {
    theme: "default",
    windowStyle: "mac",
    showLineNumbers: true,
    showLanguageIcon: true,
    showCopyButton: true,
    maxHeight: 0,
    foldThreshold: 20,
    borderRadius: 12,
    shadowIntensity: "medium",
    enableDiff: true,
    enableLineHighlight: true,
    enableTerminal: true,
    inlineCodeHighlight: false,
    customCSS: "",
};