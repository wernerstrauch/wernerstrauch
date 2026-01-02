import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { Logo, LogoCompact } from "../components/Logo";
import { colors, spacing } from "../styles/theme";

interface ExampleItem {
  title: string;
  description: string;
}

const dosItems: ExampleItem[] = [
  {
    title: "Konsistente Farben verwenden",
    description: "Nur die drei definierten Markenfarben nutzen",
  },
  {
    title: "Ausreichend Weißraum",
    description: "Inhalte atmen lassen für bessere Lesbarkeit",
  },
  {
    title: "Klare Hierarchie",
    description: "Montserrat für Headlines, Inter für Fließtext",
  },
  {
    title: "Hoher Kontrast",
    description: "Text immer gut lesbar auf Hintergründen",
  },
];

const dontsItems: ExampleItem[] = [
  {
    title: "Logo verzerren",
    description: "Proportionen müssen immer erhalten bleiben",
  },
  {
    title: "Andere Schriften nutzen",
    description: "Nur Montserrat und Inter sind zugelassen",
  },
  {
    title: "Farbverläufe auf Logo",
    description: "Das Logo ist immer einfarbig",
  },
  {
    title: "Überladenes Design",
    description: "Weniger ist mehr – Klarheit vor Dekoration",
  },
];

export const DosAndDonts: React.FC = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
    },
    column: {
      flex: 1,
      paddingHorizontal: spacing.md,
    },
    columnDo: {
      borderRightWidth: 1,
      borderRightColor: colors.navy10,
    },
    headerDo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    headerDont: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    headerIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: spacing.md,
    },
    headerIconDo: {
      backgroundColor: colors.electricLime,
    },
    headerIconDont: {
      backgroundColor: colors.navy60,
    },
    headerIconText: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 16,
      color: colors.highWhite,
    },
    headerTitle: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 28,
      color: colors.deepNavy,
    },
    exampleList: {
      marginBottom: spacing.lg,
    },
    exampleItem: {
      flexDirection: "row",
      marginBottom: spacing.md,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.navy10,
    },
    exampleNumber: {
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: spacing.md,
    },
    exampleNumberDo: {
      backgroundColor: colors.lime20,
    },
    exampleNumberDont: {
      backgroundColor: colors.navy10,
    },
    exampleNumberText: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 10,
    },
    exampleNumberTextDo: {
      color: colors.deepNavy,
    },
    exampleNumberTextDont: {
      color: colors.navy60,
    },
    exampleContent: {
      flex: 1,
    },
    exampleTitle: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 12,
      color: colors.deepNavy,
      marginBottom: 2,
    },
    exampleDescription: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.navy60,
    },
    visualExample: {
      marginTop: spacing.md,
    },
    visualLabel: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 9,
      color: colors.navy60,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: spacing.sm,
    },
    visualBox: {
      padding: spacing.lg,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
      height: 80,
    },
    visualBoxCorrect: {
      backgroundColor: colors.deepNavy,
      borderWidth: 2,
      borderColor: colors.electricLime,
    },
    visualBoxWrong: {
      backgroundColor: colors.navy40,
      borderWidth: 2,
      borderColor: colors.navy60,
    },
    wrongLogoContainer: {
      opacity: 0.7,
    },
    wrongText: {
      fontFamily: "Inter",
      fontSize: 10,
      color: colors.highWhite,
      textAlign: "center",
      marginTop: spacing.sm,
    },
    visualRow: {
      flexDirection: "row",
      marginTop: spacing.lg,
    },
    visualItem: {
      flex: 1,
      marginRight: spacing.md,
    },
    colorBox: {
      height: 40,
      borderRadius: 4,
      marginBottom: spacing.xs,
    },
    colorLabel: {
      fontFamily: "Inter",
      fontSize: 8,
      color: colors.navy60,
      textAlign: "center",
    },
  });

  return (
    <PageTemplate
      variant="light"
      pageNumber={11}
      totalPages={11}
      sectionTitle="Do's & Don'ts"
    >
      <View style={styles.container}>
        {/* Do's Column */}
        <View style={[styles.column, styles.columnDo]}>
          <View style={styles.headerDo}>
            <View style={[styles.headerIcon, styles.headerIconDo]}>
              <Text style={[styles.headerIconText, { color: colors.deepNavy }]}>✓</Text>
            </View>
            <Text style={styles.headerTitle}>Do's</Text>
          </View>

          <View style={styles.exampleList}>
            {dosItems.map((item, index) => (
              <View key={index} style={styles.exampleItem}>
                <View style={[styles.exampleNumber, styles.exampleNumberDo]}>
                  <Text style={[styles.exampleNumberText, styles.exampleNumberTextDo]}>
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.exampleContent}>
                  <Text style={styles.exampleTitle}>{item.title}</Text>
                  <Text style={styles.exampleDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Visual Example - Correct */}
          <View style={styles.visualExample}>
            <Text style={styles.visualLabel}>Korrekte Anwendung</Text>
            <View style={[styles.visualBox, styles.visualBoxCorrect]}>
              <Logo variant="light" size="small" />
            </View>
          </View>

          {/* Color Usage Correct */}
          <View style={styles.visualRow}>
            <View style={styles.visualItem}>
              <View style={[styles.colorBox, { backgroundColor: colors.deepNavy }]} />
              <Text style={styles.colorLabel}>Navy 60%</Text>
            </View>
            <View style={styles.visualItem}>
              <View style={[styles.colorBox, { backgroundColor: colors.highWhite, borderWidth: 1, borderColor: colors.navy20 }]} />
              <Text style={styles.colorLabel}>White 30%</Text>
            </View>
            <View style={[styles.visualItem, { marginRight: 0 }]}>
              <View style={[styles.colorBox, { backgroundColor: colors.electricLime }]} />
              <Text style={styles.colorLabel}>Lime 10%</Text>
            </View>
          </View>
        </View>

        {/* Don'ts Column */}
        <View style={styles.column}>
          <View style={styles.headerDont}>
            <View style={[styles.headerIcon, styles.headerIconDont]}>
              <Text style={styles.headerIconText}>✗</Text>
            </View>
            <Text style={styles.headerTitle}>Don'ts</Text>
          </View>

          <View style={styles.exampleList}>
            {dontsItems.map((item, index) => (
              <View key={index} style={styles.exampleItem}>
                <View style={[styles.exampleNumber, styles.exampleNumberDont]}>
                  <Text style={[styles.exampleNumberText, styles.exampleNumberTextDont]}>
                    {index + 1}
                  </Text>
                </View>
                <View style={styles.exampleContent}>
                  <Text style={styles.exampleTitle}>{item.title}</Text>
                  <Text style={styles.exampleDescription}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Visual Example - Wrong */}
          <View style={styles.visualExample}>
            <Text style={styles.visualLabel}>Falsche Anwendung</Text>
            <View style={[styles.visualBox, styles.visualBoxWrong]}>
              <View style={styles.wrongLogoContainer}>
                <LogoCompact variant="light" />
              </View>
              <Text style={styles.wrongText}>Nicht verzerren!</Text>
            </View>
          </View>

          {/* Color Usage Wrong */}
          <View style={styles.visualRow}>
            <View style={styles.visualItem}>
              <View style={[styles.colorBox, { backgroundColor: colors.navy20, borderWidth: 2, borderColor: colors.navy40 }]} />
              <Text style={styles.colorLabel}>Keine anderen</Text>
            </View>
            <View style={styles.visualItem}>
              <View style={[styles.colorBox, { backgroundColor: colors.navy20, borderWidth: 2, borderColor: colors.navy40 }]} />
              <Text style={styles.colorLabel}>Farben</Text>
            </View>
            <View style={[styles.visualItem, { marginRight: 0 }]}>
              <View style={[styles.colorBox, { backgroundColor: colors.navy20, borderWidth: 2, borderColor: colors.navy40 }]} />
              <Text style={styles.colorLabel}>verwenden!</Text>
            </View>
          </View>
        </View>
      </View>
    </PageTemplate>
  );
};
