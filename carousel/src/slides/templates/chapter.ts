/**
 * Chapter Slide - Kapitel-Übergang
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function chapterSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;
  const chapterNum = config.chapterNumber || config.number || 1;
  const formattedNum = String(chapterNum).padStart(2, "0");

  return wrapInHTML(
    `
    <!-- Background number -->
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: ${fonts.display};
      font-size: 600px;
      line-height: 1;
      color: ${colors.electricLime};
      opacity: 0.06;
    ">${formattedNum}</div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 80px;">
      <!-- Chapter number -->
      <div style="
        font-family: ${fonts.display};
        font-size: 180px;
        line-height: 1;
        color: ${colors.electricLime};
        margin-bottom: 40px;
      ">${formattedNum}</div>

      <!-- Divider -->
      <div style="
        width: 80px;
        height: 4px;
        background: ${textColor};
        opacity: 0.3;
        margin-bottom: 40px;
      "></div>

      <!-- Chapter title -->
      <h1 style="
        font-family: ${fonts.display};
        font-size: 72px;
        line-height: 1.1;
        margin: 0;
        color: ${textColor};
        letter-spacing: 4px;
      ">${config.title}</h1>

      ${
        config.subtitle
          ? `
        <p style="
          font-family: ${fonts.heading};
          font-size: 32px;
          font-weight: 500;
          line-height: 1.4;
          color: ${textColor};
          opacity: 0.6;
          margin-top: 30px;
          max-width: 600px;
        ">${config.subtitle}</p>
      `
          : ""
      }
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
