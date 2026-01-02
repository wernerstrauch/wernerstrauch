/**
 * Template Index - Re-exports all slide templates
 */

// Basic Templates
export { hookSlide } from "./hook.js";
export { listicleItemSlide } from "./listicle-item.js";
export { contentSlide } from "./content.js";
export { frameworkStepSlide } from "./framework-step.js";
export { ctaSlide } from "./cta.js";

// Extended Templates
export { quoteSlide } from "./quote.js";
export { statSlide } from "./stat.js";
export { questionSlide } from "./question.js";
export { tipSlide } from "./tip.js";
export { mythBusterSlide } from "./myth-buster.js";
export { comparisonSlide } from "./comparison.js";
export { splitSlide } from "./split.js";
export { highlightSlide } from "./highlight.js";
export { chapterSlide } from "./chapter.js";

// Image Templates
export {
  imageLeftSlide,
  imageRightSlide,
  imageTopSlide,
  phoneMockupSlide
} from "./image-slides.js";

// Shared utilities
export { wrapInHTML, colors, fonts } from "./shared.js";
