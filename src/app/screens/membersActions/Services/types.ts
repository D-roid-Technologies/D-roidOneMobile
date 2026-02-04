import { ReactNode } from "react";

export type ViewState =
  | "HOME"
  | "SOFTWARE_CLASSES"
  | "TECH_STACKS"
  | "TECH_DETAIL"
  | "TRAININGS"
  | "TRAINING_DETAIL"
  | "CONSULTING"
  | "CONSULTING_DETAIL"
  | "ANIMATION"
  | "ANIMATION_DETAIL";

export interface ServiceItem {
  id: string;
  key: string;
  title: string;
  description: string;
  fees?: string;
}

export interface ClassItem {
  id: string;
  category: TechCategoryKey;
  title: string;
  description: string;
  icon?: ReactNode;
}

export type TechCategoryKey =
  | "frontend"
  | "backend"
  | "cloud"
  | "crossPlatform";

export interface TechItem {
  id: string;
  category: TechCategoryKey;
  title: string;
  description: string;
  icon: ReactNode;
  bullets: string[];
  fees?: string;
}

export interface TrainingItem {
  id: string;
  program: string;
  title: string;
  description: string;
}

export interface ProgramDetail {
  id: string; // e.g., 'mobile_dev'
  title: string;
  subTitle: string;
  summary: string;
  duration: string;
  level: string;
  price: string;
  icon?: ReactNode;
  tools: string[];
  benefits: string[];
}

export interface ConsultingItem {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon?: ReactNode; // Added optional icon for consistency
  fees?: string; // Added optional fees for consistency
}

export interface StoryItem {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface CardItemBase {
  id: string;
  title: string;
  description: string;
}

export interface ServicesScreenProps {
  onOpenSayIt?: () => void;
  whatsappPhone?: string;
}

// --- Story Reader Types ---

export type Chapter = {
  id: number;
  title: string;
  content: string[]; // paragraphs
};

export type Story = {
  id: string;
  title: string;
  genre: string;
  runtime: string;
  releaseDate: string;
  rating?: string;
  views?: string;
  likes?: string;
  description: string;
  synopsis: string;
  themes: string[];
  chapters: Chapter[];
};
