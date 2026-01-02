import { fal } from '@fal-ai/client';
import type {
  GenerationOptions,
  CarouselResult,
  GeneratedSlide
} from './types/carousel.types.js';
import { PLATFORM_SETTINGS, COST_PER_IMAGE } from './types/carousel.types.js';
import { FAL_MODELS, GENERATION_SETTINGS } from './config/fal-config.js';
import { getTemplate } from './templates/index.js';
import { buildSlidePrompt, buildEditPrompt } from './prompts/slide-prompts.js';
import {
  downloadImage,
  imageToDataUri,
  downloadAndSave,
  generateSlideFilename
} from './utils/image-utils.js';
import { bundleToPDF } from './utils/pdf-bundler.js';

interface GenerationProgress {
  current: number;
  total: number;
  slideType: string;
}

type ProgressCallback = (progress: GenerationProgress) => void;

// FAL.AI response types (generic to avoid type conflicts)
interface FALImage {
  url: string;
  file_name?: string;
  content_type?: string;
}

interface FALResponse {
  data: {
    images: FALImage[];
    description?: string;
  };
}

/**
 * Generate carousel using FAL.AI with sequential image generation
 *
 * Key concept: Each slide uses the previous slide as visual context
 * for consistency (fonts, colors, spacing, style).
 */
export async function generateCarouselWithAI(
  options: GenerationOptions,
  onProgress?: ProgressCallback
): Promise<CarouselResult> {
  const template = getTemplate(options.template);
  const slideConfigs = template.generateSlideConfigs(
    options.topic,
    options.thoughts,
    options.slideCount,
    options.colorMode
  );

  const platformSettings = PLATFORM_SETTINGS[options.platform];
  const generatedSlides: GeneratedSlide[] = [];
  let previousImageDataUri: string | undefined;
  let totalCost = 0;

  for (let i = 0; i < slideConfigs.length; i++) {
    const config = slideConfigs[i];
    const isFirstSlide = i === 0;

    // Report progress
    onProgress?.({
      current: i + 1,
      total: slideConfigs.length,
      slideType: config.type
    });

    let response: FALResponse;

    if (isFirstSlide || !previousImageDataUri) {
      // First slide: Text-to-Image generation
      const prompt = buildSlidePrompt(
        config,
        options.platform,
        true,
        options.topic,
        options.thoughts
      );

      response = (await fal.subscribe(FAL_MODELS.TEXT_TO_IMAGE, {
        input: {
          prompt,
          aspect_ratio: platformSettings.aspectRatio,
          resolution: GENERATION_SETTINGS.resolution,
          output_format: GENERATION_SETTINGS.outputFormat,
          num_images: 1,
          limit_generations: GENERATION_SETTINGS.limitGenerations
        }
      })) as unknown as FALResponse;
    } else {
      // Subsequent slides: Image-to-Image for consistency
      const prompt = buildEditPrompt(
        config,
        options.platform,
        options.topic,
        options.thoughts
      );

      response = (await fal.subscribe(FAL_MODELS.IMAGE_EDIT, {
        input: {
          prompt,
          image_urls: [previousImageDataUri],
          aspect_ratio: platformSettings.aspectRatio,
          resolution: GENERATION_SETTINGS.resolution,
          output_format: GENERATION_SETTINGS.outputFormat,
          num_images: 1
        }
      })) as unknown as FALResponse;
    }

    // Track cost
    totalCost += COST_PER_IMAGE[GENERATION_SETTINGS.resolution];

    // Get generated image - handle both response structures
    const images = response.data?.images || (response as unknown as { images: FALImage[] }).images;
    if (!images || images.length === 0) {
      throw new Error(`No images returned for slide ${i + 1}`);
    }
    const imageUrl = images[0].url;

    // Download for next iteration's reference
    const imageBuffer = await downloadImage(imageUrl);
    previousImageDataUri = imageToDataUri(imageBuffer);

    // Save to output
    const filename = generateSlideFilename(config.index, config.type);
    const outputPath = await downloadAndSave(imageUrl, options.outputDir, filename);

    generatedSlides.push({
      index: config.index,
      filename,
      path: outputPath,
      type: config.type
    });
  }

  // Bundle to PDF
  const slidePaths = generatedSlides.map((s) => s.path);
  const pdfPath = await bundleToPDF(slidePaths, `${options.outputDir}/carousel.pdf`);

  return {
    slides: generatedSlides,
    pdfPath,
    outputDir: options.outputDir,
    totalCost
  };
}

/**
 * Regenerate a single slide while maintaining consistency
 */
export async function regenerateSlide(
  options: GenerationOptions,
  slideIndex: number,
  previousSlideImagePath: string | undefined,
  feedback?: string
): Promise<GeneratedSlide> {
  const template = getTemplate(options.template);
  const slideConfigs = template.generateSlideConfigs(
    options.topic,
    options.thoughts,
    options.slideCount,
    options.colorMode
  );

  const config = slideConfigs[slideIndex];
  const platformSettings = PLATFORM_SETTINGS[options.platform];

  let response: FALResponse;

  if (previousSlideImagePath) {
    // Use previous slide as reference
    const previousBuffer = await downloadImage(`file://${previousSlideImagePath}`);
    const previousDataUri = imageToDataUri(previousBuffer);

    let prompt = buildEditPrompt(config, options.platform, options.topic, options.thoughts);
    if (feedback) {
      prompt += `\n\nADDITIONAL FEEDBACK: ${feedback}`;
    }

    response = (await fal.subscribe(FAL_MODELS.IMAGE_EDIT, {
      input: {
        prompt,
        image_urls: [previousDataUri],
        aspect_ratio: platformSettings.aspectRatio,
        resolution: GENERATION_SETTINGS.resolution,
        output_format: GENERATION_SETTINGS.outputFormat,
        num_images: 1
      }
    })) as unknown as FALResponse;
  } else {
    // Generate from scratch
    let prompt = buildSlidePrompt(
      config,
      options.platform,
      true,
      options.topic,
      options.thoughts
    );
    if (feedback) {
      prompt += `\n\nADDITIONAL FEEDBACK: ${feedback}`;
    }

    response = (await fal.subscribe(FAL_MODELS.TEXT_TO_IMAGE, {
      input: {
        prompt,
        aspect_ratio: platformSettings.aspectRatio,
        resolution: GENERATION_SETTINGS.resolution,
        output_format: GENERATION_SETTINGS.outputFormat,
        num_images: 1,
        limit_generations: GENERATION_SETTINGS.limitGenerations
      }
    })) as unknown as FALResponse;
  }

  // Get generated image - handle both response structures
  const images = response.data?.images || (response as unknown as { images: FALImage[] }).images;
  if (!images || images.length === 0) {
    throw new Error(`No images returned for slide ${slideIndex + 1}`);
  }
  const imageUrl = images[0].url;

  const filename = generateSlideFilename(config.index, config.type);
  const outputPath = await downloadAndSave(imageUrl, options.outputDir, filename);

  return {
    index: config.index,
    filename,
    path: outputPath,
    type: config.type
  };
}
