import type { CarouselTemplate, SlideConfig, ColorMode } from '../types/carousel.types.js';

/**
 * Story/Framework Template
 *
 * Step-by-step explanation of a concept or framework:
 * - Slide 1: Framework name/introduction
 * - Slides 2-N-1: Individual steps with progression
 * - Slide N: Call-to-action
 */
export const storyFrameworkTemplate: CarouselTemplate = {
  name: 'Story/Framework',
  description: 'Step-by-step explanation of a concept or methodology',
  minSlides: 4,
  maxSlides: 10,

  generateSlideConfigs(
    topic: string,
    thoughts: string,
    slideCount: number,
    colorMode: ColorMode
  ): SlideConfig[] {
    const configs: SlideConfig[] = [];
    const stepCount = slideCount - 2; // Subtract intro and CTA slides

    // Helper to determine slide color
    const getSlideColor = (index: number, total: number): 'dark' | 'light' => {
      if (colorMode === 'dark') return 'dark';
      if (colorMode === 'light') return 'light';
      // Mixed: alternate with dark intro/outro
      if (index === 0 || index === total - 1) return 'dark';
      return index % 2 === 0 ? 'dark' : 'light';
    };

    // Slide 1: Framework Introduction
    configs.push({
      index: 0,
      type: 'hook',
      title: topic,
      subtitle: `Ein ${stepCount}-Schritte Framework`,
      bodyText: thoughts ? thoughts.split('.')[0] : undefined,
      showSwipeArrow: true,
      colorMode: getSlideColor(0, slideCount)
    });

    // Middle slides: Framework steps
    for (let i = 0; i < stepCount; i++) {
      const stepNumber = i + 1;
      configs.push({
        index: i + 1,
        type: 'framework-step',
        title: `Schritt ${stepNumber}`,
        number: stepNumber,
        accentText: `${stepNumber}/${stepCount}`,
        subtitle: `Phase ${stepNumber}`,
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
      bodyText: 'Mehr Frameworks und Strategien',
      showSwipeArrow: false,
      colorMode: getSlideColor(slideCount - 1, slideCount)
    });

    return configs;
  }
};
