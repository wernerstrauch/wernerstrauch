/**
 * Myth-Buster Slide - Mythos durchstreichen + Wahrheit
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function mythBusterSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;
  const mythText = config.mythText || config.title;
  const truthText = config.truthText || config.subtitle || "";

  return wrapInHTML(
    `
    <!-- X mark background -->
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-12deg);
      font-family: ${fonts.display};
      font-size: 600px;
      line-height: 1;
      color: ${isDark ? "rgba(255,100,100,0.06)" : "rgba(200,50,50,0.08)"};
    ">✗</div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 80px;">
      <!-- MYTHOS Section -->
      <div style="margin-bottom: 80px;">
        <span style="
          font-family: ${fonts.accent};
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 6px;
          color: ${isDark ? "rgba(255,120,120,0.8)" : "rgba(180,50,50,0.9)"};
          margin-bottom: 30px;
          display: block;
        ">MYTHOS</span>

        <h2 style="
          font-family: ${fonts.heading};
          font-size: 56px;
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
          color: ${textColor};
          opacity: 0.5;
          text-decoration: line-through;
          text-decoration-color: ${isDark ? "rgba(255,100,100,0.7)" : "rgba(200,50,50,0.7)"};
          text-decoration-thickness: 4px;
        ">${mythText}</h2>
      </div>

      <!-- WAHRHEIT Section -->
      <div>
        <span style="
          font-family: ${fonts.accent};
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 6px;
          color: ${colors.electricLime};
          margin-bottom: 30px;
          display: block;
        ">WAHRHEIT</span>

        <h2 style="
          font-family: ${fonts.heading};
          font-size: 56px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0;
          color: ${textColor};
        ">${truthText}</h2>
      </div>
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
