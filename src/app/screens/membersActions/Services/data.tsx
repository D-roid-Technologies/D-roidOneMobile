import {
  MonitorSmartphone,
  Server,
  Database,
  Smartphone,
  Layout,
  Code,
  PenTool,
  Zap,
  Webhook,
  Globe,
  ArrowRight,
  Cloud,
  ShieldCheck,
} from "lucide-react-native";
import type {
  ServiceItem,
  ClassItem,
  TechItem,
  TrainingItem,
  ConsultingItem,
  StoryItem,
  CardItemBase,
} from "./types";

/**
 * NOTE:
 * Content updated based on user request.
 */

export const SERVICES: ServiceItem[] = [
  {
    id: "svc_software",
    key: "software",
    title: "Software Development",
    description:
      "Explore our software services by category (Frontend, Backend, Cloud, Cross-Platform) and view detailed tech stack offerings.",
  },
  {
    id: "svc_training",
    key: "training",
    title: "Training Programs",
    description:
      "Browse structured training programs and read detailed curriculum and delivery format before contacting us.",
  },
  {
    id: "svc_animation",
    key: "animation",
    title: "Animation / Short Stories",
    description:
      "Browse animation and short story catalog and open story details for reading.",
  },
  {
    id: "svc_consulting",
    key: "consulting",
    title: "Consulting",
    description:
      "Get expert guidance across product, engineering, and execution. Tap an item to view details and contact.",
  },
];

export const STORIES: StoryItem[] = [
  {
    id: "brothers",
    title: "Brothers",
    description: "A story of loyalty and courage among siblings.",
    content:
      "In a world where bonds are tested, two brothers stand against the odds. Through trials and tribulations, they discover that blood is thicker than water, but loyalty is the strongest force of all.\n\nJoin them on their journey of self-discovery, sacrifice, and the unyielding power of brotherhood.",
  },
  {
    id: "cityBoys",
    title: "Cityboy",
    description: "An animated journey of a boy discovering life in a bustling city.",
    content:
      "Lost in the neon lights and towering skyscrapers, a young boy navigates the complexities of urban life. Every corner holds a new secret, every interaction a lesson.\n\nFrom the underground subways to the rooftop gardens, 'Cityboy' explores the rhythm of the city and finding one's place within the chaos.",
  },
  {
    id: "resilience",
    title: "Resilience",
    description: "An inspiring tale of bouncing back after life’s challenges.",
    content:
      "Fall down seven times, stand up eight. This is the story of a protagonist who faces insurmountable failures yet refuses to give in.\n\nIt is a testament to the human spirit—a reminder that our greatest glory is not in never falling, but in rising every time we fall.",
  },
  {
    id: "warriors",
    title: "Warriors",
    description: "Animated chronicles of warriors defending honor and justice.",
    content:
      "In an ancient land, a band of warriors unites to protect the innocent. With steel in hand and courage in their hearts, they face a darkness that threatens to consume their world.\n\nEpic battles, legendary feats, and the timeless struggle between good and evil await in this action-packed saga.",
  },
];
