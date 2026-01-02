/**
 * Split Slide - Do/Don't Listen
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function splitSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;
  const leftLabel = config.leftLabel || "DON'T";
  const rightLabel = config.rightLabel || "DO";
  const leftItems = config.leftContent?.split("|") || [config.title];
  const rightItems = config.rightContent?.split("|") || [config.subtitle || ""];

  const renderList = (items: string[], isRight: boolean) =>
    items
      .map(
        (item) => `
      <div style="
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 24px;
      ">
        <span style="
          font-size: 24px;
          color: ${isRight ? colors.electricLime : textColor};
          opacity: ${isRight ? 1 : 0.5};
        ">${isRight ? "✓" : "✗"}</span>
        <span style="
          font-family: ${fonts.body};
          font-size: 26px;
          line-height: 1.4;
          color: ${textColor};
          opacity: ${isRight ? 1 : 0.7};
        ">${item.trim()}</span>
      </div>
    `
      )
      .join("");

  return wrapInHTML(
    `
    <div style="height: 100%; display: flex; padding: 60px;">
      <!-- Left Column -->
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-right: 40px;
        border-right: 3px solid ${colors.lime20};
      ">
        <span style="
          font-family: ${fonts.display};
          font-size: 48px;
          color: ${textColor};
          opacity: 0.5;
          margin-bottom: 50px;
        ">${leftLabel}</span>

        ${renderList(leftItems, false)}
      </div>

      <!-- Right Column -->
      <div style="
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 40px;
      ">
        <span style="
          font-family: ${fonts.display};
          font-size: 48px;
          color: ${colors.electricLime};
          margin-bottom: 50px;
        ">${rightLabel}</span>

        ${renderList(rightItems, true)}
      </div>
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
