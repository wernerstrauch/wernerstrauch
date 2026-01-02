// Brand Colors
export const colors = {
  deepNavy: "#0A192F",
  electricLime: "#DFFF00",
  highWhite: "#FFFFFF",
  // Derived colors
  navy90: "rgba(10, 25, 47, 0.9)",
  navy80: "rgba(10, 25, 47, 0.8)",
  navy60: "rgba(10, 25, 47, 0.6)",
  navy40: "rgba(10, 25, 47, 0.4)",
  navy20: "rgba(10, 25, 47, 0.2)",
  navy10: "rgba(10, 25, 47, 0.1)",
  lime80: "rgba(223, 255, 0, 0.8)",
  lime60: "rgba(223, 255, 0, 0.6)",
  lime40: "rgba(223, 255, 0, 0.4)",
  lime20: "rgba(223, 255, 0, 0.2)",
  lime10: "rgba(223, 255, 0, 0.1)",
  // Accent variations
  limeDark: "#B8D400",
  navyLight: "#162844",
};

// Slide dimensions (Instagram 4:5)
export const slide = {
  width: 1080,
  height: 1350,
  padding: 56, // Reduced for more content space
};

// Typography - Distinctive choices
export const fonts = {
  display: "'Bebas Neue', sans-serif", // Bold, brutalist headlines
  heading: "'Syne', sans-serif", // Modern, distinctive subheads
  body: "'Space Mono', monospace", // Technical, precise body text
  accent: "'Outfit', sans-serif", // Clean geometric for labels
};

// Base CSS with premium effects
export const baseCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${fonts.body};
    background-color: ${colors.deepNavy};
    color: ${colors.highWhite};
    -webkit-font-smoothing: antialiased;
  }

  .slide {
    width: ${slide.width}px;
    height: ${slide.height}px;
    padding: ${slide.padding}px;
    position: relative;
    overflow: hidden;
  }

  .slide-light {
    background-color: ${colors.highWhite};
    color: ${colors.deepNavy};
  }

  .slide-dark {
    background-color: ${colors.deepNavy};
    color: ${colors.highWhite};
  }

  /* Noise texture overlay for depth */
  .noise-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.035;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    mix-blend-mode: overlay;
  }

  .noise-overlay-light {
    opacity: 0.02;
    mix-blend-mode: multiply;
  }

  /* Accent bar - hidden by default */
  .accent-bar {
    display: none;
  }

  /* Corner accent - geometric brutalist element */
  .corner-accent {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, ${colors.lime10} 0%, transparent 60%);
    pointer-events: none;
  }

  .corner-accent::after {
    content: '';
    position: absolute;
    top: 40px;
    right: 40px;
    width: 24px;
    height: 24px;
    border: 3px solid ${colors.electricLime};
    transform: rotate(45deg);
  }

  /* Diagonal line accent */
  .diagonal-line {
    position: absolute;
    width: 300px;
    height: 2px;
    background: ${colors.electricLime};
    transform: rotate(-45deg);
    opacity: 0.3;
  }

  /* Grid overlay like corporate design - fades to edges */
  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      linear-gradient(rgba(223, 255, 0, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(223, 255, 0, 0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%);
    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 70%);
  }

  .grid-overlay-light {
    background-image:
      linear-gradient(rgba(10, 25, 47, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10, 25, 47, 0.05) 1px, transparent 1px);
  }

  /* Swipe arrow indicator */
  .swipe-arrow {
    position: absolute;
    bottom: 56px;
    right: 56px;
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0.5;
  }

  .swipe-arrow svg {
    width: 32px;
    height: 32px;
    fill: none;
    stroke: ${colors.electricLime};
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Typography - Mobile-optimized sizes */
  h1 {
    font-family: ${fonts.display};
    font-weight: 400;
    font-size: 140px;
    line-height: 0.9;
    letter-spacing: 4px;
    text-transform: uppercase;
  }

  h2 {
    font-family: ${fonts.heading};
    font-weight: 800;
    font-size: 72px;
    line-height: 1.05;
    letter-spacing: -1px;
  }

  h3 {
    font-family: ${fonts.heading};
    font-weight: 700;
    font-size: 48px;
    line-height: 1.15;
  }

  .body-text {
    font-family: ${fonts.body};
    font-weight: 400;
    font-size: 28px;
    line-height: 1.6;
    letter-spacing: 0.5px;
  }

  .label {
    font-family: ${fonts.accent};
    font-weight: 500;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 4px;
  }

  .label-mono {
    font-family: ${fonts.body};
    font-weight: 400;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .accent-text {
    color: ${colors.electricLime};
  }

  .muted-text {
    opacity: 0.6;
  }

  /* Slide number - now more editorial */
  .slide-number {
    position: absolute;
    bottom: ${slide.padding}px;
    right: ${slide.padding}px;
    font-family: ${fonts.body};
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 2px;
    opacity: 0.4;
  }

  .slide-number::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 1px;
    background: currentColor;
    margin-right: 12px;
    vertical-align: middle;
  }

  /* Geometric shapes */
  .geo-circle {
    border-radius: 50%;
    background: ${colors.electricLime};
  }

  .geo-square {
    background: ${colors.electricLime};
    transform: rotate(45deg);
  }

  /* Card styles - glassmorphism effect */
  .card {
    background: ${colors.navy80};
    backdrop-filter: blur(10px);
    border: 1px solid ${colors.navy40};
    border-radius: 4px;
  }

  .card-light {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid ${colors.navy10};
  }

  /* Highlight bar */
  .highlight-bar {
    width: 4px;
    background: ${colors.electricLime};
    border-radius: 2px;
  }

  /* Utility */
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .flex-1 {
    flex: 1;
  }

  .gap-xs { gap: 8px; }
  .gap-sm { gap: 16px; }
  .gap-md { gap: 24px; }
  .gap-lg { gap: 40px; }
  .gap-xl { gap: 64px; }

  .mb-xs { margin-bottom: 8px; }
  .mb-sm { margin-bottom: 16px; }
  .mb-md { margin-bottom: 24px; }
  .mb-lg { margin-bottom: 40px; }
  .mb-xl { margin-bottom: 64px; }

  .mt-xs { margin-top: 8px; }
  .mt-sm { margin-top: 16px; }
  .mt-md { margin-top: 24px; }
  .mt-lg { margin-top: 40px; }
  .mt-xl { margin-top: 64px; }
`;
