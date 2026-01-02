import React from "react";
import { Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, page, spacing, typography } from "../styles/theme";
import { LogoCompact } from "./Logo";
import { Background, AccentBar } from "./Background";

interface PageTemplateProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
  pageNumber?: number;
  totalPages?: number;
  showHeader?: boolean;
  showFooter?: boolean;
  sectionTitle?: string;
  showGrid?: boolean;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  variant = "light",
  pageNumber,
  totalPages,
  showHeader = true,
  showFooter = true,
  sectionTitle,
  showGrid = true,
}) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    page: {
      width: page.width,
      height: page.height,
      padding: page.margin,
      backgroundColor: isDark ? colors.deepNavy : colors.highWhite,
      position: "relative",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.lg,
      paddingBottom: spacing.md,
    },
    headerBorder: {
      height: 1,
      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : colors.navy10,
      marginBottom: spacing.lg,
    },
    sectionTitle: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 9,
      color: isDark ? "rgba(255,255,255,0.6)" : colors.navy60,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    content: {
      flex: 1,
    },
    footerBorder: {
      height: 1,
      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : colors.navy10,
      marginTop: spacing.lg,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: spacing.md,
    },
    footerText: {
      fontFamily: "Inter",
      fontSize: 9,
      color: isDark ? "rgba(255,255,255,0.5)" : colors.navy40,
    },
    pageNumber: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 10,
      color: isDark ? colors.highWhite : colors.deepNavy,
    },
    accentBar: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 4,
      height: "100%",
      backgroundColor: colors.electricLime,
    },
  });

  return (
    <Page size={[page.width, page.height]} style={styles.page}>
      <Background variant={variant} showGrid={showGrid} />
      <AccentBar />

      {showHeader && (
        <>
          <View style={styles.header}>
            <LogoCompact variant={isDark ? "light" : "dark"} />
            {sectionTitle && <Text style={styles.sectionTitle}>{sectionTitle}</Text>}
          </View>
          <View style={styles.headerBorder} />
        </>
      )}

      <View style={styles.content}>{children}</View>

      {showFooter && pageNumber && (
        <>
          <View style={styles.footerBorder} />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Corporate Design Manual</Text>
            <Text style={styles.pageNumber}>
              {String(pageNumber).padStart(2, "0")}
              {totalPages && ` / ${String(totalPages).padStart(2, "0")}`}
            </Text>
          </View>
        </>
      )}
    </Page>
  );
};

// Full-bleed page without margins (for cover, etc.)
export const FullBleedPage: React.FC<{
  children: React.ReactNode;
  variant?: "light" | "dark";
  showGrid?: boolean;
}> = ({ children, variant = "dark", showGrid = true }) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    page: {
      width: page.width,
      height: page.height,
      backgroundColor: isDark ? colors.deepNavy : colors.highWhite,
      position: "relative",
    },
  });

  return (
    <Page size={[page.width, page.height]} style={styles.page}>
      <Background variant={variant} showGrid={showGrid} />
      {children}
    </Page>
  );
};
