import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { colors, spacing } from "../styles/theme";

const spacingValues = [
  { name: "xs", value: 4, label: "Extra Small" },
  { name: "sm", value: 8, label: "Small" },
  { name: "md", value: 16, label: "Medium" },
  { name: "lg", value: 24, label: "Large" },
  { name: "xl", value: 32, label: "Extra Large" },
  { name: "xxl", value: 48, label: "2X Large" },
  { name: "xxxl", value: 64, label: "3X Large" },
];

export const Spacing: React.FC = () => {
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
    baseUnit: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.deepNavy,
      padding: spacing.lg,
      borderRadius: 4,
      marginBottom: spacing.xl,
    },
    baseUnitNumber: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 48,
      color: colors.electricLime,
      marginRight: spacing.md,
    },
    baseUnitLabel: {
      flex: 1,
    },
    baseUnitTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 16,
      color: colors.highWhite,
      marginBottom: spacing.xs,
    },
    baseUnitText: {
      fontFamily: "Inter",
      fontSize: 11,
      color: "rgba(255,255,255,0.7)",
      lineHeight: 1.4,
    },
    spacingScale: {
      marginBottom: spacing.xl,
    },
    spacingItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.md,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.navy10,
    },
    spacingVisual: {
      width: 100,
      height: 24,
      justifyContent: "flex-start",
      flexDirection: "row",
    },
    spacingBar: {
      height: "100%",
      backgroundColor: colors.electricLime,
      borderRadius: 2,
    },
    spacingInfo: {
      flex: 1,
      paddingLeft: spacing.lg,
    },
    spacingName: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 12,
      color: colors.deepNavy,
    },
    spacingValue: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
    },
    spacingLabel: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy40,
    },
    gridDemo: {
      marginTop: spacing.lg,
    },
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      borderWidth: 1,
      borderColor: colors.navy20,
      borderRadius: 4,
      overflow: "hidden",
    },
    gridCell: {
      width: "25%",
      height: 60,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.navy10,
      justifyContent: "center",
      alignItems: "center",
    },
    gridCellText: {
      fontFamily: "Inter",
      fontSize: 8,
      color: colors.navy40,
    },
    usageBox: {
      backgroundColor: colors.navy10,
      padding: spacing.lg,
      borderRadius: 4,
      marginTop: spacing.lg,
    },
    usageRow: {
      flexDirection: "row",
      marginBottom: spacing.md,
    },
    usageLabel: {
      width: 80,
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 10,
      color: colors.deepNavy,
    },
    usageValue: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
    },
  });

  return (
    <PageTemplate
      variant="light"
      pageNumber={9}
      totalPages={11}
      sectionTitle="Abstände & Grid"
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>Abstände</Text>
          <Text style={styles.pageSubtitle}>
            Ein konsistentes Spacing-System basierend auf einer 8-Pixel-Basis
            sorgt für visuelle Harmonie und erleichtert die Implementierung.
          </Text>

          {/* Base Unit */}
          <View style={styles.baseUnit}>
            <Text style={styles.baseUnitNumber}>8</Text>
            <View style={styles.baseUnitLabel}>
              <Text style={styles.baseUnitTitle}>Basis-Einheit</Text>
              <Text style={styles.baseUnitText}>
                Alle Abstände sind Vielfache von 8px für konsistente Proportionen.
              </Text>
            </View>
          </View>

          {/* Grid Demo */}
          <Text style={styles.sectionTitle}>Grid-System</Text>
          <View style={styles.gridContainer}>
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={i} style={styles.gridCell}>
                <Text style={styles.gridCellText}>{(i + 1) * 8}px</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.sectionTitle}>Spacing-Skala</Text>
          <View style={styles.spacingScale}>
            {spacingValues.map((item) => (
              <View key={item.name} style={styles.spacingItem}>
                <View style={styles.spacingVisual}>
                  <View
                    style={[styles.spacingBar, { width: Math.min(item.value, 100) }]}
                  />
                </View>
                <View style={styles.spacingInfo}>
                  <Text style={styles.spacingName}>{item.name}</Text>
                  <Text style={styles.spacingValue}>{item.value}px</Text>
                </View>
                <Text style={styles.spacingLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Usage */}
          <View style={styles.usageBox}>
            <Text style={styles.sectionTitle}>Anwendungsbeispiele</Text>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Buttons</Text>
              <Text style={styles.usageValue}>
                Padding: md (16px) horizontal, sm (8px) vertikal
              </Text>
            </View>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Cards</Text>
              <Text style={styles.usageValue}>
                Padding: lg (24px), Margin: xl (32px)
              </Text>
            </View>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Sections</Text>
              <Text style={styles.usageValue}>
                Padding: xxl (48px), Margin: xxxl (64px)
              </Text>
            </View>
            <View style={[styles.usageRow, { marginBottom: 0 }]}>
              <Text style={styles.usageLabel}>Icons</Text>
              <Text style={styles.usageValue}>
                Margin: sm (8px) zum Text
              </Text>
            </View>
          </View>
        </View>
      </View>
    </PageTemplate>
  );
};
