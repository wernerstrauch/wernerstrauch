#!/usr/bin/env node

/**
 * Generate carousel from a content JSON file using Puppeteer (HTML → PNG)
 *
 * Usage:
 *   pnpm tsx src/generate-from-content.ts [content-file.json]
 *
 * If no file is provided, looks for src/generated-content.json
 */

import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import type { SlideConfig, Platform } from "./types/carousel.types.js";
import { generateSlideHTML } from "./slides/dynamic-templates.js";
import { bundleToPDF } from "./utils/pdf-bundler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_BASE = path.join(__dirname, "..", "output");

interface ContentFile {
  topic: string;
  platform: Platform;
  template: string;
  colorMode: string;
  thoughts?: string;
  slides: SlideConfig[];
}

// Platform dimensions
const DIMENSIONS = {
  linkedin: { width: 1080, height: 1080 },
  instagram: { width: 1080, height: 1350 },
};

async function createOutputDir(topic: string): Promise<string> {
  const timestamp = new Date().toISOString().split("T")[0];
  const slug = topic
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => {
      const map: Record<string, string> = {
        ä: "ae",
        ö: "oe",
        ü: "ue",
        ß: "ss",
      };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);

  const dirName = `${timestamp}_${slug}`;
  const outputDir = path.join(OUTPUT_BASE, dirName);

  await fs.mkdir(outputDir, { recursive: true });
  return outputDir;
}

async function main(): Promise<void> {
  // Get content file path from args or use default
  const contentFile =
    process.argv[2] || path.join(__dirname, "generated-content.json");

  console.log("\n");
  console.log("  Carousel Generator - Puppeteer");
  console.log("  ──────────────────────────────");
  console.log("");

  // Check if content file exists
  try {
    await fs.access(contentFile);
  } catch {
    console.error(`  Content file not found: ${contentFile}`);
    console.error("");
    console.error("  Create a content file with slide definitions.");
    console.error("");
    process.exit(1);
  }

  // Load content
  const content: ContentFile = JSON.parse(
    await fs.readFile(contentFile, "utf-8")
  );

  // Resolve relative image paths to absolute paths
  const contentDir = path.dirname(path.resolve(contentFile));
  for (const slide of content.slides) {
    if (slide.imagePath && !path.isAbsolute(slide.imagePath)) {
      slide.imagePath = path.resolve(contentDir, slide.imagePath);
    }
  }

  const dimensions = DIMENSIONS[content.platform] || DIMENSIONS.instagram;

  console.log(`  Topic: ${content.topic}`);
  console.log(`  Platform: ${content.platform} (${dimensions.width}x${dimensions.height})`);
  console.log(`  Template: ${content.template}`);
  console.log(`  Slides: ${content.slides.length}`);
  console.log("");

  // Show slide preview
  console.log("  Slide Preview:");
  for (const slideConfig of content.slides) {
    const num = String(slideConfig.index + 1).padStart(2, "0");
    console.log(`    ${num}. [${slideConfig.type}] ${slideConfig.title}`);
  }
  console.log("");

  // Create output directory
  const outputDir = await createOutputDir(content.topic);

  // Launch browser
  console.log("  Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const generatedPaths: string[] = [];

  try {
    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({
      width: dimensions.width,
      height: dimensions.height,
      deviceScaleFactor: 2, // 2x for high DPI
    });

    // Generate each slide
    for (const slideConfig of content.slides) {
      const slideNum = String(slideConfig.index + 1).padStart(2, "0");
      const filename = `${slideNum}-${slideConfig.type}.png`;

      console.log(`  Rendering: ${filename}`);

      // Generate HTML from template
      const html = generateSlideHTML(slideConfig);

      // Set the HTML content
      await page.setContent(html, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      // Wait for fonts to load
      await page.waitForFunction(() => document.fonts.ready, {
        timeout: 30000,
      });
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Take screenshot
      const outputPath = path.join(outputDir, filename);
      await page.screenshot({
        path: outputPath,
        type: "png",
        clip: {
          x: 0,
          y: 0,
          width: dimensions.width,
          height: dimensions.height,
        },
      });

      generatedPaths.push(outputPath);
    }

    // Bundle to PDF
    console.log("  Creating PDF...");
    const pdfPath = path.join(outputDir, "carousel.pdf");
    await bundleToPDF(generatedPaths, pdfPath);

    // Save content JSON for later editing
    console.log("  Saving content.json...");
    const contentJsonPath = path.join(outputDir, "content.json");
    await fs.writeFile(
      contentJsonPath,
      JSON.stringify(content, null, 2),
      "utf-8"
    );

    console.log("");
    console.log("  ✅ Carousel generated successfully!");
    console.log("");
    console.log(`  📁 Output: ${outputDir}`);
    console.log("");

    for (const p of generatedPaths) {
      console.log(`     ${path.basename(p)}`);
    }
    console.log("     carousel.pdf");
    console.log("     content.json  ← Edit & regenerate");
    console.log("");
  } finally {
    await browser.close();
  }
}

// Run
main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
