import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 1200px;
      height: 630px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a1628;
      position: relative;
      overflow: hidden;
    }

    /* Grid Background */
    .grid-bg {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(200, 255, 0, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200, 255, 0, 0.05) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* Gradient Glow */
    .glow {
      position: absolute;
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, rgba(200, 255, 0, 0.12) 0%, transparent 70%);
      top: 50%;
      left: 25%;
      transform: translate(-50%, -50%);
      filter: blur(80px);
    }

    .glow-2 {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(200, 255, 0, 0.08) 0%, transparent 70%);
      bottom: -100px;
      right: 150px;
      filter: blur(60px);
    }

    /* Content Container */
    .container {
      position: relative;
      z-index: 10;
      display: flex;
      height: 100%;
      padding: 60px 70px;
    }

    /* Left Content */
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 20px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(200, 255, 0, 0.1);
      border: 1px solid rgba(200, 255, 0, 0.3);
      padding: 10px 20px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      color: #c8ff00;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 28px;
      width: fit-content;
    }

    h1 {
      font-size: 90px;
      font-weight: 800;
      line-height: 1.15;
      color: white;
      margin-bottom: 24px;
    }

    h1 .highlight {
      color: #c8ff00;
    }

    h1 .emphasis {
      font-style: italic;
      font-weight: 600;
    }

    .subtitle {
      font-size: 20px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.65);
      max-width: 480px;
    }

    /* Stats Row */
    .stats {
      display: flex;
      gap: 48px;
      margin-top: 44px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-value {
      font-size: 40px;
      font-weight: 800;
      color: #c8ff00;
      line-height: 1;
    }

    .stat-label {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.45);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    /* Right Side - Image */
    .image-container {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 400px;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }

    .image-container img {
      max-height: 580px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5));
    }

    /* Decorative Elements */
    .corner-accent {
      position: absolute;
      width: 100px;
      height: 100px;
      border: 2px solid rgba(200, 255, 0, 0.15);
    }

    .corner-accent.top-left {
      top: 35px;
      left: 35px;
      border-right: none;
      border-bottom: none;
    }

    .corner-accent.bottom-right {
      bottom: 35px;
      right: 35px;
      border-left: none;
      border-top: none;
    }

    /* Logo */
    .logo {
      position: absolute;
      bottom: 45px;
      left: 70px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-text {
      font-size: 16px;
      font-weight: 600;
      color: white;
    }

    .logo-dot {
      color: #c8ff00;
    }

    /* URL */
    .url {
      position: absolute;
      bottom: 47px;
      right: 70px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.35);
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow"></div>
  <div class="glow-2"></div>

  <div class="corner-accent top-left"></div>
  <div class="corner-accent bottom-right"></div>

  <div class="container">
    <div class="content">
      <h1>
        Werner <span class="highlight">Strauch</span>
        <br>
        <span class="highlight">E-Commerce</span>
      </h1>
    </div>

    <div class="image-container">
      <img src="IMAGE_PLACEHOLDER" alt="Werner Strauch" />
    </div>
  </div>

</body>
</html>
`;

async function generateOGImage() {
  const imagePath = path.join(__dirname, '../src/images/ecommerce-berater-werner-strauch.png');
  const outputPath = path.join(__dirname, '../public/og-image.png');

  // Read image and convert to base64
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  // Replace placeholder with actual image
  const finalHtml = htmlContent.replace('IMAGE_PLACEHOLDER', base64Image);

  console.log('Starting Playwright...');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to OG image dimensions
  await page.setViewportSize({
    width: 1200,
    height: 630
  });

  // Set content
  await page.setContent(finalHtml, {
    waitUntil: 'networkidle'
  });

  // Wait for fonts to load
  await page.waitForFunction(() => document.fonts.ready);

  // Extra wait for rendering
  await page.waitForTimeout(500);

  // Take screenshot
  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: {
      x: 0,
      y: 0,
      width: 1200,
      height: 630
    }
  });

  await browser.close();

  console.log(`OpenGraph image generated: ${outputPath}`);
  console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
}

generateOGImage().catch(console.error);
