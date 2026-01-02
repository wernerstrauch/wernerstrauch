import { Font, StyleSheet } from "@react-pdf/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register fonts
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: path.join(__dirname, "../fonts/Montserrat-Bold.ttf"),
      fontWeight: "bold",
    },
    {
      src: path.join(__dirname, "../fonts/Montserrat-Black.ttf"),
      fontWeight: 900,
    },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    {
      src: path.join(__dirname, "../fonts/Inter-Regular.ttf"),
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      src: path.join(__dirname, "../fonts/Inter-Medium.ttf"),
      fontWeight: 500,
      fontStyle: "normal",
    },
  ],
});

// Brand Colors
export const colors = {
  deepNavy: "#0A192F",
  electricLime: "#DFFF00",
  highWhite: "#FFFFFF",
  // Derived colors
  navy80: "rgba(10, 25, 47, 0.8)",
  navy60: "rgba(10, 25, 47, 0.6)",
  navy40: "rgba(10, 25, 47, 0.4)",
  navy20: "rgba(10, 25, 47, 0.2)",
  navy10: "rgba(10, 25, 47, 0.1)",
  lime80: "rgba(223, 255, 0, 0.8)",
  lime60: "rgba(223, 255, 0, 0.6)",
  lime20: "rgba(223, 255, 0, 0.2)",
};

// Color information for documentation
export const colorInfo = {
  deepNavy: {
    hex: "#0A192F",
    rgb: "R: 10 | G: 25 | B: 47",
    cmyk: "C: 79 | M: 47 | Y: 0 | K: 82",
    name: "Deep Navy",
    description: "Das Fundament. Vermittelt Tiefe, Seriosität und zeitlose Autorität.",
  },
  electricLime: {
    hex: "#DFFF00",
    rgb: "R: 223 | G: 255 | B: 0",
    cmyk: "C: 13 | M: 0 | Y: 100 | K: 0",
    name: "Electric Lime",
    description: "Der Signalton. Steht für Innovation, Energie und maximale Aufmerksamkeit.",
  },
  highWhite: {
    hex: "#FFFFFF",
    rgb: "R: 255 | G: 255 | B: 255",
    cmyk: "C: 0 | M: 0 | Y: 0 | K: 0",
    name: "High White",
    description: "Der Kontrast. Schafft Raum zum Atmen und sorgt für messerscharfe Lesbarkeit.",
  },
};

// Spacing system (base 8px)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Page dimensions (A4 Landscape in points: 1 inch = 72 points)
export const page = {
  width: 841.89, // 297mm
  height: 595.28, // 210mm
  margin: 48,
  innerWidth: 841.89 - 96,
  innerHeight: 595.28 - 96,
};

// Typography styles
export const typography = {
  h1: {
    fontFamily: "Montserrat",
    fontWeight: 900,
    fontSize: 48,
    lineHeight: 1.1,
  },
  h2: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 32,
    lineHeight: 1.2,
  },
  h3: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 1.4,
  },
  body: {
    fontFamily: "Inter",
    fontWeight: "normal",
    fontSize: 12,
    lineHeight: 1.6,
  },
  bodyMedium: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 1.6,
  },
  caption: {
    fontFamily: "Inter",
    fontWeight: "normal",
    fontSize: 10,
    lineHeight: 1.5,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 9,
    lineHeight: 1.4,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
};

// Common styles
export const styles = StyleSheet.create({
  page: {
    width: page.width,
    height: page.height,
    padding: page.margin,
    backgroundColor: colors.highWhite,
  },
  pageDark: {
    width: page.width,
    height: page.height,
    padding: page.margin,
    backgroundColor: colors.deepNavy,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexCol: {
    flexDirection: "column",
  },
  flex1: {
    flex: 1,
  },
  alignCenter: {
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  // Typography
  h1: {
    ...typography.h1,
    color: colors.deepNavy,
  },
  h1Light: {
    ...typography.h1,
    color: colors.highWhite,
  },
  h2: {
    ...typography.h2,
    color: colors.deepNavy,
  },
  h2Light: {
    ...typography.h2,
    color: colors.highWhite,
  },
  h3: {
    ...typography.h3,
    color: colors.deepNavy,
  },
  h3Light: {
    ...typography.h3,
    color: colors.highWhite,
  },
  h4: {
    ...typography.h4,
    color: colors.deepNavy,
  },
  h4Light: {
    ...typography.h4,
    color: colors.highWhite,
  },
  body: {
    ...typography.body,
    color: colors.deepNavy,
  },
  bodyLight: {
    ...typography.body,
    color: colors.highWhite,
  },
  caption: {
    ...typography.caption,
    color: colors.navy60,
  },
  captionLight: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.7)",
  },
  label: {
    ...typography.label,
    color: colors.navy60,
  },
  labelLight: {
    ...typography.label,
    color: "rgba(255, 255, 255, 0.6)",
  },
  // Accent
  accentText: {
    color: colors.electricLime,
  },
});
