import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, spacing, typography } from "../styles/theme";

interface TypographySampleProps {
  variant?: "light" | "dark";
}

export const TypographySample: React.FC<TypographySampleProps> = ({
  variant = "light",
}) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    container: {},
    row: {
      flexDirection: "row",
      alignItems: "baseline",
      marginBottom: spacing.lg,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "rgba(255,255,255,0.1)" : colors.navy10,
    },
    labelColumn: {
      width: 100,
    },
    sampleColumn: {
      flex: 1,
    },
    label: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 9,
      color: isDark ? "rgba(255,255,255,0.6)" : colors.navy60,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    specs: {
      fontFamily: "Inter",
      fontSize: 8,
      color: isDark ? "rgba(255,255,255,0.5)" : colors.navy40,
      marginTop: 4,
    },
  });

  const textColor = isDark ? colors.highWhite : colors.deepNavy;

  return (
    <View style={styles.container}>
      {/* H1 */}
      <View style={styles.row}>
        <View style={styles.labelColumn}>
          <Text style={styles.label}>Headline 1</Text>
          <Text style={styles.specs}>Montserrat Black</Text>
          <Text style={styles.specs}>48pt / 1.1</Text>
        </View>
        <View style={styles.sampleColumn}>
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: 900,
              fontSize: 48,
              color: textColor,
            }}
          >
            Klarheit
          </Text>
        </View>
      </View>

      {/* H2 */}
      <View style={styles.row}>
        <View style={styles.labelColumn}>
          <Text style={styles.label}>Headline 2</Text>
          <Text style={styles.specs}>Montserrat Bold</Text>
          <Text style={styles.specs}>32pt / 1.2</Text>
        </View>
        <View style={styles.sampleColumn}>
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: 32,
              color: textColor,
            }}
          >
            Profit-Klarheit
          </Text>
        </View>
      </View>

      {/* H3 */}
      <View style={styles.row}>
        <View style={styles.labelColumn}>
          <Text style={styles.label}>Headline 3</Text>
          <Text style={styles.specs}>Montserrat Bold</Text>
          <Text style={styles.specs}>24pt / 1.3</Text>
        </View>
        <View style={styles.sampleColumn}>
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: 24,
              color: textColor,
            }}
          >
            System-Design
          </Text>
        </View>
      </View>

      {/* H4 */}
      <View style={styles.row}>
        <View style={styles.labelColumn}>
          <Text style={styles.label}>Headline 4</Text>
          <Text style={styles.specs}>Montserrat Bold</Text>
          <Text style={styles.specs}>18pt / 1.4</Text>
        </View>
        <View style={styles.sampleColumn}>
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              fontSize: 18,
              color: textColor,
            }}
          >
            Unternehmerische Souveränität
          </Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.row}>
        <View style={styles.labelColumn}>
          <Text style={styles.label}>Body</Text>
          <Text style={styles.specs}>Inter Regular</Text>
          <Text style={styles.specs}>12pt / 1.6</Text>
        </View>
        <View style={styles.sampleColumn}>
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: "normal",
              fontSize: 12,
              color: textColor,
              lineHeight: 1.6,
            }}
          >
            Du verwandelst undurchsichtige Prozesse in logische, skalierbare
            Systeme, die dem Inhaber seine unternehmerische Souveränität
            zurückgeben.
          </Text>
        </View>
      </View>

      {/* Caption */}
      <View style={[styles.row, { borderBottomWidth: 0 }]}>
        <View style={styles.labelColumn}>
          <Text style={styles.label}>Caption</Text>
          <Text style={styles.specs}>Inter Regular</Text>
          <Text style={styles.specs}>10pt / 1.5</Text>
        </View>
        <View style={styles.sampleColumn}>
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: "normal",
              fontSize: 10,
              color: isDark ? "rgba(255,255,255,0.7)" : colors.navy60,
              lineHeight: 1.5,
            }}
          >
            Zusätzliche Informationen und Quellenangaben werden in dieser
            Schriftgröße dargestellt.
          </Text>
        </View>
      </View>
    </View>
  );
};

// Font family showcase
export const FontFamilyShowcase: React.FC<{ variant?: "light" | "dark" }> = ({
  variant = "light",
}) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    fontBlock: {
      flex: 1,
      marginRight: spacing.xl,
    },
    fontName: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 18,
      color: isDark ? colors.highWhite : colors.deepNavy,
      marginBottom: spacing.xs,
    },
    fontVariant: {
      fontFamily: "Inter",
      fontSize: 10,
      color: isDark ? "rgba(255,255,255,0.6)" : colors.navy60,
      marginBottom: spacing.md,
    },
    fontUsage: {
      fontFamily: "Inter",
      fontSize: 10,
      color: isDark ? "rgba(255,255,255,0.7)" : colors.navy60,
      lineHeight: 1.5,
    },
    alphabet: {
      marginTop: spacing.md,
      fontSize: 14,
      color: isDark ? colors.highWhite : colors.deepNavy,
      lineHeight: 1.8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.fontBlock}>
        <Text style={styles.fontName}>Montserrat</Text>
        <Text style={styles.fontVariant}>BLACK & BOLD</Text>
        <Text style={styles.fontUsage}>
          Genutzt für Überschriften. Diese Schrift vermittelt Kraft, Dominanz
          und einen modernen Ansatz.
        </Text>
        <Text style={[styles.alphabet, { fontFamily: "Montserrat", fontWeight: 900 }]}>
          ABCDEFGHIJKLM{"\n"}NOPQRSTUVWXYZ{"\n"}0123456789
        </Text>
      </View>
      <View style={[styles.fontBlock, { marginRight: 0 }]}>
        <Text style={styles.fontName}>Inter</Text>
        <Text style={styles.fontVariant}>REGULAR & MEDIUM</Text>
        <Text style={styles.fontUsage}>
          Genutzt für Fließtext. Bietet höchste Lesbarkeit auf digitalen
          Bildschirmen und wirkt unaufdringlich professionell.
        </Text>
        <Text style={[styles.alphabet, { fontFamily: "Inter" }]}>
          ABCDEFGHIJKLM{"\n"}NOPQRSTUVWXYZ{"\n"}abcdefghijklmnopqrstuvwxyz
        </Text>
      </View>
    </View>
  );
};
