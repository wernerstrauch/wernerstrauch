/**
 * Schema.org Structured Data for E-Commerce Consultant Website
 *
 * Relevant types for a freelance consultant:
 * - Person: The consultant as main entity
 * - WebSite: The website itself
 * - ProfessionalService: The consulting business
 * - Service: Individual service offerings
 * - BreadcrumbList: Navigation structure
 * - FAQPage: FAQ sections
 * - Organization: The company behind (digitalsprung GmbH)
 */

// Base URL for the website
const BASE_URL = "https://wernerstrauch.de";

// ============================================
// CORE DATA - Reused across schemas
// ============================================

export const PERSON = {
  "@type": "Person" as const,
  name: "Werner Strauch",
  url: BASE_URL,
  image: `${BASE_URL}/werner-strauch.jpg`,
  jobTitle: "E-Commerce Berater & Stratege",
  description: "Diplom-Betriebswirt mit 20+ Jahren E-Commerce-Erfahrung. 7 Jahre Geschäftsführung. Spezialisiert auf E-Commerce Strategie, Technologieberatung und digitale Transformation.",
  knowsAbout: [
    "E-Commerce",
    "E-Commerce Strategie",
    "Shopify",
    "Shopware",
    "WooCommerce",
    "ERP-Integration",
    "Digitale Transformation",
    "Projektmanagement",
    "Interim Management",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity" as const,
    name: "Hochschule Pforzheim",
  },
  sameAs: [
    "https://www.linkedin.com/in/werner-strauch-42520b15b/",
  ],
  worksFor: {
    "@type": "Organization" as const,
    name: "digitalsprung GmbH",
    url: "https://digitalsprung.de",
  },
};

export const ORGANIZATION = {
  "@type": "Organization" as const,
  name: "digitalsprung GmbH",
  url: "https://digitalsprung.de",
  email: "kontakt@wernerstrauch.de",
  logo: `${BASE_URL}/werner-strauch-logo.svg`,
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "Gladbacher Str. 31A",
    addressLocality: "Heinsberg",
    postalCode: "52525",
    addressCountry: "DE",
  },
  founder: {
    "@type": "Person" as const,
    name: "Werner Strauch",
  },
};

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * Person Schema - For About page and as publisher
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    ...PERSON,
  };
}

/**
 * WebSite Schema - For homepage/layout
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Werner Strauch | E-Commerce Strategie & Technologie",
    url: BASE_URL,
    description: "Ihr unabhängiger E-Commerce-Berater: Ich bringe Klarheit in komplexe Entscheidungen – mit klaren Roadmaps, technischem Tiefgang und messbaren Ergebnissen.",
    publisher: {
      "@type": "Person",
      name: PERSON.name,
      url: PERSON.url,
    },
    inLanguage: "de-DE",
  };
}

/**
 * ProfessionalService Schema - For services overview
 */
export function generateProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Werner Strauch E-Commerce Beratung",
    url: BASE_URL,
    description: "Strategische E-Commerce Beratung für mittelständische Unternehmen. Von der Analyse über die Strategieentwicklung bis zur Umsetzungsbegleitung.",
    image: `${BASE_URL}/werner-strauch.jpg`,
    priceRange: "€€€",
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    serviceType: [
      "E-Commerce Beratung",
      "E-Commerce Strategie",
      "Technologieberatung",
      "Interim Management",
      "Projektleitung",
    ],
    provider: {
      "@type": "Person",
      name: PERSON.name,
      url: PERSON.url,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "E-Commerce Beratungsleistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Audit",
            url: `${BASE_URL}/ecommerce-audit`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Strategie",
            url: `${BASE_URL}/ecommerce-strategie`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Beratung",
            url: `${BASE_URL}/ecommerce-beratung`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technologieberatung",
            url: `${BASE_URL}/technologieberatung`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Workshop",
            url: `${BASE_URL}/ecommerce-workshop`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce Sparring",
            url: `${BASE_URL}/ecommerce-sparring`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Umsetzungsbegleitung",
            url: `${BASE_URL}/umsetzungsbegleitung`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Projektleitung",
            url: `${BASE_URL}/projektleitung`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interim Management",
            url: `${BASE_URL}/interim-management`,
          },
        },
      ],
    },
  };
}

/**
 * Service Schema - For individual service pages
 */
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  image?: string;
}

export function generateServiceSchema({
  name,
  description,
  url,
  serviceType,
  image,
}: ServiceSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: url.startsWith("http") ? url : `${BASE_URL}${url}`,
    serviceType: serviceType || name,
    provider: {
      "@type": "Person",
      name: PERSON.name,
      url: PERSON.url,
      image: PERSON.image,
    },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    ...(image && { image: image.startsWith("http") ? image : `${BASE_URL}${image}` }),
  };
}

/**
 * BreadcrumbList Schema - For navigation
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * FAQPage Schema - For FAQ sections
 */
interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * WebPage Schema - For individual pages
 */
interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
}

export function generateWebPageSchema({
  name,
  description,
  url,
  dateModified,
}: WebPageSchemaProps) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: url.startsWith("http") ? url : `${BASE_URL}${url}`,
    inLanguage: "de-DE",
    isPartOf: {
      "@type": "WebSite",
      name: "Werner Strauch | E-Commerce Strategie & Technologie",
      url: BASE_URL,
    },
    about: {
      "@type": "Person",
      name: PERSON.name,
    },
    ...(dateModified && { dateModified }),
  };
}

/**
 * Organization Schema - For company info
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    ...ORGANIZATION,
  };
}

// ============================================
// SERVICE-SPECIFIC SCHEMAS
// ============================================

export const SERVICE_SCHEMAS = {
  "ecommerce-audit": {
    name: "E-Commerce Audit",
    description: "Systematische Analyse Ihres Online-Shops: Technik, Prozesse, Performance und Conversion. Identifizierung von Potenzialen und konkreten Handlungsempfehlungen.",
    serviceType: "E-Commerce Audit",
  },
  "ecommerce-strategie": {
    name: "E-Commerce Strategie",
    description: "Entwicklung einer klaren E-Commerce Roadmap für nachhaltiges Wachstum. Von der Marktanalyse über Positionierung bis zur Technologie-Auswahl.",
    serviceType: "E-Commerce Strategieberatung",
  },
  "ecommerce-beratung": {
    name: "E-Commerce Beratung",
    description: "Strategische Begleitung für Ihr E-Commerce Business. Pragmatische Beratung auf Augenhöhe für fundierte Entscheidungen.",
    serviceType: "E-Commerce Consulting",
  },
  "technologieberatung": {
    name: "Technologieberatung",
    description: "Fundierte Entscheidungshilfe bei der Auswahl von Shopsystemen, ERP-Lösungen und E-Commerce Technologien. Herstellerunabhängig und praxisorientiert.",
    serviceType: "IT-Beratung",
  },
  "ecommerce-workshop": {
    name: "E-Commerce Workshop",
    description: "Fokussierte Arbeitssessions mit konkreten Ergebnissen. Strategie-Workshops, Technologie-Evaluierungen und Team-Enablement.",
    serviceType: "Workshop",
  },
  "ecommerce-sparring": {
    name: "E-Commerce Sparring",
    description: "Ihr externer Sparringspartner für strategische E-Commerce Entscheidungen. Regelmäßiger Austausch auf Augenhöhe.",
    serviceType: "Business Coaching",
  },
  "umsetzungsbegleitung": {
    name: "Umsetzungsbegleitung",
    description: "Begleitung Ihrer E-Commerce Projekte von der Konzeption bis zum Go-Live. Qualitätssicherung und Steuerung externer Dienstleister.",
    serviceType: "Projektbegleitung",
  },
  "projektleitung": {
    name: "E-Commerce Projektleitung",
    description: "Professionelle Leitung Ihrer E-Commerce Projekte. Termingerechte Umsetzung, Stakeholder-Management und Risikominimierung.",
    serviceType: "Projektmanagement",
  },
  "interim-management": {
    name: "E-Commerce Interim Management",
    description: "Führung auf Zeit für kritische Phasen. Übernahme von Verantwortung als Interim E-Commerce Manager oder Head of Digital.",
    serviceType: "Interim Management",
  },
} as const;

/**
 * Get service schema for a specific service page
 */
export function getServiceSchemaForPage(slug: string) {
  const service = SERVICE_SCHEMAS[slug as keyof typeof SERVICE_SCHEMAS];
  if (!service) return null;

  return generateServiceSchema({
    name: service.name,
    description: service.description,
    url: `/${slug}`,
    serviceType: service.serviceType,
  });
}
