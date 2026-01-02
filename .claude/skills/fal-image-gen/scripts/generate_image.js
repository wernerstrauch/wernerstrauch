#!/usr/bin/env node
/* eslint-env node */
/* global Buffer, process, console */
/**
 * Generate images using fal.ai Nano Banana Pro API.
 * Requires FALAI_KEY environment variable to be set.
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const VALID_RATIOS = [
  "21:9",
  "16:9",
  "3:2",
  "4:3",
  "5:4",
  "1:1",
  "4:5",
  "3:4",
  "2:3",
  "9:16",
];
const VALID_RESOLUTIONS = ["1K", "2K", "4K"];
const VALID_FORMATS = ["png", "jpeg", "webp"];

/**
 * Make an HTTPS request and return a promise
 */
function httpsRequest(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const buffer = Buffer.concat(chunks);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ statusCode: res.statusCode, body: buffer });
        } else {
          reject(
            new Error(`HTTP ${res.statusCode}: ${buffer.toString("utf-8")}`),
          );
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(120000, () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

/**
 * Download a file from URL
 */
async function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          // Follow redirect
          downloadFile(res.headers.location).then(resolve).catch(reject);
          return;
        }

        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Generate an image using Nano Banana Pro.
 *
 * @param {Object} options - Generation options
 * @param {string} options.prompt - Text description of the image to generate
 * @param {string} [options.outputPath='generated_image.png'] - Path to save the generated image
 * @param {string} [options.aspectRatio='1:1'] - Image aspect ratio
 * @param {string} [options.resolution='1K'] - Image resolution (1K, 2K, 4K)
 * @param {string} [options.outputFormat='png'] - Output format (png, jpeg, webp)
 * @param {number} [options.numImages=1] - Number of images to generate (1-4)
 * @returns {Promise<{success: boolean, images?: string[], description?: string, error?: string}>}
 */
export async function generateImage({
  prompt,
  outputPath = "generated_image.png",
  aspectRatio = "1:1",
  resolution = "1K",
  outputFormat = "png",
  numImages = 1,
}) {
  const apiKey = process.env.FALAI_KEY || process.env.FAL_KEY;
  if (!apiKey) {
    return { success: false, error: "FALAI_KEY environment variable not set" };
  }

  // Validate inputs
  if (!VALID_RATIOS.includes(aspectRatio)) {
    return {
      success: false,
      error: `Invalid aspectRatio. Must be one of: ${VALID_RATIOS.join(", ")}`,
    };
  }
  if (!VALID_RESOLUTIONS.includes(resolution)) {
    return {
      success: false,
      error: `Invalid resolution. Must be one of: ${VALID_RESOLUTIONS.join(", ")}`,
    };
  }
  if (!VALID_FORMATS.includes(outputFormat)) {
    return {
      success: false,
      error: `Invalid outputFormat. Must be one of: ${VALID_FORMATS.join(", ")}`,
    };
  }
  if (numImages < 1 || numImages > 4) {
    return { success: false, error: "numImages must be between 1 and 4" };
  }

  // Build request
  const payload = JSON.stringify({
    prompt,
    num_images: numImages,
    aspect_ratio: aspectRatio,
    resolution,
    output_format: outputFormat,
  });

  try {
    // Make API request
    const response = await httpsRequest(
      "https://fal.run/fal-ai/nano-banana-pro",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      payload,
    );

    const result = JSON.parse(response.body.toString("utf-8"));

    // Download and save images
    const savedPaths = [];
    const images = result.images || [];

    for (let i = 0; i < images.length; i++) {
      const imgUrl = images[i]?.url;
      if (!imgUrl) continue;

      // Generate output filename
      let savePath;
      if (numImages === 1) {
        savePath = outputPath;
      } else {
        const parsed = path.parse(outputPath);
        savePath = path.join(
          parsed.dir,
          `${parsed.name}_${i + 1}${parsed.ext}`,
        );
      }

      // Download image
      const imgData = await downloadFile(imgUrl);

      // Ensure directory exists
      const dir = path.dirname(savePath);
      if (dir && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Save to file
      fs.writeFileSync(savePath, imgData);
      savedPaths.push(savePath);
    }

    return {
      success: true,
      images: savedPaths,
      description: result.description || "",
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  const result = {
    prompt: null,
    output: "generated_image.png",
    aspectRatio: "1:1",
    resolution: "1K",
    format: "png",
    numImages: 1,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "-o" || arg === "--output") {
      result.output = args[++i];
    } else if (arg === "--aspect-ratio") {
      result.aspectRatio = args[++i];
    } else if (arg === "--resolution") {
      result.resolution = args[++i];
    } else if (arg === "--format") {
      result.format = args[++i];
    } else if (arg === "--num-images") {
      result.numImages = parseInt(args[++i], 10);
    } else if (arg === "-h" || arg === "--help") {
      console.log(`
Generate images with fal.ai Nano Banana Pro

Usage: node generate_image.js <prompt> [options]

Arguments:
  prompt                    Text description of the image

Options:
  -o, --output <path>       Output file path (default: generated_image.png)
  --aspect-ratio <ratio>    Image aspect ratio (default: 1:1)
                            Options: 21:9, 16:9, 3:2, 4:3, 5:4, 1:1, 4:5, 3:4, 2:3, 9:16
  --resolution <res>        Image resolution (default: 1K)
                            Options: 1K, 2K, 4K
  --format <fmt>            Output format (default: png)
                            Options: png, jpeg, webp
  --num-images <n>          Number of images to generate, 1-4 (default: 1)
  -h, --help                Show this help message

Examples:
  node generate_image.js "A sunset over mountains" -o sunset.png
  node generate_image.js "Product photo" -o product.png --aspect-ratio 4:3 --resolution 2K
  node generate_image.js "Abstract art" -o art.png --num-images 4
`);
      process.exit(0);
    } else if (!arg.startsWith("-") && !result.prompt) {
      result.prompt = arg;
    }
  }

  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.prompt) {
    console.error("Error: prompt is required");
    console.error('Usage: node generate_image.js "Your prompt" -o output.png');
    process.exit(1);
  }

  const result = await generateImage({
    prompt: args.prompt,
    outputPath: args.output,
    aspectRatio: args.aspectRatio,
    resolution: args.resolution,
    outputFormat: args.format,
    numImages: args.numImages,
  });

  if (result.success) {
    console.log(`✅ Generated ${result.images.length} image(s):`);
    for (const imgPath of result.images) {
      console.log(`   ${imgPath}`);
    }
    if (result.description) {
      console.log(`Description: ${result.description}`);
    }
  } else {
    console.error(`❌ Error: ${result.error}`);
    process.exit(1);
  }
}

// Run if called directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main();
}
