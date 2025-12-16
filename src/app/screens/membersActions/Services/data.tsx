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

export const CLASSES: ClassItem[] = [
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

export const TECH_STACKS: Record<string, TechItem[]> = {
  frontend: [
    {
      id: "tech_responsive",
      category: "frontend",
      title: "Responsive Web Design (Mobile-first)",
      description:
        "Responsive Web Design (Mobile-First) is a strategic front-end development methodology that places mobile usability at the core of the design process. At D’roid Technologies, we start by creating streamlined, performance-optimized layouts specifically for smaller screens—smartphones and other handheld devices—where clarity, speed, and intuitive interaction matter most. By focusing first on the mobile experience, we ensure that essential content, navigation, and functionality are easily accessible and visually engaging, even on the most constrained displays. This approach is rooted in modern digital behavior, where mobile browsing has overtaken desktop usage, and it aligns seamlessly with search engine standards, particularly Google’s mobile-first indexing, which prioritizes mobile-optimized sites in search rankings. As the user’s screen size increases—from mobile to tablet to desktop—the interface is progressively enhanced. This means additional features, layout refinements, and interactive elements are layered in to take advantage of the extra real estate, without compromising performance or usability. The result is a seamless, device-agnostic user experience—whether someone is accessing your site from a smartphone on the go or a large desktop monitor at the office. With mobile-first responsive design, D’roid Technologies delivers solutions that are not only future-ready but also aligned with user expectations, business goals, and the evolving standards of the web.",
      icon: <Layout color="#2667cc" size={24} />,
      bullets: ["Mobile usability core", "Streamlined layouts", "Google mobile-first indexing"],
    },
    {
      id: "tech_frameworks",
      category: "frontend",
      title: "React, Vue, Angular Development",
      description:
        "Our team excels in crafting robust, high-performance front-end solutions using modern JavaScript frameworks such as React, Vue, and Angular. Each framework serves a unique purpose—React offers unparalleled component reusability and flexibility for dynamic UIs, Vue provides a lightweight yet powerful approach to progressive enhancement, and Angular delivers enterprise-grade tooling and structure ideal for complex applications. We help clients choose the right framework based on their project needs, scalability requirements, and long-term maintainability goals. Our developers adhere to best practices such as component-based architecture, efficient state management, and modular code organization to ensure your frontend is fast, responsive, and future-ready.",
      icon: <Code color="#2667cc" size={24} />,
      bullets: ["React / Vue / Angular", "Component reusability", "Scalable architecture"],
    },
    {
      id: "tech_uiux",
      category: "frontend",
      title: "Custom UI/UX Implementation",
      description:
        "Custom UI/UX Implementation at D’roid Technologies focuses on translating unique brand identities and user needs into immersive, intuitive interfaces. Our team meticulously crafts visual and interactive elements that not only align with your business goals but also ensure fluid, user-centric experiences across all platforms. We integrate design systems, motion patterns, accessibility best practices, and performance optimizations into a seamless front-end build. Every pixel and interaction is tailored—from custom component libraries to dynamic theming—to reflect your brand’s personality while enhancing usability and engagement. The result is a digital experience that feels both elegant and effortless for every user.",
      icon: <PenTool color="#2667cc" size={24} />,
      bullets: ["Unique brand identity", "Immersive interfaces", "Design system integration"],
    },
    {
      id: "tech_perf",
      category: "frontend",
      title: "Performance Optimization",
      description:
        "Performance Optimization in front-end development is the strategic enhancement of a website or application’s speed, responsiveness, and overall efficiency to deliver a seamless user experience across all devices and networks. At D’roid Technologies, we focus on minimizing load times, reducing render-blocking resources, optimizing assets (such as images and scripts), leveraging caching, and implementing lazy loading. We utilize modern performance auditing tools like Google Lighthouse and Core Web Vitals to identify bottlenecks and continuously fine-tune the front-end architecture. By optimizing how data is fetched and rendered, and ensuring efficient use of client-side resources, we help clients retain users, improve SEO rankings, and increase overall engagement.",
      icon: <Zap color="#2667cc" size={24} />,
      bullets: ["Minimizing load times", "Core Web Vitals", "Optimization strategy"],
    },
    {
      id: "tech_api",
      category: "frontend",
      title: "API Integration & State Management",
      description:
        "At D'roid Technologies, API integration and state management are pivotal components of our front-end architecture. We seamlessly connect your front-end interfaces with powerful back-end services, third-party platforms, or internal APIs to ensure real-time data flow and interactivity. Using robust libraries like Redux, Zustand, or React Query, we manage application state with precision—delivering a smooth, responsive, and consistent user experience across all views. Our focus is on efficiency, scalability, and clean architecture, so your application not only looks great but performs reliably as it grows.",
      icon: <Webhook color="#2667cc" size={24} />,
      bullets: ["Real-time data flow", "Redux / Zustand / React Query", "Clean architecture"],
    },
    {
      id: "tech_cross_browser",
      category: "frontend",
      title: "Cross-Browser Compatibility",
      description:
        "Cross-Browser Compatibility ensures that your website or web application delivers a consistent, seamless experience across all major web browsers—such as Chrome, Firefox, Safari, Edge, and Opera—regardless of their rendering engines or version differences. At D’roid Technologies, we rigorously test our front-end code using real devices and modern automation tools to identify and fix inconsistencies in layout, functionality, and performance. We implement standardized best practices and polyfills where necessary to maintain visual integrity and interactivity across platforms. This attention to detail ensures that all users, regardless of browser preference, enjoy a high-quality and reliable interface.",
      icon: <Globe color="#2667cc" size={24} />,
      bullets: ["Consistent experience", "Rigorous testing", "Standardized best practices"],
    },
  ],
  backend: [
    {
      id: "tech_node_express",
      category: "backend",
      title: "Node.js & Express Development",
      description:
        "At D'roid Technologies, we specialize in building robust and scalable backend applications using Node.js and Express. Our team leverages the power of JavaScript on the server-side to create high-performance APIs, real-time applications, and microservices. We implement best practices in asynchronous programming, error handling, and middleware integration to ensure your backend is both powerful and maintainable. From RESTful APIs to WebSocket implementations, we create backend solutions that can handle high traffic loads while maintaining optimal performance.",
      icon: <Server color="#2667cc" size={24} />,
      bullets: ["High-performance APIs", "Real-time applications", "Microservices architecture"],
    },
    {
      id: "tech_python",
      category: "backend",
      title: "Python Backend Development",
      description:
        "Our Python backend development services harness the versatility and power of Python frameworks like Django and Flask to create sophisticated backend systems. We develop secure, scalable, and maintainable applications that can handle complex business logic, data processing, and API integrations. Whether you need a full-featured web application with Django's built-in admin interface or a lightweight API with Flask, our team ensures your Python backend is optimized for performance and security.",
      icon: <Code color="#2667cc" size={24} />,
      bullets: ["Django & Flask frameworks", "Complex business logic", "Scalable systems"],
    },
    {
      id: "tech_db_design",
      category: "backend",
      title: "Database Design & Optimization",
      description:
        "Database design and optimization is a critical component of our backend development services. We work with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases to create efficient data storage solutions. Our team focuses on proper schema design, query optimization, indexing strategies, and caching mechanisms to ensure your database performs optimally under any load. We implement best practices in data modeling, normalization, and security to protect your valuable information while maintaining fast access times.",
      icon: <Database color="#2667cc" size={24} />,
      bullets: ["SQL & NoSQL solutions", "Query optimization", "Secure data modeling"],
    },
    {
      id: "tech_api_dev",
      category: "backend",
      title: "API Development & Integration",
      description:
        "Our API development and integration services focus on creating robust, well-documented, and secure APIs that serve as the backbone of your application. We design RESTful and GraphQL APIs that follow industry best practices and standards. Our team ensures proper authentication, rate limiting, error handling, and versioning while maintaining comprehensive API documentation. We also specialize in integrating third-party APIs and services, ensuring seamless communication between different systems and platforms.",
      icon: <Webhook color="#2667cc" size={24} />,
      bullets: ["RESTful & GraphQL APIs", "Secure authentication", "Third-party integration"],
    },
    {
      id: "tech_cloud_infra",
      category: "backend",
      title: "Cloud Infrastructure & Deployment",
      description:
        "We provide comprehensive cloud infrastructure and deployment services using leading cloud providers like AWS, Azure, and Google Cloud. Our team designs scalable and resilient cloud architectures, implements containerization with Docker and Kubernetes, and sets up CI/CD pipelines for automated deployment. We ensure your backend services are properly configured for high availability, load balancing, and auto-scaling while maintaining security best practices and cost optimization.",
      icon: <Cloud color="#2667cc" size={24} />,
      bullets: ["AWS / Azure / GCP", "Docker & Kubernetes", "CI/CD pipelines"],
    },
    {
      id: "tech_security",
      category: "backend",
      title: "Security & Performance Optimization",
      description:
        "Security and performance optimization are fundamental to our backend development approach. We implement robust security measures including authentication, authorization, data encryption, and protection against common vulnerabilities. Our performance optimization strategies include code profiling, caching implementation, load balancing, and database query optimization. We conduct regular security audits and performance testing to ensure your backend remains secure and efficient as it scales.",
      icon: <ShieldCheck color="#2667cc" size={24} />,
      bullets: ["Robust security measures", "Performance auditing", "Scalable architecture"],
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
