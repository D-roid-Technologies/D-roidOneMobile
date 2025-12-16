import React, { ReactNode } from "react";
import {
  Presentation,
  Handshake,
  Code,
  Users,
  Clock,
  Award,
  MessageCircle,
} from "lucide-react-native";
import { TrainingItem } from "../types";

export interface TrainingProgram {
  id: string;
  icon: ReactNode;
  title: string;
  subTitle: string;
  summary: string;
  duration: string;
  level: string;
  price: string[];
  tools: string[];
  benefits: string[];
}

export const trainingList: TrainingItem[] = [
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

export const trainingPrograms: TrainingProgram[] = [
  {
    id: "frontend",
    icon: <Code color="#2667cc" size={24} />,
    title: "Frontend Developer Training",
    subTitle:
      "Master the art of building stunning, responsive web interfaces from scratch",
    summary:
      "A practical, project-based training program designed to equip you with the core skills and tools needed for modern frontend development using HTML, CSS, JavaScript, and popular frameworks like React.",
    duration: "24 weeks",
    level: "Beginner to Intermediate",
    price: ["Self Paced Track: ₦689,599.00", "Instructor-led track: ₦1,370,299.00"],
    tools: [
      "HTML5 / CSS3 / JavaScript (ES6+)",
      "Git & GitHub",
      "Visual Studio Code",
      "Chrome DevTools",
      "React.js",
      "Tailwind CSS",
    ],
    benefits: [
      "Learn in-demand frontend skills from industry professionals",
      "Build a job-ready portfolio with real projects",
      "Flexible learning: study at your own pace",
      "Access to community support and mentorship",
      "Certificate of completion to showcase your skills",
    ],
  },
  {
    id: "skill",
    icon: <Handshake color="#2667cc" size={24} />,
    title: "Skill Acquisition Training",
    subTitle:
      "Empowering individuals with high-value digital skills for the modern economy",
    summary:
      "Hands-on training in digital skills like UI/UX design, animation, and product design to empower individuals with employable tech expertise. Whether you're starting fresh or upskilling, this program is designed for you.",
    duration: "12 - 24 weeks",
    level: "All Levels",
    price: ["Contact for Pricing"],
    tools: [
      "Figma",
      "Adobe XD",
      "Blender",
      "After Effects",
      "Protopie",
    ],
    benefits: [
      "Master industry-standard design tools",
      "Create a professional portfolio",
      "Mentorship from experienced designers",
      "Real-world project experience",
      "Career guidance and networking",
    ],
  },
];