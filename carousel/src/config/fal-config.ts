import { fal } from '@fal-ai/client';

// FAL.AI Model IDs
export const FAL_MODELS = {
  TEXT_TO_IMAGE: 'fal-ai/nano-banana-pro',
  IMAGE_EDIT: 'fal-ai/nano-banana-pro/edit'
} as const;

// Generation settings
export const GENERATION_SETTINGS = {
  resolution: '2K' as const,
  outputFormat: 'png' as const,
  limitGenerations: true
} as const;

/**
 * Configure FAL.AI client
 * Requires FAL_KEY environment variable to be set
 */
export function configureFAL(): void {
  const apiKey = process.env.FAL_KEY;

  if (!apiKey) {
    console.error('\n');
    console.error('FAL_KEY environment variable is required.');
    console.error('');
    console.error('To set it:');
    console.error('  export FAL_KEY="your-api-key"');
    console.error('');
    console.error('Get your API key at: https://fal.ai/dashboard/keys');
    console.error('');
    process.exit(1);
  }

  // FAL client automatically uses FAL_KEY from environment
  // But we can also configure it explicitly if needed:
  fal.config({
    credentials: apiKey
  });
}

/**
 * Estimate cost for carousel generation
 */
export function estimateCost(slideCount: number, resolution: '1K' | '2K' | '4K' = '2K'): number {
  const costPerImage: Record<string, number> = {
    '1K': 0.15,
    '2K': 0.30,
    '4K': 0.60
  };

  return slideCount * costPerImage[resolution];
}
