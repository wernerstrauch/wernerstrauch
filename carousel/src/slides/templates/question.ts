/**
 * Question Slide - Rhetorische Frage
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function questionSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <!-- Large question mark background -->
    <div style="
      position: absolute;
      top: 50%;
      right: 60px;
      transform: translateY(-50%);
      font-family: ${fonts.display};
      font-size: 700px;
      line-height: 1;
      color: ${colors.electricLime};
      opacity: 0.08;
    ">?</div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 80px;">
      <!-- Small accent -->
      <div style="
        width: 60px;
        height: 6px;
        background: ${colors.electricLime};
        margin-bottom: 50px;
      "></div>

      <h1 style="
        font-family: ${fonts.display};
        font-size: 100px;
        line-height: 1;
        margin: 0;
        color: ${textColor};
        max-width: 850px;
      ">${config.title}</h1>

      ${
        config.subtitle
          ? `
        <p style="
          font-family: ${fonts.heading};
          font-size: 36px;
          font-weight: 600;
          line-height: 1.4;
          color: ${textColor};
          opacity: 0.7;
          margin-top: 40px;
          max-width: 700px;
        ">${config.subtitle}</p>
      `
          : ""
      }
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
