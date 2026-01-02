import type { CarouselTemplate, SlideConfig, ColorMode } from '../types/carousel.types.js';

/**
 * Hook → Content → CTA Template
 *
 * Classic attention-grabbing structure:
 * - Slide 1: Hook (provocative question or bold statement)
 * - Slides 2-N-1: Content points with value
 * - Slide N: Call-to-action with branding
 */
export const hookContentCtaTemplate: CarouselTemplate = {
  name: 'Hook → Content → CTA',
  description: 'Classic attention-grabbing structure with hook opener and CTA closer',
  minSlides: 3,
  maxSlides: 10,

  generateSlideConfigs(
    topic: string,
    thoughts: string,
    slideCount: number,
    colorMode: ColorMode
  ): SlideConfig[] {
    const configs: SlideConfig[] = [];

    // Helper to determine slide color
    const getSlideColor = (index: number, total: number): 'dark' | 'light' => {
      if (colorMode === 'dark') return 'dark';
      if (colorMode === 'light') return 'light';
      // Mixed: alternate, but first and last are always dark
      if (index === 0 || index === total - 1) return 'dark';
      return index % 2 === 0 ? 'dark' : 'light';
    };

    // Slide 1: Hook
    configs.push({
      index: 0,
      type: 'hook',
      title: topic,
      subtitle: thoughts ? thoughts.split('.')[0] : undefined,
      showSwipeArrow: true,
      colorMode: getSlideColor(0, slideCount)
    });

    // Middle slides: Content
    const contentSlideCount = slideCount - 2;
    for (let i = 0; i < contentSlideCount; i++) {
      configs.push({
        index: i + 1,
        type: 'content',
        title: `Key Point ${i + 1}`,
        number: i + 1,
        showSwipeArrow: true,
        colorMode: getSlideColor(i + 1, slideCount)
      });
    }

    // Final slide: CTA
    configs.push({
      index: slideCount - 1,
      type: 'cta',
      title: 'WERNER STRAUCH.',
      subtitle: 'Der Stille Stratege',
      accentText: '@wernerstrauch',
      showSwipeArrow: false,
      colorMode: getSlideColor(slideCount - 1, slideCount)
    });

    return configs;
  }
};
