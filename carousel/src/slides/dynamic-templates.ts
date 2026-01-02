/**
 * Dynamic Templates - Main entry point for slide generation
 *
 * All individual templates are in ./templates/
 */

import type { SlideConfig } from "../types/carousel.types.js";

// Import all templates from organized files
import {
  // Basic Templates
  hookSlide,
  listicleItemSlide,
  contentSlide,
  frameworkStepSlide,
  ctaSlide,
  // Extended Templates
  quoteSlide,
  statSlide,
  questionSlide,
  tipSlide,
  mythBusterSlide,
  comparisonSlide,
  splitSlide,
  highlightSlide,
  chapterSlide,
  // Image Templates
  imageLeftSlide,
  imageRightSlide,
  imageTopSlide,
  phoneMockupSlide
} from "./templates/index.js";

// Re-export all templates for direct access
export {
  hookSlide,
  listicleItemSlide,
  contentSlide,
  frameworkStepSlide,
  ctaSlide,
  quoteSlide,
  statSlide,
  questionSlide,
  tipSlide,
  mythBusterSlide,
  comparisonSlide,
  splitSlide,
  highlightSlide,
  chapterSlide,
  imageLeftSlide,
  imageRightSlide,
  imageTopSlide,
  phoneMockupSlide
};

/**
 * Generate HTML for a slide based on its type
 */
export function generateSlideHTML(config: SlideConfig): string {
  switch (config.type) {
    // Basic Templates
    case "hook":
      return hookSlide(config);
    case "listicle-item":
      return listicleItemSlide(config);
    case "content":
      return contentSlide(config);
    case "framework-step":
      return frameworkStepSlide(config);
    case "cta":
      return ctaSlide(config);

    // Extended Templates
    case "quote":
      return quoteSlide(config);
    case "stat":
      return statSlide(config);
    case "question":
      return questionSlide(config);
    case "tip":
      return tipSlide(config);
    case "myth-buster":
      return mythBusterSlide(config);
    case "comparison":
      return comparisonSlide(config);
    case "split":
      return splitSlide(config);
    case "highlight":
      return highlightSlide(config);
    case "chapter":
      return chapterSlide(config);

    // Image Templates
    case "image-left":
      return imageLeftSlide(config);
    case "image-right":
      return imageRightSlide(config);
    case "image-top":
      return imageTopSlide(config);
    case "phone-mockup":
      return phoneMockupSlide(config);

    // Fallback
    default:
      return contentSlide(config);
  }
}
