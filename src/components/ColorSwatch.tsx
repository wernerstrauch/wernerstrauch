import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, spacing, typography } from "../styles/theme";

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
  rgb?: string;
  cmyk?: string;
  description?: string;
  variant?: "light" | "dark";
  size?: "small" | "medium" | "large";
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  name,
  hex,
  rgb,
  cmyk,
  description,
  variant = "light",
  size = "medium",
}) => {
  const isDark = variant === "dark";

  const sizes = {
    small: { swatch: 40, fontSize: 9 },
    medium: { swatch: 80, fontSize: 10 },
    large: { swatch: 120, fontSize: 11 },
  };

  const sizeConfig = sizes[size];

  const styles = StyleSheet.create({
    container: {
      marginBottom: spacing.md,
    },
    swatch: {
      width: "100%",
      height: sizeConfig.swatch,
      backgroundColor: color,
      borderRadius: 4,
      marginBottom: spacing.sm,
      // Add border for white color
      ...(color === "#FFFFFF" && {
        borderWidth: 1,
        borderColor: colors.navy20,
      }),
    },
    name: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: sizeConfig.fontSize + 2,
      color: isDark ? colors.highWhite : colors.deepNavy,
      marginBottom: 2,
    },
    hex: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: sizeConfig.fontSize,
      color: isDark ? colors.highWhite : colors.deepNavy,
      marginBottom: spacing.xs,
    },
    details: {
      fontFamily: "Inter",
      fontSize: sizeConfig.fontSize - 1,
      color: isDark ? "rgba(255,255,255,0.6)" : colors.navy60,
      marginBottom: 2,
    },
    description: {
      fontFamily: "Inter",
      fontSize: sizeConfig.fontSize - 1,
      color: isDark ? "rgba(255,255,255,0.7)" : colors.navy60,
      marginTop: spacing.xs,
      lineHeight: 1.4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.swatch} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.hex}>{hex}</Text>
      {rgb && <Text style={styles.details}>{rgb}</Text>}
      {cmyk && <Text style={styles.details}>{cmyk}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

// Color ratio visualization
interface ColorRatioProps {
  variant?: "light" | "dark";
}

export const ColorRatio: React.FC<ColorRatioProps> = ({ variant = "light" }) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      height: 60,
      borderRadius: 4,
      overflow: "hidden",
      marginBottom: spacing.md,
    },
    navy: {
      width: "60%",
      backgroundColor: colors.deepNavy,
      justifyContent: "center",
      alignItems: "center",
    },
    lime: {
      width: "10%",
      backgroundColor: colors.electricLime,
      justifyContent: "center",
      alignItems: "center",
    },
    white: {
      width: "30%",
      backgroundColor: colors.highWhite,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.navy20,
    },
    label: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 10,
    },
    labelLight: {
      color: colors.highWhite,
    },
    labelDark: {
      color: colors.deepNavy,
    },
    legendContainer: {
      flexDirection: "row",
      marginTop: spacing.sm,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: spacing.lg,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: spacing.xs,
    },
    legendText: {
      fontFamily: "Inter",
      fontSize: 9,
      color: isDark ? "rgba(255,255,255,0.7)" : colors.navy60,
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.navy}>
          <Text style={[styles.label, styles.labelLight]}>60%</Text>
        </View>
        <View style={styles.white}>
          <Text style={[styles.label, styles.labelDark]}>30%</Text>
        </View>
        <View style={styles.lime}>
          <Text style={[styles.label, styles.labelDark]}>10%</Text>
        </View>
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.deepNavy }]} />
          <Text style={styles.legendText}>Deep Navy (Dominant)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.highWhite, borderWidth: 1, borderColor: colors.navy20 }]} />
          <Text style={styles.legendText}>High White (Sekundär)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.electricLime }]} />
          <Text style={styles.legendText}>Electric Lime (Akzent)</Text>
        </View>
      </View>
    </View>
  );
};

// Contrast checker
interface ContrastCheckProps {
  variant?: "light" | "dark";
}

export const ContrastCheck: React.FC<ContrastCheckProps> = ({ variant = "light" }) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    container: {
      marginTop: spacing.md,
    },
    row: {
      flexDirection: "row",
      marginBottom: spacing.sm,
    },
    sample: {
      flex: 1,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      marginRight: spacing.sm,
    },
    sampleText: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 10,
    },
    label: {
      width: 100,
      justifyContent: "center",
    },
    labelText: {
      fontFamily: "Inter",
      fontSize: 9,
      color: isDark ? "rgba(255,255,255,0.7)" : colors.navy60,
    },
    checkmark: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 10,
      color: colors.electricLime,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.sample, { backgroundColor: colors.deepNavy }]}>
          <Text style={[styles.sampleText, { color: colors.highWhite }]}>
            White on Navy
          </Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.checkmark}>AAA Pass</Text>
          <Text style={styles.labelText}>Ratio: 16.75:1</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.sample, { backgroundColor: colors.deepNavy }]}>
          <Text style={[styles.sampleText, { color: colors.electricLime }]}>
            Lime on Navy
          </Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.checkmark}>AAA Pass</Text>
          <Text style={styles.labelText}>Ratio: 14.23:1</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.sample, { backgroundColor: colors.highWhite, borderWidth: 1, borderColor: colors.navy20 }]}>
          <Text style={[styles.sampleText, { color: colors.deepNavy }]}>
            Navy on White
          </Text>
        </View>
        <View style={styles.label}>
          <Text style={styles.checkmark}>AAA Pass</Text>
          <Text style={styles.labelText}>Ratio: 16.75:1</Text>
        </View>
      </View>
    </View>
  );
};
