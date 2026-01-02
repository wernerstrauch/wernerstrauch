/**
 * CTA Slide - Brand closing with contact
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts } from "./shared.js";

export function ctaSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <!-- Large decorative circles -->
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 900px;
      height: 900px;
      border: 4px solid ${colors.lime10};
      border-radius: 50%;
    "></div>
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 700px;
      height: 700px;
      border: 3px solid ${colors.lime10};
      border-radius: 50%;
    "></div>
    <div style="
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 500px;
      border: 2px solid ${colors.lime10};
      border-radius: 50%;
    "></div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 80px; position: relative; z-index: 1;">
      ${
        config.subtitle
          ? `
        <span style="
          font-family: ${fonts.accent};
          font-size: 26px;
          letter-spacing: 8px;
          color: ${textColor};
          opacity: 0.5;
          margin-bottom: 50px;
        ">${config.subtitle}</span>
      `
          : ""
      }

      <h1 style="
        font-family: ${fonts.display};
        font-size: 120px;
        line-height: 0.95;
        margin: 0;
        color: ${textColor};
      ">${config.title.replace(".", "")}<span style="color: ${colors.electricLime};">.</span></h1>

      ${
        config.accentText
          ? `
        <span style="
          font-family: ${fonts.body};
          font-size: 32px;
          color: ${colors.electricLime};
          margin-top: 50px;
        ">${config.accentText}</span>
      `
          : ""
      }
    </div>
  `,
    { showArrow: false, colorMode: config.colorMode }
  );
}
