# 💻 Build Cool Things With AI | Official Brand Hub & Tutorial Library

Welcome to the official, full-featured web portal and companion platform for the **Build Cool Things With AI** YouTube channel community! This platform is designed to act as an immersive, highly interactive resource center where 45K+ modern software engineers can explore weekly YouTube builds, download source code, track professional learning roadmaps, test functional AI projects, and engage with our developer community.

---

## ✨ Features

- 🎯 **Interactive Learning Roadmaps**: Visual, modular milestones with collapsible deep-dives charting the ideal path from prompt engineering to advanced full-stack AI orchestration.
- 📺 **Comprehensive Episode Hub**: Filterable catalog of YouTube tutorial videos with built-in instant search, visual tags (e.g., `Gemini API`, `motion`, `Tailwind`), and direct companion repository links.
- ⚡ **Production-Ready Open-Source Catalog**: Explore real-world full-stack and mobile applications (e.g., *Multi-Agent Debate Arena*, *Mindfulness Breath Synthesizer*, *Kanban Planners*), complete with live preview and deep architectural breakdowns.
- 📮 **Community Contact Center**: Interactive direct message logs and suggestion engine featuring local state persistence so you can review your history of submitted episode requests.
- 🎨 **Fluid Aesthetic Interface**: Dark/light mode synchronization, custom keyframe-smooth spring transitions, bento grids, and high-performance interactive layouts.

---

## 🛠️ Tech Stack & Ecosystem

The platform is designed as a desktop-first, fully responsive Single Page Application (SPA) leveraging:

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strictly type-safe)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [motion](https://motion.dev/) (Native-feel layout morphs and staggering)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Architecture

```
├── .env.example             # Documented list of required environment variables
├── index.html               # Main entry point with custom SVG favicon and SEO tags
├── metadata.json            # AI Studio and platform capabilities definitions
├── package.json             # App dependencies, scripts, and build system
├── public/
│   ├── robots.txt           # Search engine crawlers configurations
│   ├── sitemap.xml          # Search engine URL priority mappings
│   └── *.jpg                # High-fidelity project hero graphics
└── src/
    ├── App.tsx              # Application layout router and state coordinator
    ├── main.tsx             # DOM injection mount point
    ├── index.css            # Global stylesheet incorporating Tailwind CSS and Google Fonts
    ├── types.ts             # Shared global TypeScript interfaces and custom enums
    ├── data.ts              # Fully structured content library (Episodes, Projects, Roadmaps)
    ├── components/
    │   ├── Navbar.tsx       # Dynamic glassmorphic header with active page transitions
    │   ├── Footer.tsx       # Semantic footer with social indices
    │   ├── SEO.tsx          # Dynamic page-level title, canonical, and metadata manager
    │   ├── ContactForm.tsx  # Interactive contact panel with localStorage trace logs
    │   └── Roadmap.tsx      # Multi-stage learning pathway component
    └── pages/
        ├── Home.tsx         # Comprehensive landing experience with video-highlights showcase
        ├── About.tsx        # Brand biography, teaching philosophy, and milestones timeline
        ├── Contact.tsx      # Verified social networks index and inquiries panel
        ├── Episodes.tsx     # Instant-filter video list with collapsible detail view
        └── Projects.tsx     # Visual showcase of companion open-source catalog
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and [npm](https://www.npmjs.com/) installed.

### Installation

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/build-cool-things-with-ai/brand-hub.git
   cd brand-hub
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a local copy of the environment template:
   ```bash
   cp .env.example .env
   ```

4. **Launch the Development Server**:
   ```bash
   npm run dev
   ```
   The application will start running at `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   ```
   The optimized static build assets will be compiled directly inside the `dist/` directory.

---

## 🎨 Creative Philosophy

"From Prompt to Product" represents a commitment to building software that values visual balance, typographical hierarchy, and structural purpose. We pair modern **Space Grotesk** display typography with ultra-clean **Inter** and **JetBrains Mono** monospace readouts, emphasizing intentional layouts, generous negative space, and micro-interactive highlights over default templates.

---

## 🤝 Community & Contributions

We welcome suggestions, pull requests, and video ideas!
- **Feedback**: Open a detailed issue on the GitHub repository.
- **Demos**: Request an episode topic through our built-in **Contact Page**.
- **Sunday Livestreams**: Join the live Sundays code-review chat to submit your projects for public review.
