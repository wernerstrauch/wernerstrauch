/**
 * Tip Slide - Quick Tip in einer Box
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function tipSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;
  const cardBg = isDark ? colors.navy80 : "rgba(255, 255, 255, 0.95)";
  const borderColor = isDark ? colors.lime40 : colors.electricLime;

  return wrapInHTML(
    `
    <!-- Decorative circles -->
    <div style="
      position: absolute;
      top: -100px;
      right: -100px;
      width: 400px;
      height: 400px;
      border: 3px solid ${colors.lime10};
      border-radius: 50%;
    "></div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px;">
      <div style="
        width: 100%;
        max-width: 900px;
        background: ${cardBg};
        border: 4px solid ${borderColor};
        border-radius: 8px;
        padding: 60px;
        position: relative;
      ">
        <!-- Icon/Label -->
        <div style="
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        ">
          <div style="
            width: 50px;
            height: 50px;
            background: ${colors.electricLime};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
          ">💡</div>
          <span style="
            font-family: ${fonts.accent};
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 4px;
            color: ${colors.electricLime};
          ">QUICK TIP</span>
        </div>

        <h2 style="
          font-family: ${fonts.heading};
          font-size: 52px;
          font-weight: 800;
          line-height: 1.15;
          margin: 0;
          color: ${textColor};
        ">${config.title}</h2>

        ${
          config.subtitle
            ? `
          <p style="
            font-family: ${fonts.body};
            font-size: 28px;
            line-height: 1.5;
            color: ${textColor};
            opacity: 0.7;
            margin-top: 30px;
          ">${config.subtitle}</p>
        `
            : ""
        }
      </div>
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
