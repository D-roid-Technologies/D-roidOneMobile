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
  Atom,
  Layers,
  Puzzle,
  Smartphone,
  FileText,
  Sparkles,
  Shield,
} from "lucide-react-native";
import { TechItem } from "../types";

export const techStacks: Record<string, TechItem[]> = {
  frontend: [
    {
      id: "tech_vanilla",
      category: "frontend",
      title: "Vanilla HTML, CSS and JavaScript",
      description:
        "At D'roid Technologies, we recognize that not every project requires the overhead of a complex framework. Vanilla HTML, CSS, and JavaScript offer a lean, performant foundation for building fast-loading, standards-compliant websites with minimal dependencies. This approach is ideal for landing pages, portfolios, marketing sites, and projects where simplicity, speed, and full control over the codebase are paramount. By writing clean, semantic HTML, we ensure accessibility and SEO-friendliness from the ground up. Our CSS is structured using modern techniques like Flexbox, Grid, and custom properties, enabling responsive, maintainable styling without external libraries. With native JavaScript, we deliver interactive experiences—form validation, animations, DOM manipulation—without the bloat of third-party packages. This results in faster page loads, improved Core Web Vitals, and a codebase that's easy to understand, debug, and extend. Vanilla development also gives you complete ownership of your code, free from framework lock-in or version conflicts, making it a timeless, future-proof choice for web projects that prioritize performance and clarity.",
      icon: <Zap color="#2667cc" size={24} />,
      bullets: [
        "Lightweight & fast",
        "No framework dependencies",
        "Full control & flexibility",
      ],
    },
    {
      id: "tech_react",
      category: "frontend",
      title: "React Js Development",
      description:
        "React Js has become the gold standard for building modern, dynamic, and highly interactive user interfaces, and at D'roid Technologies, we harness its full potential to deliver scalable, component-driven web applications. React's declarative approach simplifies the development of complex UIs by breaking them into reusable, self-contained components that manage their own state and lifecycle. This modular architecture not only accelerates development but also ensures consistency, maintainability, and testability across your entire application. We leverage React's virtual DOM for lightning-fast rendering, minimizing costly browser reflows and repaints to deliver smooth, responsive user experiences even in data-heavy applications. Our React solutions integrate seamlessly with modern tools and libraries—Redux or Context API for state management, React Router for navigation, and Next.js for server-side rendering and static site generation when SEO and performance are critical. Whether you're building a single-page application, an e-commerce platform, or a feature-rich enterprise dashboard, our React expertise ensures your project is built with best practices, optimized for performance, and ready to scale as your business grows.",
      icon: <Atom color="#2667cc" size={24} />,
      bullets: [
        "Component-driven architecture",
        "Virtual DOM performance",
        "Scalable & maintainable",
      ],
    },
    {
      id: "tech_vue",
      category: "frontend",
      title: "Vue.js Development",
      description:
        "Vue.js stands out as a progressive, approachable, and highly versatile JavaScript framework that strikes the perfect balance between simplicity and power. At D'roid Technologies, we leverage Vue.js to build elegant, performant web applications that are both developer-friendly and user-centric. Vue's gentle learning curve and intuitive API make it an excellent choice for projects of all sizes—from enhancing existing applications with reactive components to building full-scale single-page applications from scratch. Its reactive data binding and component-based architecture enable us to create dynamic, maintainable interfaces with minimal boilerplate code. Vue's ecosystem includes powerful tools like Vue Router for seamless navigation, Vuex or Pinia for centralized state management, and Nuxt.js for server-side rendering and static site generation, ensuring optimal SEO and performance. The framework's flexibility allows for incremental adoption—you can integrate Vue into legacy projects gradually or use it as the foundation for entirely new applications. With excellent documentation, strong community support, and performance that rivals or exceeds other major frameworks, Vue.js enables D'roid Technologies to deliver applications that are fast, interactive, and built to evolve with your business needs.",
      icon: <Sparkles color="#2667cc" size={24} />,
      bullets: [
        "Progressive framework",
        "Reactive data binding",
        "Flexible & performant",
      ],
    },
    {
      id: "tech_angular",
      category: "frontend",
      title: "Angular Development",
      description:
        "Angular is a comprehensive, enterprise-grade framework developed and maintained by Google, designed to build large-scale, feature-rich web applications with robust architecture and long-term maintainability. At D'roid Technologies, we harness Angular's full-stack capabilities to deliver powerful, scalable solutions for complex business requirements. Angular's opinionated structure provides a complete development ecosystem out of the box—including dependency injection, two-way data binding, a powerful CLI, built-in routing, form handling, HTTP client, and testing utilities—ensuring consistency and reducing decision fatigue. This makes it particularly well-suited for enterprise applications where standardization, team collaboration, and code quality are paramount. Angular's TypeScript foundation brings strong typing, enhanced IDE support, and early error detection, resulting in more reliable, maintainable code. We leverage Angular's modular architecture to build applications that are organized into feature modules, enabling lazy loading and efficient code splitting for optimal performance. With RxJS integration for reactive programming, Angular excels at handling complex asynchronous operations and real-time data streams. Whether you're building internal business tools, customer-facing portals, or data-intensive dashboards, D'roid Technologies delivers Angular solutions that are structured, testable, and built to scale with your organization's growth.",
      icon: <Shield color="#2667cc" size={24} />,
      bullets: [
        "Enterprise-grade framework",
        "TypeScript & dependency injection",
        "Complete ecosystem & tooling",
      ],
    },
    {
      id: "tech_cms",
      category: "frontend",
      title: "CMS Integration & Development",
      description:
        "Content Management Systems (CMS) empower businesses to take control of their digital presence without needing deep technical expertise. At D'roid Technologies, we specialize in integrating and customizing leading CMS platforms—WordPress, Webflow, Contentful, Strapi, Sanity, and more—to deliver flexible, user-friendly content management solutions tailored to your needs. Whether you require a traditional monolithic CMS or a modern headless CMS architecture, we design systems that allow your team to create, edit, and publish content effortlessly while maintaining pixel-perfect design and robust functionality on the frontend. Headless CMS solutions, in particular, offer unmatched flexibility by decoupling content management from presentation, enabling you to deliver consistent content across websites, mobile apps, and IoT devices through APIs. We handle everything from initial setup and theme customization to plugin development, workflow automation, and multi-language support. Our CMS implementations are optimized for performance, security, and SEO, ensuring your content reaches your audience quickly and ranks well in search engines. With D'roid Technologies, you get a CMS solution that grows with your business and puts content creation power directly in your hands.",
      icon: <FileText color="#2667cc" size={24} />,
      bullets: [
        "WordPress / Headless CMS",
        "Content workflow automation",
        "SEO & performance optimized",
      ],
    },
    {
      id: "tech_api",
      category: "frontend",
      title: "API Integration ",
      description:
        "Modern web applications thrive on connectivity—pulling data from multiple sources, communicating with backend services, and integrating third-party platforms to deliver rich, dynamic experiences. At D'roid Technologies, we excel in seamless API integration, connecting your frontend applications with RESTful APIs, GraphQL endpoints, and external services to enable real-time data exchange and powerful functionality. Whether it's integrating payment gateways like Stripe or PayPal, connecting to CRM systems like Salesforce or HubSpot, pulling analytics from Google or social media platforms, or consuming custom backend APIs, we ensure secure, efficient, and reliable communication between your application and external data sources. We implement robust error handling, caching strategies, and data normalization to optimize performance and provide users with a smooth experience even when dealing with large datasets or network latency. Our expertise extends to working with authentication protocols like OAuth and JWT, enabling secure access to protected resources and user data. By integrating APIs thoughtfully and efficiently, we help you unlock the full potential of your web applications—enabling automation, personalization, real-time updates, and feature-rich experiences that keep users engaged and drive business value.",
      icon: <Database color="#2667cc" size={24} />,
      bullets: [
        "RESTful & GraphQL APIs",
        "Third-party integrations",
        "Secure data handling",
      ],
    },
  ],
  backend: [
    {
      id: "tech_nodejs",
      category: "backend",
      title: "Node.js ",
      description:
        "Node.js has revolutionized backend development by bringing JavaScript to the server side, enabling full-stack JavaScript development and unprecedented performance for I/O-intensive applications. At D'roid Technologies, we leverage Node.js's event-driven, non-blocking architecture to build lightning-fast, scalable backend systems that handle thousands of concurrent connections with minimal overhead. Node.js excels at real-time applications—chat systems, live dashboards, collaborative tools, streaming services—where low latency and high throughput are critical. We utilize the rich Node.js ecosystem, including Express.js for robust API development, Socket.io for WebSocket communication, Nest.js for enterprise-grade applications with TypeScript, and tools like PM2 for process management and monitoring. Our Node.js solutions are built with best practices in mind—proper error handling, security middleware, input validation, rate limiting, and efficient database connections—ensuring your backend is not only fast but also secure and maintainable. Whether you're building RESTful APIs, GraphQL servers, microservices architectures, or serverless functions, Node.js provides the flexibility and performance to power modern web applications. With D'roid Technologies, you get Node.js backends that are optimized for speed, scalability, and developer productivity.",
      icon: <Server color="#2667cc" size={24} />,
      bullets: [
        "Event-driven architecture",
        "Real-time capabilities",
        "Scalable & performant",
      ],
    },
    {
      id: "tech_python",
      category: "backend",
      title: "Python ",
      description:
        "Python remains one of the most powerful and versatile languages for backend development, offering clean syntax, extensive libraries, and frameworks that accelerate development without sacrificing quality. At D'roid Technologies, we harness Python's full potential using industry-leading frameworks like Django, Flask, and FastAPI to build robust, secure, and maintainable backend systems. Django provides a batteries-included approach with built-in ORM, authentication, admin interface, and security features, making it ideal for rapid development of complex, data-driven applications. Flask offers lightweight flexibility for microservices and custom API solutions where you need precise control over your architecture. FastAPI brings modern async capabilities and automatic API documentation, perfect for high-performance APIs with type safety. Python's strength extends beyond web frameworks—its rich ecosystem supports machine learning integration, data processing, automation, scientific computing, and complex business logic implementation. We implement best practices including proper project structure, environment management, testing with pytest, database migrations, caching strategies, and security hardening. Whether you're building content management systems, e-commerce platforms, data analytics dashboards, or AI-powered applications, Python provides the flexibility, readability, and power to handle sophisticated requirements. D'roid Technologies delivers Python backends that are clean, well-documented, and built to evolve with your business.",
      icon: <Code color="#2667cc" size={24} />,
      bullets: [
        "Django / Flask / FastAPI",
        "Clean & maintainable code",
        "Rich library ecosystem",
      ],
    },
    {
      id: "tech_firebase",
      category: "backend",
      title: "Firebase Backend Solutions",
      description:
        "Firebase offers a comprehensive Backend-as-a-Service (BaaS) platform that dramatically accelerates development by providing ready-to-use backend infrastructure, eliminating the need to build and maintain servers from scratch. At D'roid Technologies, we leverage Firebase's powerful suite of tools to deliver fully managed, scalable backend solutions that let you focus on building great user experiences rather than infrastructure management. Firebase Realtime Database and Firestore provide NoSQL cloud databases with real-time synchronization across all clients, perfect for collaborative applications, live updates, and offline-first experiences. Firebase Authentication handles user management with support for email/password, social logins (Google, Facebook, Twitter), and custom authentication systems, complete with security rules and token management. Cloud Functions enable serverless backend logic triggered by events, HTTP requests, or scheduled tasks—ideal for processing data, sending notifications, integrating third-party APIs, or handling complex workflows without managing servers. Firebase Cloud Messaging delivers push notifications across platforms, while Firebase Storage provides secure file upload and download capabilities. We implement comprehensive security rules, optimize database queries, set up analytics and monitoring, and integrate Firebase seamlessly with your web and mobile applications. Whether you're building a mobile app, real-time collaboration tool, or MVP that needs rapid deployment, Firebase provides the speed, scalability, and reliability your project demands, backed by Google's infrastructure.",
      icon: <Database color="#2667cc" size={24} />,
      bullets: [
        "Real-time database sync",
        "Serverless functions",
        "Managed authentication",
      ],
    },
    {
      id: "tech_api_dev",
      category: "backend",
      title: "API Development",
      description:
        "APIs are the backbone of modern digital ecosystems, enabling seamless communication between applications, services, and devices. At D'roid Technologies, we specialize in designing and developing robust, scalable, and well-documented APIs that serve as reliable bridges between your frontend, mobile apps, third-party integrations, and backend systems. We build RESTful APIs following industry best practices—proper HTTP methods, status codes, versioning, pagination, filtering, and HATEOAS principles—ensuring your API is intuitive and standards-compliant. For clients requiring more efficient data fetching, we implement GraphQL APIs that eliminate over-fetching and under-fetching by allowing clients to request exactly the data they need in a single query. Our API architectures prioritize security with OAuth 2.0, JWT authentication, API key management, rate limiting, input validation, and protection against common vulnerabilities like SQL injection and XSS attacks. We implement comprehensive error handling, logging, monitoring, and documentation using tools like Swagger/OpenAPI, Postman, and API Blueprint, making your API easy to understand and integrate for developers. Whether you need public APIs for third-party developers, private APIs for your ecosystem, webhook implementations, or microservices communication, we design APIs that are performant, maintainable, and built to scale. Our expertise includes API gateway configuration, caching strategies, load balancing, and versioning strategies that ensure backward compatibility as your API evolves. With D'roid Technologies, you get APIs that power seamless integration, enable business growth, and provide exceptional developer experience.",
      icon: <Code color="#2667cc" size={24} />,
      bullets: [
        "RESTful & GraphQL APIs",
        "Comprehensive documentation",
        "Security & scalability",
      ],
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
      bullets: [
        "iOS & Android support",
        "Native-like experience",
        "Shared codebase",
      ],
    },
    {
      id: "tech_flutter",
      category: "crossPlatform",
      title: "Flutter Development",
      description:
        "Our Flutter development services harness the power of Dart to create beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. We leverage Flutter's rich widget library and hot reload feature to rapidly develop and iterate on your application.",
      icon: <Smartphone color="#2667cc" size={24} />,
      bullets: [
        "Dart language",
        "Beautiful widgets",
        "Multi-platform compilation",
      ],
    },
  ],
};
