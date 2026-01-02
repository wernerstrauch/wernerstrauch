import fs from 'fs/promises';
import path from 'path';

/**
 * Download image from URL and return as Buffer
 */
export async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

/**
 * Convert image buffer to base64 data URI
 */
export function imageToDataUri(buffer: Buffer, mimeType = 'image/png'): string {
  const base64 = buffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

/**
 * Save buffer to file
 */
export async function saveToFile(buffer: Buffer, filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, buffer);
}

/**
 * Download image and save to output directory
 */
export async function downloadAndSave(
  imageUrl: string,
  outputDir: string,
  filename: string
): Promise<string> {
  const buffer = await downloadImage(imageUrl);
  const outputPath = path.join(outputDir, filename);
  await saveToFile(buffer, outputPath);
  return outputPath;
}

/**
 * Create output directory with timestamp-based name
 */
export async function createOutputDir(baseDir: string, topic: string): Promise<string> {
  const timestamp = new Date().toISOString().split('T')[0];
  const slug = topic
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => {
      const map: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30);

  const dirName = `${timestamp}_${slug}`;
  const outputDir = path.join(baseDir, dirName);

  await fs.mkdir(outputDir, { recursive: true });

  return outputDir;
}

/**
 * Generate filename for a slide
 */
export function generateSlideFilename(index: number, slideType: string): string {
  const paddedIndex = String(index + 1).padStart(2, '0');
  const sanitizedType = slideType.replace(/[^a-z0-9-]/gi, '-');
  return `${paddedIndex}-${sanitizedType}.png`;
}
