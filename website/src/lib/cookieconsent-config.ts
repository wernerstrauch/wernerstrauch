import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const cookieConsentConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box wide",
      position: "bottom center",
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      flipButtons: false,
    },
  },

  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    analytics: {
      enabled: false,
      readOnly: false,
      autoClear: {
        cookies: [
          { name: /^_ga/ },
          { name: /^_gid/ },
          { name: /^_gat/ },
        ],
      },
    },
    marketing: {
      enabled: false,
      readOnly: false,
    },
  },

  language: {
    default: "de",
    autoDetect: "browser",
    translations: {
      de: {
        consentModal: {
          title: "Cookie-Einstellungen",
          description:
            "Diese Website verwendet Cookies, um dir das beste Erlebnis zu bieten. Einige sind notwendig, andere helfen uns, die Website zu verbessern.",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          showPreferencesBtn: "Einstellungen verwalten",
          footer: '<a href="/datenschutz">Datenschutz</a>',
        },
        preferencesModal: {
          title: "Cookie-Einstellungen",
          acceptAllBtn: "Alle akzeptieren",
          acceptNecessaryBtn: "Nur notwendige",
          savePreferencesBtn: "Einstellungen speichern",
          closeIconLabel: "Schließen",
          sections: [
            {
              title: "Cookie-Nutzung",
              description:
                "Wir verwenden Cookies, um die grundlegenden Funktionen der Website zu gewährleisten und dein Erlebnis zu verbessern.",
            },
            {
              title: "Notwendige Cookies",
              description:
                "Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.",
              linkedCategory: "necessary",
            },
            {
              title: "Analyse-Cookies",
              description:
                "Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, indem sie Informationen anonym sammeln und melden.",
              linkedCategory: "analytics",
            },
            {
              title: "Marketing-Cookies",
              description:
                "Diese Cookies werden verwendet, um Werbung relevanter für dich zu gestalten. Sie können auch die Häufigkeit begrenzen, mit der du eine Anzeige siehst.",
              linkedCategory: "marketing",
            },
          ],
        },
      },
      en: {
        consentModal: {
          title: "Cookie Settings",
          description:
            "This website uses cookies to provide you with the best experience. Some are necessary, others help us improve the website.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Necessary only",
          showPreferencesBtn: "Manage preferences",
          footer: '<a href="/en/privacy">Privacy Policy</a>',
        },
        preferencesModal: {
          title: "Cookie Preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Necessary only",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          sections: [
            {
              title: "Cookie Usage",
              description:
                "We use cookies to ensure the basic functionalities of the website and to enhance your experience.",
            },
            {
              title: "Necessary Cookies",
              description:
                "These cookies are essential for the proper functioning of the website and cannot be disabled.",
              linkedCategory: "necessary",
            },
            {
              title: "Analytics Cookies",
              description:
                "These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.",
              linkedCategory: "analytics",
            },
            {
              title: "Marketing Cookies",
              description:
                "These cookies are used to make advertising more relevant to you. They may also limit the number of times you see an advertisement.",
              linkedCategory: "marketing",
            },
          ],
        },
      },
    },
  },
};
