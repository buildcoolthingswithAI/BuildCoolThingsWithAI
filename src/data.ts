import { Episode, Project, Technology, RoadmapStep } from './types';

export const CHANNEL_INFO = {
  name: "Build Cool Things With AI",
  tagline: "From Prompt to Product",
  description: "Learn web development, programming, and AI engineering by creating practical, real-world projects from scratch. We focus on transforming beginners and developers into product architects who build with artificial intelligence.",
  creator: {
    name: "Michael Dosunmu",
    alias: "CyderCoder",
    role: "Web Developer, UI/UX Designer & AI Enthusiast",
    bio: "Hi, I'm CyderCoder, a web developer and AI enthusiast passionate about building real-world projects with Artificial Intelligence. Through Build Cool Things With AI, I help beginners learn programming, web development, and AI by creating practical projects from scratch.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80", // High-quality developer avatar placeholder
    location: "Nigeria",
    email: "cydercoder@gmail.com",
    altEmail: "michaeldosunmu22@gmail.com",
    portfolioUrl: "https://cydercoder.netlify.app",
    socials: {
      github: "https://github.com/CyderCoder",
      linkedin: "https://www.linkedin.com/in/michael-dosunmu-4979a9344",
      twitter: "https://x.com/michael_do85102",
      facebook: "https://www.facebook.com/CyderCoder",
      youtube: "https://www.youtube.com/@Cydercoder"
    }
  },
  stats: {
    subscribers: "Growing Community",
    videos: "2 Episodes",
    hoursWatched: "100% Free",
    githubStars: "Open-Source"
  }
};

export const TECHNOLOGIES: Technology[] = [
  {
    name: "HTML",
    category: "Frontend",
    iconName: "Code2",
    description: "The core semantic building block for defining structural layouts on the web."
  },
  {
    name: "CSS",
    category: "Frontend",
    iconName: "Palette",
    description: "Cascading style sheets for styling custom designs, typography, and responsive sheets."
  },
  {
    name: "JavaScript",
    category: "Frontend",
    iconName: "FileCode",
    description: "The language of the web, power-loading dynamic visual logic and client interactions."
  },
  {
    name: "UI/UX Design",
    category: "Frontend",
    iconName: "Sparkles",
    description: "Structuring user-friendly layout guidelines, clean hierarchies, and micro-copy."
  },
  {
    name: "Responsive Web Design",
    category: "Frontend",
    iconName: "Layers",
    description: "Mobile-first coding layouts optimized to look stunning on phones, tablets, and ultra-wides."
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    iconName: "Github",
    description: "Industry-standard code repository hosting for backing up projects and reviewing histories."
  },
  {
    name: "Vercel Deployment",
    category: "Tools",
    iconName: "Zap",
    description: "Instant cloud server hosting for frontend builds, featuring automated git deployments."
  },
  {
    name: "Google AI Studio",
    category: "AI / Cloud",
    iconName: "Cpu",
    description: "Prototyping arena for model APIs, structured instructions, and developer tokens."
  },
  {
    name: "ChatGPT",
    category: "AI / Cloud",
    iconName: "MessageSquare",
    description: "State-of-the-art conversational AI utilized for architectural coding support and brainstorming."
  },
  {
    name: "AI Prompt Engineering",
    category: "AI / Cloud",
    iconName: "Flame",
    description: "The craft of writing precise, structured natural language inputs to receive perfect code."
  },
  {
    name: "Frontend Development",
    category: "Frontend",
    iconName: "Monitor",
    description: "Assembling fast, highly interactive web applications with React, Vite, and Tailwind CSS."
  },
  {
    name: "API Integration",
    category: "Backend",
    iconName: "Network",
    description: "Connecting client applications securely to third-party endpoints, databases, and AI models."
  },
  {
    name: "SEO Fundamentals",
    category: "Tools",
    iconName: "Search",
    description: "Optimizing code schemas, title setups, and sitemaps so search engines index pages perfectly."
  }
];

export const EPISODES: Episode[] = [
  {
    id: "ep-1",
    number: 1,
    title: "Build an AI Startup Website with HTML, CSS & JavaScript",
    description: "Learn how to build a fully responsive AI Startup Website from scratch using basic HTML, CSS, and modern JavaScript. Discover how we partner with ChatGPT and Google AI Studio to write perfect utility styles and assemble a professional layout in record time.",
    publishDate: "2026-06-20",
    duration: "24:15",
    tags: ["HTML", "CSS", "JavaScript", "AI Prompt Engineering", "Responsive Design"],
    youtubeUrl: "https://youtu.be/KjtO5c5MGPg?si=tpFGsO7N5iPXaWBD",
    youtubeId: "KjtO5c5MGPg",
    featured: true
  },
  {
    id: "ep-2",
    number: 2,
    title: "Official Brand Hub & Blueprint (Draft Masterclass)",
    description: "We design and build the official home platform for Build Cool Things With AI! Review our design specifications, layout systems, search tags, responsive performance guidelines, and explore our comprehensive master project blueprint blueprint draft.",
    publishDate: "2026-07-05",
    duration: "Coming Soon",
    tags: ["React", "TypeScript", "Tailwind CSS", "SEO Fundamentals", "Vercel Deployment"],
    youtubeUrl: "https://www.youtube.com/@Cydercoder",
    youtubeId: "", // Not uploaded yet
    featured: true,
    hasBlueprint: true,
    blueprintContent: `# PROJECT BLUEPRINT: BUILD COOL THINGS WITH AI

## PROJECT OVERVIEW
* **Project Name:** Build Cool Things With AI
* **Project Type:** Official Website
* **Tagline:** From Prompt to Product
* **Purpose:** Build the official website for my YouTube channel and personal developer brand to showcase episodes, projects, source codes, live demos, and resources in one place.

## TARGET AUDIENCE
* Beginners & Students
* People learning AI
* People learning Web Development
* Developers of all skill levels

## CORE GOALS & PERSONALITY
* **Main Goal:** Create a modern, professional, fast, easy-to-navigate, mobile-friendly, and SEO-optimized website that grows with the channel.
* **Brand Personality:** Modern, Clean, Premium, Friendly, Educational, Professional
* **Inspiration:** Vercel, Linear, Framer, Stripe, Notion

## DESIGN SPECIFICATION
* **Style:** Minimal, Clean, Premium, Soft shadows, Rounded corners, Smooth animations, Generous spacing.
* **Primary Color:** Emerald Green (\`#10B981\`)
* **Secondary Color:** Dark Slate (\`#0F172A\`)
* **Background Color:** \`#F8FAFC\`
* **Card Color:** White
* **Accent Color:** Orange (\`#F59E0B\`)
* **Fonts:** Space Grotesk (Headings) paired with Inter (Body)

## PAGES & STRUCTURE
1. **Home Page:** Navigation Bar, Hero Section, Latest Episode, Featured Projects, Learning Roadmap, Technologies We Use, Why Learn With AI?, Subscribe Section, Footer
2. **Episodes Page:** Episode Number, Thumbnail, Title, Description, Watch on YouTube Button, Episode Resource Download
3. **Projects Page:** Project Screenshot, Description, Technology Used, GitHub Button, Live Demo Button
4. **About Page:** Brand Mission, Creator Background, Teaching Philosophy
5. **Contact Page:** Contact Form, Social Media Links (GitHub, YouTube, LinkedIn, X/Twitter, Facebook)
6. **404 Page:** Route Resolution Terminal / Retro Error Screen

## TECHNICAL FEATURES
* Responsive Layout
* Dark Mode Compatibility
* Smooth Scroll Interactions & Scroll Animations
* Back To Top Widget
* Page Load Transitions
* SEO Optimization (Meta tags, Open Graph, Sitemap.xml, JSON-LD)

## GITHUB & CODE DEPLOYMENT
* Professional folder structure
* Clean README.md and LICENSE setup
* Deploy live version on GitHub Pages / Vercel
* Connect Google Search Console & Submit sitemap.xml`
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "DevFlow AI Startup Website",
    description: "A highly polished, modern, and completely responsive landing page built from scratch for a futuristic AI Startup. Showcases clean grids, animated interactions, and elegant color schemes.",
    technologies: ["HTML", "CSS", "JavaScript", "AI Prompt Engineering", "Responsive Design"],
    githubUrl: "https://github.com/buildcoolthingswithAI/devflow.git",
    liveDemoUrl: "https://devflowai1.vercel.app/",
    difficulty: "Beginner",
    status: "Completed",
    featured: true,
    imageUrl: "/devflow_hero.jpg"
  },
  {
    id: "proj-2",
    title: "Build Cool Things With AI Brand Hub",
    description: "The official web platform for Michael Dosunmu's developer channel. Powered by React, TypeScript, and Tailwind CSS. Features custom category filters, searchable video indexes, and responsive forms.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "SEO Fundamentals", "Vercel Deployment"],
    githubUrl: "https://github.com/CyderCoder/build-cool-things-with-ai",
    liveDemoUrl: "https://cydercoder.netlify.app",
    difficulty: "Intermediate",
    status: "Completed",
    featured: true,
    imageUrl: "/brand_hub_hero.jpg"
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: "rm-1",
    level: "Beginner",
    title: "AI-Assisted Layouts & Semantic Web",
    subtitle: "Accelerated Frontend Foundation",
    description: "Combine HTML5, CSS layout principles, and responsive tags to assemble beautiful pages. Leverage ChatGPT and Google AI Studio as real-time guides to learn grid structuring and perfect mobile-first CSS rules.",
    topics: ["HTML5 semantic structures", "CSS Flexbox & CSS Grid", "Media queries for mobile", "Partnering with AI for fast prototypes"],
    recommendedEpisodes: ["ep-1"],
    recommendedProjects: ["proj-1"]
  },
  {
    id: "rm-2",
    level: "Intermediate",
    title: "Dynamic Single-Page Engineering",
    subtitle: "Component Architecture & Strong Types",
    description: "Graduate to components, states, and strongly typed schemas. Learn how to design structured user guides, build search and bookmark filters, and deploy highly performant React platforms on Vercel.",
    topics: ["React hooks & state logic", "TypeScript type definitions", "Tailwind styling ecosystems", "Vercel and Netlify workflows"],
    recommendedEpisodes: ["ep-2"],
    recommendedProjects: ["proj-2"]
  },
  {
    id: "rm-3",
    level: "Advanced",
    title: "Cognitive Applications & APIs",
    subtitle: "The Future of AI Products",
    description: "Connect your applications to live models. Learn backend express routing, direct token calls to Google AI Studio, audio APIs for voice commands, and structuring raw inputs into clean JSON responses.",
    topics: ["Google GenAI client library", "Structured API response prompts", "Web Audio recording loops", "API endpoint security"],
    recommendedEpisodes: ["ep-2"],
    recommendedProjects: ["proj-2"]
  }
];

export const FAQS = [
  {
    question: "Is this channel suitable for complete programming beginners?",
    answer: "Yes, absolutely! We start from the absolute basics, like HTML, CSS, and basic scripting, while demonstrating how you can use free AI tools like ChatGPT and Google AI Studio to learn 10x faster and debug issues in seconds."
  },
  {
    question: "Do you share the source code for the projects built on the channel?",
    answer: "Yes, 100%! All code built on 'Build Cool Things With AI' is fully open-source and free to access on CyderCoder's GitHub repository. You can find direct source links and live preview links for all projects right on our Projects page."
  },
  {
    question: "What is the Project Blueprint for Episode 2?",
    answer: "The Project Blueprint is the comprehensive, official architectural plan we designed for building the channel's website. It documents target audiences, brand colors, page layout specs, technical features, SEO setups, and deployment steps. It's completely free to read on our Episodes page!"
  },
  {
    question: "What tools do you recommend for beginners starting with AI web development?",
    answer: "We recommend downloading VS Code, opening a free Google AI Studio account, and using ChatGPT for code reviews. These are the exact, free tools we use on our stream every week."
  }
];
