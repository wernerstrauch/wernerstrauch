import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { colors, typography } from "../styles/theme";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "small" | "medium" | "large";
  showTagline?: boolean;
}

const sizes = {
  small: { name: 18, tagline: 8 },
  medium: { name: 32, tagline: 12 },
  large: { name: 56, tagline: 16 },
};

export const Logo: React.FC<LogoProps> = ({
  variant = "dark",
  size = "medium",
  showTagline = false,
}) => {
  const isDark = variant === "dark";
  const sizeConfig = sizes[size];

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    firstName: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: sizeConfig.name,
      color: isDark ? colors.deepNavy : colors.highWhite,
      letterSpacing: 2,
    },
    lastName: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: sizeConfig.name,
      color: isDark ? colors.deepNavy : colors.highWhite,
      letterSpacing: 2,
      marginLeft: sizeConfig.name * 0.3,
    },
    accent: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: sizeConfig.name,
      color: colors.electricLime,
    },
    tagline: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: sizeConfig.tagline,
      color: isDark ? colors.navy60 : "rgba(255, 255, 255, 0.7)",
      letterSpacing: 3,
      textTransform: "uppercase",
      marginTop: sizeConfig.tagline * 0.5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.firstName}>WERNER</Text>
        <Text style={styles.lastName}>STRAUCH</Text>
        <Text style={styles.accent}>.</Text>
      </View>
      {showTagline && (
        <Text style={styles.tagline}>Der Stille Stratege</Text>
      )}
    </View>
  );
};

// Compact logo version for headers
export const LogoCompact: React.FC<{ variant?: "dark" | "light" }> = ({
  variant = "dark",
}) => {
  const isDark = variant === "dark";

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 10,
      color: isDark ? colors.deepNavy : colors.highWhite,
      letterSpacing: 1.5,
    },
    accent: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 10,
      color: colors.electricLime,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>WERNER STRAUCH</Text>
      <Text style={styles.accent}>.</Text>
    </View>
  );
};
