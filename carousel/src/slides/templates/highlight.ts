/**
 * Highlight Slide - Key Takeaway
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function highlightSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <!-- Spotlight effect -->
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1000px;
      height: 1000px;
      background: radial-gradient(circle, ${colors.lime10} 0%, transparent 60%);
      pointer-events: none;
    "></div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px;">
      <div style="
        width: 100%;
        max-width: 900px;
        border: 6px solid ${colors.electricLime};
        border-radius: 12px;
        padding: 70px;
        position: relative;
        background: ${isDark ? "rgba(10, 25, 47, 0.8)" : "rgba(255, 255, 255, 0.9)"};
      ">
        <!-- Label -->
        <div style="
          position: absolute;
          top: -18px;
          left: 50px;
          background: ${isDark ? colors.deepNavy : colors.highWhite};
          padding: 0 20px;
        ">
          <span style="
            font-family: ${fonts.accent};
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 4px;
            color: ${colors.electricLime};
          ">KEY TAKEAWAY</span>
        </div>

        <h2 style="
          font-family: ${fonts.heading};
          font-size: 56px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0;
          color: ${textColor};
          text-align: center;
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
            text-align: center;
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
