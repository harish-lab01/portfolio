// src/data/portfolioData.js
export const personal = {
  name: "Harish M",
  title: "Software Developer",
  subtitle: "Software Developer / React.js / .NET · Chennai, TN",
  bio: "Hey there, I'm Harish! I'm a Software Developer who builds end-to-end web applications — from crafting smooth, responsive React frontends to integrating robust .NET APIs. Based in Chennai, I specialize in delivering production-grade applications that are fast, scalable, and satisfying to use.",
  email: "harish.tech02@gmail.com",
  phone: "+91-9361070003",
  linkedin: "https://linkedin.com/in/harish43",
  location: "Chennai, TN, India",
  available: true,
};

export const stats = [
  { value: 4, label: "React Apps Shipped", suffix: "+" },
  { value: 1, label: "Year Coding Professionally", suffix: "+" },
  { value: 3, label: "Role Auth Modules Secured", suffix: "+" },
];

export const experience = [
  {
    year: "2020",
    title: "B.Tech Journey Begins",
    company: "Bharathidasan University",
    location: "Tiruchirappalli, TN",
    type: "education",
  },
  {
    year: "2023–24",
    title: "MERN Stack Certification",
    company: "Error Makes Clever Academy",
    type: "certification",
  },
  {
    year: "2024",
    title: "B.Tech Completed",
    company: "Computer Science & Engineering · 68%",
    type: "education",
  },
  {
    year: "2025–26",
    title: "Software Developer",
    company: "Vivify Technocrats",
    location: "Chennai, TN",
    description: "I owned frontend delivery of 4+ production-grade web applications. I integrated complex role-based auth, consolidated REST API batching, and streamlined sprint cycles by 30%.",
    type: "work",
  },
];

export const projects = [
  {
    id: "01",
    title: "EmployeeHub",
    category: "Enterprise Module · React + .NET Core",
    description: "I built this end-to-end HR management portal to replace all slow, paper-based forms. I designed smooth self-service request portals, leave approvals, attendance tracking calendars, and real-time manager alerts.",
    links: [{ label: "vivifysoft.in/employeehub", url: "https://vivifysoft.in/employeehub" }],
    tags: ["React", ".NET Core API", "Role-Based Auth", "Real-time Hub"],
    highlight: "Successfully automated 100% of internal manual HR workflows",
    accentColor: "#FF6B9D",
  },
  {
    id: "02",
    title: "Vivify Safety System",
    category: "Safety Compliance App · React + .NET",
    description: "I developed a robust workplace safety system featuring a punch-in/out attendance dashboard, hazard/incident reporting forms, and a mandatory training video portal with employee tracking.",
    links: [{ label: "vivifysoft.in/safety", url: "https://vivifysoft.in/safety" }],
    tags: ["React.js", ".NET Core", "Attendance Tracking", "Compliance"],
    highlight: "Enforces 100% completion on mandatory safety training",
    accentColor: "#45E5C8",
  },
  {
    id: "03",
    title: "Chat Hub",
    category: "Personal Playground · React + Firebase",
    description: "This was my sandbox for real-time WebSockets and databases. It is a WhatsApp-inspired messenger equipped with active typing indicators, Firebase presence listeners, and fast in-app alerts.",
    links: [{ label: "Live Demo", url: "https://chat-hub-rouge.vercel.app/login" }],
    tags: ["React", "Firebase Realtime DB", "Firebase Auth", "Tailwind"],
    highlight: "Deployed live and fully responsive on Vercel",
    accentColor: "#FFB347",
    badge: "⚡ Live Demo",
  },
  {
    id: "04",
    title: "JARVIS AI Assistant",
    category: "Personal AI Hack · Python + Ollama",
    description: "My offline AI copilot! I built a terminal-based and voice-activated digital helper that integrates local LLMs (running via Ollama) to automate my file-system tasks and write draft code.",
    links: [],
    tags: ["Python", "Ollama LLM", "Voice Control", "Local AI Automation"],
    highlight: "Runs 100% offline, keeping all prompt data local",
    accentColor: "#10B981",
    badge: "🤖 AI-Powered",
    dark: true,
  },
  {
    id: "05",
    title: "Sri Gokilaa Crackers",
    category: "E-Commerce Platform · React.js + .NET",
    description: "Developed and styled a responsive React.js UI for this e-commerce platform, consuming .NET backend APIs for product data, cart management, and order workflows. Built product catalogs, cart workflows, bulk ordering, and admin dashboards for inventory management. Optimised UI components for responsive layouts and smooth cross-browser performance.",
    links: [
      { label: "srigokilaacrackers.com", url: "https://srigokilaacrackers.com" },
    ],
    tags: ["React.js", ".NET API", "Tailwind CSS", "Axios"],
    highlight: "Safely managed hundreds of live production orders",
    accentColor: "#6C63FF",
  },
];

export const skills = {
  frontend: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS"],
  integration: ["RESTful API", ".NET API Consumption", "Axios/Fetch", "Role-Based Auth", "Firebase Auth", "Firebase Realtime DB"],
  performance: ["React State Management", "Component Optimization", "API Call Batching"],
  tools: ["Git", "GitHub", "VS Code", "Node.js/npm", "Cursor AI", "Claude AI", "Kiro", "Antigravity"],
};

export const askHarishReplies = {
  "available": "Absolutely! I'm currently looking for new software development opportunities, full-time engineering roles, or creative freelance work. Shoot me an email at harish.tech02@gmail.com — let's build something cool!",
  "projects": "I am super proud of EmployeeHub! It is a massive HR system built using React.js and a .NET backend. It replaced 100% of Vivify's paper forms. You can see it live at: vivifysoft.in/employeehub",
  "tech": "My core stack is React.js, modern JavaScript (ES6+), Tailwind CSS, and .NET Core REST APIs. I build full-stack web applications end-to-end — from UI to API integration. I also love using Framer Motion for premium animations!",
  "experience": "I have 1+ year of professional experience at Vivify Technocrats in Chennai, where I delivered 4+ production web modules across e-commerce, HR, and safety compliance domains as a Software Developer.",
  "resume": "Downloading my resume now! I hope we get a chance to discuss how I can bring value to your engineering team. 📄",
  "default": "That's an awesome question! While I am just Harish's AI assistant, you can talk to the real Harish directly at harish.tech02@gmail.com. He's super friendly! 😊",
};
