/**
 * Quote Slide - Zitat mit Autor
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function quoteSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <!-- Large quote marks -->
    <div style="
      position: absolute;
      top: 120px;
      left: 80px;
      font-family: ${fonts.display};
      font-size: 300px;
      line-height: 1;
      color: ${colors.electricLime};
      opacity: 0.15;
    ">„</div>

    <div style="
      position: absolute;
      bottom: 200px;
      right: 80px;
      font-family: ${fonts.display};
      font-size: 300px;
      line-height: 1;
      color: ${colors.electricLime};
      opacity: 0.15;
    ">"</div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 100px;">
      <blockquote style="
        font-family: ${fonts.heading};
        font-size: 56px;
        font-weight: 600;
        line-height: 1.3;
        color: ${textColor};
        max-width: 850px;
        margin: 0;
        position: relative;
        z-index: 1;
      ">${config.title}</blockquote>

      ${
        config.quoteAuthor
          ? `
        <div style="
          margin-top: 60px;
          display: flex;
          align-items: center;
          gap: 20px;
        ">
          <div style="width: 50px; height: 3px; background: ${colors.electricLime};"></div>
          <span style="
            font-family: ${fonts.accent};
            font-size: 24px;
            font-weight: 500;
            letter-spacing: 2px;
            color: ${textColor};
            opacity: 0.7;
          ">${config.quoteAuthor}</span>
        </div>
      `
          : ""
      }
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
