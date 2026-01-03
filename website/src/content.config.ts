import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Supported languages
const langSchema = z.enum(["de", "en"]).default("de");

// Blog Schema (MDX files for rich content with custom components)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "src/content/blog" }),
  schema: z.object({
    // i18n fields
    lang: langSchema,
    postId: z.string(), // Unique ID to link translations (e.g., "ai-agents-intro")
    slug: z.string().optional(), // URL slug (optional, defaults to filename)

    title: z.string(),
    metaTitle: z.string().optional(), // Optional SEO title
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(),
    readingTime: z.number(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),

    // Categories - can be one or multiple
    categories: z.array(z.enum(["ecommerce", "marketing", "strategy", "technology"])).optional(),
    // Legacy field - old posts use this, will be mapped to categories
    category: z
      .enum([
        "tutorial",
        "vergleich",
        "news",
        "case-study",
        "ecommerce",
        "marketing",
      ])
      .optional(),
    tags: z.array(z.string()).optional(),

    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

// Get build language from environment - load only that language's pages
const buildLang = import.meta.env.SITE_LANG || undefined;
const pagesPattern = buildLang
  ? `${buildLang}/*.{yaml,yml}`  // Only load pages for specific language
  : "**/*.{yaml,yml}";           // Load all pages for combined builds

// Pages Schema (YAML-driven page content)
const pages = defineCollection({
  loader: glob({ pattern: pagesPattern, base: "src/content/pages" }),
  schema: z.object({
    // i18n fields
    lang: langSchema,
    pageId: z.string(), // Unique ID to link translations (e.g., "about")

    meta: z.object({
      title: z.string(),
      description: z.string(),
      ogImage: z.object({
        headline: z.string(),
        filename: z.string(),
      }).optional(),
    }),
    // URL Configuration - Optional for homepage (pageId: "homepage"), required for other pages
    slug: z
      .string()
      .regex(/^(index|[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)?)$/)
      .optional(),
    // Optional Settings
    settings: z
      .object({
        status: z.enum(["published", "draft"]).default("published"),
        priority: z.number().min(0).max(1).default(0.8),
        headerVariant: z.enum(["light", "dark"]).default("light"),
      })
      .optional(),
    sections: z.array(
      z.object({
        id: z.string(),
        enabled: z.boolean().default(true),
        order: z.number(),
        component: z.string(),
        wrapper: z
          .object({
            variant: z
              .enum([
                "white",
                "light",
                "dark",
                "primary",
                "gradient",
                "transparent",
              ])
              .optional(),
            padding: z
              .enum(["none", "xxs", "xs", "sm", "md", "lg", "xl"])
              .optional(),
            fullWidth: z.boolean().optional(),
            container: z.boolean().optional(),
            containerSize: z
              .enum(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"])
              .optional(),
            overflow: z.enum(["hidden", "visible", "clip"]).optional(),
            rounded: z
              .enum(["none", "sm", "md", "lg", "xl", "2xl", "3xl"])
              .optional(),
            outerContainer: z.boolean().optional(),
          })
          .optional(),
        background: z
          .object({
            type: z.string().optional(),
            variant: z.enum(["light", "dark"]).optional(),
            color: z.string().optional(),
            glowColor: z.string().optional(),
            icons: z.array(z.string()).optional(),
            iconSize: z.number().optional(),
            iconCount: z.number().optional(),
            iconOpacity: z.number().optional(),
            gridSize: z.number().optional(),
            glowLines: z.number().optional(),
            rotate: z.number().optional(),
            gap: z.number().optional(),
            opacity: z.number().optional(),
            blur: z.number().optional(),
            vignette: z.boolean().optional(),
            vignetteColor: z.string().optional(),
            theme: z.string().optional(),
            // GlowBackgroundAnimated props
            blobCount: z.number().optional(),
            minRadius: z.number().optional(),
            maxRadius: z.number().optional(),
            speed: z.number().optional(),
            bleed: z.number().optional(),
            // StarField props
            starField: z.boolean().optional(),
            starDensity: z.enum(["low", "medium", "high"]).optional(),
            starMinRadius: z.number().optional(),
            starMaxRadius: z.number().optional(),
            // WavesBackground props
            lineCount: z.number().optional(),
            bloomStrength: z.number().optional(),
            trailCount: z.number().optional(),
            colors: z.array(z.string()).optional(),
            // ConcentricShapes props
            position: z.enum(["left", "right", "center"]).optional(),
            size: z.enum(["sm", "md", "lg"]).optional(),
            animate: z.boolean().optional(),
          })
          .optional(),
        // Support for multiple backgrounds
        backgrounds: z
          .array(
            z.object({
              type: z.string(),
              variant: z.enum(["light", "dark"]).optional(),
              color: z.string().optional(),
              glowColor: z.string().optional(),
              icons: z.array(z.string()).optional(),
              iconSize: z.number().optional(),
              iconCount: z.number().optional(),
              iconOpacity: z.number().optional(),
              gridSize: z.number().optional(),
              glowLines: z.number().optional(),
              rotate: z.number().optional(),
              gap: z.number().optional(),
              opacity: z.number().optional(),
              blur: z.number().optional(),
              vignette: z.boolean().optional(),
              vignetteColor: z.string().optional(),
              theme: z.string().optional(),
              // GlowBackgroundAnimated props
              blobCount: z.number().optional(),
              minRadius: z.number().optional(),
              maxRadius: z.number().optional(),
              speed: z.number().optional(),
              bleed: z.number().optional(),
              // StarField props
              starField: z.boolean().optional(),
              starDensity: z.enum(["low", "medium", "high"]).optional(),
              starMinRadius: z.number().optional(),
              starMaxRadius: z.number().optional(),
              // WavesBackground props
              lineCount: z.number().optional(),
              bloomStrength: z.number().optional(),
              trailCount: z.number().optional(),
              colors: z.array(z.string()).optional(),
              // ConcentricShapes props
              position: z.enum(["left", "right", "center", "bottom-right", "bottom-left", "top-right", "top-left"]).optional(),
              size: z.enum(["sm", "md", "lg", "xl", "2xl"]).optional(),
              animate: z.boolean().optional(),
              hideOnMobile: z.boolean().optional(),
              shape: z.string().optional(),
            }),
          )
          .optional(),
        content: z.any().optional(),
      }),
    ),
  }),
});

export const collections = {
  blog,
  pages,
};
