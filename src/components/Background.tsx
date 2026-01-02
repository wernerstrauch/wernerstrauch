import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import { colors, page } from "../styles/theme";

interface BackgroundProps {
  variant?: "light" | "dark";
  showGrid?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({
  variant = "dark",
  showGrid = true,
}) => {
  const isDark = variant === "dark";
  const gridSpacing = 40;
  const gridColor = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(10, 25, 47, 0.04)";
  const fadeColor = isDark ? colors.deepNavy : colors.highWhite;

  const verticalLines = Math.ceil(page.width / gridSpacing);
  const horizontalLines = Math.ceil(page.height / gridSpacing);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      width: page.width,
      height: page.height,
      backgroundColor: isDark ? colors.deepNavy : colors.highWhite,
    },
    gridContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: page.width,
      height: page.height,
    },
    verticalLine: {
      position: "absolute",
      top: 0,
      width: 0.5,
      height: page.height,
      backgroundColor: gridColor,
    },
    horizontalLine: {
      position: "absolute",
      left: 0,
      height: 0.5,
      width: page.width,
      backgroundColor: gridColor,
    },
    fadeLeft: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 100,
      height: page.height,
      backgroundColor: fadeColor,
      opacity: 0.9,
    },
    fadeRight: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 80,
      height: page.height,
      backgroundColor: fadeColor,
      opacity: 0.85,
    },
    fadeTop: {
      position: "absolute",
      top: 0,
      left: 0,
      width: page.width,
      height: 60,
      backgroundColor: fadeColor,
      opacity: 0.7,
    },
    fadeBottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: page.width,
      height: 60,
      backgroundColor: fadeColor,
      opacity: 0.7,
    },
  });

  return (
    <View style={styles.container}>
      {showGrid && (
        <View style={styles.gridContainer}>
          {/* Vertical lines */}
          {Array.from({ length: verticalLines + 1 }).map((_, i) => (
            <View
              key={`v-${i}`}
              style={[styles.verticalLine, { left: i * gridSpacing }]}
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: horizontalLines + 1 }).map((_, i) => (
            <View
              key={`h-${i}`}
              style={[styles.horizontalLine, { top: i * gridSpacing }]}
            />
          ))}
        </View>
      )}

      {/* Edge fades */}
      <View style={styles.fadeLeft} />
      <View style={styles.fadeRight} />
      <View style={styles.fadeTop} />
      <View style={styles.fadeBottom} />
    </View>
  );
};

// Accent bar for left side
export const AccentBar: React.FC<{ position?: "left" | "bottom" }> = ({
  position = "left",
}) => {
  if (position === "left") {
    return (
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 4,
          height: "100%",
          backgroundColor: colors.electricLime,
        }}
      />
    );
  }

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: 4,
        backgroundColor: colors.electricLime,
      }}
    />
  );
};

// Corner accent
export const CornerAccent: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}> = ({ position = "top-left" }) => {
  const size = 60;
  const thickness = 3;

  const positionStyles: Record<string, object> = {
    "top-left": { top: 0, left: 0 },
    "top-right": { top: 0, right: 0 },
    "bottom-left": { bottom: 0, left: 0 },
    "bottom-right": { bottom: 0, right: 0 },
  };

  const isTop = position.includes("top");
  const isLeft = position.includes("left");

  return (
    <View
      style={{
        position: "absolute",
        ...positionStyles[position],
        width: size,
        height: size,
      }}
    >
      {/* Horizontal line */}
      <View
        style={{
          position: "absolute",
          [isTop ? "top" : "bottom"]: 0,
          [isLeft ? "left" : "right"]: 0,
          width: size,
          height: thickness,
          backgroundColor: colors.electricLime,
        }}
      />
      {/* Vertical line */}
      <View
        style={{
          position: "absolute",
          [isTop ? "top" : "bottom"]: 0,
          [isLeft ? "left" : "right"]: 0,
          width: thickness,
          height: size,
          backgroundColor: colors.electricLime,
        }}
      />
    </View>
  );
};
