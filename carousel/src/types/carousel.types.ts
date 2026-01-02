// Carousel Generator Types

export type SlideType =
  | 'hook'
  | 'content'
  | 'cta'
  | 'listicle-item'
  | 'framework-step'
  // Erweiterte Templates
  | 'quote'
  | 'comparison'
  | 'stat'
  | 'question'
  | 'tip'
  | 'myth-buster'
  | 'split'
  | 'highlight'
  | 'chapter'
  // Bild-Templates
  | 'image-left'
  | 'image-right'
  | 'image-top'
  | 'phone-mockup';

export type ColorMode = 'dark' | 'light' | 'mixed';

export type Platform = 'linkedin' | 'instagram';

export type TemplateName = 'hook-content-cta' | 'listicle' | 'story-framework';

export type GenerationMode = 'ai' | 'template';

export interface SlideConfig {
  index: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  bodyText?: string;
  number?: number;
  accentText?: string;
  showSwipeArrow: boolean;
  colorMode: 'dark' | 'light';
  // Neue Felder für erweiterte Templates
  quoteAuthor?: string;         // Für quote
  leftContent?: string;         // Für comparison/split
  rightContent?: string;        // Für comparison/split
  leftLabel?: string;           // "VORHER" / "DON'T"
  rightLabel?: string;          // "NACHHER" / "DO"
  mythText?: string;            // Durchgestrichener Text
  truthText?: string;           // Wahrheit darunter
  chapterNumber?: number;       // Kapitel-Nummer
  // Bild-Felder
  imagePath?: string;           // Relativer Pfad zu lokalem Bild
  imageUrl?: string;            // URL zu externem Bild
  imageBase64?: string;         // Base64-encoded Bild (für AI-generierte)
  imageAlt?: string;            // Alt-Text für Bild
  imagePosition?: 'left' | 'right' | 'top' | 'bottom' | 'background';
}

export interface CarouselTemplate {
  name: string;
  description: string;
  minSlides: number;
  maxSlides: number;
  generateSlideConfigs(topic: string, thoughts: string, slideCount: number, colorMode: ColorMode): SlideConfig[];
}

export interface GenerationOptions {
  mode: GenerationMode;
  platform: Platform;
  template: TemplateName;
  topic: string;
  thoughts: string;
  slideCount: number;
  colorMode: ColorMode;
  outputDir: string;
}

export interface FALImageResult {
  url: string;
  file_name: string;
  content_type: string;
}

export interface FALGenerationResponse {
  images: FALImageResult[];
  description?: string;
}

export interface GeneratedSlide {
  index: number;
  filename: string;
  path: string;
  type: SlideType;
}

export interface CarouselResult {
  slides: GeneratedSlide[];
  pdfPath?: string;
  outputDir: string;
  totalCost: number;
}

// Platform-specific settings
export const PLATFORM_SETTINGS = {
  linkedin: {
    width: 1080,
    height: 1080,
    aspectRatio: '1:1' as const,
    label: 'LinkedIn (1080x1080 square)'
  },
  instagram: {
    width: 1080,
    height: 1350,
    aspectRatio: '4:5' as const,
    label: 'Instagram (1080x1350, 4:5)'
  }
} as const;

// Cost per image (approximate)
export const COST_PER_IMAGE = {
  '1K': 0.15,
  '2K': 0.30,
  '4K': 0.60
} as const;
