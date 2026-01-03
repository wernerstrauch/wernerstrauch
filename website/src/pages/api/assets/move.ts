import type { APIRoute } from "astro";
import * as fs from "node:fs";
import * as path from "node:path";
import {
  isLocalhostRequest,
  forbiddenResponse,
  jsonResponse,
  getAssetsBasePath,
  sanitizePath,
} from "@lib/asset-manager/utils";
import type { MoveRequest, MoveResponse } from "@lib/asset-manager/types";

export const prerender = false;

export const PUT: APIRoute = async ({ request }) => {
  // Security: localhost only
  if (!isLocalhostRequest(request)) {
    return forbiddenResponse();
  }

  try {
    const body: MoveRequest = await request.json();
    const { sourcePath, destinationPath } = body;

    if (!sourcePath || !destinationPath) {
      return jsonResponse(
        { success: false, error: "Quell- und Zielpfad erforderlich" },
        400,
      );
    }

    const basePath = getAssetsBasePath();
    const sanitizedSource = sanitizePath(sourcePath);
    const sanitizedDest = sanitizePath(destinationPath);

    const fullSourcePath = path.join(basePath, sanitizedSource);
    const fileName = path.basename(fullSourcePath);
    const fullDestPath = path.join(basePath, sanitizedDest, fileName);

    // Ensure both paths are within the assets directory
    if (
      !fullSourcePath.startsWith(basePath) ||
      !fullDestPath.startsWith(basePath)
    ) {
      return jsonResponse({ success: false, error: "Ungültiger Pfad" }, 400);
    }

    // Check if source exists
    if (!fs.existsSync(fullSourcePath)) {
      return jsonResponse(
        { success: false, error: "Quelldatei nicht gefunden" },
        404,
      );
    }

    // Create destination directory if it doesn't exist
    const destDir = path.dirname(fullDestPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Check if destination already exists
    if (fs.existsSync(fullDestPath)) {
      return jsonResponse(
        { success: false, error: "Datei existiert bereits am Zielort" },
        409,
      );
    }

    // Move the file
    fs.renameSync(fullSourcePath, fullDestPath);

    const newRelativePath =
      "/" + path.relative(basePath, fullDestPath).replace(/\\/g, "/");

    const response: MoveResponse = {
      success: true,
      data: {
        oldPath: sourcePath,
        newPath: newRelativePath,
      },
    };

    return jsonResponse(response);
  } catch (error) {
    console.error("Move error:", error);
    return jsonResponse(
      { success: false, error: "Fehler beim Verschieben" },
      500,
    );
  }
};
