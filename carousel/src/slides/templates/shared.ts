/**
 * Shared utilities and helpers for slide templates
 */

import fs from "fs";
import path from "path";
import { baseCSS, colors, fonts } from "../../styles/carousel-theme.js";
import type { SlideConfig } from "../../types/carousel.types.js";

// Re-export theme for use in templates
export { colors, fonts };

// Swipe arrow SVG
const swipeArrow = `
  <div class="swipe-arrow">
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </div>
`;

/**
 * Wrap slide content in HTML document with theme
 */
export function wrapInHTML(
  content: string,
  options: { showArrow?: boolean; colorMode?: "dark" | "light" } = {}
): string {
  const { showArrow = true, colorMode = "dark" } = options;
  const isDark = colorMode === "dark";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${baseCSS}</style>
</head>
<body>
  <div class="slide ${isDark ? "slide-dark" : "slide-light"}">
    <div class="grid-overlay ${isDark ? "" : "grid-overlay-light"}"></div>
    <div class="noise-overlay ${isDark ? "" : "noise-overlay-light"}"></div>
    ${content}
    ${showArrow ? swipeArrow : ""}
  </div>
</body>
</html>
`;
}

/**
 * Get image source (supports path, URL, or base64)
 * For local files, converts to base64 data URL since Puppeteer blocks file:// URLs
 */
export function getImageSrc(config: SlideConfig): string {
  if (config.imageBase64) {
    return config.imageBase64;
  }
  if (config.imageUrl) {
    return config.imageUrl;
  }
  if (config.imagePath) {
    // Read file and convert to base64 data URL
    try {
      const absolutePath = path.isAbsolute(config.imagePath)
        ? config.imagePath
        : path.resolve(config.imagePath);
      const fileBuffer = fs.readFileSync(absolutePath);
      const base64 = fileBuffer.toString("base64");
      const ext = path.extname(config.imagePath).toLowerCase().slice(1);
      const mimeType = ext === "jpg" ? "jpeg" : ext;
      return `data:image/${mimeType};base64,${base64}`;
    } catch (err) {
      console.error(`Failed to load image: ${config.imagePath}`, err);
      return "";
    }
  }
  return "";
}

/**
 * Render image or gradient placeholder
 */
export function renderImageOrPlaceholder(config: SlideConfig, styles: string): string {
  const src = getImageSrc(config);
  if (src) {
    return `<img src="${src}" alt="${config.imageAlt || ""}" style="${styles} object-fit: cover; object-position: center center;" />`;
  }
  return `<div style="${styles} background: linear-gradient(135deg, ${colors.navy60} 0%, ${colors.lime20} 100%);"></div>`;
}
