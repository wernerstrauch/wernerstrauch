/**
 * Dynamic slug mapping utility
 * Reads YAML page files at build time to create language-aware slug mappings
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

interface PageFrontmatter {
  pageId: string;
  slug?: string;
  lang: "de" | "en";
}

interface SlugMapping {
  de: string;
  en: string;
}

let cachedSlugMap: Record<string, SlugMapping> | null = null;

/**
 * Build the slug map by reading all YAML page files
 */
export function buildSlugMap(): Record<string, SlugMapping> {
  if (cachedSlugMap) {
    return cachedSlugMap;
  }

  const slugMap: Record<string, SlugMapping> = {};
  const pagesDir = path.resolve(process.cwd(), "src/content/pages");

  const languages = ["de", "en"] as const;

  for (const lang of languages) {
    const langDir = path.join(pagesDir, lang);

    if (!fs.existsSync(langDir)) {
      continue;
    }

    const files = fs.readdirSync(langDir).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));

    for (const file of files) {
      const filePath = path.join(langDir, file);
      const content = fs.readFileSync(filePath, "utf-8");

      try {
        const data = yaml.load(content) as PageFrontmatter;

        if (data?.pageId) {
          if (!slugMap[data.pageId]) {
            slugMap[data.pageId] = { de: "", en: "" };
          }

          // Use slug if defined, otherwise empty string for homepage
          slugMap[data.pageId][lang] = data.slug || "";
        }
      } catch {
        console.warn(`Failed to parse ${filePath}`);
      }
    }
  }

  cachedSlugMap = slugMap;
  return slugMap;
}

/**
 * Get the slug for a page in a specific language
 */
export function getSlugForLanguage(pageId: string, lang: "de" | "en"): string | null {
  const map = buildSlugMap();
  return map[pageId]?.[lang] ?? null;
}

/**
 * Clear the cached slug map (useful for development/testing)
 */
export function clearSlugMapCache(): void {
  cachedSlugMap = null;
}
