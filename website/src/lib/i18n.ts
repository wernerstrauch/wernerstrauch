import type { CollectionEntry } from "astro:content";

export type SupportedLanguage = "de" | "en";

export const DEFAULT_LANGUAGE: SupportedLanguage = "de";
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["de", "en"];

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
 * Generate hreflang entries for a page
 */
export function getPageHreflangEntries(
  pages: CollectionEntry<"pages">[],
  currentPage: CollectionEntry<"pages">,
  _siteUrl?: string, // kept for backwards compatibility, but uses LANGUAGES config
): HreflangEntry[] {
  const translations = getPageTranslations(pages, currentPage);

  const entries: HreflangEntry[] = translations.map((p) => {
    const lang = (p.data.lang as SupportedLanguage) || DEFAULT_LANGUAGE;
    return {
      lang,
      url: getFullPageUrl(p),
    };
  });

  // Add x-default pointing to German version (as it's the default)
  const defaultPage = translations.find(
    (p) => p.data.lang === DEFAULT_LANGUAGE,
  );
  if (defaultPage) {
    entries.push({
      lang: "x-default",
      url: getFullPageUrl(defaultPage),
    });
  }

  return entries;
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
