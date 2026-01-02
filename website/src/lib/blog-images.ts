/**
 * Blog Image Utilities
 *
 * Resolves blog image paths from src/images/blog/
 * to support Astro's image optimization.
 */

import type { ImageMetadata } from "astro";

// Import all blog images dynamically
const blogImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/images/blog/*.{png,jpg,jpeg,webp,gif}",
  { eager: true },
);

/**
 * Resolves a blog image path to an ImageMetadata object for use with Astro's Image component.
 *
 * @param src - The image path, e.g., "/images/blog/my-image.png" or just "my-image.png"
 * @returns ImageMetadata if found, null otherwise
 */
export function resolveBlogImage(src: string): ImageMetadata | null {
  if (!src) return null;

  // Extract the filename from the path
  // Handles both "/images/blog/filename.png" and "filename.png"
  const filename = src.split("/").pop();
  if (!filename) return null;

  // Construct the full asset path
  const assetPath = `/src/images/blog/${filename}`;

  const imageModule = blogImages[assetPath];
  if (imageModule) {
    return imageModule.default;
  }

  return null;
}

/**
 * Checks if a blog image exists in the assets folder
 */
export function blogImageExists(src: string): boolean {
  return resolveBlogImage(src) !== null;
}

/**
 * Gets all available blog images (useful for debugging)
 */
export function getAllBlogImages(): string[] {
  return Object.keys(blogImages).map((path) =>
    path.replace("/src/images/blog/", ""),
  );
}
