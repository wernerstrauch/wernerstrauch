/**
 * Framework Step Slide - Step number with phase info
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function frameworkStepSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;
  const stepNumber = config.number || 1;
  const progress = config.accentText || `${stepNumber}/5`;

  return wrapInHTML(
    `
    <div style="height: 100%; display: flex; padding: 60px;">
      <!-- Left: Big number block -->
      <div style="
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: ${colors.electricLime};
        margin: -60px 0 -60px -60px;
        padding: 40px;
      ">
        <span style="
          font-family: ${fonts.display};
          font-size: 280px;
          line-height: 1;
          color: ${colors.deepNavy};
        ">${stepNumber}</span>
        <span style="
          font-family: ${fonts.body};
          font-size: 28px;
          color: ${colors.deepNavy};
          opacity: 0.6;
          margin-top: 20px;
        ">${progress}</span>
      </div>

      <!-- Right: Content -->
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding-left: 80px;">
        ${
          config.subtitle
            ? `
          <span style="
            font-family: ${fonts.accent};
            font-size: 22px;
            letter-spacing: 4px;
            color: ${colors.electricLime};
            margin-bottom: 30px;
          ">${config.subtitle}</span>
        `
            : ""
        }

        <h2 style="
          font-family: ${fonts.heading};
          font-size: 64px;
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
          color: ${textColor};
        ">${config.title}</h2>

        ${
          config.bodyText
            ? `
          <p style="
            font-family: ${fonts.body};
            font-size: 28px;
            line-height: 1.5;
            color: ${textColor};
            opacity: 0.6;
            margin-top: 40px;
          ">${config.bodyText}</p>
        `
            : ""
        }
      </div>
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
