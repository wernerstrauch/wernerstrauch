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
import type {
  CreateFolderRequest,
  RenameFolderRequest,
  FolderResponse,
} from "@lib/asset-manager/types";

export const prerender = false;

// Create folder
export const POST: APIRoute = async ({ request }) => {
  // Security: localhost only
  if (!isLocalhostRequest(request)) {
    return forbiddenResponse();
  }

  try {
    const body: CreateFolderRequest = await request.json();
    const { path: parentPath, name } = body;

    if (!name) {
      return jsonResponse(
        { success: false, error: "Ordnername erforderlich" },
        400,
      );
    }

    const sanitizedParent = sanitizePath(parentPath || "");
    const sanitizedName = sanitizeFilename(name);

    if (!sanitizedName) {
      return jsonResponse(
        { success: false, error: "Ungültiger Ordnername" },
        400,
      );
    }

    const basePath = getAssetsBasePath();
    const fullPath = path.join(basePath, sanitizedParent, sanitizedName);

    // Ensure the path is within the assets directory
    if (!fullPath.startsWith(basePath)) {
      return jsonResponse({ success: false, error: "Ungültiger Pfad" }, 400);
    }

    // Check if folder already exists
    if (fs.existsSync(fullPath)) {
      return jsonResponse(
        { success: false, error: "Ordner existiert bereits" },
        409,
      );
    }

    // Create the folder
    fs.mkdirSync(fullPath, { recursive: true });

    const relativePath =
      "/" + path.relative(basePath, fullPath).replace(/\\/g, "/");

    const response: FolderResponse = {
      success: true,
      data: {
        path: relativePath,
        name: sanitizedName,
      },
    };

    return jsonResponse(response, 201);
  } catch (error) {
    console.error("Create folder error:", error);
    return jsonResponse(
      { success: false, error: "Fehler beim Erstellen des Ordners" },
      500,
    );
  }
};

// Rename folder
export const PUT: APIRoute = async ({ request }) => {
  // Security: localhost only
  if (!isLocalhostRequest(request)) {
    return forbiddenResponse();
  }

  try {
    const body: RenameFolderRequest = await request.json();
    const { path: folderPath, newName } = body;

    if (!folderPath || !newName) {
      return jsonResponse(
        { success: false, error: "Pfad und neuer Name erforderlich" },
        400,
      );
    }

    const sanitizedPath = sanitizePath(folderPath);
    const sanitizedName = sanitizeFilename(newName);

    if (!sanitizedName) {
      return jsonResponse(
        { success: false, error: "Ungültiger Ordnername" },
        400,
      );
    }

    const basePath = getAssetsBasePath();
    const fullOldPath = path.join(basePath, sanitizedPath);
    const parentDir = path.dirname(fullOldPath);
    const fullNewPath = path.join(parentDir, sanitizedName);

    // Ensure both paths are within the assets directory
    if (
      !fullOldPath.startsWith(basePath) ||
      !fullNewPath.startsWith(basePath)
    ) {
      return jsonResponse({ success: false, error: "Ungültiger Pfad" }, 400);
    }

    // Check if source folder exists
    if (!fs.existsSync(fullOldPath)) {
      return jsonResponse(
        { success: false, error: "Ordner nicht gefunden" },
        404,
      );
    }

    // Check if it's actually a directory
    const stats = fs.statSync(fullOldPath);
    if (!stats.isDirectory()) {
      return jsonResponse(
        { success: false, error: "Pfad ist kein Ordner" },
        400,
      );
    }

    // Check if destination already exists
    if (fs.existsSync(fullNewPath)) {
      return jsonResponse(
        {
          success: false,
          error: "Ein Ordner mit diesem Namen existiert bereits",
        },
        409,
      );
    }

    // Rename the folder
    fs.renameSync(fullOldPath, fullNewPath);

    const newRelativePath =
      "/" + path.relative(basePath, fullNewPath).replace(/\\/g, "/");

    const response: FolderResponse = {
      success: true,
      data: {
        path: newRelativePath,
        name: sanitizedName,
      },
    };

    return jsonResponse(response);
  } catch (error) {
    console.error("Rename folder error:", error);
    return jsonResponse(
      { success: false, error: "Fehler beim Umbenennen des Ordners" },
      500,
    );
  }
};
