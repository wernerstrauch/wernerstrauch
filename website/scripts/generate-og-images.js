import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { parse as parseYaml } from 'yaml';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML Template Generator
function generateHtmlTemplate(headline) {
  return `
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
      max-width: 700px;
    }

    h1 {
      font-size: 72px;
      font-weight: 800;
      line-height: 1.1;
      color: white;
      margin-bottom: 24px;
    }

    h1 mark {
      background: none;
      color: #c8ff00;
    }

    h1 em {
      font-style: italic;
      font-weight: 600;
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

    /* Signet */
    .signet {
      position: absolute;
      bottom: 45px;
      left: 70px;
      width: 180px;
      height: auto;
      opacity: 0.5;
      filter: brightness(0) invert(1);
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
      <h1>${headline}</h1>
    </div>

    <div class="image-container">
      <img src="IMAGE_PLACEHOLDER" alt="Werner Strauch" />
    </div>
  </div>

  <img src="SIGNET_PLACEHOLDER" alt="Signet" class="signet" />

</body>
</html>
`;
}

async function generateOGImages() {
  const pagesDir = path.join(__dirname, '../src/content/pages/de');
  const outputDir = path.join(__dirname, '../public/og');
  const imagePath = path.join(__dirname, '../src/images/ecommerce-berater-werner-strauch.png');
  const signetPath = path.join(__dirname, '../public/signet-full.svg');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read portrait and signet once
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  const signetBuffer = fs.readFileSync(signetPath);
  const base64Signet = `data:image/svg+xml;base64,${signetBuffer.toString('base64')}`;

  // Find all YAML files
  const yamlFiles = await glob('*.yaml', { cwd: pagesDir });

  // Check for --page argument
  const pageArg = process.argv.find(arg => arg.startsWith('--page='));
  const specificPage = pageArg ? pageArg.split('=')[1] : null;

  // Filter pages to process
  const pagesToProcess = [];

  for (const file of yamlFiles) {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = parseYaml(content);

    if (data.meta?.ogImage?.headline && data.meta?.ogImage?.filename) {
      const pageName = file.replace('.yaml', '');

      if (specificPage && pageName !== specificPage) {
        continue;
      }

      pagesToProcess.push({
        name: pageName,
        headline: data.meta.ogImage.headline,
        filename: data.meta.ogImage.filename
      });
    }
  }

  if (pagesToProcess.length === 0) {
    console.log('No pages with ogImage configuration found.');
    console.log('Add ogImage block to meta section in YAML files:');
    console.log(`
meta:
  ogImage:
    headline: "Your<br><mark>Headline</mark>"
    filename: "og-your-page"
`);
    return;
  }

  console.log(`Found ${pagesToProcess.length} page(s) with ogImage configuration.\n`);

  // Launch browser once
  console.log('Starting Playwright...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({
    width: 1200,
    height: 630
  });

  // Generate each image
  for (const pageConfig of pagesToProcess) {
    console.log(`Generating: ${pageConfig.filename}.png`);

    const htmlContent = generateHtmlTemplate(pageConfig.headline);
    const finalHtml = htmlContent
      .replace('IMAGE_PLACEHOLDER', base64Image)
      .replace('SIGNET_PLACEHOLDER', base64Signet);

    await page.setContent(finalHtml, {
      waitUntil: 'networkidle'
    });

    await page.waitForFunction(() => document.fonts.ready);
    await page.waitForTimeout(300);

    const outputPath = path.join(outputDir, `${pageConfig.filename}.png`);

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

    const fileSize = (fs.statSync(outputPath).size / 1024).toFixed(1);
    console.log(`  -> ${outputPath} (${fileSize} KB)`);
  }

  await browser.close();

  console.log(`\nDone! Generated ${pagesToProcess.length} OG image(s).`);
}

generateOGImages().catch(console.error);
