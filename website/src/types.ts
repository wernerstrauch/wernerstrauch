export type SupportedLanguage = "de" | "en";
export type DomainId = "wernerstrauch";
export type SectionVariant = "white" | "light" | "dark" | "primary" | "gradient" | "transparent";
export type SectionPadding = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
export type HeaderVariant = "light" | "dark";

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface MegaMenuLink {
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

export interface MegaMenuSubcategory {
  title: string;
  href?: string;
  links: MegaMenuLink[];
}

export interface MegaMenuCategory {
  title: string;
  href: string;
  links?: MegaMenuLink[];
  subcategories?: MegaMenuSubcategory[];
  trustBadges?: {
    text: string;
    icon?: string;
  }[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  company: string;
  address: string[];
}

export interface SiteConfig {
  site: string;
  author: string;
  title: string;
  description: string;
  ogImage: string;
  logo: {
    src: string;
    alt: string;
  };
  favicon: string;
  contact: ContactInfo;
  navigation: {
    main: NavigationItem[];
    megaMenu?: MegaMenuCategory[];
  };
  socials: SocialLink[];
}
