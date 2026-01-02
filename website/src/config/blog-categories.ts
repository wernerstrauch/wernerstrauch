/**
 * Blog Categories Configuration
 *
 * Centralized configuration for blog categories.
 * Easily extendable for future categories.
 */

export interface BlogCategory {
  id: string;
  label: string;
  labelPlural: string;
  slug: string;
  description: string;
  color: string;
  icon?: string;
}

export const blogCategories: Record<string, BlogCategory> = {
  ecommerce: {
    id: "ecommerce",
    label: "E-Commerce",
    labelPlural: "E-Commerce",
    slug: "ecommerce",
    description:
      "Alles rund um Online-Shops, Shopify, WooCommerce und E-Commerce Best Practices.",
    color: "violet",
  },
  marketing: {
    id: "marketing",
    label: "Marketing",
    labelPlural: "Marketing",
    slug: "marketing",
    description:
      "Online-Marketing, SEO, SEA, Social Media und Performance Marketing Strategien.",
    color: "emerald",
  },
  strategy: {
    id: "strategy",
    label: "Strategie",
    labelPlural: "Strategie",
    slug: "strategie",
    description:
      "Geschäftsstrategie, digitale Transformation und Wachstumsstrategien.",
    color: "blue",
  },
  technology: {
    id: "technology",
    label: "Technologie",
    labelPlural: "Technologie",
    slug: "technologie",
    description:
      "Web-Technologien, APIs, Automatisierung und technische Lösungen.",
    color: "orange",
  },
};

/**
 * Get all category IDs as array (for schema validation)
 */
export const categoryIds = Object.keys(blogCategories) as [string, ...string[]];

/**
 * Get category by ID
 */
export function getCategory(categoryId: string): BlogCategory | undefined {
  return blogCategories[categoryId];
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return Object.values(blogCategories).find((cat) => cat.slug === slug);
}

/**
 * Get all categories as array
 */
export function getAllCategories(): BlogCategory[] {
  return Object.values(blogCategories);
}

/**
 * Check if a category ID is valid
 */
export function isValidCategory(categoryId: string): boolean {
  return categoryId in blogCategories;
}
