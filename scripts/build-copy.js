import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, "..", "dist");

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

const filesToCopy = [
    { src: "plugin.json", dest: "plugin.json" },
    { src: "icon.png", dest: "icon.png" },
    { src: "preview.png", dest: "preview.png" },
    { src: "README.md", dest: "README.md" },
    { src: "README_zh_CN.md", dest: "README_zh_CN.md" },
    { src: "LICENSE", dest: "LICENSE" },
];

const dirsToCopy = [
    { src: "src/i18n", dest: "i18n" },
];

// Copy individual files
for (const { src, dest } of filesToCopy) {
    const srcPath = path.join(__dirname, "..", src);
    const destPath = path.join(distDir, dest);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${src} -> dist/${dest}`);
    } else {
        console.warn(`Skipped (not found): ${src}`);
    }
}

// Copy directories
for (const { src, dest } of dirsToCopy) {
    const srcPath = path.join(__dirname, "..", src);
    const destPath = path.join(distDir, dest);
    if (fs.existsSync(srcPath)) {
        fs.cpSync(srcPath, destPath, { recursive: true });
        console.log(`Copied: ${src} -> dist/${dest}`);
    } else {
        console.warn(`Skipped (not found): ${src}`);
    }
}

console.log("Build copy complete!");