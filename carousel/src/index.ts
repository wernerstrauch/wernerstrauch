import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { allSlides } from "./slides/slide-templates.js";
import { slide } from "./styles/carousel-theme.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, "../output");

async function generateCarousel() {
  console.log("🎨 Generating Instagram Carousel...");
  console.log(`📐 Format: ${slide.width}x${slide.height}px (Instagram 4:5)`);
  console.log(`📄 Slides: ${allSlides.length}`);
  console.log("");

  // Launch browser using system Chrome
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Set viewport to match slide dimensions
    await page.setViewport({
      width: slide.width,
      height: slide.height,
      deviceScaleFactor: 2, // 2x for high DPI
    });

    // Generate each slide
    for (const slideData of allSlides) {
      console.log(`  Rendering: ${slideData.name}.png`);

      // Set the HTML content
      await page.setContent(slideData.html, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      // Wait for fonts to fully render
      await page.waitForFunction(() => document.fonts.ready, { timeout: 30000 });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Take screenshot
      const outputPath = path.join(outputDir, `${slideData.name}.png`);
      await page.screenshot({
        path: outputPath,
        type: "png",
        clip: {
          x: 0,
          y: 0,
          width: slide.width,
          height: slide.height,
        },
      });
    }

    console.log("");
    console.log("✅ Carousel generated successfully!");
    console.log(`📁 Output: ${outputDir}`);
  } finally {
    await browser.close();
  }
}

// Run
generateCarousel().catch((error) => {
  console.error("❌ Error generating carousel:", error);
  process.exit(1);
});
