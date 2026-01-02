// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Determine site URL based on SITE_LANG environment variable
const siteLang = process.env.SITE_LANG || 'de';
const siteUrls = {
  de: 'https://wernerstrauch.de',
  en: 'https://wernerstrauch.com',
};
const siteUrl = siteUrls[siteLang] || siteUrls.de;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.SITE_LANG': JSON.stringify(siteLang),
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-DE',
          en: 'en-US',
        },
      },
      filter: (page) => {
        // Exclude dev/test pages
        if (page.includes('/dev/') || page.includes('/test-')) return false;
        // Exclude legal pages (Impressum, Datenschutz, Privacy, Legal)
        if (page.includes('/impressum') || page.includes('/datenschutz')) return false;
        if (page.includes('/privacy') || page.includes('/legal')) return false;
        return true;
      },
    }),
    icon({
      include: {
        heroicons: ['*'],
        'simple-icons': ['*'],
      },
    }),
  ],
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
