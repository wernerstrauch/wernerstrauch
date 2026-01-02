import type { CarouselTemplate, TemplateName } from '../types/carousel.types.js';
import { hookContentCtaTemplate } from './hook-content-cta.js';
import { listicleTemplate } from './listicle.js';
import { storyFrameworkTemplate } from './story-framework.js';

// Template registry
const templates: Record<TemplateName, CarouselTemplate> = {
  'hook-content-cta': hookContentCtaTemplate,
  'listicle': listicleTemplate,
  'story-framework': storyFrameworkTemplate
};

/**
 * Get a template by name
 */
export function getTemplate(name: TemplateName): CarouselTemplate {
  const template = templates[name];
  if (!template) {
    throw new Error(`Unknown template: ${name}`);
  }
  return template;
}

/**
 * Get all available templates
 */
export function getAllTemplates(): Array<{ name: TemplateName; template: CarouselTemplate }> {
  return Object.entries(templates).map(([name, template]) => ({
    name: name as TemplateName,
    template
  }));
}

/**
 * Template choices for CLI
 */
export const templateChoices = [
  {
    name: 'Hook -> Content -> CTA (classic attention-grabbing)',
    value: 'hook-content-cta' as TemplateName
  },
  {
    name: 'Listicle (Top 5/10 numbered lists)',
    value: 'listicle' as TemplateName
  },
  {
    name: 'Story/Framework (step-by-step concept)',
    value: 'story-framework' as TemplateName
  }
];

export { hookContentCtaTemplate, listicleTemplate, storyFrameworkTemplate };
