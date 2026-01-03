import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Domain-specific configurations
const domainConfigs: Record<
  string,
  {
    name: string;
    fromEmail: string;
    toEmail: string;
    bccEmail: string;
    primaryColor: string;
    gradientFrom: string;
    gradientTo: string;
    accentColor: string;
    stepLabels: Record<string, Record<string, string>>;
  }
> = {
  wernerstrauch: {
    name: "Werner Strauch",
    fromEmail: "Werner Strauch <kontakt@wernerstrauch.de>",
    toEmail: "kontakt@wernerstrauch.de",
    bccEmail: "werner.strauch@digitalsprung.de",
    primaryColor: "#c8ff00",
    gradientFrom: "#0a1628",
    gradientTo: "#1a2d4a",
    accentColor: "#c8ff00",
    stepLabels: {
      interest: {
        "ecommerce-audit": "E-Commerce Audit",
        "ecommerce-strategie": "E-Commerce Strategie",
        "ecommerce-beratung": "E-Commerce Beratung",
        technologieberatung: "Technologieberatung",
        projektleitung: "Projektleitung",
        "interim-management": "Interim Management",
        sonstiges: "Sonstiges",
      },
    },
  },
  "ki-agentur": {
    name: "KI Agentur",
    fromEmail: "KI Agentur <info@digitalsprung.de>",
    toEmail: "kontakt@ki-agentur.com",
    bccEmail: "werner.strauch@digitalsprung.de",
    primaryColor: "#7c3aed",
    gradientFrom: "#7c3aed",
    gradientTo: "#5b21b6",
    accentColor: "#a78bfa",
    stepLabels: {
      channel: {
        "ki-agenten": "KI-Agenten",
        "ki-chatbots": "KI-Chatbots",
        prozessautomatisierung: "Prozessautomatisierung",
        "ki-beratung": "KI-Beratung",
        unsicher: "Noch unsicher",
      },
      goal: {
        "prozesse-automatisieren": "Prozesse automatisieren",
        "kosten-senken": "Kosten senken",
        "wissen-chatbar": "Wissen chatbar machen",
        kundenservice: "Kundenservice verbessern",
        skalieren: "Skalieren ohne Mehraufwand",
      },
      teamSize: {
        "1-10": "1-10 Mitarbeiter",
        "11-50": "11-50 Mitarbeiter",
        "51-200": "51-200 Mitarbeiter",
        "200+": "200+ Mitarbeiter",
      },
      timeline: {
        sofort: "So schnell wie möglich",
        "1-3-monate": "In 1-3 Monaten",
        "3-6-monate": "In 3-6 Monaten",
        "nur-informieren": "Nur informieren",
      },
    },
  },
  "shop-marketing": {
    name: "Shop Marketing",
    fromEmail: "Shop Marketing <info@digitalsprung.de>",
    toEmail: "kontakt@shop-marketing.com",
    bccEmail: "werner.strauch@digitalsprung.de",
    primaryColor: "#6366f1",
    gradientFrom: "#8b5cf6",
    gradientTo: "#6366f1",
    accentColor: "#818cf8",
    stepLabels: {
      channel: {
        "google-ads": "Google Ads",
        "meta-ads": "Meta Ads",
        "email-marketing": "E-Mail Marketing",
        "full-service": "Performance Marketing (Full-Service)",
        unsicher: "Noch unsicher",
      },
      goal: {
        "mehr-umsatz": "Mehr Umsatz generieren",
        "roas-verbessern": "ROAS verbessern",
        neukunden: "Neukunden gewinnen",
        bestandskunden: "Bestandskunden aktivieren",
      },
      budget: {
        "unter-5k": "Unter 5.000 €",
        "5k-15k": "5.000 € - 15.000 €",
        "15k-50k": "15.000 € - 50.000 €",
        "ueber-50k": "Über 50.000 €",
      },
      platform: {
        shopify: "Shopify",
        woocommerce: "WooCommerce",
        shopware: "Shopware",
        andere: "Andere",
      },
    },
  },
};

// Default config (fallback to wernerstrauch for this site)
const defaultConfig = domainConfigs["wernerstrauch"];

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const {
      domain = "wernerstrauch",
      step1: channel,
      step2: goal,
      step3: teamSizeOrBudget,
      step4: timelineOrPlatform,
      firstName,
      lastName,
      email,
      company,
      shopUrl,
      phone,
      message,
    } = data;

    // Get domain-specific config
    const config = domainConfigs[domain] || defaultConfig;
    const labels = config.stepLabels;

    // Determine field labels based on domain
    const isKiAgentur = domain === "ki-agentur";
    const isWernerStrauch = domain === "wernerstrauch";

    // Build sections based on domain
    const sections = [];

    // Channel/Service/Interest section
    if (channel) {
      let sectionLabel = "Marketing-Kanal";
      let sectionValue = labels.channel?.[channel] || channel;

      if (isKiAgentur) {
        sectionLabel = "KI-Bereich";
      } else if (isWernerStrauch) {
        sectionLabel = "Interesse an";
        sectionValue = labels.interest?.[channel] || channel;
      }

      sections.push({
        label: sectionLabel,
        value: sectionValue,
        highlight: true,
      });
    }

    // Goal section
    if (goal) {
      sections.push({
        label: "Hauptziel",
        value: labels.goal?.[goal] || goal,
      });
    }

    // Team size or Budget section
    if (teamSizeOrBudget) {
      sections.push({
        label: isKiAgentur ? "Teamgröße" : "Monatliches Werbebudget",
        value: isKiAgentur
          ? labels.teamSize?.[teamSizeOrBudget] || teamSizeOrBudget
          : labels.budget?.[teamSizeOrBudget] || teamSizeOrBudget,
      });
    }

    // Timeline or Platform section
    if (timelineOrPlatform) {
      sections.push({
        label: isKiAgentur ? "Zeithorizont" : "Shopsystem",
        value: isKiAgentur
          ? labels.timeline?.[timelineOrPlatform] || timelineOrPlatform
          : labels.platform?.[timelineOrPlatform] || timelineOrPlatform,
      });
    }

    // Company section (ki-agentur)
    if (company) {
      sections.push({
        label: "Unternehmen",
        value: company,
      });
    }

    // Shop URL section (shop-marketing)
    if (shopUrl) {
      sections.push({
        label: "Shop-URL",
        value: shopUrl,
        isLink: true,
      });
    }

    // Message section
    if (message) {
      sections.push({
        label: "Nachricht",
        value: message,
      });
    }

    // Generate sections HTML
    const sectionsHtml = sections
      .map(
        (section) => `
      <div style="background: white; padding: 20px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #e5e7eb;">
        <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; font-weight: 600;">${section.label}</div>
        ${
          section.highlight
            ? `<div style="font-size: 16px; color: #111827; font-weight: 500;"><span style="background: linear-gradient(135deg, ${config.gradientFrom}15, ${config.gradientTo}20); color: ${config.primaryColor}; padding: 6px 14px; border-radius: 8px; display: inline-block; font-weight: 600;">${section.value}</span></div>`
            : section.isLink
              ? `<div style="font-size: 16px; font-weight: 500;"><a href="${section.value}" style="color: ${config.primaryColor}; text-decoration: none;">${section.value}</a></div>`
              : `<div style="font-size: 16px; color: #111827; font-weight: 500;">${section.value}</div>`
        }
      </div>
    `,
      )
      .join("");

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo}); color: white; padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
      <div style="font-size: 32px; margin-bottom: 8px;">🚀</div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Neue Anfrage</h1>
      <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">${config.name} Kontaktformular</p>
    </div>

    <!-- Content -->
    <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 16px 16px;">
      <!-- Contact Card -->
      <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #e5e7eb; border-left: 4px solid ${config.primaryColor};">
        <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-weight: 600;">Kontaktdaten</div>
        <div style="font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 4px;">${firstName} ${lastName}</div>
        <div style="font-size: 16px; margin-bottom: 4px;">
          <a href="mailto:${email}" style="color: ${config.primaryColor}; text-decoration: none; font-weight: 500;">${email}</a>
        </div>
        ${phone ? `<div style="font-size: 15px; color: #4b5563;">${phone}</div>` : ""}
      </div>

      <!-- Dynamic Sections -->
      ${sectionsHtml}

      <!-- Footer -->
      <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #9ca3af; margin: 0;">Diese Anfrage wurde über das ${config.name} Kontaktformular gesendet.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Plain text version
    const textContent = `
NEUE ANFRAGE - ${config.name}

Kontaktdaten
${firstName} ${lastName}
${email}
${phone || ""}

${sections.map((s) => `${s.label}: ${s.value}`).join("\n")}
    `.trim();

    const { error } = await resend.emails.send({
      from: config.fromEmail,
      to: [config.toEmail],
      bcc: [config.bccEmail],
      subject: `Neue Anfrage: ${firstName} ${lastName} - ${isWernerStrauch ? (labels.interest?.[channel] || channel || "Kontakt") : (labels.channel?.[channel] || channel || "Kontakt")}`,
      html: emailHtml,
      text: textContent,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
