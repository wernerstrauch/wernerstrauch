import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { ColorSwatch, ColorRatio, ContrastCheck } from "../components/ColorSwatch";
import { colorInfo, colors, spacing } from "../styles/theme";

export const ColorPalette: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
    },
    leftColumn: {
      width: "35%",
      paddingRight: spacing.xxl,
    },
    rightColumn: {
      flex: 1,
    },
    pageTitle: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 36,
      color: colors.deepNavy,
      marginBottom: spacing.md,
    },
    pageSubtitle: {
      fontFamily: "Inter",
      fontSize: 12,
      color: colors.navy60,
      lineHeight: 1.7,
      marginBottom: spacing.lg,
    },
    colorGrid: {
      flexDirection: "row",
      marginBottom: spacing.xl,
    },
    colorItem: {
      flex: 1,
      marginRight: spacing.lg,
    },
    sectionTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 14,
      color: colors.deepNavy,
      marginBottom: spacing.md,
    },
    sectionText: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
      lineHeight: 1.5,
      marginBottom: spacing.md,
    },
    ratioSection: {
      marginTop: spacing.lg,
    },
    contrastSection: {
      marginTop: spacing.xl,
      padding: spacing.lg,
      backgroundColor: colors.navy10,
      borderRadius: 4,
    },
    usageGrid: {
      flexDirection: "row",
      marginTop: spacing.lg,
    },
    usageItem: {
      flex: 1,
      marginRight: spacing.md,
    },
    usageBox: {
      height: 60,
      borderRadius: 4,
      marginBottom: spacing.sm,
      justifyContent: "center",
      alignItems: "center",
    },
    usageLabel: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 9,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    usageText: {
      fontFamily: "Inter",
      fontSize: 9,
      color: colors.navy60,
      textAlign: "center",
    },
  });

  return (
    <PageTemplate
      variant="light"
      pageNumber={7}
      totalPages={11}
      sectionTitle="Farbpalette"
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>Farben</Text>
          <Text style={styles.pageSubtitle}>
            Die Farbpalette basiert auf drei Kernfarben, die Autorität,
            Innovation und Klarheit vermitteln. Die Anwendung folgt der
            60-30-10-Regel.
          </Text>

          <View style={styles.ratioSection}>
            <Text style={styles.sectionTitle}>Farbverhältnis</Text>
            <Text style={styles.sectionText}>
              Deep Navy dominiert als Hauptfarbe (60%), High White schafft
              Kontrast (30%), Electric Lime setzt Akzente (10%).
            </Text>
            <ColorRatio />
          </View>
        </View>

        <View style={styles.rightColumn}>
          {/* Primary Colors */}
          <Text style={styles.sectionTitle}>Primärfarben</Text>
          <View style={styles.colorGrid}>
            <View style={styles.colorItem}>
              <ColorSwatch
                color={colorInfo.deepNavy.hex}
                name={colorInfo.deepNavy.name}
                hex={colorInfo.deepNavy.hex}
                rgb={colorInfo.deepNavy.rgb}
                cmyk={colorInfo.deepNavy.cmyk}
                size="medium"
              />
            </View>
            <View style={styles.colorItem}>
              <ColorSwatch
                color={colorInfo.electricLime.hex}
                name={colorInfo.electricLime.name}
                hex={colorInfo.electricLime.hex}
                rgb={colorInfo.electricLime.rgb}
                cmyk={colorInfo.electricLime.cmyk}
                size="medium"
              />
            </View>
            <View style={[styles.colorItem, { marginRight: 0 }]}>
              <ColorSwatch
                color={colorInfo.highWhite.hex}
                name={colorInfo.highWhite.name}
                hex={colorInfo.highWhite.hex}
                rgb={colorInfo.highWhite.rgb}
                cmyk={colorInfo.highWhite.cmyk}
                size="medium"
              />
            </View>
          </View>

          {/* Usage Examples */}
          <Text style={styles.sectionTitle}>Anwendung</Text>
          <View style={styles.usageGrid}>
            <View style={styles.usageItem}>
              <View style={[styles.usageBox, { backgroundColor: colors.deepNavy }]}>
                <Text style={[styles.usageLabel, { color: colors.highWhite }]}>
                  Hintergründe
                </Text>
              </View>
              <Text style={styles.usageText}>Für Präsentationen, Header, Cards</Text>
            </View>
            <View style={styles.usageItem}>
              <View style={[styles.usageBox, { backgroundColor: colors.electricLime }]}>
                <Text style={[styles.usageLabel, { color: colors.deepNavy }]}>
                  Akzente
                </Text>
              </View>
              <Text style={styles.usageText}>CTAs, Highlights, Icons</Text>
            </View>
            <View style={[styles.usageItem, { marginRight: 0 }]}>
              <View
                style={[
                  styles.usageBox,
                  { backgroundColor: colors.highWhite, borderWidth: 1, borderColor: colors.navy20 },
                ]}
              >
                <Text style={[styles.usageLabel, { color: colors.deepNavy }]}>
                  Flächen
                </Text>
              </View>
              <Text style={styles.usageText}>Hintergründe, Dokumente</Text>
            </View>
          </View>

          {/* Contrast Check */}
          <View style={styles.contrastSection}>
            <Text style={styles.sectionTitle}>Barrierefreiheit</Text>
            <Text style={styles.sectionText}>
              Alle Farbkombinationen erfüllen die WCAG 2.1 AAA-Standards für
              optimale Lesbarkeit.
            </Text>
            <ContrastCheck />
          </View>
        </View>
      </View>
    </PageTemplate>
  );
};
