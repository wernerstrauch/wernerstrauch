/**
 * Image Slides - Templates with image areas
 */

import type { SlideConfig } from "../../types/carousel.types.js";
import { wrapInHTML, colors, fonts, renderImageOrPlaceholder } from "./shared.js";

/**
 * Image Left Slide - Bild links (40%), Text rechts (60%)
 */
export function imageLeftSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <div style="height: 100%; display: flex;">
      <!-- Image Column (40%) -->
      <div style="
        width: 40%;
        height: 100%;
        position: relative;
        overflow: hidden;
      ">
        ${renderImageOrPlaceholder(config, "width: 100%; height: 100%; position: absolute; top: 0; left: 0;")}
        <!-- Overlay gradient -->
        <div style="
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100%;
          background: linear-gradient(to right, transparent, ${isDark ? colors.deepNavy : colors.highWhite});
        "></div>
      </div>

      <!-- Text Column (60%) -->
      <div style="
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 60px 60px 60px 40px;
      ">
        <!-- Accent bar -->
        <div style="
          width: 50px;
          height: 5px;
          background: ${colors.electricLime};
          margin-bottom: 40px;
        "></div>

        <h2 style="
          font-family: ${fonts.heading};
          font-size: 56px;
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

        ${
          config.bodyText
            ? `
          <p style="
            font-family: ${fonts.body};
            font-size: 24px;
            line-height: 1.6;
            color: ${textColor};
            opacity: 0.6;
            margin-top: 20px;
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

/**
 * Image Right Slide - Text links (60%), Bild rechts (40%)
 */
export function imageRightSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <div style="height: 100%; display: flex;">
      <!-- Text Column (60%) -->
      <div style="
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 60px 40px 60px 60px;
      ">
        <!-- Accent bar -->
        <div style="
          width: 50px;
          height: 5px;
          background: ${colors.electricLime};
          margin-bottom: 40px;
        "></div>

        <h2 style="
          font-family: ${fonts.heading};
          font-size: 56px;
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

        ${
          config.bodyText
            ? `
          <p style="
            font-family: ${fonts.body};
            font-size: 24px;
            line-height: 1.6;
            color: ${textColor};
            opacity: 0.6;
            margin-top: 20px;
          ">${config.bodyText}</p>
        `
            : ""
        }
      </div>

      <!-- Image Column (40%) -->
      <div style="
        width: 40%;
        height: 100%;
        position: relative;
        overflow: hidden;
      ">
        ${renderImageOrPlaceholder(config, "width: 100%; height: 100%; position: absolute; top: 0; left: 0;")}
        <!-- Overlay gradient -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100px;
          height: 100%;
          background: linear-gradient(to left, transparent, ${isDark ? colors.deepNavy : colors.highWhite});
        "></div>
      </div>
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}

/**
 * Image Top Slide - Bild oben (50%), Text unten (50%)
 */
export function imageTopSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <div style="height: 100%; display: flex; flex-direction: column;">
      <!-- Image Row (50%) -->
      <div style="
        height: 50%;
        width: 100%;
        position: relative;
        overflow: hidden;
      ">
        ${renderImageOrPlaceholder(config, "width: 100%; height: 100%; position: absolute; top: 0; left: 0;")}
        <!-- Overlay gradient -->
        <div style="
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 120px;
          background: linear-gradient(to top, ${isDark ? colors.deepNavy : colors.highWhite}, transparent);
        "></div>
      </div>

      <!-- Text Row (50%) -->
      <div style="
        height: 50%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 40px 60px 60px;
      ">
        <!-- Accent bar -->
        <div style="
          width: 50px;
          height: 5px;
          background: ${colors.electricLime};
          margin-bottom: 30px;
        "></div>

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
            font-size: 26px;
            line-height: 1.5;
            color: ${textColor};
            opacity: 0.7;
            margin-top: 25px;
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

/**
 * Phone Mockup Slide - Screenshot in Handy-Frame
 */
export function phoneMockupSlide(config: SlideConfig): string {
  const isDark = config.colorMode === "dark";
  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return wrapInHTML(
    `
    <!-- Background decorative elements -->
    <div style="
      position: absolute;
      top: -200px;
      right: -200px;
      width: 600px;
      height: 600px;
      border: 3px solid ${colors.lime10};
      border-radius: 50%;
    "></div>

    <div style="height: 100%; display: flex; align-items: center; padding: 60px;">
      <!-- Text Column (50%) -->
      <div style="
        width: 50%;
        padding-right: 40px;
      ">
        <!-- Accent bar -->
        <div style="
          width: 50px;
          height: 5px;
          background: ${colors.electricLime};
          margin-bottom: 40px;
        "></div>

        <h2 style="
          font-family: ${fonts.heading};
          font-size: 48px;
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
            font-size: 26px;
            line-height: 1.5;
            color: ${textColor};
            opacity: 0.7;
            margin-top: 30px;
          ">${config.subtitle}</p>
        `
            : ""
        }
      </div>

      <!-- Phone Mockup Column (50%) -->
      <div style="
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
        <!-- Phone Frame -->
        <div style="
          width: 280px;
          height: 580px;
          background: #1a1a1a;
          border-radius: 40px;
          padding: 12px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
          position: relative;
        ">
          <!-- Notch -->
          <div style="
            position: absolute;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 28px;
            background: #1a1a1a;
            border-radius: 0 0 16px 16px;
            z-index: 10;
          "></div>

          <!-- Screen -->
          <div style="
            width: 100%;
            height: 100%;
            border-radius: 32px;
            overflow: hidden;
            background: ${isDark ? colors.deepNavy : colors.highWhite};
            position: relative;
          ">
            ${renderImageOrPlaceholder(config, "width: 100%; height: 100%; position: absolute; top: 0; left: 0;")}
          </div>

          <!-- Home indicator -->
          <div style="
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 5px;
            background: rgba(255,255,255,0.3);
            border-radius: 3px;
          "></div>
        </div>
      </div>
    </div>
  `,
    { showArrow: config.showSwipeArrow, colorMode: config.colorMode }
  );
}
