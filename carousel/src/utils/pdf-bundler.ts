import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

/**
 * Bundle multiple PNG images into a single PDF
 */
export async function bundleToPDF(
  imagePaths: string[],
  outputPath: string
): Promise<string> {
  const pdfDoc = await PDFDocument.create();

  for (const imagePath of imagePaths) {
    const imageBytes = await fs.readFile(imagePath);
    const image = await pdfDoc.embedPng(imageBytes);

    // Add page matching image dimensions
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height
    });
  }

  const pdfBytes = await pdfDoc.save();

  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(outputPath, pdfBytes);

  return outputPath;
}

/**
 * Bundle slides from a directory into a PDF
 */
export async function bundleDirectoryToPDF(
  inputDir: string,
  outputFilename = 'carousel.pdf'
): Promise<string> {
  const files = await fs.readdir(inputDir);

  // Filter for PNG files and sort by name
  const pngFiles = files
    .filter((f) => f.endsWith('.png'))
    .sort()
    .map((f) => path.join(inputDir, f));

  if (pngFiles.length === 0) {
    throw new Error(`No PNG files found in ${inputDir}`);
  }

  const outputPath = path.join(inputDir, outputFilename);
  return bundleToPDF(pngFiles, outputPath);
}
