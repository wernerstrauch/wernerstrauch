/**
 * Authors Configuration
 *
 * Defines author information for blog posts and content attribution.
 */

export interface Author {
  id: string;
  name: string;
  title: string;
  bio?: string;
  avatar: ImageMetadata | string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

// Placeholder avatar for authors without custom images
const defaultAvatar = "https://ui-avatars.com/api/?name=W+S&background=c8ff00&color=0a1628&size=128";

/**
 * Author definitions
 */
export const authors: Record<string, Author> = {
  "werner-strauch": {
    id: "werner-strauch",
    name: "Werner Strauch",
    title: "E-Commerce Berater & CTO",
    bio: "E-Commerce Berater mit Fokus auf Shopify, ERP-Systeme und Prozessoptimierung.",
    avatar: defaultAvatar,
    social: {
      linkedin: "https://linkedin.com/in/wernerstrauch",
    },
  },
};

/**
 * Get author by name or ID
 * Falls back to a default author if not found
 */
export function getAuthorByName(nameOrId: string): Author {
  // Check by ID first
  if (authors[nameOrId]) {
    return authors[nameOrId];
  }

  // Check by name (case-insensitive)
  const authorEntry = Object.entries(authors).find(
    ([, author]) => author.name.toLowerCase() === nameOrId.toLowerCase()
  );

  if (authorEntry) {
    return authorEntry[1];
  }

  // Return default author if not found
  return {
    id: "unknown",
    name: nameOrId,
    title: "Autor",
    avatar: defaultAvatar,
  };
}

/**
 * Get all authors
 */
export function getAllAuthors(): Author[] {
  return Object.values(authors);
}

/**
 * Get author by ID
 */
export function getAuthorById(id: string): Author | undefined {
  return authors[id];
}
