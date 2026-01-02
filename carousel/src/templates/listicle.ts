import type { CarouselTemplate, SlideConfig, ColorMode } from '../types/carousel.types.js';

/**
 * Listicle Template
 *
 * Numbered list format perfect for "Top 5/10" content:
 * - Slide 1: Title slide ("5 Ways to..." / "Top 10...")
 * - Slides 2-N-1: Numbered items (01, 02, 03...)
 * - Slide N: Call-to-action
 */
export const listicleTemplate: CarouselTemplate = {
  name: 'Listicle (Top 5/10)',
  description: 'Numbered list format for "Top X" content',
  minSlides: 4,
  maxSlides: 12,

  generateSlideConfigs(
    topic: string,
    thoughts: string,
    slideCount: number,
    colorMode: ColorMode
  ): SlideConfig[] {
    const configs: SlideConfig[] = [];
    const itemCount = slideCount - 2; // Subtract title and CTA slides

    // Helper to determine slide color
    const getSlideColor = (index: number, total: number): 'dark' | 'light' => {
      if (colorMode === 'dark') return 'dark';
      if (colorMode === 'light') return 'light';
      // Mixed: alternate, keeping first and last dark
      if (index === 0 || index === total - 1) return 'dark';
      return index % 2 === 0 ? 'dark' : 'light';
    };

    // Slide 1: Title/Hook
    configs.push({
      index: 0,
      type: 'hook',
      title: topic,
      subtitle: `${itemCount} Punkte die du kennen musst`,
      showSwipeArrow: true,
      colorMode: getSlideColor(0, slideCount)
    });

    // Middle slides: Numbered items
    for (let i = 0; i < itemCount; i++) {
      const itemNumber = i + 1;
      configs.push({
        index: i + 1,
        type: 'listicle-item',
        title: `Punkt ${itemNumber}`,
        number: itemNumber,
        accentText: String(itemNumber).padStart(2, '0'),
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
