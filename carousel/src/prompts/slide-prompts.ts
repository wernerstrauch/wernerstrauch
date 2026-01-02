import type { SlideConfig, Platform } from '../types/carousel.types.js';
import { PLATFORM_SETTINGS } from '../types/carousel.types.js';

/**
 * Werner Strauch Brand Guidelines for AI prompts
 */
const BRAND_CONTEXT = `
Werner Strauch personal brand design system. Premium, corporate, strategic consulting feel.

COLORS (STRICT):
- Primary: Deep Navy (#0A192F) - 60% of design, professional foundation
- Accent: Electric Lime (#DFFF00) - 10% ONLY, key highlights and CTAs
- Contrast: Pure White (#FFFFFF) - 30%, text and breathing space

TYPOGRAPHY FEEL:
- Headlines: Bold, condensed, uppercase, brutalist impact (like Bebas Neue)
- Subheads: Modern geometric sans-serif, distinctive (like Syne)
- Body: Technical monospace for precise, expert feel (like Space Mono)

VISUAL STYLE:
- Ultra clean, generous whitespace
- Strong typographic hierarchy - text IS the visual
- Geometric accents using lime color SPARINGLY
- Subtle grid pattern in background (barely visible)
- Light noise texture for depth
- NO stock photos, NO illustrations - pure typography and geometric shapes
- Professional but not boring - strategic use of bold elements

BRAND VOICE:
- German text
- "Der Stille Stratege" tagline
- Expert positioning in pricing, profit, and business strategy
`.trim();

/**
 * Generate consistency instructions for sequential slides
 */
function getConsistencyInstructions(isFirstSlide: boolean): string {
  if (isFirstSlide) {
    return '';
  }

  return `
CRITICAL - VISUAL CONSISTENCY:
Match the EXACT visual style from the reference image:
- Same fonts, same weights, same sizes
- Same color palette and usage ratios
- Same spacing and margins
- Same background treatment and texture
- Same accent element style
This slide must look like it belongs to the same carousel.
`.trim();
}

/**
 * Get platform-specific instructions
 */
function getPlatformInstructions(platform: Platform): string {
  const settings = PLATFORM_SETTINGS[platform];
  return `
IMAGE FORMAT:
- Dimensions: ${settings.width}x${settings.height}px
- Aspect ratio: ${settings.aspectRatio}
- Platform: ${platform === 'linkedin' ? 'LinkedIn' : 'Instagram'}
- Text must be clearly readable on mobile devices
- Important content in safe zone (not too close to edges)
`.trim();
}

/**
 * Build slide-specific prompt based on type
 */
function getSlideTypePrompt(config: SlideConfig): string {
  const colorInstructions =
    config.colorMode === 'dark'
      ? 'Navy (#0A192F) background with white text. Lime accents.'
      : 'White background with navy (#0A192F) text. Lime accents.';

  switch (config.type) {
    case 'hook':
      return `
SLIDE TYPE: Hook/Title Slide
${colorInstructions}

LAYOUT:
- Large, bold headline taking 50-60% of vertical space
- Headline text: "${config.title}"
${config.subtitle ? `- Subtitle below: "${config.subtitle}"` : ''}
- One bold lime accent element (diagonal stripe, circle, or geometric shape)
- Swipe arrow indicator bottom right (subtle, 50% opacity)
- Clean, impactful, makes people stop scrolling

HEADLINE STYLE:
- Uppercase, condensed, maximum impact
- Break into 2-3 lines if needed for rhythm
- Typography IS the hero - make it commanding
`.trim();

    case 'content':
      return `
SLIDE TYPE: Content Slide
${colorInstructions}

LAYOUT:
- Main heading: "${config.title}"
${config.number ? `- Small slide number "${String(config.number).padStart(2, '0')}" in corner (subtle)` : ''}
- Space for key point or insight
- Lime accent bar or highlight on one element
- Swipe arrow indicator bottom right
- Professional, informative, easy to scan

CONTENT STYLE:
- Bold heading, supporting text smaller
- Use geometric dividers or accent shapes
- Maintain breathing room around text
`.trim();

    case 'listicle-item':
      return `
SLIDE TYPE: Listicle Item
${colorInstructions}

LAYOUT:
- HUGE number "${config.accentText}" in lime color (200px+ size, dominant)
- Item title: "${config.title}" next to or below number
- Number is the visual hero of this slide
- Swipe arrow indicator bottom right
- Clean, scannable, memorable

NUMBER STYLE:
- The number should be the first thing you see
- Bold, geometric, could be outline or filled
- Position: left side with text right, or stacked
`.trim();

    case 'framework-step':
      return `
SLIDE TYPE: Framework Step
${colorInstructions}

LAYOUT:
- Step indicator "${config.accentText}" (e.g., "2/5") prominent
- Step number "${config.number}" as large lime element
- Step title: "${config.title}"
${config.subtitle ? `- Phase label: "${config.subtitle}"` : ''}
- Swipe arrow indicator bottom right
- Shows progression through framework

STEP STYLE:
- Large lime number block on left (or top)
- Content aligned right (or below)
- Progress indicator feel
`.trim();

    case 'cta':
      return `
SLIDE TYPE: Call-to-Action (Final Slide)
${colorInstructions}

LAYOUT:
- Centered composition
- Brand name "${config.title}" large and prominent
- Tagline "${config.subtitle}" above or below
${config.accentText ? `- Handle/contact "${config.accentText}" subtle` : ''}
- Decorative lime element (concentric circles, geometric shape)
- NO swipe arrow (this is the last slide)
- Memorable, branded, invites follow/engagement

CTA STYLE:
- Name is the hero - big, bold, centered
- Tagline in lighter weight
- Subtle decorative elements, not overwhelming
- Professional sign-off feel
`.trim();

    default:
      return `
SLIDE TYPE: Generic Content
${colorInstructions}
Title: "${config.title}"
${config.subtitle ? `Subtitle: "${config.subtitle}"` : ''}
Clean, professional layout with lime accent.
`.trim();
  }
}

/**
 * Build complete prompt for a slide
 */
export function buildSlidePrompt(
  config: SlideConfig,
  platform: Platform,
  isFirstSlide: boolean,
  topic: string,
  thoughts?: string
): string {
  const parts = [
    'Create a professional carousel slide image.',
    '',
    BRAND_CONTEXT,
    '',
    getPlatformInstructions(platform),
    '',
    getSlideTypePrompt(config),
    '',
    getConsistencyInstructions(isFirstSlide)
  ];

  // Add topic context for content generation
  if (config.type !== 'cta') {
    parts.push('');
    parts.push(`CAROUSEL TOPIC: ${topic}`);
    if (thoughts) {
      parts.push(`ADDITIONAL CONTEXT: ${thoughts}`);
    }
  }

  return parts.filter(Boolean).join('\n');
}

/**
 * Build edit prompt for image-to-image generation
 */
export function buildEditPrompt(
  config: SlideConfig,
  platform: Platform,
  topic: string,
  thoughts?: string
): string {
  const slidePrompt = getSlideTypePrompt(config);
  const platformPrompt = getPlatformInstructions(platform);

  return `
Create the next slide in this carousel series.
MATCH THE EXACT VISUAL STYLE of the reference image - same fonts, colors, spacing, and design elements.

${platformPrompt}

${slidePrompt}

CAROUSEL TOPIC: ${topic}
${thoughts ? `CONTEXT: ${thoughts}` : ''}

This slide must look like it belongs to the same carousel as the reference image.
Maintain perfect visual consistency while showing the new content.
`.trim();
}
