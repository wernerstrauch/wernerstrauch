import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { FullBleedPage } from "../components/PageTemplate";
import { Logo } from "../components/Logo";
import { CornerAccent } from "../components/Background";
import { colors, page, spacing } from "../styles/theme";

export const CoverPage: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.xxxl,
      justifyContent: "space-between",
    },
    topSection: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    year: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 12,
      color: "rgba(255, 255, 255, 0.5)",
      letterSpacing: 2,
    },
    centerSection: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: spacing.xl,
    },
    subtitle: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 14,
      color: colors.electricLime,
      letterSpacing: 4,
      textTransform: "uppercase",
      marginBottom: spacing.lg,
    },
    title: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 64,
      color: colors.highWhite,
      letterSpacing: 2,
      marginBottom: spacing.sm,
    },
    titleAccent: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 64,
      color: colors.electricLime,
    },
    tagline: {
      fontFamily: "Inter",
      fontSize: 16,
      color: "rgba(255, 255, 255, 0.7)",
      marginTop: spacing.xl,
      letterSpacing: 1,
    },
    bottomSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    brandStatement: {
      maxWidth: 300,
    },
    brandText: {
      fontFamily: "Inter",
      fontSize: 11,
      color: "rgba(255, 255, 255, 0.6)",
      lineHeight: 1.6,
    },
    decorativeBar: {
      position: "absolute",
      right: 120,
      top: "30%",
      width: 3,
      height: 200,
      backgroundColor: colors.electricLime,
      opacity: 0.3,
    },
    decorativeBar2: {
      position: "absolute",
      right: 100,
      top: "35%",
      width: 2,
      height: 150,
      backgroundColor: colors.electricLime,
      opacity: 0.15,
    },
  });

  return (
    <FullBleedPage variant="dark" showGrid={true}>
      <CornerAccent position="top-left" />
      <CornerAccent position="bottom-right" />

      {/* Decorative elements */}
      <View style={styles.decorativeBar} />
      <View style={styles.decorativeBar2} />

      <View style={styles.container}>
        {/* Top */}
        <View style={styles.topSection}>
          <Text style={styles.year}>2025</Text>
        </View>

        {/* Center */}
        <View style={styles.centerSection}>
          <Text style={styles.subtitle}>Corporate Design Manual</Text>
          <Logo variant="light" size="large" showTagline={false} />
          <Text style={styles.tagline}>Der Stille Stratege</Text>
        </View>

        {/* Bottom */}
        <View style={styles.bottomSection}>
          <View style={styles.brandStatement}>
            <Text style={styles.brandText}>
              Profit-Klarheit durch System-Design.{"\n"}
              Für E-Commerce-Inhaber, die Logik über Design stellen.
            </Text>
          </View>
        </View>
      </View>
    </FullBleedPage>
  );
};
