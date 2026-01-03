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
  sanitizePath,
  buildFolderTree,
  getMimeType,
  getFileCategory,
  IMAGE_EXTENSIONS,
} from "@lib/asset-manager/utils";
import type { FileSystemItem, ListResponse } from "@lib/asset-manager/types";

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  // Security: localhost only
  if (!isLocalhostRequest(request)) {
    return forbiddenResponse();
  }

  try {
    const basePath = getAssetsBasePath();
    const requestedPath = sanitizePath(url.searchParams.get("path") || "");
    const sortBy = url.searchParams.get("sort") || "name"; // "name" | "modified" | "size"
    const sortOrder = url.searchParams.get("order") || "asc"; // "asc" | "desc"
    const fullPath = path.join(basePath, requestedPath);

    // Ensure the path is within the assets directory
    if (!fullPath.startsWith(basePath)) {
      return jsonResponse({ success: false, error: "Ungültiger Pfad" }, 400);
    }

    // Check if directory exists
    if (!fs.existsSync(fullPath)) {
      // Create directory if it doesn't exist
      fs.mkdirSync(fullPath, { recursive: true });
    }

    const stats = fs.statSync(fullPath);
    if (!stats.isDirectory()) {
      return jsonResponse(
        { success: false, error: "Pfad ist kein Verzeichnis" },
        400,
      );
    }

    // Read directory contents
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    const items: FileSystemItem[] = [];

    for (const entry of entries) {
      // Skip hidden files
      if (entry.name.startsWith(".")) continue;

      const entryPath = path.join(fullPath, entry.name);
      const relativePath =
        "/" + path.relative(basePath, entryPath).replace(/\\/g, "/");
      const entryStats = fs.statSync(entryPath);

      if (entry.isDirectory()) {
        items.push({
          name: entry.name,
          type: "folder",
          path: relativePath,
          absolutePath: `/src/assets/${getCurrentDomainId()}${relativePath}`,
          modified: entryStats.mtime.toISOString(),
        });
      } else {
        const extension = path.extname(entry.name).slice(1).toLowerCase();
        const item: FileSystemItem = {
          name: entry.name,
          type: "file",
          path: relativePath,
          absolutePath: `/src/assets/${getCurrentDomainId()}${relativePath}`,
          size: entryStats.size,
          modified: entryStats.mtime.toISOString(),
          extension,
          mimeType: getMimeType(extension),
        };

        // Get image dimensions
        if (IMAGE_EXTENSIONS.includes(extension) && extension !== "svg") {
          try {
            const metadata = await sharp(entryPath).metadata();
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

        // For images, set thumbnail URL (same as file for now)
        if (getFileCategory(extension) === "image") {
          item.thumbnailUrl = relativePath;
        }

        items.push(item);
      }
    }

    // Sort: folders first, then files by selected criteria
    items.sort((a, b) => {
      // Folders always come first
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1;
      }

      let comparison = 0;

      switch (sortBy) {
        case "modified":
          comparison =
            new Date(a.modified).getTime() - new Date(b.modified).getTime();
          break;
        case "size":
          comparison = (a.size || 0) - (b.size || 0);
          break;
        case "name":
        default:
          comparison = a.name.localeCompare(b.name);
          break;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    // Build folder tree
    const folderTree = buildFolderTree(basePath, basePath);

    // Calculate parent path
    const currentPath = "/" + requestedPath;
    const parent = requestedPath
      ? "/" +
        path.dirname(requestedPath).replace(/\\/g, "/").replace(/^\.$/, "")
      : null;

    const response: ListResponse = {
      success: true,
      data: {
        currentPath: currentPath === "/" ? "/" : currentPath,
        domain: getCurrentDomainId(),
        parent: parent === "/" ? null : parent,
        items,
        folderTree,
      },
    };

    return jsonResponse(response);
  } catch (error) {
    console.error("Asset list error:", error);
    return jsonResponse(
      { success: false, error: "Fehler beim Laden der Dateien" },
      500,
    );
  }
};
