#!/usr/bin/env node

/**
 * Generate images for carousel slides using FAL.AI
 *
 * Usage:
 *   FAL_KEY=xxx pnpm tsx src/generate-images.ts
 *
 * Features:
 *   - Skips already existing images
 *   - Saves prompts and parameters to images-manifest.json
 */

import { fal } from "@fal-ai/client";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get API key from environment
const FAL_KEY = process.env.FAL_KEY || process.env.FALAI_KEY;

if (!FAL_KEY) {
  console.error("❌ FAL_KEY or FALAI_KEY environment variable required");
  console.error("   export FAL_KEY=your-api-key");
  process.exit(1);
}

// Configure FAL client
fal.config({
  credentials: FAL_KEY,
});

interface ImagePrompt {
  name: string;
  prompt: string;
  style?: string;
}

// Generation parameters (saved to manifest)
const GENERATION_PARAMS = {
  model: "fal-ai/nano-banana-pro",
  aspect_ratio: "3:4" as const, // Portrait format for carousels
  num_images: 1,
  output_format: "png" as const,
  resolution: "1K" as const,
};

interface GeneratedImageInfo {
  name: string;
  filename: string;
  prompt: string;
  parameters: typeof GENERATION_PARAMS;
  generatedAt: string;
  sourceUrl?: string;
}

interface ImagesManifest {
  generatedAt: string;
  outputDir: string;
  totalImages: number;
  skippedImages: number;
  newlyGenerated: number;
  images: GeneratedImageInfo[];
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadExistingManifest(manifestPath: string): Promise<ImagesManifest | null> {
  try {
    const content = await fs.readFile(manifestPath, "utf-8");
    return JSON.parse(content) as ImagesManifest;
  } catch {
    return null;
  }
}

// AR-Shopping themed image prompts
const AR_SHOPPING_PROMPTS: ImagePrompt[] = [
  {
    name: "ar-shopping-hero",
    prompt:
      "Person using smartphone AR app to visualize furniture in living room, holographic 3D sofa floating in space, modern minimalist interior, electric lime green accent lighting, futuristic UI overlay, photorealistic, cinematic lighting, 4k",
  },
  {
    name: "ar-try-on-fashion",
    prompt:
      "Woman using AR mirror to try on virtual clothes, holographic dress overlay on reflection, sleek retail store, neon lime accents, futuristic shopping experience, photorealistic, soft studio lighting",
  },
  {
    name: "ar-makeup-mirror",
    prompt:
      "AR smart mirror showing virtual makeup try-on, digital cosmetics overlay on face, beauty store setting, lime green UI elements, futuristic beauty tech, photorealistic close-up",
  },
  {
    name: "ar-furniture-room",
    prompt:
      "Smartphone screen showing AR furniture placement app, virtual sofa in real living room, measurement lines and lime green UI overlays, photorealistic product visualization",
  },
  {
    name: "ar-glasses-shopping",
    prompt:
      "Person wearing AR smart glasses in shopping mall, holographic product information floating, lime green digital displays, futuristic retail, cyberpunk aesthetic",
  },
  {
    name: "ar-product-scan",
    prompt:
      "Hand holding smartphone scanning product with AR, 3D holographic product details appearing, lime green accent glow, dark background, tech visualization",
  },
];

interface GenerateResult {
  path: string;
  imageInfo: GeneratedImageInfo;
  skipped: boolean;
}

async function generateImage(
  prompt: ImagePrompt,
  outputDir: string
): Promise<GenerateResult> {
  const outputPath = path.join(outputDir, `${prompt.name}.png`);

  // Check if image already exists
  if (await fileExists(outputPath)) {
    console.log(`  ⏭ Skipped: ${prompt.name}.png (already exists)`);
    return {
      path: outputPath,
      imageInfo: {
        name: prompt.name,
        filename: `${prompt.name}.png`,
        prompt: prompt.prompt,
        parameters: GENERATION_PARAMS,
        generatedAt: "previously generated",
      },
      skipped: true,
    };
  }

  console.log(`  Generating: ${prompt.name}...`);

  const result = await fal.subscribe(GENERATION_PARAMS.model, {
    input: {
      prompt: prompt.prompt,
      aspect_ratio: GENERATION_PARAMS.aspect_ratio,
      num_images: GENERATION_PARAMS.num_images,
      output_format: GENERATION_PARAMS.output_format,
      resolution: GENERATION_PARAMS.resolution,
    },
    logs: false,
  });

  // Type assertion for Nano Banana Pro response
  const data = result as { data: { images: { url: string }[] } };
  const images = data.data?.images || [];

  if (!images || images.length === 0) {
    throw new Error(`No image generated for ${prompt.name}`);
  }

  const imageUrl = images[0].url;

  // Download the image
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();

  await fs.writeFile(outputPath, Buffer.from(buffer));

  console.log(`  ✓ Saved: ${prompt.name}.png`);

  return {
    path: outputPath,
    imageInfo: {
      name: prompt.name,
      filename: `${prompt.name}.png`,
      prompt: prompt.prompt,
      parameters: GENERATION_PARAMS,
      generatedAt: new Date().toISOString(),
      sourceUrl: imageUrl,
    },
    skipped: false,
  };
}

async function main(): Promise<void> {
  const outputDir =
    process.argv[2] ||
    path.join(
      __dirname,
      "..",
      "output",
      "2026-01-01_ar-shopping-im-e-commerce-2026",
      "images"
    );

  const manifestPath = path.join(outputDir, "images-manifest.json");

  console.log("\n");
  console.log("  FAL.AI Image Generator");
  console.log("  ─────────────────────");
  console.log("");
  console.log(`  Output: ${outputDir}`);
  console.log(`  Images: ${AR_SHOPPING_PROMPTS.length}`);
  console.log("");

  await fs.mkdir(outputDir, { recursive: true });

  // Load existing manifest if available
  const existingManifest = await loadExistingManifest(manifestPath);
  const existingImages = new Map<string, GeneratedImageInfo>();
  if (existingManifest) {
    for (const img of existingManifest.images) {
      existingImages.set(img.name, img);
    }
    console.log(`  Found existing manifest with ${existingManifest.images.length} images`);
    console.log("");
  }

  const allImageInfos: GeneratedImageInfo[] = [];
  let skippedCount = 0;
  let newCount = 0;

  for (const prompt of AR_SHOPPING_PROMPTS) {
    try {
      const result = await generateImage(prompt, outputDir);

      if (result.skipped) {
        skippedCount++;
        // Preserve existing manifest info if available
        const existing = existingImages.get(prompt.name);
        if (existing) {
          allImageInfos.push(existing);
        } else {
          allImageInfos.push(result.imageInfo);
        }
      } else {
        newCount++;
        allImageInfos.push(result.imageInfo);
      }
    } catch (error) {
      console.error(`  ✗ Failed: ${prompt.name} - ${(error as Error).message}`);
    }
  }

  // Save manifest
  const manifest: ImagesManifest = {
    generatedAt: new Date().toISOString(),
    outputDir: outputDir,
    totalImages: allImageInfos.length,
    skippedImages: skippedCount,
    newlyGenerated: newCount,
    images: allImageInfos,
  };

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

  console.log("");
  console.log(`  ✅ Complete!`);
  console.log(`     Total: ${allImageInfos.length} images`);
  console.log(`     Skipped: ${skippedCount} (already existed)`);
  console.log(`     Generated: ${newCount} new images`);
  console.log("");
  console.log(`  📄 Manifest saved: images-manifest.json`);
  console.log("");
}

main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
