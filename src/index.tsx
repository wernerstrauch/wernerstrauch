import React from "react";
import { Document, renderToFile } from "@react-pdf/renderer";
import path from "path";
import { fileURLToPath } from "url";

// Import theme to register fonts
import "./styles/theme";

// Import pages
import { CoverPage } from "./pages/CoverPage";
import { TableOfContents } from "./pages/TableOfContents";
import { BrandIntro } from "./pages/BrandIntro";
import { LogoPage } from "./pages/LogoPage";
import { ColorPalette } from "./pages/ColorPalette";
import { Typography } from "./pages/Typography";
import { Spacing } from "./pages/Spacing";
import { Applications } from "./pages/Applications";
import { DosAndDonts } from "./pages/DosAndDonts";
import { Communication } from "./pages/Communication";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Corporate Design Manual Document
const CorporateDesignManual: React.FC = () => {
  return (
    <Document
      title="Werner Strauch - Corporate Design Manual"
      author="Werner Strauch"
      subject="Corporate Design Guidelines"
      keywords="branding, corporate design, style guide"
      creator="Werner Strauch"
      producer="@react-pdf/renderer"
    >
      {/* Page 1: Cover */}
      <CoverPage />

      {/* Page 2: Table of Contents */}
      <TableOfContents />

      {/* Page 3: Brand Introduction */}
      <BrandIntro />

      {/* Page 4: Communication Framework */}
      <Communication />

      {/* Page 5: Logo Guidelines */}
      <LogoPage />

      {/* Page 5: Color Palette */}
      <ColorPalette />

      {/* Page 6: Typography */}
      <Typography />

      {/* Page 7: Spacing & Grid */}
      <Spacing />

      {/* Page 8: Applications */}
      <Applications />

      {/* Page 9: Do's & Don'ts */}
      <DosAndDonts />
    </Document>
  );
};

// Generate PDF
const outputPath = path.join(__dirname, "../output/corporate-design.pdf");

console.log("Generating Corporate Design Manual PDF...");
console.log(`Output: ${outputPath}`);

renderToFile(<CorporateDesignManual />, outputPath)
  .then(() => {
    console.log("✅ PDF generated successfully!");
    console.log(`📄 File saved to: ${outputPath}`);
  })
  .catch((error) => {
    console.error("❌ Error generating PDF:", error);
    process.exit(1);
  });
