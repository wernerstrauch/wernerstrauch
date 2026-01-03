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
import type { DeleteRequest, DeleteResponse } from "@lib/asset-manager/types";

export const prerender = false;

export const DELETE: APIRoute = async ({ request }) => {
  // Security: localhost only
  if (!isLocalhostRequest(request)) {
    return forbiddenResponse();
  }

  try {
    const body: DeleteRequest = await request.json();
    const { paths } = body;

    if (!paths || !Array.isArray(paths) || paths.length === 0) {
      return jsonResponse(
        { success: false, error: "Keine Dateien angegeben" },
        400,
      );
    }

    const basePath = getAssetsBasePath();
    const deleted: string[] = [];
    const failed: { path: string; error: string }[] = [];

    for (const filePath of paths) {
      const sanitized = sanitizePath(filePath);
      const fullPath = path.join(basePath, sanitized);

      // Ensure the path is within the assets directory
      if (!fullPath.startsWith(basePath)) {
        failed.push({ path: filePath, error: "Ungültiger Pfad" });
        continue;
      }

      if (!fs.existsSync(fullPath)) {
        failed.push({ path: filePath, error: "Datei nicht gefunden" });
        continue;
      }

      try {
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          // Only delete empty directories or use recursive for non-empty
          fs.rmSync(fullPath, { recursive: true });
        } else {
          fs.unlinkSync(fullPath);
        }

        deleted.push(filePath);
      } catch (err) {
        failed.push({
          path: filePath,
          error: err instanceof Error ? err.message : "Unbekannter Fehler",
        });
      }
    }

    const response: DeleteResponse = {
      success: deleted.length > 0,
      data: { deleted, failed },
    };

    return jsonResponse(response, deleted.length > 0 ? 200 : 400);
  } catch (error) {
    console.error("Delete error:", error);
    return jsonResponse({ success: false, error: "Fehler beim Löschen" }, 500);
  }
};
