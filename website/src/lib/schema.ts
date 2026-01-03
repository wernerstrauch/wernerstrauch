/**
 * Schema.org Structured Data for E-Commerce Consultant Website
 * Multilingual support for DE and EN
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

import type { SupportedLanguage } from "./i18n";
import { LANGUAGES } from "./i18n";

// ============================================
// LANGUAGE-SPECIFIC CONTENT
// ============================================

const CONTENT = {
  de: {
    siteUrl: "https://wernerstrauch.de",
    inLanguage: "de-DE",
    siteName: "Werner Strauch | E-Commerce Strategie & Technologie",
    siteDescription: "Strategische Beratung für E-Commerce, Shopify und digitale Transformation. Pragmatische Lösungen für nachhaltiges Wachstum.",
    jobTitle: "E-Commerce Berater & Stratege",
    personDescription: "Diplom-Betriebswirt mit 20+ Jahren E-Commerce-Erfahrung. 7 Jahre Geschäftsführung. Spezialisiert auf E-Commerce Strategie, Technologieberatung und digitale Transformation.",
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
    professionalService: {
      name: "Werner Strauch E-Commerce Beratung",
      description: "Strategische E-Commerce Beratung für mittelständische Unternehmen. Von der Analyse über die Strategieentwicklung bis zur Umsetzungsbegleitung.",
      serviceTypes: [
        "E-Commerce Beratung",
        "E-Commerce Strategie",
        "Technologieberatung",
        "Interim Management",
        "Projektleitung",
      ],
      catalogName: "E-Commerce Beratungsleistungen",
    },
    country: "Germany",
  },
  en: {
    siteUrl: "https://wernerstrauch.com",
    inLanguage: "en-US",
    siteName: "Werner Strauch | E-Commerce Strategy & Technology",
    siteDescription: "Strategic consulting for e-commerce, Shopify and digital transformation. Pragmatic solutions for sustainable growth.",
    jobTitle: "E-Commerce Consultant & Strategist",
    personDescription: "Business graduate with 20+ years of e-commerce experience. 7 years as managing director. Specialized in e-commerce strategy, technology consulting and digital transformation.",
    knowsAbout: [
      "E-Commerce",
      "E-Commerce Strategy",
      "Shopify",
      "Shopware",
      "WooCommerce",
      "ERP Integration",
      "Digital Transformation",
      "Project Management",
      "Interim Management",
    ],
    professionalService: {
      name: "Werner Strauch E-Commerce Consulting",
      description: "Strategic e-commerce consulting for mid-sized companies. From analysis to strategy development to implementation support.",
      serviceTypes: [
        "E-Commerce Consulting",
        "E-Commerce Strategy",
        "Technology Consulting",
        "Interim Management",
        "Project Management",
      ],
      catalogName: "E-Commerce Consulting Services",
    },
    country: "Germany",
  },
} as const;

// ============================================
// SERVICE SCHEMAS - Multilingual
// ============================================

export const SERVICE_SCHEMAS = {
  de: {
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
    "leistungen": {
      name: "E-Commerce Leistungen",
      description: "Übersicht aller E-Commerce Beratungsleistungen: Audit, Strategie, Beratung, Technologie, Workshop, Sparring und Projektleitung.",
      serviceType: "E-Commerce Beratung",
    },
  },
  en: {
    "ecommerce-audit": {
      name: "E-Commerce Audit",
      description: "Systematic analysis of your online shop: technology, processes, performance and conversion. Identification of potentials and concrete recommendations.",
      serviceType: "E-Commerce Audit",
    },
    "ecommerce-strategy": {
      name: "E-Commerce Strategy",
      description: "Development of a clear e-commerce roadmap for sustainable growth. From market analysis to positioning to technology selection.",
      serviceType: "E-Commerce Strategy Consulting",
    },
    "ecommerce-consulting": {
      name: "E-Commerce Consulting",
      description: "Strategic support for your e-commerce business. Pragmatic consulting at eye level for well-founded decisions.",
      serviceType: "E-Commerce Consulting",
    },
    "technology-consulting": {
      name: "Technology Consulting",
      description: "Sound decision support in selecting shop systems, ERP solutions and e-commerce technologies. Vendor-independent and practice-oriented.",
      serviceType: "IT Consulting",
    },
    "ecommerce-workshop": {
      name: "E-Commerce Workshop",
      description: "Focused work sessions with concrete results. Strategy workshops, technology evaluations and team enablement.",
      serviceType: "Workshop",
    },
    "ecommerce-sparring": {
      name: "E-Commerce Sparring",
      description: "Your external sparring partner for strategic e-commerce decisions. Regular exchange at eye level.",
      serviceType: "Business Coaching",
    },
    "implementation-support": {
      name: "Implementation Support",
      description: "Accompanying your e-commerce projects from conception to go-live. Quality assurance and management of external service providers.",
      serviceType: "Project Support",
    },
    "project-management": {
      name: "E-Commerce Project Management",
      description: "Professional management of your e-commerce projects. On-time implementation, stakeholder management and risk minimization.",
      serviceType: "Project Management",
    },
    "interim-management": {
      name: "E-Commerce Interim Management",
      description: "Leadership on demand for critical phases. Taking responsibility as Interim E-Commerce Manager or Head of Digital.",
      serviceType: "Interim Management",
    },
    "services": {
      name: "E-Commerce Services",
      description: "Overview of all e-commerce consulting services: Audit, strategy, consulting, technology, workshop, sparring and project management.",
      serviceType: "E-Commerce Consulting",
    },
  },
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

function getBaseUrl(lang: SupportedLanguage): string {
  return LANGUAGES[lang].siteUrl;
}

function getContent(lang: SupportedLanguage) {
  return CONTENT[lang];
}

// ============================================
// CORE DATA GENERATORS
// ============================================

/**
 * Generate Person data for the given language
 */
export function generatePersonData(lang: SupportedLanguage) {
  const content = getContent(lang);
  const baseUrl = getBaseUrl(lang);

  return {
    "@type": "Person" as const,
    name: "Werner Strauch",
    url: baseUrl,
    image: `${baseUrl}/werner-strauch.jpg`,
    jobTitle: content.jobTitle,
    description: content.personDescription,
    knowsAbout: content.knowsAbout,
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
}

/**
 * Generate Organization data
 */
export function generateOrganizationData(lang: SupportedLanguage) {
  const baseUrl = getBaseUrl(lang);

  return {
    "@type": "Organization" as const,
    name: "digitalsprung GmbH",
    url: "https://digitalsprung.de",
    email: "kontakt@wernerstrauch.de",
    logo: `${baseUrl}/werner-strauch-logo.svg`,
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
}

// ============================================
// SCHEMA GENERATORS
// ============================================

/**
 * Person Schema - For About page and as publisher
 */
export function generatePersonSchema(lang: SupportedLanguage = "de") {
  return {
    "@context": "https://schema.org",
    ...generatePersonData(lang),
  };
}

/**
 * WebSite Schema - For homepage/layout
 */
export function generateWebSiteSchema(lang: SupportedLanguage = "de") {
  const content = getContent(lang);
  const baseUrl = getBaseUrl(lang);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.siteName,
    url: baseUrl,
    description: content.siteDescription,
    publisher: {
      "@type": "Person",
      name: "Werner Strauch",
      url: baseUrl,
    },
    inLanguage: content.inLanguage,
  };
}

/**
 * ProfessionalService Schema - For services overview
 */
export function generateProfessionalServiceSchema(lang: SupportedLanguage = "de") {
  const content = getContent(lang);
  const baseUrl = getBaseUrl(lang);
  const serviceSchemas = SERVICE_SCHEMAS[lang];

  // Get service slugs for this language
  const serviceKeys = Object.keys(serviceSchemas) as Array<keyof typeof serviceSchemas>;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: content.professionalService.name,
    url: baseUrl,
    description: content.professionalService.description,
    image: `${baseUrl}/werner-strauch.jpg`,
    priceRange: "€€€",
    areaServed: {
      "@type": "Country",
      name: content.country,
    },
    serviceType: content.professionalService.serviceTypes,
    provider: {
      "@type": "Person",
      name: "Werner Strauch",
      url: baseUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: content.professionalService.catalogName,
      itemListElement: serviceKeys
        .filter(key => key !== "leistungen" && key !== "services") // Exclude overview pages
        .map(key => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceSchemas[key].name,
            url: `${baseUrl}/${key}`,
          },
        })),
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
  lang?: SupportedLanguage;
}

export function generateServiceSchema({
  name,
  description,
  url,
  serviceType,
  image,
  lang = "de",
}: ServiceSchemaProps) {
  const content = getContent(lang);
  const baseUrl = getBaseUrl(lang);
  const personData = generatePersonData(lang);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: url.startsWith("http") ? url : `${baseUrl}${url}`,
    serviceType: serviceType || name,
    provider: {
      "@type": "Person",
      name: personData.name,
      url: personData.url,
      image: personData.image,
    },
    areaServed: {
      "@type": "Country",
      name: content.country,
    },
    ...(image && { image: image.startsWith("http") ? image : `${baseUrl}${image}` }),
  };
}

/**
 * BreadcrumbList Schema - For navigation
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[], lang: SupportedLanguage = "de") {
  const baseUrl = getBaseUrl(lang);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
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
  lang?: SupportedLanguage;
}

export function generateWebPageSchema({
  name,
  description,
  url,
  dateModified,
  lang = "de",
}: WebPageSchemaProps) {
  const content = getContent(lang);
  const baseUrl = getBaseUrl(lang);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: url.startsWith("http") ? url : `${baseUrl}${url}`,
    inLanguage: content.inLanguage,
    isPartOf: {
      "@type": "WebSite",
      name: content.siteName,
      url: baseUrl,
    },
    about: {
      "@type": "Person",
      name: "Werner Strauch",
    },
    ...(dateModified && { dateModified }),
  };
}

/**
 * Organization Schema - For company info
 */
export function generateOrganizationSchema(lang: SupportedLanguage = "de") {
  return {
    "@context": "https://schema.org",
    ...generateOrganizationData(lang),
  };
}

/**
 * Get service schema for a specific service page
 */
export function getServiceSchemaForPage(slug: string, lang: SupportedLanguage = "de") {
  const serviceSchemas = SERVICE_SCHEMAS[lang];
  const service = serviceSchemas[slug as keyof typeof serviceSchemas];
  if (!service) return null;

  return generateServiceSchema({
    name: service.name,
    description: service.description,
    url: `/${slug}`,
    serviceType: service.serviceType,
    lang,
  });
}

// Legacy exports for backwards compatibility
export const PERSON = generatePersonData("de");
export const ORGANIZATION = generateOrganizationData("de");
