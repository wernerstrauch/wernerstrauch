export const languages = {
  de: 'Deutsch',
  en: 'English',
} as const;

export const defaultLang = 'de' as const;

export type Lang = keyof typeof languages;

export const translations = {
  de: {
    // Navigation
    nav: {
      about: 'Über mich',
      services: 'Leistungen',
      contact: 'Kontakt',
      blog: 'Blog',
    },

    // Hero Section
    hero: {
      headline: 'E-Commerce Wachstum durch Strategie & Technologie',
      subheadline:
        'Ich helfe E-Commerce Unternehmen, ihre technische Infrastruktur und Wachstumsstrategie auf das nächste Level zu bringen.',
      cta: 'Gespräch vereinbaren',
    },

    // About Section
    about: {
      eyebrow: 'Über mich',
      headline: 'E-Commerce aus jeder Perspektive',
      intro:
        'Von der Agentur ins Unternehmen, vom eigenen Shop zur technischen Architektur – ich kenne E-Commerce von allen Seiten.',
      pillars: {
        agency: {
          title: 'Agentur',
          description: 'Jahre der Beratung verschiedenster E-Commerce Kunden',
        },
        enterprise: {
          title: 'Unternehmen',
          description: 'E-Commerce Abteilungen aufgebaut und geleitet',
        },
        founder: {
          title: 'Eigener Shop',
          description: 'Selbst E-Commerce Geschäfte erfolgreich betrieben',
        },
        tech: {
          title: 'Technologie',
          description: 'Als Entwickler und Architekt tief in der Technik',
        },
      },
    },

    // Services Section
    services: {
      eyebrow: 'Leistungen',
      headline: 'Wie ich Sie unterstütze',
      items: {
        audit: {
          title: 'E-Commerce Audit',
          description:
            'Tiefgehende Analyse Ihres bestehenden Shops mit konkreten Optimierungsempfehlungen.',
        },
        techStack: {
          title: 'Tech-Stack Architektur',
          description:
            'Planung und Optimierung Ihrer E-Commerce Systemlandschaft für Skalierbarkeit.',
        },
        growth: {
          title: 'Wachstumsstrategie',
          description:
            'Strategische Roadmap für nachhaltiges E-Commerce Wachstum und Skalierung.',
        },
        platform: {
          title: 'Plattform-Beratung',
          description:
            'Unabhängige Beratung bei der Auswahl von Shopify, Shopware, WooCommerce oder Custom.',
        },
        marketing: {
          title: 'Marketing-Beratung',
          description:
            'Kanalstrategie, Performance Marketing und datengetriebene Wachstumsmaßnahmen.',
        },
      },
    },

    // Contact Section
    contact: {
      eyebrow: 'Kontakt',
      headline: 'Lassen Sie uns sprechen',
      intro:
        'Haben Sie ein E-Commerce Projekt oder eine Herausforderung? Ich freue mich auf Ihre Nachricht.',
      form: {
        name: 'Ihr Name',
        email: 'Ihre E-Mail',
        message: 'Ihre Nachricht',
        submit: 'Nachricht senden',
        sending: 'Wird gesendet...',
        success: 'Vielen Dank! Ich melde mich in Kürze bei Ihnen.',
        error: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
      },
    },

    // Footer
    footer: {
      copyright: '© {year} Werner Strauch. Alle Rechte vorbehalten.',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
    },
  },

  // English translations (prepared for later)
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      blog: 'Blog',
    },
    hero: {
      headline: 'E-Commerce Growth through Strategy & Technology',
      subheadline:
        'I help e-commerce businesses elevate their technical infrastructure and growth strategy to the next level.',
      cta: 'Schedule a Call',
    },
    about: {
      eyebrow: 'About',
      headline: 'E-Commerce from Every Angle',
      intro:
        'From agency to enterprise, from running my own shop to technical architecture – I know e-commerce inside out.',
      pillars: {
        agency: {
          title: 'Agency',
          description: 'Years of consulting diverse e-commerce clients',
        },
        enterprise: {
          title: 'Enterprise',
          description: 'Built and led e-commerce departments',
        },
        founder: {
          title: 'Own Shop',
          description: 'Successfully ran my own e-commerce businesses',
        },
        tech: {
          title: 'Technology',
          description: 'Deep technical expertise as developer and architect',
        },
      },
    },
    services: {
      eyebrow: 'Services',
      headline: 'How I Can Help',
      items: {
        audit: {
          title: 'E-Commerce Audit',
          description:
            'Deep analysis of your existing shop with actionable optimization recommendations.',
        },
        techStack: {
          title: 'Tech Stack Architecture',
          description:
            'Planning and optimizing your e-commerce system landscape for scalability.',
        },
        growth: {
          title: 'Growth Strategy',
          description:
            'Strategic roadmap for sustainable e-commerce growth and scaling.',
        },
        platform: {
          title: 'Platform Consulting',
          description:
            'Independent advice on choosing Shopify, Shopware, WooCommerce, or custom solutions.',
        },
        marketing: {
          title: 'Marketing Consulting',
          description:
            'Channel strategy, performance marketing, and data-driven growth initiatives.',
        },
      },
    },
    contact: {
      eyebrow: 'Contact',
      headline: "Let's Talk",
      intro:
        "Have an e-commerce project or challenge? I'd love to hear from you.",
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: "Thank you! I'll get back to you shortly.",
        error: 'Something went wrong. Please try again.',
      },
    },
    footer: {
      copyright: '© {year} Werner Strauch. All rights reserved.',
      imprint: 'Imprint',
      privacy: 'Privacy Policy',
    },
  },
} as const;

export function useTranslations(lang: Lang) {
  return translations[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}
