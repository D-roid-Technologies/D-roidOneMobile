import {
  Layout,
  Code,
  PenTool,
  Zap,
  Webhook,
  Globe,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Activity,
  HardDrive,
  Coins,
  Atom,
  Layers,
  Puzzle,
  Smartphone,
} from "lucide-react-native";
import { TechItem } from "../types";

export const techStacks: Record<string, TechItem[]> = {
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
      id: "tech_db_arch",
      category: "cloud",
      title: "Database Design & Architecture",
      description:
        "At D'roid Technologies, we specialize in designing and implementing robust database architectures that form the foundation of your data infrastructure. Our team works with both SQL (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases to create efficient, scalable, and secure data storage solutions. We focus on proper schema design, normalization, indexing strategies, and data modeling to ensure optimal performance and data integrity.",
      icon: <Server color="#2667cc" size={24} />,
      bullets: ["SQL & NoSQL expertise", "Schema normalization", "Data integrity"],
    },
    {
      id: "tech_cloud_mig",
      category: "cloud",
      title: "Cloud Infrastructure & Migration",
      description:
        "Our cloud infrastructure and migration services help businesses transition to and optimize their cloud presence. We work with leading cloud providers like AWS, Azure, and Google Cloud to design scalable, secure, and cost-effective cloud architectures. Our team handles everything from initial cloud strategy and migration planning to implementation and ongoing optimization.",
      icon: <Cloud color="#2667cc" size={24} />,
      bullets: ["AWS / Azure / GCP", "Migration planning", "Cost-effective architecture"],
    },
    {
      id: "tech_db_perf",
      category: "cloud",
      title: "Database Performance Optimization",
      description:
        "Database performance optimization is crucial for maintaining fast and efficient data operations. Our team specializes in identifying and resolving performance bottlenecks through query optimization, index tuning, and caching strategies. We implement advanced techniques like query optimization, connection pooling, and database sharding.",
      icon: <Activity color="#2667cc" size={24} />,
      bullets: ["Query optimization", "Index tuning", "Database sharding"],
    },
    {
      id: "tech_cloud_sec",
      category: "cloud",
      title: "Cloud Security & Compliance",
      description:
        "Security and compliance are paramount in cloud environments. Our team implements comprehensive security measures including encryption, access control, and threat detection systems. We ensure compliance with industry standards and regulations like GDPR, HIPAA, and SOC 2.",
      icon: <ShieldCheck color="#2667cc" size={24} />,
      bullets: ["Encryption & Access Control", "Threat detection", "GDPR / HIPAA / SOC 2"],
    },
    {
      id: "tech_db_backup",
      category: "cloud",
      title: "Database Backup & Recovery",
      description:
        "Reliable backup and recovery solutions are essential for business continuity. We design and implement comprehensive backup strategies that ensure your data is protected against loss or corruption. Our solutions include automated backup scheduling, point-in-time recovery capabilities, and disaster recovery planning.",
      icon: <HardDrive color="#2667cc" size={24} />,
      bullets: ["Automated backups", "Disaster recovery", "Point-in-time recovery"],
    },
    {
      id: "tech_cloud_cost",
      category: "cloud",
      title: "Cloud Cost Optimization",
      description:
        "Cloud cost optimization is crucial for maintaining an efficient and cost-effective cloud infrastructure. Our team analyzes your cloud usage patterns and implements strategies to optimize costs without compromising performance. We focus on resource right-sizing, reserved instance planning, and implementing auto-scaling solutions.",
      icon: <Coins color="#2667cc" size={24} />,
      bullets: ["Resource right-sizing", "Auto-scaling", "Cost analysis"],
    },
  ],
  crossPlatform: [
    {
      id: "tech_rn",
      category: "crossPlatform",
      title: "React Native Development",
      description:
        "At D'roid Technologies, we specialize in building high-performance cross-platform mobile applications using React Native. Our team leverages the power of JavaScript and React to create native-like experiences for both iOS and Android platforms. We implement best practices in component architecture, state management, and performance optimization.",
      icon: <Atom color="#2667cc" size={24} />,
      bullets: ["iOS & Android support", "Native-like experience", "Shared codebase"],
    },
    {
      id: "tech_flutter",
      category: "crossPlatform",
      title: "Flutter Development",
      description:
        "Our Flutter development services harness the power of Dart to create beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. We leverage Flutter's rich widget library and hot reload feature to rapidly develop and iterate on your application.",
      icon: <Smartphone color="#2667cc" size={24} />,
      bullets: ["Dart language", "Beautiful widgets", "Multi-platform compilation"],
    },
    {
      id: "tech_hybrid",
      category: "crossPlatform",
      title: "Hybrid App Development",
      description:
        "Our hybrid app development approach combines the best of web and native technologies to create efficient, cost-effective mobile solutions. Using frameworks like Ionic or Capacitor, we build applications that can be deployed across multiple platforms while maintaining access to native device features.",
      icon: <Layers color="#2667cc" size={24} />,
      bullets: ["Ionic / Capacitor", "Web technologies", "Cost-effective"],
    },
    {
      id: "tech_uiux_cross",
      category: "crossPlatform",
      title: "Cross-Platform UI/UX Design",
      description:
        "Cross-platform UI/UX design is crucial for delivering consistent, engaging user experiences across different devices and platforms. Our team creates adaptive design systems that maintain visual consistency while respecting platform-specific design guidelines.",
      icon: <PenTool color="#2667cc" size={24} />,
      bullets: ["Adaptive design", "Platform guidelines", "Visual consistency"],
    },
    {
      id: "tech_native_mod",
      category: "crossPlatform",
      title: "Native Module Integration",
      description:
        "Native module integration is essential for accessing platform-specific features and optimizing performance. Our team specializes in bridging the gap between cross-platform code and native functionality. We develop custom native modules for features like camera access, push notifications, and biometrics.",
      icon: <Puzzle color="#2667cc" size={24} />,
      bullets: ["Camera & Push Notifications", "Biometrics", "Native bridging"],
    },
    {
      id: "tech_perf_cross",
      category: "crossPlatform",
      title: "Performance Optimization",
      description:
        "Performance optimization is critical for delivering smooth, responsive cross-platform applications. Our team implements advanced optimization techniques including lazy loading, memory management, and efficient state handling. We focus on reducing bundle size and optimizing asset loading.",
      icon: <Zap color="#2667cc" size={24} />,
      bullets: ["Lazy loading", "Memory management", "Bundle size reduction"],
    },
  ],
};
