import type { APIRoute } from "astro";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  isLocalhostRequest,
  forbiddenResponse,
  jsonResponse,
  getAssetsBasePath,
  sanitizePath,
  sanitizeFilename,
} from "@lib/asset-manager/utils";
import type { UploadResponse } from "@lib/asset-manager/types";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Security: localhost only
  if (!isLocalhostRequest(request)) {
    return forbiddenResponse();
  }

  try {
    const formData = await request.formData();
    const targetPath = sanitizePath(formData.get("path")?.toString() || "");
    const basePath = getAssetsBasePath();
    const fullTargetPath = path.join(basePath, targetPath);

    // Ensure the path is within the assets directory
    if (!fullTargetPath.startsWith(basePath)) {
      return jsonResponse(
        { success: false, error: "Ungültiger Zielpfad" },
        400,
      );
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(fullTargetPath)) {
      fs.mkdirSync(fullTargetPath, { recursive: true });
    }

    const files = formData.getAll("files");
    const uploaded: { name: string; path: string; size: number }[] = [];
    const failed: { name: string; error: string }[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        continue;
      }

      const sanitizedName = sanitizeFilename(file.name);
      if (!sanitizedName) {
        failed.push({ name: file.name, error: "Ungültiger Dateiname" });
        continue;
      }

      const filePath = path.join(fullTargetPath, sanitizedName);

      // Check if file already exists
      if (fs.existsSync(filePath)) {
        // Add timestamp to filename to make it unique
        const ext = path.extname(sanitizedName);
        const nameWithoutExt = path.basename(sanitizedName, ext);
        const timestamp = Date.now();
        const newName = `${nameWithoutExt}-${timestamp}${ext}`;
        const newFilePath = path.join(fullTargetPath, newName);

        try {
          const arrayBuffer = await file.arrayBuffer();
          fs.writeFileSync(newFilePath, new Uint8Array(arrayBuffer));

          const relativePath =
            "/" + path.relative(basePath, newFilePath).replace(/\\/g, "/");
          uploaded.push({
            name: newName,
            path: relativePath,
            size: file.size,
          });
        } catch (err) {
          failed.push({
            name: file.name,
            error: err instanceof Error ? err.message : "Unbekannter Fehler",
          });
        }
      } else {
        try {
          const arrayBuffer = await file.arrayBuffer();
          fs.writeFileSync(filePath, new Uint8Array(arrayBuffer));

          const relativePath =
            "/" + path.relative(basePath, filePath).replace(/\\/g, "/");
          uploaded.push({
            name: sanitizedName,
            path: relativePath,
            size: file.size,
          });
        } catch (err) {
          failed.push({
            name: file.name,
            error: err instanceof Error ? err.message : "Unbekannter Fehler",
          });
        }
      }
    }

    const response: UploadResponse = {
      success: uploaded.length > 0,
      data: { uploaded, failed },
    };

    return jsonResponse(response, uploaded.length > 0 ? 200 : 400);
  } catch (error) {
    console.error("Upload error:", error);
    return jsonResponse(
      { success: false, error: "Fehler beim Hochladen" },
      500,
    );
  }
};
