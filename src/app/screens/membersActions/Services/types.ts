export type ServiceKey = "software" | "training" | "animation" | "consulting";

export type ViewState =
  | "HOME"
  | "SOFTWARE_CLASSES"
  | "TECH_STACKS"
  | "TECH_DETAIL"
  | "TRAININGS"
  | "TRAINING_DETAIL"
  | "ANIMATION"
  | "ANIMATION_DETAIL"
  | "CONSULTING"
  | "CONSULTING_DETAIL";

export type TechCategoryKey = "frontend" | "backend" | "cloud" | "crossPlatform";

export interface CardItemBase {
  id: string;
  title: string;
  description: string;
}

export interface ServiceItem extends CardItemBase {
  key: ServiceKey;
}

export interface ClassItem extends CardItemBase {
  category: TechCategoryKey;
}

export interface TechItem extends CardItemBase {
  category: TechCategoryKey;
  // Optional: list of bullet points for the detail page
  bullets?: string[];
}

export interface TrainingItem extends CardItemBase {
  program: "frontend" | "skill";
  duration?: string;
  level?: string;
}

export interface ConsultingItem extends CardItemBase {
  bullets?: string[];
}

export interface StoryItem extends CardItemBase {
  content: string;
}

export interface ServicesScreenProps {
  /**
   * Optional callback if you want to open your in-app "SayIt" modal.
   * If not provided, we will fall back to WhatsApp linking.
   */
  onOpenSayIt?: () => void;
  /**
   * Optional WhatsApp phone number in international format (no +), e.g. "2348012345678"
   * Used by the floating WhatsApp button.
   */
  whatsappPhone?: string;
}
