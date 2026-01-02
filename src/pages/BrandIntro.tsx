import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { Section, Divider } from "../components/Section";
import { colors, spacing } from "../styles/theme";

interface BrandDnaItem {
  key: string;
  label: string;
  description: string;
}

const brandDna: BrandDnaItem[] = [
  {
    key: "VIBE",
    label: "Stimmung",
    description:
      "Souveräne Tiefe und unerschütterliche Ruhe. Das Gefühl von absoluter Sicherheit und System-Frieden.",
  },
  {
    key: "TRIBE",
    label: "Stamm",
    description:
      "Die Leisen Performer - E-Commerce-Inhaber im Mittelstand, die Professionalität über Show stellen.",
  },
  {
    key: "VOICE",
    label: "Stimme",
    description:
      "Präzise, unaufgeregt und schmerzhaft ehrlich. Keine Füllwörter, kein IT-Jargon.",
  },
  {
    key: "IMPACT",
    label: "Wirkung",
    description:
      "Profit-Klarheit durch Reverse Engineering. Undurchsichtige Prozesse werden zu logischen Systemen.",
  },
  {
    key: "REASON",
    label: "Grund",
    description:
      "Die Macht der Logik über das Design. E-Commerce-Brands vor dem Kollaps bewahren.",
  },
];

export const BrandIntro: React.FC = () => {
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
    identityBox: {
      backgroundColor: colors.deepNavy,
      padding: spacing.lg,
      borderRadius: 4,
    },
    identityLabel: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 9,
      color: colors.electricLime,
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: spacing.sm,
    },
    identityTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 20,
      color: colors.highWhite,
      marginBottom: spacing.xs,
    },
    identitySubtitle: {
      fontFamily: "Inter",
      fontSize: 11,
      color: "rgba(255, 255, 255, 0.7)",
    },
    dnaGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -spacing.sm,
    },
    dnaItem: {
      width: "50%",
      paddingHorizontal: spacing.sm,
      marginBottom: spacing.lg,
    },
    dnaKey: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 11,
      color: colors.electricLime,
      letterSpacing: 2,
      marginBottom: spacing.xs,
    },
    dnaLabel: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 14,
      color: colors.deepNavy,
      marginBottom: spacing.xs,
    },
    dnaDescription: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
      lineHeight: 1.5,
    },
    coreValues: {
      marginTop: spacing.md,
    },
    coreValueRow: {
      flexDirection: "row",
      marginBottom: spacing.md,
    },
    coreValueIcon: {
      width: 24,
      height: 24,
      backgroundColor: colors.deepNavy,
      borderRadius: 2,
      justifyContent: "center",
      alignItems: "center",
      marginRight: spacing.md,
    },
    coreValueIconText: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 10,
      color: colors.electricLime,
    },
    coreValueContent: {
      flex: 1,
    },
    coreValueTitle: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 11,
      color: colors.deepNavy,
      marginBottom: 2,
    },
    coreValueText: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
      lineHeight: 1.4,
    },
  });

  return (
    <PageTemplate
      variant="light"
      pageNumber={4}
      totalPages={11}
      sectionTitle="Brand Einführung"
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>Brand DNA</Text>
          <Text style={styles.pageSubtitle}>
            Die Marke Werner Strauch steht für souveräne Klarheit in einer Welt
            voller technischem Chaos. Jedes Design-Element spiegelt diese
            Kernidentität wider.
          </Text>

          <View style={styles.identityBox}>
            <Text style={styles.identityLabel}>Positionierung</Text>
            <Text style={styles.identityTitle}>Der Mentor der Klarheit</Text>
            <Text style={styles.identitySubtitle}>
              Die Autorität, die das Chaos ordnet
            </Text>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.dnaGrid}>
            {brandDna.map((item) => (
              <View key={item.key} style={styles.dnaItem}>
                <Text style={styles.dnaKey}>{item.key}</Text>
                <Text style={styles.dnaLabel}>{item.label}</Text>
                <Text style={styles.dnaDescription}>{item.description}</Text>
              </View>
            ))}
          </View>

          <Divider />

          <View style={styles.coreValues}>
            <View style={styles.coreValueRow}>
              <View style={styles.coreValueIcon}>
                <Text style={styles.coreValueIconText}>1</Text>
              </View>
              <View style={styles.coreValueContent}>
                <Text style={styles.coreValueTitle}>Der unerschütterliche Fels</Text>
                <Text style={styles.coreValueText}>
                  Unternehmerische Souveränität und Ruhe im Sturm.
                </Text>
              </View>
            </View>
            <View style={styles.coreValueRow}>
              <View style={styles.coreValueIcon}>
                <Text style={styles.coreValueIconText}>2</Text>
              </View>
              <View style={styles.coreValueContent}>
                <Text style={styles.coreValueTitle}>Der Correct Contrarian</Text>
                <Text style={styles.coreValueText}>
                  Die unangenehme Wahrheit aussprechen – Design ohne Logik verbrennt Geld.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PageTemplate>
  );
};
