/**
 * Stat Slide - Große Statistik-Zahl
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function statSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <!-- Background accent -->
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: ${fonts.display};
      font-size: 500px;
      line-height: 1;
      color: ${colors.electricLime};
      opacity: 0.06;
    ">${config.accentText || config.title}</div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 80px;">
      <!-- Big stat number -->
      <div style="
        font-family: ${fonts.display};
        font-size: 220px;
        line-height: 1;
        color: ${colors.electricLime};
        margin-bottom: 40px;
      ">${config.title}</div>

      ${
        config.subtitle
          ? `
        <p style="
          font-family: ${fonts.heading};
          font-size: 42px;
          font-weight: 600;
          line-height: 1.3;
          color: ${textColor};
          max-width: 700px;
          margin: 0;
        ">${config.subtitle}</p>
      `
          : ""
      }

      ${
        config.bodyText
          ? `
        <p style="
          font-family: ${fonts.body};
          font-size: 26px;
          line-height: 1.5;
          color: ${textColor};
          opacity: 0.6;
          margin-top: 30px;
          max-width: 600px;
        ">${config.bodyText}</p>
      `
          : ""
      }
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
