import {
  ClipboardCheck,
  DraftingCompass,
  Server,
  ShieldCheck,
  Activity,
  Code,
} from "lucide-react-native";

export const consultingItems = [
  {
    id: "consulting_eval",
    icon: <ClipboardCheck color="#2667cc" size={24} />,
    title: "Tech Stack Evaluation & Recommendation",
    description:
      "We conduct deep-dive audits of your existing technology landscape, analyzing performance metrics, cost efficiency, and future scalability. Our experts provide actionable recommendations with ROI projections, migration timelines, and risk assessments.",
    bullets: [
      "Deep-dive technology audits",
      "Performance & cost analysis",
      "Actionable ROI projections",
      "Migration strategies",
    ],
  },
  {
    id: "consulting_roadmap",
    icon: <DraftingCompass color="#2667cc" size={24} />,
    title: "Digital Transformation Roadmapping",
    description:
      "We craft comprehensive digital transformation strategies that align cutting-edge technology with your business objectives. From legacy system modernization to cloud migration and process automation.",
    bullets: [
      "Legacy system modernization",
      "Cloud migration planning",
      "Process automation",
      "Business objective alignment",
    ],
  },
  {
    id: "consulting_cto",
    icon: <Server color="#2667cc" size={24} />,
    title: "CTO-as-a-Service for Startups",
    description:
      "Access seasoned technical leadership without the full-time commitment. Our fractional CTOs bring 15+ years of experience scaling startups from MVP to IPO.",
    bullets: [
      "Fractional technical leadership",
      "MVP to IPO scaling expertise",
      "Team structure & hiring",
      "Technical architecture review",
    ],
  },
  {
    id: "consulting_security",
    icon: <ShieldCheck color="#2667cc" size={24} />,
    title: "Security & Infrastructure Review",
    description:
      "We perform a thorough audit of your infrastructure, identifying vulnerabilities and offering remediation strategies for long-term resilience.",
    bullets: [
      "Infrastructure vulnerability audit",
      "Remediation strategies",
      "Long-term resilience planning",
      "Compliance readiness",
    ],
  },
  {
    id: "consulting_perf",
    icon: <Activity color="#2667cc" size={24} />,
    title: "Scalability & Performance Optimization",
    description:
      "Our cybersecurity experts perform comprehensive penetration testing, vulnerability assessments, and compliance audits across your entire digital infrastructure.",
    bullets: [
      "Penetration testing",
      "Vulnerability assessment",
      "Digital infrastructure audit",
      "Performance tuning",
    ],
  },
  {
    id: "consulting_arch",
    icon: <Code color="#2667cc" size={24} />,
    title: "Custom Software Strategy & Architecture",
    description:
      "We design enterprise-grade software architectures tailored to your unique business processes and growth projections. From microservices and API-first designs to event-driven architectures.",
    bullets: [
      "Enterprise software architecture",
      "Microservices design",
      "API-first strategy",
      "Event-driven architecture",
    ],
  },
];