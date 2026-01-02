/**
 * Content Slide - Key point with supporting text
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function contentSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;
  const number = config.number
    ? String(config.number).padStart(2, "0")
    : undefined;

  return wrapInHTML(
    `
    <!-- Decorative element -->
    <div style="
      position: absolute;
      top: 80px;
      right: 80px;
      width: 150px;
      height: 150px;
      border: 4px solid ${colors.electricLime};
      opacity: 0.2;
      transform: rotate(45deg);
    "></div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 80px;">
      ${
        number
          ? `
        <span style="
          font-family: ${fonts.body};
          font-size: 24px;
          letter-spacing: 4px;
          color: ${colors.electricLime};
          margin-bottom: 40px;
        ">${number}</span>
      `
          : ""
      }

      <!-- Lime accent bar -->
      <div style="
        width: 80px;
        height: 8px;
        background: ${colors.electricLime};
        margin-bottom: 40px;
      "></div>

      <h2 style="
        font-family: ${fonts.heading};
        font-size: 72px;
        font-weight: 800;
        line-height: 1.1;
        margin: 0;
        color: ${textColor};
        max-width: 850px;
      ">${config.title}</h2>

      ${
        config.subtitle
          ? `
        <p style="
          font-family: ${fonts.body};
          font-size: 32px;
          line-height: 1.5;
          color: ${textColor};
          opacity: 0.7;
          margin-top: 40px;
          max-width: 750px;
        ">${config.subtitle}</p>
      `
          : ""
      }

      ${
        config.bodyText
          ? `
        <p style="
          font-family: ${fonts.body};
          font-size: 28px;
          line-height: 1.6;
          color: ${textColor};
          opacity: 0.5;
          margin-top: 30px;
          max-width: 700px;
        ">${config.bodyText}</p>
      `
          : ""
      }
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
