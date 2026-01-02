import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { TypographySample, FontFamilyShowcase } from "../components/TypographyShowcase";
import { colors, spacing } from "../styles/theme";

export const Typography: React.FC = () => {
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
    sectionTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 14,
      color: colors.deepNavy,
      marginBottom: spacing.md,
    },
    fontShowcase: {
      marginBottom: spacing.xl,
    },
    fontCard: {
      padding: spacing.lg,
      borderRadius: 4,
      marginBottom: spacing.md,
    },
    fontCardDark: {
      backgroundColor: colors.deepNavy,
    },
    fontCardLight: {
      backgroundColor: colors.highWhite,
      borderWidth: 1,
      borderColor: colors.navy10,
    },
    fontName: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 24,
      marginBottom: spacing.xs,
    },
    fontVariants: {
      fontFamily: "Inter",
      fontSize: 10,
      marginBottom: spacing.md,
    },
    fontAlphabet: {
      fontSize: 12,
      lineHeight: 1.6,
      letterSpacing: 1,
    },
    fontUsage: {
      fontFamily: "Inter",
      fontSize: 10,
      lineHeight: 1.5,
      marginTop: spacing.md,
    },
    rulesBox: {
      backgroundColor: colors.navy10,
      padding: spacing.lg,
      borderRadius: 4,
      marginTop: spacing.lg,
    },
    ruleItem: {
      flexDirection: "row",
      marginBottom: spacing.sm,
    },
    ruleBullet: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.electricLime,
      marginRight: spacing.sm,
      width: 12,
    },
    ruleText: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
      flex: 1,
      lineHeight: 1.4,
    },
  });

  return (
    <PageTemplate
      variant="light"
      pageNumber={8}
      totalPages={11}
      sectionTitle="Typografie"
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>Typografie</Text>
          <Text style={styles.pageSubtitle}>
            Die Typografie kombiniert die kraftvolle Montserrat für Überschriften
            mit der lesbaren Inter für Fließtexte. Diese Kombination vermittelt
            Autorität und Professionalität.
          </Text>

          {/* Montserrat */}
          <View style={styles.fontShowcase}>
            <View style={[styles.fontCard, styles.fontCardDark]}>
              <Text style={[styles.fontName, { fontFamily: "Montserrat", fontWeight: 900, color: colors.highWhite }]}>
                Montserrat
              </Text>
              <Text style={[styles.fontVariants, { color: colors.electricLime }]}>
                BLACK & BOLD
              </Text>
              <Text style={[styles.fontAlphabet, { fontFamily: "Montserrat", fontWeight: 900, color: colors.highWhite }]}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ{"\n"}
                0123456789
              </Text>
              <Text style={[styles.fontUsage, { color: "rgba(255,255,255,0.7)" }]}>
                Verwendet für Headlines, Titel und markante Statements.
              </Text>
            </View>
          </View>

          {/* Inter */}
          <View style={styles.fontShowcase}>
            <View style={[styles.fontCard, styles.fontCardLight]}>
              <Text style={[styles.fontName, { fontFamily: "Inter", fontWeight: 500, color: colors.deepNavy }]}>
                Inter
              </Text>
              <Text style={[styles.fontVariants, { color: colors.navy60 }]}>
                REGULAR & MEDIUM
              </Text>
              <Text style={[styles.fontAlphabet, { fontFamily: "Inter", color: colors.deepNavy }]}>
                abcdefghijklmnopqrstuvwxyz{"\n"}
                0123456789
              </Text>
              <Text style={[styles.fontUsage, { color: colors.navy60 }]}>
                Verwendet für Fließtext, Beschreibungen und UI-Elemente.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.sectionTitle}>Typografie-Hierarchie</Text>
          <TypographySample variant="light" />

          {/* Rules */}
          <View style={styles.rulesBox}>
            <Text style={styles.sectionTitle}>Anwendungsregeln</Text>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>01</Text>
              <Text style={styles.ruleText}>
                Headlines immer in Montserrat Black oder Bold setzen
              </Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>02</Text>
              <Text style={styles.ruleText}>
                Fließtext ausschließlich in Inter Regular oder Medium
              </Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>03</Text>
              <Text style={styles.ruleText}>
                Maximale Zeilenlänge: 70-80 Zeichen für optimale Lesbarkeit
              </Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>04</Text>
              <Text style={styles.ruleText}>
                Labels und Tags in Inter Medium mit Letterspacing
              </Text>
            </View>
          </View>
        </View>
      </View>
    </PageTemplate>
  );
};
