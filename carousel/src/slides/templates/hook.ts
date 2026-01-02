/**
 * Hook Slide - Bold attention-grabbing opener
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function hookSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <!-- Large decorative shape -->
    <div style="
      position: absolute;
      bottom: -200px;
      right: -150px;
      width: 600px;
      height: 600px;
      background: ${colors.electricLime};
      border-radius: 50%;
      opacity: 0.12;
    "></div>

    <!-- Diagonal accent -->
    <div style="
      position: absolute;
      top: 0;
      right: 180px;
      width: 80px;
      height: 100%;
      background: ${colors.electricLime};
      transform: skewX(-12deg);
      opacity: 0.15;
    "></div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 80px;">
      <h1 style="
        font-family: ${fonts.display};
        font-size: 140px;
        line-height: 0.95;
        margin: 0;
        color: ${textColor};
        max-width: 900px;
      ">${config.title}</h1>

      ${
        config.subtitle
          ? `
        <div style="
          margin-top: 50px;
          display: flex;
          align-items: center;
          gap: 25px;
        ">
          <div style="width: 60px; height: 5px; background: ${colors.electricLime};"></div>
          <span style="
            font-family: ${fonts.heading};
            font-size: 36px;
            font-weight: 600;
            color: ${textColor};
            opacity: 0.7;
          ">${config.subtitle}</span>
        </div>
      `
          : ""
      }
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
