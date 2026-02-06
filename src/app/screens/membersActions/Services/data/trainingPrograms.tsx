import React, { ReactNode } from "react";
import {
  Presentation,
  Handshake,
  Code,
  Users,
  Clock,
  Award,
  MessageCircle,
  Zap,
  Layers,
  Rocket,
  Palette,
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

export const trainingList: any[] = [
  {
    id: "tr_frontend",
    title: "Frontend Developer Training",
    description:
      "Master modern frontend development from ground zero to job-ready professional. Build responsive, interactive web applications using HTML, CSS, JavaScript, and React with real-world projects and expert mentorship.",
    program: "frontend",
    duration: "24 weeks",
    level: "Beginner → Intermediate",
  },
  {
    id: "tr_software_engineering",
    title: "Software Engineering Training",
    description:
      "Become a full-stack software engineer. Learn frontend, backend, databases, cloud deployment, and DevOps. Master the complete development lifecycle with production-grade projects and architectural best practices.",
    program: "software-engineering",
    duration: "32 weeks",
    level: "Intermediate → Advanced",
  },
  {
    id: "tr_html_css",
    title: "Vanilla HTML & CSS Training",
    description:
      "Build the perfect foundation for web development. Master semantic HTML5, modern CSS techniques, Flexbox, Grid, animations, and responsive design—no frameworks needed, just pure web fundamentals.",
    program: "html-css",
    duration: "12 weeks",
    level: "Beginner",
  },
  {
    id: "tr_javascript",
    title: "JavaScript Development Training",
    description:
      "Learn the language that powers the modern web. From basics to advanced ES6+ features, DOM manipulation, async programming, and API integration. Bridge the gap between static pages and dynamic applications.",
    program: "javascript",
    duration: "16 weeks",
    level: "Beginner → Intermediate",
  },
  {
    id: "tr_skill_acquisition",
    title: "Skill Acquisition Training",
    description:
      "Transform your career with high-value digital skills. Choose from UI/UX design, motion graphics, product design, or digital marketing. Build a professional portfolio and unlock global opportunities.",
    program: "skill-acquisition",
    duration: "12–24 weeks",
    level: "All levels",
  },
  // {
  //   id: "tr_frontend",
  //   title: "Frontend Developer Training",
  //   description:
  //     "Hands-on frontend training: React fundamentals to advanced architecture, with projects and mentorship.",
  //   program: "frontend",
  //   duration: "6–10 weeks",
  //   level: "Beginner → Intermediate",
  // },
  // {
  //   id: "tr_skill",
  //   title: "Skill Acquisition Training",
  //   description:
  //     "Practical skill acquisition training: structured learning, guided projects, and career preparation.",
  //   program: "skill",
  //   duration: "4–8 weeks",
  //   level: "All levels",
  // },
];

export const trainingPrograms: TrainingProgram[] = [
  // {
  //   id: "frontend",
  //   icon: <Code color="#2667cc" size={24} />,
  //   title: "Frontend Developer Training",
  //   subTitle:
  //     "Master the art of building stunning, responsive web interfaces from scratch",
  //   summary:
  //     "A practical, project-based training program designed to equip you with the core skills and tools needed for modern frontend development using HTML, CSS, JavaScript, and popular frameworks like React.",
  //   duration: "24 weeks",
  //   level: "Beginner to Intermediate",
  //   price: ["Self Paced Track: ₦689,599.00", "Instructor-led track: ₦1,370,299.00"],
  //   tools: [
  //     "HTML5 / CSS3 / JavaScript (ES6+)",
  //     "Git & GitHub",
  //     "Visual Studio Code",
  //     "Chrome DevTools",
  //     "React.js",
  //     "Tailwind CSS",
  //   ],
  //   benefits: [
  //     "Learn in-demand frontend skills from industry professionals",
  //     "Build a job-ready portfolio with real projects",
  //     "Flexible learning: study at your own pace",
  //     "Access to community support and mentorship",
  //     "Certificate of completion to showcase your skills",
  //   ],
  // },
  // {
  //   id: "skill",
  //   icon: <Handshake color="#2667cc" size={24} />,
  //   title: "Skill Acquisition Training",
  //   subTitle:
  //     "Empowering individuals with high-value digital skills for the modern economy",
  //   summary:
  //     "Hands-on training in digital skills like UI/UX design, animation, and product design to empower individuals with employable tech expertise. Whether you're starting fresh or upskilling, this program is designed for you.",
  //   duration: "12 - 24 weeks",
  //   level: "All Levels",
  //   price: ["Contact for Pricing"],
  //   tools: [
  //     "Figma",
  //     "Adobe XD",
  //     "Blender",
  //     "After Effects",
  //     "Protopie",
  //   ],
  //   benefits: [
  //     "Master industry-standard design tools",
  //     "Create a professional portfolio",
  //     "Mentorship from experienced designers",
  //     "Real-world project experience",
  //     "Career guidance and networking",
  //   ],
  // },
  {
    id: "frontend",
    icon: <Palette color="#2667cc" size={24} />,
    title: "Frontend Developer Training",
    subTitle:
      "Transform ideas into pixel-perfect, interactive experiences users love",
    summary:
      "Launch your career as a frontend developer with our intensive, hands-on program. Master HTML, CSS, JavaScript, and React while building real-world projects that showcase your skills. From responsive layouts to dynamic web applications, you'll learn the complete frontend stack used by top tech companies worldwide.",
    duration: "24 weeks",
    level: "Beginner to Intermediate",
    price: [
      "Self Paced Track: ₦689,599.00",
      "Instructor-led track: ₦1,370,299.00",
    ],
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
      "Build a job-ready portfolio with 5+ real projects",
      "Flexible learning: self-paced or instructor-led tracks",
      "Access to community support and 1-on-1 mentorship",
      "Industry-recognized certificate of completion",
    ],
  },
  {
    id: "software-engineering",
    icon: <Rocket color="#2667cc" size={24} />,
    title: "Software Engineering Training",
    subTitle:
      "Build, deploy, and scale full-stack applications like a professional engineer",
    summary:
      "Become a versatile software engineer with our comprehensive full-stack program. From frontend interfaces to backend APIs, databases, cloud deployment, and DevOps practices—you'll master the entire software development lifecycle. Learn industry best practices, design patterns, testing, and collaboration workflows used by engineering teams at leading tech companies.",
    duration: "32 weeks",
    level: "Intermediate to Advanced",
    price: [
      "Self Paced Track: ₦989,799.00",
      "Instructor-led track: ₦1,870,499.00",
    ],
    tools: [
      "React.js / Node.js",
      "Python / Django",
      "PostgreSQL / MongoDB",
      "Docker & Kubernetes",
      "AWS / Firebase",
      "Git & CI/CD Pipelines",
    ],
    benefits: [
      "Master both frontend and backend development",
      "Deploy production-ready applications to the cloud",
      "Learn system design and software architecture",
      "Develop critical thinking and problem-solving skills",
      "Practice coding challenges and algorithm optimization",
      "Technical interview preparation and mock coding interviews",
      "Collaborative coding with Git and team workflows",
      "Career placement support and job search guidance",
    ],
  },
  {
    id: "html-css",
    icon: <Layers color="#2667cc" size={24} />,
    title: "Vanilla HTML & CSS Training",
    subTitle:
      "Master the foundation of the web—build beautiful, responsive sites from scratch",
    summary:
      "Start your web development journey with the essential building blocks of the internet. This beginner-friendly program teaches you clean, semantic HTML and modern CSS techniques including Flexbox, Grid, animations, and responsive design. No frameworks, no distractions—just pure, powerful web fundamentals that will serve you for life.",
    duration: "12 weeks",
    level: "Beginner",
    price: [
      "Self Paced Track: ₦389,299.00",
      "Instructor-led track: ₦670,199.00",
    ],
    tools: [
      "HTML5 Semantic Elements",
      "CSS3 & Modern Layouts",
      "Flexbox & Grid",
      "CSS Animations",
      "Visual Studio Code",
      "Chrome DevTools",
    ],
    benefits: [
      "Build stunning websites without frameworks",
      "Understand web standards and accessibility",
      "Create responsive designs for any device",
      "Fast-loading, SEO-friendly web pages",
      "Solid foundation for learning JavaScript and frameworks",
    ],
  },
  {
    id: "javascript",
    icon: <Zap color="#2667cc" size={24} />,
    title: "JavaScript Development Training",
    subTitle:
      "Bring the web to life—master the language that powers modern interactivity",
    summary:
      "Dive deep into JavaScript, the programming language of the web. From fundamentals to advanced concepts like asynchronous programming, DOM manipulation, API integration, and ES6+ features—you'll gain the skills to create dynamic, interactive web experiences. This program bridges the gap between static websites and full-fledged web applications.",
    duration: "16 weeks",
    level: "Beginner to Intermediate",
    price: [
      "Self Paced Track: ₦489,499.00",
      "Instructor-led track: ₦870,299.00",
    ],
    tools: [
      "JavaScript ES6+",
      "DOM Manipulation",
      "Fetch API & Async/Await",
      "NPM & Module Bundlers",
      "Visual Studio Code",
      "Browser DevTools & Debugging",
    ],
    benefits: [
      "Master JavaScript from basics to advanced concepts",
      "Build interactive web applications and games",
      "Understand asynchronous programming and APIs",
      "Prepare for learning React, Vue, or Angular",
      "Real-world projects including API integrations",
    ],
  },
  {
    id: "skill-acquisition",
    icon: <Award color="#2667cc" size={24} />,
    title: "Skill Acquisition Training",
    subTitle: "Unlock high-income digital skills and future-proof your career",
    summary:
      "Empower yourself with in-demand digital skills that open doors to remote work, freelancing, and global opportunities. Choose from UI/UX design, motion graphics, product design, digital marketing, or video editing. Our practical, project-based approach ensures you gain employable skills and build a professional portfolio that stands out to employers and clients.",
    duration: "12 - 24 weeks (varies by track)",
    level: "All Levels",
    price: ["Contact for Pricing"],
    tools: [
      "Figma / Adobe XD",
      "Blender / After Effects",
      "Protopie / Principle",
      "Photoshop / Illustrator",
      "Premiere Pro / DaVinci Resolve",
      "Google Analytics / SEO Tools",
    ],
    benefits: [
      "Choose from multiple high-demand skill tracks",
      "Create a professional portfolio that gets you hired",
      "Learn from industry practitioners and mentors",
      "Flexible payment plans and scholarship opportunities",
      "Career guidance, freelancing tips, and job placement support",
    ],
  },
];
