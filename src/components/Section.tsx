import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, spacing, typography } from "../styles/theme";

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: "light" | "dark";
  marginBottom?: number;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  variant = "light",
  marginBottom = spacing.xl,
}) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    container: {
      marginBottom,
    },
    titleContainer: {
      marginBottom: spacing.md,
    },
    title: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 20,
      color: isDark ? colors.highWhite : colors.deepNavy,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontFamily: "Inter",
      fontSize: 11,
      color: isDark ? "rgba(255,255,255,0.7)" : colors.navy60,
      lineHeight: 1.5,
    },
    content: {},
  });

  return (
    <View style={styles.container}>
      {(title || subtitle) && (
        <View style={styles.titleContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

// Grid layout helper
interface GridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: number;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 2,
  gap = spacing.md,
}) => {
  const styles = StyleSheet.create({
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -gap / 2,
    },
  });

  return <View style={styles.grid}>{children}</View>;
};

interface GridItemProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  gap?: number;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  columns = 2,
  gap = spacing.md,
}) => {
  const widthPercent = 100 / columns;

  const styles = StyleSheet.create({
    item: {
      width: `${widthPercent}%`,
      paddingHorizontal: gap / 2,
      marginBottom: gap,
    },
  });

  return <View style={styles.item}>{children}</View>;
};

// Divider
interface DividerProps {
  variant?: "light" | "dark";
  marginVertical?: number;
}

export const Divider: React.FC<DividerProps> = ({
  variant = "light",
  marginVertical = spacing.lg,
}) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : colors.navy10,
      marginVertical,
    },
  });

  return <View style={styles.divider} />;
};

// Spacer
interface SpacerProps {
  size?: number;
}

export const Spacer: React.FC<SpacerProps> = ({ size = spacing.md }) => {
  return <View style={{ height: size }} />;
};
