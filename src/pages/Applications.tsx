import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { PageTemplate } from "../components/PageTemplate";
import { Logo, LogoCompact } from "../components/Logo";
import { colors, spacing } from "../styles/theme";

export const Applications: React.FC = () => {
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
    mockupGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -spacing.sm,
    },
    mockupItem: {
      width: "50%",
      paddingHorizontal: spacing.sm,
      marginBottom: spacing.lg,
    },
    mockupLabel: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 10,
      color: colors.navy60,
      marginBottom: spacing.sm,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    // Business Card
    businessCard: {
      width: "100%",
      height: 110,
      backgroundColor: colors.deepNavy,
      borderRadius: 4,
      padding: spacing.md,
      justifyContent: "space-between",
      position: "relative",
      overflow: "hidden",
    },
    businessCardAccent: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 3,
      height: "100%",
      backgroundColor: colors.electricLime,
    },
    businessCardTop: {
      paddingLeft: spacing.sm,
    },
    businessCardBottom: {
      paddingLeft: spacing.sm,
    },
    businessCardName: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 14,
      color: colors.highWhite,
      letterSpacing: 1,
    },
    businessCardTitle: {
      fontFamily: "Inter",
      fontSize: 8,
      color: "rgba(255,255,255,0.6)",
      marginTop: 2,
    },
    businessCardContact: {
      fontFamily: "Inter",
      fontSize: 7,
      color: "rgba(255,255,255,0.7)",
      lineHeight: 1.5,
    },
    // LinkedIn Banner
    linkedInBanner: {
      width: "100%",
      height: 80,
      backgroundColor: colors.deepNavy,
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      position: "relative",
      overflow: "hidden",
    },
    linkedInGrid: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.05,
    },
    linkedInGridLine: {
      position: "absolute",
      backgroundColor: colors.highWhite,
    },
    linkedInContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    linkedInText: {
      marginLeft: spacing.md,
    },
    linkedInTagline: {
      fontFamily: "Inter",
      fontSize: 8,
      color: colors.electricLime,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    linkedInStatement: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 12,
      color: colors.highWhite,
      marginTop: 2,
    },
    // Email Signature
    emailSignature: {
      width: "100%",
      backgroundColor: colors.highWhite,
      borderWidth: 1,
      borderColor: colors.navy10,
      borderRadius: 4,
      padding: spacing.md,
    },
    emailSignatureDivider: {
      width: 40,
      height: 2,
      backgroundColor: colors.electricLime,
      marginVertical: spacing.sm,
    },
    emailSignatureName: {
      fontFamily: "Montserrat",
      fontWeight: "bold",
      fontSize: 12,
      color: colors.deepNavy,
    },
    emailSignatureTitle: {
      fontFamily: "Inter",
      fontSize: 9,
      color: colors.navy60,
      marginTop: 2,
    },
    emailSignatureContact: {
      fontFamily: "Inter",
      fontSize: 8,
      color: colors.navy60,
      lineHeight: 1.5,
    },
    // Slide
    slide: {
      width: "100%",
      height: 120,
      backgroundColor: colors.deepNavy,
      borderRadius: 4,
      padding: spacing.md,
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    },
    slideAccentBar: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 3,
      height: "100%",
      backgroundColor: colors.electricLime,
    },
    slideTitle: {
      fontFamily: "Montserrat",
      fontWeight: 900,
      fontSize: 18,
      color: colors.highWhite,
      marginBottom: spacing.xs,
    },
    slideSubtitle: {
      fontFamily: "Inter",
      fontSize: 9,
      color: "rgba(255,255,255,0.7)",
    },
    slideLogo: {
      position: "absolute",
      bottom: spacing.md,
      right: spacing.md,
    },
    // Social Post
    socialPost: {
      width: "100%",
      backgroundColor: colors.highWhite,
      borderWidth: 1,
      borderColor: colors.navy10,
      borderRadius: 4,
      overflow: "hidden",
    },
    socialPostHeader: {
      backgroundColor: colors.deepNavy,
      padding: spacing.sm,
    },
    socialPostContent: {
      padding: spacing.md,
    },
    socialPostText: {
      fontFamily: "Inter",
      fontSize: 9,
      color: colors.deepNavy,
      lineHeight: 1.5,
    },
    socialPostHighlight: {
      fontFamily: "Inter",
      fontWeight: 500,
      fontSize: 9,
      color: colors.deepNavy,
    },
  });

  return (
    <PageTemplate
      variant="light"
      pageNumber={10}
      totalPages={11}
      sectionTitle="Anwendungsbeispiele"
    >
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <Text style={styles.pageTitle}>Anwendung</Text>
          <Text style={styles.pageSubtitle}>
            Die folgenden Beispiele zeigen, wie das Corporate Design in
            verschiedenen Medien und Formaten konsistent angewendet wird.
          </Text>

          {/* Business Card */}
          <View style={styles.mockupItem}>
            <Text style={styles.mockupLabel}>Visitenkarte</Text>
            <View style={styles.businessCard}>
              <View style={styles.businessCardAccent} />
              <View style={styles.businessCardTop}>
                <Text style={styles.businessCardName}>WERNER STRAUCH</Text>
                <Text style={styles.businessCardTitle}>Der Stille Stratege</Text>
              </View>
              <View style={styles.businessCardBottom}>
                <Text style={styles.businessCardContact}>
                  werner@strauch.de{"\n"}
                  +49 123 456 789{"\n"}
                  strauch.de
                </Text>
              </View>
            </View>
          </View>

          {/* Email Signature */}
          <View style={styles.mockupItem}>
            <Text style={styles.mockupLabel}>E-Mail Signatur</Text>
            <View style={styles.emailSignature}>
              <Text style={styles.emailSignatureName}>Werner Strauch</Text>
              <Text style={styles.emailSignatureTitle}>
                E-Commerce System-Stratege
              </Text>
              <View style={styles.emailSignatureDivider} />
              <Text style={styles.emailSignatureContact}>
                werner@strauch.de | +49 123 456 789{"\n"}
                Profit-Klarheit durch System-Design
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.mockupGrid}>
            {/* LinkedIn Banner */}
            <View style={styles.mockupItem}>
              <Text style={styles.mockupLabel}>LinkedIn Banner</Text>
              <View style={styles.linkedInBanner}>
                <View style={styles.linkedInContent}>
                  <LogoCompact variant="light" />
                  <View style={styles.linkedInText}>
                    <Text style={styles.linkedInTagline}>Der Stille Stratege</Text>
                    <Text style={styles.linkedInStatement}>
                      Profit-Klarheit durch System-Design
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Social Post */}
            <View style={styles.mockupItem}>
              <Text style={styles.mockupLabel}>Social Post</Text>
              <View style={styles.socialPost}>
                <View style={styles.socialPostHeader}>
                  <LogoCompact variant="light" />
                </View>
                <View style={styles.socialPostContent}>
                  <Text style={styles.socialPostText}>
                    Design ohne Logik verbrennt Geld.
                  </Text>
                  <Text style={styles.socialPostHighlight}>
                    #ProfitKlarheit #SystemDesign
                  </Text>
                </View>
              </View>
            </View>

            {/* Presentation Slide */}
            <View style={[styles.mockupItem, { width: "100%" }]}>
              <Text style={styles.mockupLabel}>Präsentationsfolie</Text>
              <View style={styles.slide}>
                <View style={styles.slideAccentBar} />
                <Text style={styles.slideTitle}>Profit-Klarheit</Text>
                <Text style={styles.slideSubtitle}>
                  Wie Sie durch System-Design Ihre E-Commerce Marge um 23%
                  steigern
                </Text>
                <View style={styles.slideLogo}>
                  <LogoCompact variant="light" />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PageTemplate>
  );
};
