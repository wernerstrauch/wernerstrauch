---
name: fal-image-gen
description: "Generate AI images using fal.ai Nano Banana Pro model. Use this skill when (1) User requests image generation or creation, (2) User wants AI-generated visuals for websites, products, or marketing, (3) User asks to create illustrations, photos, or artwork with AI, (4) User mentions generate image, create picture, AI image, or similar requests. Supports various aspect ratios, resolutions up to 4K, and multiple output formats."
---

# fal.ai Image Generation (Nano Banana Pro)

Generate high-quality AI images using fal.ai's Nano Banana Pro model.

## Prerequisites

Requires `FALAI_KEY` environment variable with valid fal.ai API key (also supports `FAL_KEY` as fallback).

## Quick Start

```bash
node scripts/generate_image.js "Your prompt here" -o output.png
```

## Script Usage

**Basic:**

```bash
node scripts/generate_image.js "A sunset over mountains" -o sunset.png
```

**With options:**

```bash
node scripts/generate_image.js "Product photo" -o product.png \
  --aspect-ratio 4:3 \
  --resolution 2K \
  --format png
```

**Multiple images:**

```bash
node scripts/generate_image.js "Abstract art" -o art.png --num-images 4
```

## Parameters

| Parameter        | Values                                              | Default | Description        |
| ---------------- | --------------------------------------------------- | ------- | ------------------ |
| `--aspect-ratio` | 21:9, 16:9, 3:2, 4:3, 5:4, 1:1, 4:5, 3:4, 2:3, 9:16 | 1:1     | Image dimensions   |
| `--resolution`   | 1K, 2K, 4K                                          | 1K      | Output resolution  |
| `--format`       | png, jpeg, webp                                     | png     | File format        |
| `--num-images`   | 1-4                                                 | 1       | Images per request |

## Recommended Aspect Ratios by Use Case

- **Website hero/banner:** 16:9 or 21:9
- **Social media post:** 1:1 or 4:5
- **Product image:** 4:3 or 1:1
- **Portrait/Story:** 9:16
- **Print material:** 3:2 or 4:3

## Prompting Tips

1. **Be specific:** Include details about subject, style, lighting, composition
2. **Photography style:** Add "professional photo", "studio lighting", "product photography"
3. **Art style:** Specify "oil painting", "watercolor", "digital art", "minimalist"
4. **Quality modifiers:** "high detail", "sharp focus", "4K", "professional"

**Example prompts:**

- `"Professional product photo of wireless headphones on white background, studio lighting, sharp focus"`
- `"Modern minimalist logo design for tech startup, clean lines, blue and white color scheme"`
- `"Hero image for e-commerce website, lifestyle photo of person using laptop, warm natural lighting"`

## Programmatic Usage

```javascript
const { generateImage } = require("./scripts/generate_image.js");

const result = await generateImage({
  prompt: "Your description",
  outputPath: "image.png",
  aspectRatio: "16:9",
  resolution: "2K",
});

if (result.success) {
  console.log(`Saved to: ${result.images}`);
} else {
  console.log(`Error: ${result.error}`);
}
```

## Output

- Images saved to specified path
- Multiple images: `name_1.png`, `name_2.png`, etc.
- Returns object with `success`, `images` (paths), `description`
