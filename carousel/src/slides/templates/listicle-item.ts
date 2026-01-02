/**
 * Listicle Item Slide - Big number with headline
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function listicleItemSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;
  const number = config.accentText || String(config.number).padStart(2, "0");

  return wrapInHTML(
    `
    <!-- Number background accent -->
    <div style="
      position: absolute;
      top: 50%;
      left: -100px;
      transform: translateY(-50%);
      font-family: ${fonts.display};
      font-size: 600px;
      line-height: 1;
      color: ${colors.electricLime};
      opacity: 0.08;
    ">${number}</div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 80px;">
      <!-- Number -->
      <div style="
        font-family: ${fonts.display};
        font-size: 200px;
        line-height: 1;
        color: ${colors.electricLime};
        margin-bottom: 30px;
      ">${number}</div>

      <!-- Title -->
      <h2 style="
        font-family: ${fonts.display};
        font-size: 90px;
        line-height: 1;
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
          line-height: 1.4;
          color: ${textColor};
          opacity: 0.6;
          margin-top: 30px;
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
