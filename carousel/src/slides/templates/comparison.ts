/**
 * Comparison Slide - Vorher/Nachher
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function comparisonSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;
  const leftLabel = config.leftLabel || "VORHER";
  const rightLabel = config.rightLabel || "NACHHER";
  const leftContent = config.leftContent || config.title;
  const rightContent = config.rightContent || config.subtitle || "";

  return wrapInHTML(
    `
    <div style="height: 100%; display: flex; padding: 60px;">
      <!-- Left Column -->
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-right: 50px;
        border-right: 3px solid ${colors.lime20};
      ">
        <span style="
          font-family: ${fonts.accent};
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 4px;
          color: ${textColor};
          opacity: 0.5;
          margin-bottom: 30px;
        ">${leftLabel}</span>

        <div style="
          font-size: 80px;
          margin-bottom: 30px;
          opacity: 0.6;
        ">✗</div>

        <p style="
          font-family: ${fonts.heading};
          font-size: 36px;
          font-weight: 600;
          line-height: 1.3;
          color: ${textColor};
          opacity: 0.7;
        ">${leftContent}</p>
      </div>

      <!-- Right Column -->
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 50px;
      ">
        <span style="
          font-family: ${fonts.accent};
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 4px;
          color: ${colors.electricLime};
          margin-bottom: 30px;
        ">${rightLabel}</span>

        <div style="
          font-size: 80px;
          margin-bottom: 30px;
          color: ${colors.electricLime};
        ">✓</div>

        <p style="
          font-family: ${fonts.heading};
          font-size: 36px;
          font-weight: 700;
          line-height: 1.3;
          color: ${textColor};
        ">${rightContent}</p>
      </div>
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
