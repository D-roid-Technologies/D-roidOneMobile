import { MonitorSmartphone, Server, Database, Smartphone } from "lucide-react-native";
import { ClassItem } from "../types";

export const classes: ClassItem[] = [
  {
    id: "cls_frontend",
    title: "Frontend Development",
    description: "Modern, responsive UIs using React, TypeScript, and Tailwind CSS.",
    category: "frontend",
    icon: <MonitorSmartphone color="#2667cc" size={24} />,
  },
  {
    id: "cls_backend",
    title: "Backend Development",
    description: "Powerful APIs and logic using Node.js, Express, Python, and more.",
    category: "backend",
    icon: <Server color="#2667cc" size={24} />,
  },
  {
    id: "cls_cloud",
    title: "Database & Cloud",
    description: "Robust data solutions with MySQL, MongoDB, Firebase, and scalable cloud architecture.",
    category: "cloud",
    icon: <Database color="#2667cc" size={24} />,
  },
  {
    id: "cls_cross",
    title: "Cross-Platform App",
    description: "React Native & hybrid mobile solutions to reach iOS and Android users seamlessly.",
    category: "crossPlatform",
    icon: <Smartphone color="#2667cc" size={24} />,
  },
];
