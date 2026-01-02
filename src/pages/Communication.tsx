import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { colors, spacing } from "../styles/theme";

interface CommunicationItem {
  title: string;
  description: string;
}

const emotionalItems: CommunicationItem[] = [
  {
    title: "System-Frieden & Sicherheit",
    description: "Das Gefühl eines sicheren Hafens - die monumentale Ruhe des Fjords.",
  },
  {
    title: "Mühelose Überlegenheit",
    description: "Lautlose Beschleunigung - die Lösung ist bereits bekannt.",
  },
  {
    title: "Heroisches Vertrauen",
    description: "Not Afraid - Führung aus dem technischen Trümmerhaufen.",
  },
  {
    title: "Ehrliche Erfrischung",
    description: "Direkt und klar - ohne künstlichen IT-Bullshit.",
  },
];

const visualItems: CommunicationItem[] = [
  {
    title: "Die 80/20-Regel",
    description: "Deep Navy (80%) + High White. Electric Lime nur als Laserpointer.",
  },
  {
    title: "Radikaler Minimalismus",
    description: "Keine Schatten, keine verspielten Icons - nur klare Linien.",
  },
  {
    title: "Strukturierte Weite",
    description: "Whitespace spiegelt Gedankenklarheit. Architektur statt Marketing.",
  },
  {
    title: "Premium Casual",
    description: "Hochwertig aber nahbar - Marc O'Polo Qualität.",
  },
];

const cognitiveItems: CommunicationItem[] = [
  {
    title: "Profit-Klarheit durch Logik",
    description: "Niemals Design - immer wirtschaftlicher ROI und P&L-Logik.",
  },
  {
    title: "Reverse Engineering",
    description: "Vom Ziel (Profit) zurück zur Technik - zwei Züge voraus.",
  },
  {
    title: "The Evidence-Crush",
    description: "3x über 1 Mio. € skaliert - Misstrauen sofort ausschalten.",
  },
  {
    title: "First Principles Thinking",
    description: "Probleme in kleinste logische Bestandteile zerlegen.",
  },
];

export const Communication: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      marginBottom: spacing.lg,
    },
    pageTitle: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 36,
      color: colors.deepNavy,
      marginBottom: spacing.sm,
    },
    pageSubtitle: {
      fontFamily: "Inter",
      fontSize: 12,
      color: colors.navy60,
      lineHeight: 1.6,
      maxWidth: 500,
    },
    columnsContainer: {
      flexDirection: "row",
      flex: 1,
    },
    column: {
      flex: 1,
      paddingHorizontal: spacing.md,
    },
    columnFirst: {
      paddingLeft: 0,
    },
    columnLast: {
      paddingRight: 0,
    },
    columnHeader: {
      marginBottom: spacing.md,
      paddingBottom: spacing.sm,
      borderBottomWidth: 2,
      borderBottomColor: colors.electricLime,
    },
    columnIcon: {
      width: 32,
      height: 32,
      backgroundColor: colors.deepNavy,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    columnIconText: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 14,
      color: colors.electricLime,
    },
    columnTitle: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 14,
      color: colors.deepNavy,
      marginBottom: spacing.xs,
    },
    columnSubtitle: {
      fontFamily: "Inter",
      fontSize: 9,
      color: colors.navy60,
    },
    itemsList: {
      marginTop: spacing.sm,
    },
    item: {
      marginBottom: spacing.md,
      paddingLeft: spacing.sm,
      borderLeftWidth: 2,
      borderLeftColor: colors.navy20,
    },
    itemTitle: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 10,
      color: colors.deepNavy,
      marginBottom: 2,
    },
    itemDescription: {
      fontFamily: "Inter",
      fontSize: 9,
      color: colors.navy60,
      lineHeight: 1.4,
    },
  });

  const renderColumn = (
    icon: string,
    title: string,
    subtitle: string,
    items: CommunicationItem[],
    isFirst?: boolean,
    isLast?: boolean
  ) => (
    <View
      style={[
        styles.column,
        isFirst && styles.columnFirst,
        isLast && styles.columnLast,
      ]}
    >
      <View style={styles.columnHeader}>
        <View style={styles.columnIcon}>
          <Text style={styles.columnIconText}>{icon}</Text>
        </View>
        <Text style={styles.columnTitle}>{title}</Text>
        <Text style={styles.columnSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.itemsList}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <PageTemplate
      variant="light"
      pageNumber={5}
      totalPages={11}
      sectionTitle="Communication Framework"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Communication</Text>
          <Text style={styles.pageSubtitle}>
            Die drei Ebenen der Markenkommunikation: Emotional, Visual und
            Kognitiv. Jede Interaktion muss auf allen drei Ebenen wirken.
          </Text>
        </View>

        <View style={styles.columnsContainer}>
          {renderColumn(
            "E",
            "Emotional",
            "Das Gefühl",
            emotionalItems,
            true
          )}
          {renderColumn(
            "V",
            "Visual",
            "Der Stil",
            visualItems
          )}
          {renderColumn(
            "C",
            "Cognitive",
            "Der Verstand",
            cognitiveItems,
            false,
            true
          )}
        </View>
      </View>
    </PageTemplate>
  );
};
