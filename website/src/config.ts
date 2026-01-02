import type { SiteConfig, DomainId, MegaMenuCategory } from "./types";

// Domain ID for single domain setup (wernerstrauch)
export const DOMAIN_ID: DomainId = "wernerstrauch";

// Backwards compatibility - always returns our single domain config
export function getCurrentDomain() {
  return SITE;
}

// Social links
export const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/werner-strauch-42520b15b/",
    icon: "simple-icons:linkedin",
  },
  {
    name: "GitHub",
    href: "https://github.com/wernerstrauch",
    icon: "simple-icons:github",
  },
];

// Client logos for trust bar
export const CLIENTS = [
  { name: "Netrada", logo: "/src/images/logos/logo-1.svg" },
  { name: "Kadlwei", logo: "/src/images/logos/logo-2.svg" },
  { name: "Naturtrüb", logo: "/src/images/logos/logo-3.svg" },
  { name: "Fictional 1", logo: "/src/images/logos/fictional-logo-01.svg" },
  { name: "Fictional 2", logo: "/src/images/logos/fictional-logo-02.svg" },
  { name: "Fictional 3", logo: "/src/images/logos/fictional-logo-03.svg" },
  { name: "Fictional 4", logo: "/src/images/logos/fictional-logo-04.svg" },
  { name: "Fictional 5", logo: "/src/images/logos/fictional-logo-05.svg" },
];

// Mega Menu Navigation - SEO-optimized structure
export const MEGA_MENU_DE: MegaMenuCategory[] = [
  {
    title: "Leistungen",
    href: "/leistungen",
    subcategories: [
      {
        title: "Analyse & Strategie",
        links: [
          {
            label: "E-Commerce Audit",
            href: "/ecommerce-audit",
            icon: "heroicons:magnifying-glass-circle",
            description: "Potenziale erkennen, Schwachstellen beheben",
          },
          {
            label: "E-Commerce Strategie",
            href: "/ecommerce-strategie",
            icon: "heroicons:map",
            description: "Klare Roadmap für nachhaltiges Wachstum",
          },
          {
            label: "Technologieberatung",
            href: "/technologieberatung",
            icon: "heroicons:cpu-chip",
            description: "Die richtige Tech-Stack-Entscheidung",
          },
        ],
      },
      {
        title: "Beratung & Sparring",
        links: [
          {
            label: "E-Commerce Beratung",
            href: "/ecommerce-beratung",
            icon: "heroicons:light-bulb",
            description: "Strategische Begleitung auf Augenhöhe",
          },
          {
            label: "E-Commerce Sparring",
            href: "/ecommerce-sparring",
            icon: "heroicons:chat-bubble-left-right",
            description: "Ihr externer Sparringspartner für klare Entscheidungen",
          },
          {
            label: "E-Commerce Workshop",
            href: "/ecommerce-workshop",
            icon: "heroicons:academic-cap",
            description: "Fokussierte Arbeitssessions mit Ergebnis",
          },
        ],
      },
      {
        title: "Umsetzung & Führung",
        links: [
          {
            label: "E-Commerce Projektleitung",
            href: "/ecommerce-projektleitung",
            icon: "heroicons:clipboard-document-check",
            description: "Projekte termingerecht zum Erfolg führen",
          },
          {
            label: "Umsetzungsbegleitung",
            href: "/umsetzungsbegleitung",
            icon: "heroicons:arrow-path-rounded-square",
            description: "Vom Konzept zur funktionierenden Lösung",
          },
          {
            label: "Interim Management",
            href: "/interim-management",
            icon: "heroicons:user-circle",
            description: "Führung auf Zeit für kritische Phasen",
          },
        ],
      },
    ],
    trustBadges: [],
  },
];

export const MEGA_MENU_EN: MegaMenuCategory[] = [
  {
    title: "Services",
    href: "/en/services",
    subcategories: [
      {
        title: "Analysis & Strategy",
        links: [
          {
            label: "E-Commerce Audit",
            href: "/en/ecommerce-audit",
            icon: "heroicons:magnifying-glass-circle",
            description: "Identify potential, fix weaknesses",
          },
          {
            label: "E-Commerce Strategy",
            href: "/en/ecommerce-strategy",
            icon: "heroicons:map",
            description: "Clear roadmap for sustainable growth",
          },
          {
            label: "Technology Consulting",
            href: "/en/technology-consulting",
            icon: "heroicons:cpu-chip",
            description: "The right tech stack decision",
          },
        ],
      },
      {
        title: "Consulting & Sparring",
        links: [
          {
            label: "E-Commerce Consulting",
            href: "/en/ecommerce-consulting",
            icon: "heroicons:light-bulb",
            description: "Strategic guidance at eye level",
          },
          {
            label: "E-Commerce Sparring",
            href: "/en/ecommerce-sparring",
            icon: "heroicons:chat-bubble-left-right",
            description: "Your external sparring partner for clear decisions",
          },
          {
            label: "E-Commerce Workshop",
            href: "/en/ecommerce-workshop",
            icon: "heroicons:academic-cap",
            description: "Focused work sessions with results",
          },
        ],
      },
      {
        title: "Implementation & Leadership",
        links: [
          {
            label: "E-Commerce Project Management",
            href: "/en/ecommerce-project-management",
            icon: "heroicons:clipboard-document-check",
            description: "Leading projects to success on time",
          },
          {
            label: "Implementation Support",
            href: "/en/implementation-support",
            icon: "heroicons:arrow-path-rounded-square",
            description: "From concept to working solution",
          },
          {
            label: "Interim Management",
            href: "/en/interim-management",
            icon: "heroicons:user-circle",
            description: "Leadership for critical phases",
          },
        ],
      },
    ],
    trustBadges: [],
  },
];

export const SITE: SiteConfig = {
  site: "https://wernerstrauch.de",
  author: "Werner Strauch",
  title: "Werner Strauch | E-Commerce Strategie & Technologie",
  description:
    "Strategische Beratung für E-Commerce, Shopify und digitale Transformation. Pragmatische Lösungen für nachhaltiges Wachstum.",
  ogImage: "/og-image.png",
  logo: {
    src: "/logo.svg",
    alt: "Werner Strauch",
  },
  favicon: "/favicon.png",
  contact: {
    email: "kontakt@wernerstrauch.de",
    company: "Werner Strauch",
    address: ["Deutschland"],
  },
  navigation: {
    main: [
      { label: "Leistungen", href: "/leistungen" },
      { label: "Über mich", href: "/ueber-mich" },
      { label: "Blog", href: "/blog" },
    ],
    megaMenu: MEGA_MENU_DE,
  },
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/werner-strauch-42520b15b/",
      icon: "simple-icons:linkedin",
    },
    {
      name: "GitHub",
      href: "https://github.com/wernerstrauch",
      icon: "simple-icons:github",
    },
  ],
};

// Navigation for English
export const SITE_EN: SiteConfig = {
  ...SITE,
  title: "Werner Strauch | E-Commerce Strategy & Technology",
  description:
    "Strategic consulting for e-commerce, Shopify and digital transformation. Pragmatic solutions for sustainable growth.",
  navigation: {
    main: [
      { label: "Services", href: "/en/services" },
      { label: "About", href: "/en/about" },
      { label: "Blog", href: "/en/blog" },
    ],
    megaMenu: MEGA_MENU_EN,
  },
};

/**
 * Get site config based on language
 */
export function getSiteConfig(lang: "de" | "en" = "de"): SiteConfig {
  return lang === "en" ? SITE_EN : SITE;
}
