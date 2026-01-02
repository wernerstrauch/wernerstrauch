#!/usr/bin/env node

import { select, input, number, confirm } from '@inquirer/prompts';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from 'url';

import type {
  GenerationOptions,
  Platform,
  TemplateName,
  ColorMode
} from './types/carousel.types.js';
import { PLATFORM_SETTINGS } from './types/carousel.types.js';
import { configureFAL, estimateCost } from './config/fal-config.js';
import { templateChoices, getTemplate } from './templates/index.js';
import { generateCarouselWithAI } from './ai-generator.js';
import { createOutputDir } from './utils/image-utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_BASE = path.join(__dirname, '..', 'output');

async function main(): Promise<void> {
  console.log('\n');
  console.log('  Werner Strauch Carousel Generator');
  console.log('  ──────────────────────────────────');
  console.log('');

  // Platform selection
  const platform = await select<Platform>({
    message: 'Select platform:',
    choices: [
      {
        name: PLATFORM_SETTINGS.linkedin.label,
        value: 'linkedin'
      },
      {
        name: PLATFORM_SETTINGS.instagram.label,
        value: 'instagram'
      }
    ]
  });

  // Template selection
  const templateName = await select<TemplateName>({
    message: 'Select template structure:',
    choices: templateChoices
  });

  const template = getTemplate(templateName);

  // Topic input
  const topic = await input({
    message: 'Enter carousel topic:',
    validate: (value) => {
      if (!value.trim()) return 'Topic is required';
      if (value.length > 200) return 'Topic too long (max 200 chars)';
      return true;
    }
  });

  // Thoughts/context input
  const thoughts = await input({
    message: 'Additional thoughts or context (optional):',
    default: ''
  });

  // Slide count
  const slideCount = await number({
    message: `Number of slides (${template.minSlides}-${template.maxSlides}):`,
    min: template.minSlides,
    max: template.maxSlides,
    default: Math.min(7, template.maxSlides)
  });

  const finalSlideCount = slideCount ?? 7;

  // Color mode
  const colorMode = await select<ColorMode>({
    message: 'Select color mode:',
    choices: [
      { name: 'Dark (Navy background)', value: 'dark' },
      { name: 'Light (White background)', value: 'light' },
      { name: 'Mixed (Alternate)', value: 'mixed' }
    ]
  });

  // Cost estimation
  const estimatedCost = estimateCost(finalSlideCount);
  console.log('');
  console.log(`  Estimated cost: $${estimatedCost.toFixed(2)} (~$0.30/slide at 2K resolution)`);
  console.log('');

  const shouldProceed = await confirm({
    message: 'Proceed with generation?',
    default: true
  });

  if (!shouldProceed) {
    console.log('\nGeneration cancelled.');
    process.exit(0);
  }

  // Configure FAL.AI (validates API key)
  configureFAL();

  // Create output directory
  const outputDir = await createOutputDir(OUTPUT_BASE, topic);

  const options: GenerationOptions = {
    mode: 'ai',
    platform,
    template: templateName,
    topic,
    thoughts,
    slideCount: finalSlideCount,
    colorMode,
    outputDir
  };

  console.log('');

  // Generate with progress spinner
  const spinner = ora({
    text: 'Starting generation...',
    color: 'green'
  }).start();

  try {
    const result = await generateCarouselWithAI(options, (progress) => {
      spinner.text = `Generating slide ${progress.current}/${progress.total} (${progress.slideType})...`;
    });

    spinner.succeed('Carousel generated successfully!');

    // Display results
    console.log('');
    console.log(`  Output: ${result.outputDir}`);
    console.log('');

    for (const slide of result.slides) {
      console.log(`    ${slide.filename}`);
    }

    if (result.pdfPath) {
      console.log(`    carousel.pdf`);
    }

    console.log('');
    console.log(`  Total cost: $${result.totalCost.toFixed(2)}`);
    console.log('');
  } catch (error) {
    spinner.fail('Generation failed');

    if (error instanceof Error) {
      console.error(`\nError: ${error.message}`);

      if (error.message.includes('401') || error.message.includes('unauthorized')) {
        console.error('\nCheck your FAL_KEY environment variable.');
      }
    } else {
      console.error('\nAn unexpected error occurred.');
    }

    process.exit(1);
  }
}

// Run CLI
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
