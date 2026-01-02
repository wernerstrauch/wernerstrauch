import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { colors, spacing } from "../styles/theme";

interface TocItem {
  number: string;
  title: string;
  page: number;
}

const tocItems: TocItem[] = [
  { number: "01", title: "Brand Einführung", page: 4 },
  { number: "02", title: "Communication Framework", page: 5 },
  { number: "03", title: "Logo-Richtlinien", page: 6 },
  { number: "04", title: "Farbpalette", page: 7 },
  { number: "05", title: "Typografie", page: 8 },
  { number: "06", title: "Abstände & Grid", page: 9 },
  { number: "07", title: "Anwendungsbeispiele", page: 10 },
  { number: "08", title: "Do's & Don'ts", page: 11 },
];

export const TableOfContents: React.FC = () => {
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
    title: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 42,
      color: colors.deepNavy,
      marginBottom: spacing.md,
    },
    subtitle: {
      fontFamily: "Inter",
      fontSize: 12,
      color: colors.navy60,
      lineHeight: 1.6,
    },
    tocList: {
      marginTop: spacing.lg,
    },
    tocItem: {
      flexDirection: "row",
      alignItems: "baseline",
      paddingVertical: spacing.md,
    },
    tocItemBorder: {
      height: 1,
      backgroundColor: colors.navy10,
      marginTop: spacing.md,
    },
    tocNumber: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 14,
      color: colors.electricLime,
      width: 40,
    },
    tocTitle: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 14,
      color: colors.deepNavy,
      flex: 1,
    },
    tocDots: {
      flex: 1,
      marginHorizontal: spacing.md,
      marginBottom: 4,
      flexDirection: "row",
      alignItems: "flex-end",
      overflow: "hidden",
    },
    tocDotsLine: {
      width: "100%",
      height: 1,
      backgroundColor: colors.navy20,
    },
    tocPage: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 14,
      color: colors.deepNavy,
      width: 30,
      textAlign: "right",
    },
  });

  return (
    <PageTemplate
      variant="light"
      pageNumber={3}
      totalPages={11}
      sectionTitle="Inhalt"
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>Inhalt</Text>
          <Text style={styles.subtitle}>
            Dieses Manual definiert die visuelle Identität der Marke Werner
            Strauch. Es dient als Referenz für alle Kommunikationsmittel und
            stellt eine konsistente Markendarstellung sicher.
          </Text>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.tocList}>
            {tocItems.map((item) => (
              <View key={item.number}>
                <View style={styles.tocItem}>
                  <Text style={styles.tocNumber}>{item.number}</Text>
                  <Text style={styles.tocTitle}>{item.title}</Text>
                  <View style={styles.tocDots}>
                    <View style={styles.tocDotsLine} />
                  </View>
                  <Text style={styles.tocPage}>
                    {String(item.page).padStart(2, "0")}
                  </Text>
                </View>
                <View style={styles.tocItemBorder} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </PageTemplate>
  );
};
