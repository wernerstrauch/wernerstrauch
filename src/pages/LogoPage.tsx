import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { Logo, LogoCompact } from "../components/Logo";
import { colors, spacing } from "../styles/theme";

export const LogoPage: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
    },
    leftColumn: {
      width: "40%",
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
    logoShowcase: {
      marginBottom: spacing.xl,
    },
    logoLabel: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 9,
      color: colors.navy60,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: spacing.md,
    },
    logoContainer: {
      padding: spacing.xl,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      marginBottom: spacing.sm,
    },
    logoContainerLight: {
      backgroundColor: colors.highWhite,
      borderWidth: 1,
      borderColor: colors.navy10,
    },
    logoContainerDark: {
      backgroundColor: colors.deepNavy,
    },
    variantsRow: {
      flexDirection: "row",
      marginBottom: spacing.xl,
    },
    variantItem: {
      flex: 1,
      marginRight: spacing.md,
    },
    clearSpaceSection: {
      marginTop: spacing.lg,
    },
    clearSpaceTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 14,
      color: colors.deepNavy,
      marginBottom: spacing.sm,
    },
    clearSpaceText: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
      lineHeight: 1.5,
      marginBottom: spacing.md,
    },
    clearSpaceDemo: {
      borderWidth: 1,
      borderColor: colors.electricLime,
      padding: spacing.lg,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    clearSpaceMeasure: {
      position: "absolute",
      top: spacing.sm,
      left: spacing.sm,
      fontFamily: "Inter",
      fontSize: 8,
      color: colors.electricLime,
    },
    minSizeSection: {
      marginTop: spacing.lg,
    },
    minSizeRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginTop: spacing.md,
    },
    minSizeItem: {
      marginRight: spacing.xl,
      alignItems: "center",
    },
    minSizeLabel: {
      fontFamily: "Inter",
      fontSize: 9,
      color: colors.navy60,
      marginTop: spacing.sm,
    },
    rulesSection: {
      marginTop: spacing.xl,
      backgroundColor: colors.navy10,
      padding: spacing.lg,
      borderRadius: 4,
    },
    ruleTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 12,
      color: colors.deepNavy,
      marginBottom: spacing.md,
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
    },
    ruleText: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
      flex: 1,
    },
  });

  return (
    <PageTemplate
      variant="light"
      pageNumber={6}
      totalPages={11}
      sectionTitle="Logo-Richtlinien"
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>Logo</Text>
          <Text style={styles.pageSubtitle}>
            Das Logo besteht aus dem Namen in Montserrat Black mit einem
            charakteristischen Lime-Punkt. Es verkörpert Klarheit, Präzision und
            moderne Professionalität.
          </Text>

          {/* Primary Logo */}
          <View style={styles.logoShowcase}>
            <Text style={styles.logoLabel}>Primäres Logo</Text>
            <View style={[styles.logoContainer, styles.logoContainerDark]}>
              <Logo variant="light" size="medium" showTagline={true} />
            </View>
          </View>

          {/* Clear Space */}
          <View style={styles.clearSpaceSection}>
            <Text style={styles.clearSpaceTitle}>Schutzzone</Text>
            <Text style={styles.clearSpaceText}>
              Der minimale Freiraum um das Logo entspricht der Höhe des Buchstabens „W".
            </Text>
            <View style={styles.clearSpaceDemo}>
              <Text style={styles.clearSpaceMeasure}>X</Text>
              <LogoCompact variant="dark" />
            </View>
          </View>
        </View>

        <View style={styles.rightColumn}>
          {/* Variants */}
          <Text style={styles.logoLabel}>Farbvarianten</Text>
          <View style={styles.variantsRow}>
            <View style={styles.variantItem}>
              <View style={[styles.logoContainer, styles.logoContainerDark]}>
                <Logo variant="light" size="small" />
              </View>
              <Text style={styles.minSizeLabel}>Auf dunklem Hintergrund</Text>
            </View>
            <View style={[styles.variantItem, { marginRight: 0 }]}>
              <View style={[styles.logoContainer, styles.logoContainerLight]}>
                <Logo variant="dark" size="small" />
              </View>
              <Text style={styles.minSizeLabel}>Auf hellem Hintergrund</Text>
            </View>
          </View>

          {/* Minimum Size */}
          <View style={styles.minSizeSection}>
            <Text style={styles.clearSpaceTitle}>Mindestgrößen</Text>
            <Text style={styles.clearSpaceText}>
              Um die Lesbarkeit zu gewährleisten, darf das Logo nicht kleiner als die folgenden Größen verwendet werden.
            </Text>
            <View style={styles.minSizeRow}>
              <View style={styles.minSizeItem}>
                <Logo variant="dark" size="small" />
                <Text style={styles.minSizeLabel}>Print: 25mm Breite</Text>
              </View>
              <View style={styles.minSizeItem}>
                <LogoCompact variant="dark" />
                <Text style={styles.minSizeLabel}>Digital: 120px Breite</Text>
              </View>
            </View>
          </View>

          {/* Rules */}
          <View style={styles.rulesSection}>
            <Text style={styles.ruleTitle}>Verwendungsregeln</Text>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>•</Text>
              <Text style={styles.ruleText}>
                Das Logo niemals strecken, drehen oder verzerren
              </Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>•</Text>
              <Text style={styles.ruleText}>
                Keine Schatten, Farbverläufe oder Effekte hinzufügen
              </Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>•</Text>
              <Text style={styles.ruleText}>
                Nur die definierten Farbkombinationen verwenden
              </Text>
            </View>
            <View style={styles.ruleItem}>
              <Text style={styles.ruleBullet}>•</Text>
              <Text style={styles.ruleText}>
                Ausreichend Kontrast zum Hintergrund sicherstellen
              </Text>
            </View>
          </View>
        </View>
      </View>
    </PageTemplate>
  );
};
