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
 * Replace these with your real content from the web project.
 * The shapes match your ServicesItems flow, so you can paste data safely.
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

export const CLASSES: ClassItem[] = [
  {
    id: "cls_frontend",
    title: "Frontend Development",
    description: "UI engineering, design systems, performance, and quality.",
    category: "frontend",
  },
  {
    id: "cls_backend",
    title: "Backend Development",
    description: "APIs, authentication, reliability, and integrations.",
    category: "backend",
  },
  {
    id: "cls_cloud",
    title: "Database & Cloud",
    description: "Data modeling, cloud deployments, and observability.",
    category: "cloud",
  },
  {
    id: "cls_cross",
    title: "Cross-Platform App",
    description: "React Native, Expo, and mobile delivery at scale.",
    category: "crossPlatform",
  },
];

export const TECH_STACKS: Record<string, TechItem[]> = {
  frontend: [
    {
      id: "tech_react",
      category: "frontend",
      title: "React / Next.js",
      description:
        "Modern React architecture, routing, forms, state, data fetching, and scalable UI composition.",
      bullets: [
        "Component architecture and folder structure",
        "Forms + validation",
        "Server state (TanStack Query)",
        "Performance tuning and memoization",
      ],
    },
    {
      id: "tech_ui",
      category: "frontend",
      title: "UI Systems",
      description:
        "Design systems, reusable components, accessibility, responsive layout, and consistency.",
      bullets: ["Design tokens", "Accessibility (a11y)", "Responsive layouts"],
    },
  ],
  backend: [
    {
      id: "tech_node",
      category: "backend",
      title: "Node.js / NestJS",
      description:
        "Robust API design, guards, interceptors, queues, and service boundaries with clean architecture.",
      bullets: ["JWT + RBAC", "Validation pipes", "Queues (BullMQ)", "Testing"],
    },
    {
      id: "tech_prisma",
      category: "backend",
      title: "Prisma ORM",
      description:
        "Schema-first modeling, migrations, relational integrity, and performant queries.",
      bullets: ["Migrations", "Relations", "Indexes", "Transactions"],
    },
  ],
  cloud: [
    {
      id: "tech_postgres",
      category: "cloud",
      title: "PostgreSQL",
      description: "Relational modeling, indexing, optimization, and backups.",
      bullets: ["Indexes", "Query plans", "Backup/restore"],
    },
    {
      id: "tech_docker",
      category: "cloud",
      title: "Docker / Deployments",
      description: "Containerization, CI/CD, environments, and monitoring.",
      bullets: ["Dockerfiles", "GitHub Actions", "Environment config"],
    },
  ],
  crossPlatform: [
    {
      id: "tech_rn",
      category: "crossPlatform",
      title: "React Native / Expo",
      description:
        "Cross-platform mobile development with strong UX, offline support, and production delivery.",
      bullets: ["expo-router / navigation", "Device APIs", "Release builds"],
    },
  ],
};

export const TRAININGS: TrainingItem[] = [
  {
    id: "tr_frontend",
    title: "Frontend Developer Training",
    description:
      "Hands-on frontend training: React fundamentals to advanced architecture, with projects and mentorship.",
    program: "frontend",
    duration: "6–10 weeks",
    level: "Beginner → Intermediate",
  },
  {
    id: "tr_skill",
    title: "Skill Acquisition Training",
    description:
      "Practical skill acquisition training: structured learning, guided projects, and career preparation.",
    program: "skill",
    duration: "4–8 weeks",
    level: "All levels",
  },
];

export const CONSULTING: ConsultingItem[] = [
  {
    id: "c_product",
    title: "Product & Delivery Consulting",
    description:
      "Product strategy, MVP planning, user research, and delivery execution for startups and teams.",
    bullets: ["PRD/MVP definition", "Roadmap & execution", "Stakeholder alignment"],
  },
  {
    id: "c_engineering",
    title: "Engineering Consulting",
    description:
      "Architecture reviews, codebase audits, performance improvements, and team enablement.",
    bullets: ["Architecture review", "Code quality", "Performance & DX"],
  },
];

export const ANIMATION_ITEMS: CardItemBase[] = [
  {
    id: "story_1",
    title: "The First Voyage",
    description:
      "A short story about ambition, risk, and the discipline required to deliver.",
  },
  {
    id: "story_2",
    title: "The Builder's Oath",
    description:
      "A story about building systems that last — and making decisions under pressure.",
  },
];

export const STORIES: StoryItem[] = [
  {
    id: "story_1",
    title: "The First Voyage",
    description: "A short story about ambition, risk, and disciplined delivery.",
    content:
      "They said the ocean is unforgiving. He replied, “So is a deadline.”\n\nHe had two choices: ship a fragile system fast, or ship a resilient one on time. The work demanded both.\n\nHe learned that excellence is not a mood — it is a process.",
  },
  {
    id: "story_2",
    title: "The Builder's Oath",
    description: "A story about building systems that last.",
    content:
      "When the first users arrived, the system groaned. Not because it was weak, but because it was honest: it exposed every assumption.\n\nHe rewrote the brittle parts, documented the rest, and promised himself one thing: “Never optimize what you don’t understand.”",
  },
];
