import type { APIRoute } from "astro";
import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";
import { getCurrentDomainId } from "@/config";
import {
  isLocalhostRequest,
  forbiddenResponse,
  jsonResponse,
  getAssetsBasePath,
  getMimeType,
  getFileCategory,
  IMAGE_EXTENSIONS,
} from "@lib/asset-manager/utils";
import type { FileSystemItem, SearchResponse } from "@lib/asset-manager/types";

export const prerender = false;

async function searchFilesRecursive(
  dir: string,
  basePath: string,
  query: string,
  typeFilter: string | null,
): Promise<FileSystemItem[]> {
  const results: FileSystemItem[] = [];
  const queryLower = query.toLowerCase();

  async function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip hidden files
      if (entry.name.startsWith(".")) continue;

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Recursively search subdirectories
        await walk(fullPath);
      } else {
        // Check if filename matches query
        if (!entry.name.toLowerCase().includes(queryLower)) {
          continue;
        }

        const extension = path.extname(entry.name).slice(1).toLowerCase();
        const category = getFileCategory(extension);

        // Apply type filter if specified
        if (typeFilter && typeFilter !== "all" && category !== typeFilter) {
          continue;
        }

        const stats = fs.statSync(fullPath);
        const relativePath =
          "/" + path.relative(basePath, fullPath).replace(/\\/g, "/");

        const item: FileSystemItem = {
          name: entry.name,
          type: "file",
          path: relativePath,
          absolutePath: `/src/assets/${getCurrentDomainId()}${relativePath}`,
          size: stats.size,
          modified: stats.mtime.toISOString(),
          extension,
          mimeType: getMimeType(extension),
        };

        // Get image dimensions
        if (IMAGE_EXTENSIONS.includes(extension) && extension !== "svg") {
          try {
            const metadata = await sharp(fullPath).metadata();
            if (metadata.width && metadata.height) {
              item.dimensions = {
                width: metadata.width,
                height: metadata.height,
              };
            }
          } catch {
            // Ignore errors reading image metadata
          }
        }

        // For images, set thumbnail URL
        if (category === "image") {
          item.thumbnailUrl = relativePath;
        }

        results.push(item);
      }
    }
  }

  await walk(dir);
  return results;
}

export const GET: APIRoute = async ({ request, url }) => {
  // Security: localhost only
  if (!isLocalhostRequest(request)) {
    return forbiddenResponse();
  }

  try {
    const query = url.searchParams.get("q");
    const typeFilter = url.searchParams.get("type");

    if (!query || query.trim().length === 0) {
      return jsonResponse(
        { success: false, error: "Suchbegriff erforderlich" },
        400,
      );
    }

    const basePath = getAssetsBasePath();

    // Check if directory exists
    if (!fs.existsSync(basePath)) {
      return jsonResponse({
        success: true,
        data: {
          query,
          results: [],
          total: 0,
        },
      });
    }

    const results = await searchFilesRecursive(
      basePath,
      basePath,
      query.trim(),
      typeFilter,
    );

    // Sort by relevance (exact matches first, then by name)
    results.sort((a, b) => {
      const queryLower = query.toLowerCase();
      const aExact = a.name.toLowerCase() === queryLower;
      const bExact = b.name.toLowerCase() === queryLower;

      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStartsWith = a.name.toLowerCase().startsWith(queryLower);
      const bStartsWith = b.name.toLowerCase().startsWith(queryLower);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      return a.name.localeCompare(b.name);
    });

    const response: SearchResponse = {
      success: true,
      data: {
        query,
        results,
        total: results.length,
      },
    };

    return jsonResponse(response);
  } catch (error) {
    console.error("Search error:", error);
    return jsonResponse({ success: false, error: "Fehler bei der Suche" }, 500);
  }
};
