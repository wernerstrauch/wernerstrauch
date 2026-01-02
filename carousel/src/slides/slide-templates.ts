import { baseCSS, colors, fonts } from "../styles/carousel-theme.js";

// Swipe arrow SVG
const swipeArrow = `
  <div class="swipe-arrow">
    <svg viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </div>
`;

// Helper to wrap content in a full HTML document
const wrapInHTML = (
  content: string,
  options: { showArrow?: boolean } = {}
): string => {
  const { showArrow = true } = options;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${baseCSS}</style>
</head>
<body>
  <div class="slide slide-dark">
    <div class="grid-overlay"></div>
    <div class="noise-overlay"></div>
    ${content}
    ${showArrow ? swipeArrow : ""}
  </div>
</body>
</html>
`;
};

// Slide 1: Cover - Hero statement, minimal
export const coverSlide = (): string =>
  wrapInHTML(`
  <!-- Large decorative shape -->
  <div style="
    position: absolute;
    bottom: -300px;
    right: -200px;
    width: 700px;
    height: 700px;
    background: ${colors.electricLime};
    border-radius: 50%;
    opacity: 0.15;
  "></div>

  <div style="
    position: absolute;
    top: 100px;
    left: -100px;
    width: 300px;
    height: 300px;
    border: 3px solid ${colors.electricLime};
    border-radius: 50%;
    opacity: 0.2;
  "></div>

  <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 60px;">
    <span style="
      font-family: ${fonts.accent};
      font-size: 22px;
      letter-spacing: 6px;
      color: ${colors.electricLime};
      margin-bottom: 40px;
    ">CORPORATE DESIGN</span>

    <h1 style="font-size: 200px; line-height: 0.85; margin: 0;">WERNER</h1>
    <h1 style="font-size: 200px; line-height: 0.85; margin: 0;">
      STRAUCH<span style="color: ${colors.electricLime};">.</span>
    </h1>

    <div style="
      margin-top: 60px;
      display: flex;
      align-items: center;
      gap: 20px;
    ">
      <div style="width: 60px; height: 4px; background: ${colors.electricLime};"></div>
      <span style="font-family: ${fonts.heading}; font-size: 32px; font-weight: 600; opacity: 0.7;">
        Der Stille Stratege
      </span>
    </div>
  </div>
`);

// Slide 2: Tagline - Full screen statement
export const taglineSlide = (): string =>
  wrapInHTML(`
  <!-- Diagonal lime stripe -->
  <div style="
    position: absolute;
    top: 0;
    right: 150px;
    width: 120px;
    height: 100%;
    background: ${colors.electricLime};
    transform: skewX(-12deg);
    opacity: 0.9;
  "></div>

  <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 60px; position: relative; z-index: 1;">
    <h1 style="font-size: 130px; line-height: 0.95; margin: 0; max-width: 750px;">
      PROFIT-<br/>
      <span style="color: ${colors.electricLime};">KLARHEIT</span><br/>
      DURCH<br/>
      SYSTEM
    </h1>
  </div>
`);

// Slide 3: Brand DNA Visual - Big letters
export const brandDNASlide = (): string =>
  wrapInHTML(`
  <div style="height: 100%; display: flex; flex-direction: column; padding: 60px;">
    <span style="
      font-family: ${fonts.accent};
      font-size: 20px;
      letter-spacing: 5px;
      color: ${colors.electricLime};
      margin-bottom: 30px;
    ">BRAND DNA</span>

    <!-- Large stacked letters -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
      ${["V", "T", "V", "I", "R"].map((letter, i) => `
        <div style="
          display: flex;
          align-items: center;
          gap: 30px;
          margin: ${i === 0 ? '0' : '-15px'} 0 0 ${i * 30}px;
        ">
          <span style="
            font-family: ${fonts.display};
            font-size: 160px;
            line-height: 0.85;
            color: ${i % 2 === 0 ? colors.electricLime : colors.highWhite};
            opacity: ${i % 2 === 0 ? '1' : '0.3'};
          ">${letter}</span>
        </div>
      `).join('')}
    </div>

    <div style="
      font-family: ${fonts.body};
      font-size: 20px;
      opacity: 0.5;
      margin-top: 20px;
    ">VIBE • TRIBE • VOICE • IMPACT • REASON</div>
  </div>
`);

// Slide 4: Colors - Bold visual blocks
export const colorsSlide = (): string =>
  wrapInHTML(`
  <div style="height: 100%; display: flex; flex-direction: column;">
    <!-- Header -->
    <div style="padding: 60px 60px 30px;">
      <span style="
        font-family: ${fonts.accent};
        font-size: 20px;
        letter-spacing: 5px;
        color: ${colors.electricLime};
      ">FARBEN</span>
    </div>

    <!-- Color blocks - full width -->
    <div style="flex: 1; display: flex; flex-direction: column;">
      <!-- Navy - largest -->
      <div style="
        flex: 3;
        background: ${colors.deepNavy};
        border: 4px solid ${colors.navy40};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 60px;
      ">
        <span style="font-family: ${fonts.display}; font-size: 100px;">DEEP NAVY</span>
        <span style="font-family: ${fonts.display}; font-size: 80px; opacity: 0.4;">#0A192F</span>
      </div>

      <!-- Lime -->
      <div style="
        flex: 2;
        background: ${colors.electricLime};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 60px;
        color: ${colors.deepNavy};
      ">
        <span style="font-family: ${fonts.display}; font-size: 80px;">LIME</span>
        <span style="font-family: ${fonts.display}; font-size: 60px; opacity: 0.5;">#DFFF00</span>
      </div>

      <!-- White -->
      <div style="
        flex: 1.5;
        background: ${colors.highWhite};
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 60px;
        color: ${colors.deepNavy};
      ">
        <span style="font-family: ${fonts.display}; font-size: 60px;">WHITE</span>
        <span style="font-family: ${fonts.display}; font-size: 50px; opacity: 0.4;">#FFFFFF</span>
      </div>
    </div>
  </div>
`);

// Slide 5: Color Ratio - Visual pie/bar
export const colorRatioSlide = (): string =>
  wrapInHTML(`
  <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px;">
    <span style="
      font-family: ${fonts.accent};
      font-size: 20px;
      letter-spacing: 5px;
      color: ${colors.electricLime};
      margin-bottom: 60px;
    ">FARBVERHÄLTNIS</span>

    <!-- Large numbers -->
    <div style="display: flex; align-items: baseline; gap: 20px; margin-bottom: 60px;">
      <span style="font-family: ${fonts.display}; font-size: 250px; line-height: 1; color: ${colors.highWhite};">60</span>
      <span style="font-family: ${fonts.display}; font-size: 180px; line-height: 1; opacity: 0.5;">30</span>
      <span style="font-family: ${fonts.display}; font-size: 120px; line-height: 1; color: ${colors.electricLime};">10</span>
    </div>

    <!-- Visual bar -->
    <div style="width: 100%; height: 80px; display: flex; gap: 8px;">
      <div style="flex: 6; background: ${colors.deepNavy}; border: 3px solid ${colors.navy40};"></div>
      <div style="flex: 3; background: ${colors.highWhite};"></div>
      <div style="flex: 1; background: ${colors.electricLime};"></div>
    </div>
  </div>
`);

// Slide 6: Typography - Specimen
export const typographySlide = (): string =>
  wrapInHTML(`
  <div style="height: 100%; display: flex; flex-direction: column; padding: 60px;">
    <span style="
      font-family: ${fonts.accent};
      font-size: 20px;
      letter-spacing: 5px;
      color: ${colors.electricLime};
      margin-bottom: 40px;
    ">TYPOGRAFIE</span>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
      <!-- Bebas specimen -->
      <div style="margin-bottom: 60px;">
        <span style="font-family: ${fonts.body}; font-size: 18px; opacity: 0.4; display: block; margin-bottom: 15px;">BEBAS NEUE</span>
        <div style="font-family: ${fonts.display}; font-size: 140px; line-height: 0.85;">
          KLARHEIT<span style="color: ${colors.electricLime};">.</span>
        </div>
      </div>

      <!-- Syne specimen -->
      <div style="margin-bottom: 60px;">
        <span style="font-family: ${fonts.body}; font-size: 18px; opacity: 0.4; display: block; margin-bottom: 15px;">SYNE</span>
        <div style="font-family: ${fonts.heading}; font-size: 72px; font-weight: 800; line-height: 1;">
          System-Design
        </div>
      </div>

      <!-- Space Mono specimen -->
      <div>
        <span style="font-family: ${fonts.body}; font-size: 18px; opacity: 0.4; display: block; margin-bottom: 15px;">SPACE MONO</span>
        <div style="font-family: ${fonts.body}; font-size: 36px; line-height: 1.4; opacity: 0.7;">
          Technische Präzision<br/>für jeden Text.
        </div>
      </div>
    </div>
  </div>
`);

// Slide 7: Logo Dark
export const logoDarkSlide = (): string =>
  wrapInHTML(`
  <!-- Decorative circles -->
  <div style="
    position: absolute;
    top: -150px;
    right: -150px;
    width: 400px;
    height: 400px;
    border: 2px solid ${colors.lime20};
    border-radius: 50%;
  "></div>
  <div style="
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    border: 2px solid ${colors.lime20};
    border-radius: 50%;
  "></div>

  <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px;">
    <span style="
      font-family: ${fonts.accent};
      font-size: 20px;
      letter-spacing: 5px;
      color: ${colors.electricLime};
      margin-bottom: 80px;
    ">LOGO • DARK</span>

    <div style="text-align: center;">
      <span style="font-family: ${fonts.display}; font-size: 90px; letter-spacing: 10px;">
        WERNER STRAUCH
      </span>
      <span style="font-family: ${fonts.display}; font-size: 90px; color: ${colors.electricLime};">.</span>
    </div>
  </div>
`);

// Slide 8: Logo Light
export const logoLightSlide = (): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>${baseCSS}</style>
</head>
<body>
  <div class="slide slide-light">
    <div class="grid-overlay grid-overlay-light"></div>
    <div class="noise-overlay noise-overlay-light"></div>

    <!-- Decorative lime blob -->
    <div style="
      position: absolute;
      top: -100px;
      right: -50px;
      width: 350px;
      height: 350px;
      background: ${colors.electricLime};
      border-radius: 60% 40% 70% 30% / 40% 50% 50% 60%;
      opacity: 0.3;
    "></div>
    <div style="
      position: absolute;
      bottom: -80px;
      left: -80px;
      width: 280px;
      height: 280px;
      background: ${colors.electricLime};
      border-radius: 40% 60% 30% 70% / 50% 40% 60% 50%;
      opacity: 0.2;
    "></div>

    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px; position: relative; z-index: 1;">
      <span style="
        font-family: ${fonts.accent};
        font-size: 20px;
        letter-spacing: 5px;
        color: ${colors.deepNavy};
        opacity: 0.5;
        margin-bottom: 80px;
      ">LOGO • LIGHT</span>

      <div style="text-align: center;">
        <span style="font-family: ${fonts.display}; font-size: 90px; letter-spacing: 10px; color: ${colors.deepNavy};">
          WERNER STRAUCH
        </span>
        <span style="font-family: ${fonts.display}; font-size: 90px; color: ${colors.electricLime};">.</span>
      </div>
    </div>

    ${swipeArrow}
  </div>
</body>
</html>
`;

// Slide 9: Do's - Visual checkmarks
export const dosSlide = (): string =>
  wrapInHTML(`
  <!-- Large lime accent -->
  <div style="
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background: linear-gradient(180deg, ${colors.electricLime} 0%, ${colors.limeDark} 100%);
    opacity: 0.15;
  "></div>

  <div style="height: 100%; display: flex; flex-direction: column; padding: 60px;">
    <div style="display: flex; align-items: center; gap: 30px; margin-bottom: 60px;">
      <div style="
        width: 100px;
        height: 100px;
        background: ${colors.electricLime};
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="font-size: 60px; color: ${colors.deepNavy};">✓</span>
      </div>
      <h2 style="font-size: 100px; margin: 0;">DO'S</h2>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 30px;">
      ${["Klare Hierarchie", "Lime = Akzent", "Viel Weißraum", "Logo-Schutzzone"].map(item => `
        <div style="
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 30px 40px;
          background: ${colors.navy80};
          border-left: 6px solid ${colors.electricLime};
        ">
          <span style="color: ${colors.electricLime}; font-size: 36px;">✓</span>
          <span style="font-family: ${fonts.heading}; font-size: 38px; font-weight: 700;">${item}</span>
        </div>
      `).join('')}
    </div>
  </div>
`);

// Slide 10: Don'ts - Visual crosses
export const dontsSlide = (): string =>
  wrapInHTML(`
  <!-- Dark gradient accent -->
  <div style="
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background: linear-gradient(180deg, ${colors.navy60} 0%, ${colors.deepNavy} 100%);
    opacity: 0.5;
  "></div>

  <div style="height: 100%; display: flex; flex-direction: column; padding: 60px;">
    <div style="display: flex; align-items: center; gap: 30px; margin-bottom: 60px;">
      <div style="
        width: 100px;
        height: 100px;
        background: ${colors.navy60};
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="font-size: 60px; color: ${colors.highWhite};">✕</span>
      </div>
      <h2 style="font-size: 100px; margin: 0; opacity: 0.6;">DON'TS</h2>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 30px;">
      ${["Logo verzerren", "Andere Farben", "Fonts ersetzen", "Überladen"].map(item => `
        <div style="
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 30px 40px;
          background: ${colors.navy80};
          border-left: 6px solid ${colors.navy40};
          opacity: 0.6;
        ">
          <span style="color: ${colors.navy40}; font-size: 36px;">✕</span>
          <span style="font-family: ${fonts.heading}; font-size: 38px; font-weight: 700; text-decoration: line-through; text-decoration-thickness: 4px;">${item}</span>
        </div>
      `).join('')}
    </div>
  </div>
`);

// Slide 11: Communication Framework - Visual
export const communicationSlide = (): string =>
  wrapInHTML(`
  <div style="height: 100%; display: flex; flex-direction: column; padding: 60px;">
    <span style="
      font-family: ${fonts.accent};
      font-size: 20px;
      letter-spacing: 5px;
      color: ${colors.electricLime};
      margin-bottom: 40px;
    ">KOMMUNIKATION</span>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 25px;">
      <!-- Three large numbered blocks -->
      <div style="
        display: flex;
        align-items: center;
        background: ${colors.navy80};
        overflow: hidden;
      ">
        <div style="
          width: 180px;
          height: 180px;
          background: ${colors.electricLime};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        ">
          <span style="font-family: ${fonts.display}; font-size: 100px; color: ${colors.deepNavy};">01</span>
        </div>
        <div style="padding: 30px 40px;">
          <div style="font-family: ${fonts.heading}; font-size: 48px; font-weight: 800;">Emotional</div>
          <div style="font-family: ${fonts.body}; font-size: 22px; opacity: 0.5; margin-top: 10px;">System-Frieden</div>
        </div>
      </div>

      <div style="
        display: flex;
        align-items: center;
        background: ${colors.navy80};
        overflow: hidden;
      ">
        <div style="
          width: 180px;
          height: 180px;
          background: ${colors.lime60};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        ">
          <span style="font-family: ${fonts.display}; font-size: 100px; color: ${colors.deepNavy};">02</span>
        </div>
        <div style="padding: 30px 40px;">
          <div style="font-family: ${fonts.heading}; font-size: 48px; font-weight: 800;">Visual</div>
          <div style="font-family: ${fonts.body}; font-size: 22px; opacity: 0.5; margin-top: 10px;">80/20 Minimalismus</div>
        </div>
      </div>

      <div style="
        display: flex;
        align-items: center;
        background: ${colors.navy80};
        overflow: hidden;
      ">
        <div style="
          width: 180px;
          height: 180px;
          background: ${colors.lime40};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        ">
          <span style="font-family: ${fonts.display}; font-size: 100px; color: ${colors.deepNavy};">03</span>
        </div>
        <div style="padding: 30px 40px;">
          <div style="font-family: ${fonts.heading}; font-size: 48px; font-weight: 800;">Cognitive</div>
          <div style="font-family: ${fonts.body}; font-size: 22px; opacity: 0.5; margin-top: 10px;">First Principles</div>
        </div>
      </div>
    </div>
  </div>
`);

// Slide 12: CTA - Bold closing
export const ctaSlide = (): string =>
  wrapInHTML(`
  <!-- Large decorative circle -->
  <div style="
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    border: 4px solid ${colors.lime10};
    border-radius: 50%;
  "></div>
  <div style="
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    border: 2px solid ${colors.lime10};
    border-radius: 50%;
  "></div>

  <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 60px; position: relative; z-index: 1;">
    <span style="
      font-family: ${fonts.accent};
      font-size: 24px;
      letter-spacing: 8px;
      opacity: 0.4;
      margin-bottom: 40px;
    ">DER STILLE STRATEGE</span>

    <h1 style="font-size: 100px; margin: 0;">WERNER</h1>
    <h1 style="font-size: 100px; margin: 0;">STRAUCH<span style="color: ${colors.electricLime};">.</span></h1>

    <div style="
      font-family: ${fonts.body};
      font-size: 40px;
      margin: 60px 0;
    ">
      Bereit für<br/>
      <span style="color: ${colors.electricLime}; font-weight: 700;">Profit-Klarheit</span>?
    </div>

    <div style="
      display: flex;
      flex-direction: column;
      gap: 20px;
      font-family: ${fonts.body};
      font-size: 28px;
    ">
      <span>werner@strauch.de</span>
      <span style="opacity: 0.6;">strauch.de</span>
    </div>
  </div>
`, { showArrow: false });

// Export all slides in order
export const allSlides = [
  { name: "01-cover", html: coverSlide() },
  { name: "02-tagline", html: taglineSlide() },
  { name: "03-brand-dna", html: brandDNASlide() },
  { name: "04-colors", html: colorsSlide() },
  { name: "05-color-ratio", html: colorRatioSlide() },
  { name: "06-typography", html: typographySlide() },
  { name: "07-logo-dark", html: logoDarkSlide() },
  { name: "08-logo-light", html: logoLightSlide() },
  { name: "09-dos", html: dosSlide() },
  { name: "10-donts", html: dontsSlide() },
  { name: "11-communication", html: communicationSlide() },
  { name: "12-cta", html: ctaSlide() },
];
