import type { CollectionEntry } from "astro:content";
import { buildSlugMap } from "./slug-map";

export type SupportedLanguage = "de" | "en";

export const DEFAULT_LANGUAGE: SupportedLanguage = "de";
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["de", "en"];

/**
 * Get the dynamic slug mapping between DE and EN pages
 * Built at build time by reading all YAML page files
 */
export function getPageSlugMap(): Record<string, { de: string; en: string }> {
  return buildSlugMap();
}

export interface LanguageConfig {
  urlPrefix: string;
  name: string;
  nativeName: string;
  code: string;
  siteUrl: string;
}

export const LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  de: {
    urlPrefix: "",
    name: "German",
    nativeName: "Deutsch",
    code: "DE",
    siteUrl: "https://wernerstrauch.de",
  },
  en: {
    urlPrefix: "/en",
    name: "English",
    nativeName: "English",
    code: "EN",
    siteUrl: "https://wernerstrauch.com",
  },
};

/**
 * Get the URL for a page based on its language and slug
 */
export function getPageUrl(page: CollectionEntry<"pages">): string {
  const lang = (page.data.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const prefix = LANGUAGES[lang].urlPrefix;
  const slug = page.data.slug;

  // Homepage (no slug or "index")
  if (!slug || slug === "index") {
    return prefix || "/";
  }

  return `${prefix}/${slug}`;
}

/**
 * Get the URL for a blog post based on its language and slug
 */
export function getBlogUrl(post: CollectionEntry<"blog">): string {
  const lang = (post.data.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const prefix = LANGUAGES[lang].urlPrefix;
  // Blog post slug is derived from filename (post.id without extension)
  const slug = post.data.slug || post.id.replace(/\.mdx?$/, "");

  return `${prefix}/blog/${slug}`;
}

/**
 * Find the translation of a page by pageId
 */
export function findPageTranslation(
  pages: CollectionEntry<"pages">[],
  currentPage: CollectionEntry<"pages">,
  targetLang: SupportedLanguage,
): CollectionEntry<"pages"> | undefined {
  return pages.find(
    (p) =>
      p.data.pageId === currentPage.data.pageId && p.data.lang === targetLang,
  );
}

/**
 * Find the translation of a blog post by postId
 */
export function findBlogTranslation(
  posts: CollectionEntry<"blog">[],
  currentPost: CollectionEntry<"blog">,
  targetLang: SupportedLanguage,
): CollectionEntry<"blog"> | undefined {
  return posts.find(
    (p) =>
      p.data.postId === currentPost.data.postId && p.data.lang === targetLang,
  );
}

/**
 * Get all translations for a page (including itself)
 */
export function getPageTranslations(
  pages: CollectionEntry<"pages">[],
  currentPage: CollectionEntry<"pages">,
): CollectionEntry<"pages">[] {
  return pages.filter((p) => p.data.pageId === currentPage.data.pageId);
}

/**
 * Get all translations for a blog post (including itself)
 */
export function getBlogTranslations(
  posts: CollectionEntry<"blog">[],
  currentPost: CollectionEntry<"blog">,
): CollectionEntry<"blog">[] {
  return posts.filter((p) => p.data.postId === currentPost.data.postId);
}

export interface HreflangEntry {
  lang: string;
  url: string;
}

/**
 * Get the full URL for a page including the correct domain for its language
 */
export function getFullPageUrl(page: CollectionEntry<"pages">): string {
  const lang = (page.data.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const { siteUrl } = LANGUAGES[lang];
  const slug = page.data.slug;

  // For English on separate domain, no /en prefix needed
  if (lang === "en") {
    if (!slug || slug === "index") {
      return siteUrl;
    }
    return `${siteUrl}/${slug}`;
  }

  // German uses standard getPageUrl
  return `${siteUrl}${getPageUrl(page)}`;
}

/**
 * Generate hreflang entries for a page using dynamic slug mapping
 * This works for separate domain deployments where only one language is built at a time
 */
export function getPageHreflangEntries(
  _pages: CollectionEntry<"pages">[],
  currentPage: CollectionEntry<"pages">,
  _siteUrl?: string, // kept for backwards compatibility
): HreflangEntry[] {
  const pageId = currentPage.data.pageId;
  const pageSlugMap = getPageSlugMap();
  const slugMap = pageSlugMap[pageId];

  // If no mapping exists, only return current page
  if (!slugMap) {
    const lang = (currentPage.data.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
    return [
      { lang, url: getFullPageUrl(currentPage) },
      { lang: "x-default", url: getFullPageUrl(currentPage) },
    ];
  }

  const entries: HreflangEntry[] = [];

  // Generate entries for both languages
  for (const lang of SUPPORTED_LANGUAGES) {
    const slug = slugMap[lang];
    const { siteUrl } = LANGUAGES[lang];
    const url = slug ? `${siteUrl}/${slug}` : siteUrl;
    entries.push({ lang, url });
  }

  // Add x-default pointing to German version
  const deSlug = slugMap.de;
  const deUrl = deSlug ? `${LANGUAGES.de.siteUrl}/${deSlug}` : LANGUAGES.de.siteUrl;
  entries.push({ lang: "x-default", url: deUrl });

  return entries;
}

/**
 * Get the alternate language URL for language switcher
 * Uses dynamic slug mapping for separate domain deployments
 */
export function getAlternateLanguageUrl(
  currentPage: CollectionEntry<"pages">,
): { lang: SupportedLanguage; url: string } | null {
  const currentLang = (currentPage.data.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const targetLang = currentLang === "de" ? "en" : "de";
  const pageId = currentPage.data.pageId;
  const pageSlugMap = getPageSlugMap();
  const slugMap = pageSlugMap[pageId];

  if (!slugMap) {
    // Fallback to homepage of target language
    return {
      lang: targetLang,
      url: LANGUAGES[targetLang].siteUrl,
    };
  }

  const targetSlug = slugMap[targetLang];
  const { siteUrl } = LANGUAGES[targetLang];
  const url = targetSlug ? `${siteUrl}/${targetSlug}` : siteUrl;

  return { lang: targetLang, url };
}

/**
 * Get the full URL for a blog post including the correct domain
 */
export function getFullBlogUrl(post: CollectionEntry<"blog">): string {
  const lang = (post.data.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
  const { siteUrl } = LANGUAGES[lang];
  const slug = post.data.slug || post.id.replace(/\.mdx?$/, "");

  // For English on separate domain, no /en prefix needed
  if (lang === "en") {
    return `${siteUrl}/blog/${slug}`;
  }

  return `${siteUrl}${getBlogUrl(post)}`;
}

/**
 * Generate hreflang entries for a blog post
 */
export function getBlogHreflangEntries(
  posts: CollectionEntry<"blog">[],
  currentPost: CollectionEntry<"blog">,
  _siteUrl?: string, // kept for backwards compatibility
): HreflangEntry[] {
  const translations = getBlogTranslations(posts, currentPost);

  const entries: HreflangEntry[] = translations.map((p) => {
    const lang = (p.data.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
    return {
      lang,
      url: getFullBlogUrl(p),
    };
  });

  // Add x-default pointing to German version
  const defaultPost = translations.find(
    (p) => p.data.lang === DEFAULT_LANGUAGE,
  );
  if (defaultPost) {
    entries.push({
      lang: "x-default",
      url: getFullBlogUrl(defaultPost),
    });
  }

  return entries;
}

/**
 * Get the alternate language URL (for language switcher fallback)
 * Returns homepage of the other language if no translation exists
 */
export function getAlternateUrl(
  currentLang: SupportedLanguage,
  alternatePageUrl?: string,
): string {
  if (alternatePageUrl) {
    return alternatePageUrl;
  }

  // Fallback to homepage of the other language
  const targetLang = currentLang === "de" ? "en" : "de";
  return LANGUAGES[targetLang].urlPrefix || "/";
}

/**
 * Detect language from URL path
 */
export function detectLanguageFromPath(path: string): SupportedLanguage {
  if (path.startsWith("/en/") || path === "/en") {
    return "en";
  }
  return "de";
}
