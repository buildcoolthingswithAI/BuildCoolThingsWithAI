/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PageId, Episode, Project, Technology } from '../types';
import { EPISODES, PROJECTS, TECHNOLOGIES, CHANNEL_INFO } from '../data';
import Roadmap from '../components/Roadmap';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2, FileCode, Palette, Sparkles, Server, Network, Flame, Database, Layers, Cpu, Github, Zap,
  Youtube, Calendar, Clock, ArrowRight, Play, ExternalLink, Shield, Compass, Award, Check
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageId, filter?: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [selectedTechCat, setSelectedTechCat] = useState<string>('All');

  // Find featured content
  const latestEpisode = EPISODES[0]; // EPISODES are sorted descending, so 0 is latest
  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 3);

  // Filter technologies
  const techCategories = ['All', 'Frontend', 'Backend', 'Database', 'AI / Cloud', 'Tools'];
  const filteredTech = selectedTechCat === 'All'
    ? TECHNOLOGIES
    : TECHNOLOGIES.filter(t => t.category === selectedTechCat);

  // Helper for tech icons
  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-500" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-emerald-500" />;
      case 'Palette': return <Palette className="w-5 h-5 text-emerald-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-emerald-500" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-500" />;
      case 'Network': return <Network className="w-5 h-5 text-emerald-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-emerald-500" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-500" />;
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-500" />;
      case 'Github': return <Github className="w-5 h-5 text-emerald-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-emerald-500" />;
      default: return <Code2 className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-24">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12">
        {/* Soft Background Gradients with layered depths */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-[10%] right-[15%] w-[450px] h-[450px] bg-gradient-to-bl from-amber-500/5 to-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        {/* High-Tech Grid Mask Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f00d_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f00d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#33415512_1px,transparent_1px),linear-gradient(to_bottom,#33415512_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content (7 columns) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-900/30 w-fit mx-auto lg:mx-0 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] font-space">Weekly Masterclass Hub</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#0F172A] dark:text-white font-space"
              >
                From <span className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 bg-clip-text text-transparent">Prompt</span> <br/>
                to <span className="relative inline-block">
                  Product.
                  <span className="absolute bottom-1.5 left-0 right-0 h-[6px] md:h-[8px] bg-emerald-500/15 dark:bg-emerald-400/25 rounded-full -z-10"></span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                {CHANNEL_INFO.description}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate('episodes')}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold font-space shadow-lg shadow-emerald-500/15 dark:shadow-none hover:shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                <span>Browse Episodes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold font-space shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4 text-slate-400" />
                <span>View Source Code</span>
              </button>
            </motion.div>
          </div>

          {/* Hero Right Graphic - Elite Custom Dashboard Mockup Stack (5 columns) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center items-center">
            {/* Absolute radial backglow for the mockup card */}
            <div className="absolute w-72 h-72 bg-emerald-500/15 rounded-full blur-[80px] pointer-events-none -z-10"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden p-1.5 flex flex-col"
            >
              {/* VS Code Window Header Controls */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-900 text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/75"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/75"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/75"></div>
                </div>
                <span className="text-[10px] font-mono tracking-wider">prompt_to_product.tsx</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-500/60" />
              </div>

              {/* IDE Code Snippet Workspace */}
              <div className="p-4 font-mono text-[10px] md:text-xs text-slate-400 space-y-1.5 select-none bg-slate-950/80">
                <div>
                  <span className="text-pink-400">const</span> <span className="text-cyan-300">Prompt</span> = <span className="text-emerald-300">"Build custom AI model"</span>;
                </div>
                <div>
                  <span className="text-pink-400">const</span> <span className="text-cyan-300">App</span> = <span className="text-indigo-400">compileApplet</span>(<span className="text-cyan-300">Prompt</span>);
                </div>
                <div className="flex items-center gap-1 bg-emerald-950/40 border-l border-emerald-500/60 px-2 py-1 my-1 text-emerald-400 rounded-r">
                  <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>AI Agent successfully compiled app on Port 3000!</span>
                </div>
              </div>

              {/* Product Output Visual Preview Card */}
              <div className="p-2 border-t border-slate-900 bg-slate-900/40">
                <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden border border-slate-800/80 group">
                  {/* Backdrop latest episode thumbnail overlay */}
                  <img
                    src={`https://img.youtube.com/vi/${latestEpisode.youtubeId}/maxresdefault.jpg`}
                    alt={latestEpisode.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  {/* Pulsing Play Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onNavigate('episodes')}
                      className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl cursor-pointer group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all duration-300"
                    >
                      <Play className="w-4 h-4 text-white fill-current translate-x-[1px]" />
                    </motion.div>
                  </div>

                  {/* Visual Video details bar */}
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[8px] font-bold font-space bg-emerald-500 text-white px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                        LATEST
                      </span>
                      <span className="text-[9px] text-slate-300 font-mono">{latestEpisode.duration}</span>
                    </div>
                    <p className="text-white text-xs font-bold font-space truncate">EP {latestEpisode.number}: {latestEpisode.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge Left - System telemetry */}
            <motion.div
              initial={{ opacity: 0, x: -15, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: -4 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="absolute -left-4 top-[25%] bg-white dark:bg-slate-900 px-3 py-2 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-800/80 flex items-center gap-2.5"
            >
              <div className="w-6 h-6 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-left leading-none">
                <p className="text-[8px] text-slate-400 uppercase tracking-wider font-bold">Model Engine</p>
                <p className="text-[10px] font-black text-slate-800 dark:text-white font-mono">Gemini 2.5 Flash</p>
              </div>
            </motion.div>

            {/* Floating Badge Right - Roadmap milestone indicator */}
            <motion.div
              initial={{ opacity: 0, x: 15, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: 3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => {
                const element = document.getElementById('learning-roadmap-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="absolute -right-4 bottom-[10%] bg-white dark:bg-slate-900 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800/80 flex items-center gap-3 cursor-pointer hover:scale-105 transition-all"
            >
              <div className="w-8 h-8 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-500 animate-bounce" />
              </div>
              <div className="text-left leading-none">
                <p className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Roadmap Milestones</p>
                <p className="text-[11px] font-bold text-slate-800 dark:text-white font-space">8 Episodes Done</p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* 2. Latest Episode Block */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981] font-space">
              Fresh Off The Render
            </span>
            <h2 className="font-space font-bold text-[#0F172A] dark:text-white text-2xl md:text-3xl tracking-tight">
              Latest Masterclass Episode
            </h2>
          </div>
          <button
            onClick={() => onNavigate('episodes')}
            className="text-xs md:text-sm font-space font-semibold text-[#10B981] hover:text-[#059669] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>See All {EPISODES.length} Episodes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Highlight Card with Embedded Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm">
          {/* Iframe Column (7 columns) */}
          <div className="lg:col-span-7 bg-slate-950 aspect-video relative flex items-center justify-center">
            {/* Embedded YouTube Video with referrerPolicy */}
            <iframe
              title={latestEpisode.title}
              src={`https://www.youtube-nocookie.com/embed/${latestEpisode.youtubeId}?rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Details Column (5 columns) */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-space text-xs font-bold">
                  EP {latestEpisode.number}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(latestEpisode.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{latestEpisode.duration}</span>
                </div>
              </div>

              <h3 className="font-space font-bold text-slate-900 dark:text-white text-lg md:text-xl leading-snug">
                {latestEpisode.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {latestEpisode.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {latestEpisode.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/40 dark:border-emerald-900/10 text-[10px] font-medium text-[#10B981]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={latestEpisode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold font-space transition-colors shadow-md shadow-red-600/10 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch on YouTube</span>
              </a>
              <button
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors font-medium"
              >
                <span>View Source Code</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981] font-space">
              Showcase Repositories
            </span>
            <h2 className="font-space font-bold text-[#0F172A] dark:text-white text-2xl md:text-3xl tracking-tight">
              Featured Open-Source Projects
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs md:text-sm font-space font-semibold text-[#10B981] hover:text-[#059669] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>See All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Projects Grid with elite visual elevations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group bg-white dark:bg-[#0F172A]/40 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 relative"
            >
              {/* Highlight Neon Glow Border Top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/60 transition-all duration-500"></div>

              <div>
                <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-950 overflow-hidden relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className={`absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl border font-space shadow-sm ${
                    project.difficulty === 'Beginner'
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40'
                      : project.difficulty === 'Intermediate'
                      ? 'bg-amber-50/90 dark:bg-amber-950/90 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/40'
                      : 'bg-purple-50/90 dark:bg-purple-950/90 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-900/40'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>

                <div className="p-6 space-y-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-[0.15em] font-mono bg-emerald-500/10 dark:bg-emerald-500/5 px-2 py-0.5 rounded-md">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-space font-bold text-[#0F172A] dark:text-white text-lg md:text-xl group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-sans">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/30 dark:border-slate-800/50 text-[9px] font-semibold text-slate-500 dark:text-slate-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-900/80 text-[9px] font-semibold text-slate-400 font-mono">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100/80 dark:border-slate-800/50">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 text-xs text-slate-700 dark:text-slate-300 font-semibold font-space rounded-xl transition-colors cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </motion.a>
                  {project.liveDemoUrl && (
                    <motion.a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, backgroundColor: '#059669' }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-500 text-white text-xs font-semibold font-space rounded-xl transition-colors shadow-sm cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Learning Roadmap Section */}
      <section className="space-y-6 pt-6">
        <div className="space-y-1.5 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981] font-space">
            Learning Curriculum
          </span>
          <h2 className="font-space font-bold text-[#0F172A] dark:text-white text-3xl tracking-tight">
            Developer Learning Roadmap
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Follow this path of carefully designed videos and open-source references to grow from prompt exploration into deploying multi-agent full-stack software products.
          </p>
        </div>

        <Roadmap onNavigate={onNavigate} />
      </section>

      {/* 5. Channel Technologies Section */}
      <section className="space-y-8 pt-6">
        <div className="space-y-1.5 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#10B981] font-space">
            Skill Toolkit
          </span>
          <h2 className="font-space font-bold text-[#0F172A] dark:text-white text-3xl tracking-tight">
            Technologies We Master Live
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            From modern CSS systems and robust databases to state-of-the-art AI reasoning models, discover the tools used in our episodes.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {techCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTechCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                selectedTechCat === cat
                  ? 'bg-[#10B981] text-white shadow-md shadow-emerald-500/10'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, idx) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, boxShadow: "0 12px 20px -8px rgba(16, 185, 129, 0.15)", borderColor: "rgba(16, 185, 129, 0.3)" }}
                className="bg-white dark:bg-[#0F172A]/40 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 hover:border-emerald-500/30 transition-all duration-300 relative group"
              >
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/[0.015] group-hover:to-emerald-500/[0.04] transition-all duration-500" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-slate-900 border border-emerald-500/10 dark:border-emerald-500/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-300 text-emerald-500 dark:text-emerald-400">
                    {getTechIcon(tech.iconName)}
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-slate-800 dark:text-slate-100 text-sm tracking-tight">
                      {tech.name}
                    </h4>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block font-mono mt-0.5">
                      {tech.category}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 6. Elite Bento-Grid Section: Why Learn With AI? */}
      <section className="bg-[#0B0F19] text-white rounded-3xl p-8 md:p-14 relative overflow-hidden border border-slate-800/80 shadow-2xl">
        {/* Futuristic Ambient Glow Backgrounds */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
        {/* Subtle Tech Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
        
        <div className="relative z-10 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-spin duration-3000" />
              Methodology Blueprint
            </span>
            <h2 className="font-space font-extrabold text-3xl md:text-5xl tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Why Learn With AI as Your Partner?
            </h2>
            <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
              We teach a modern mindset: treating AI not as a magic shortcut, but as a hyper-competent coding colleague that helps you learn deeper, build faster, and launch products without getting bogged down in boilerplate syntax.
            </p>
          </div>

          {/* Epic Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento Block 1: Large Featured Card (Spans 7 columns) */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(16, 185, 129, 0.25)" }}
              className="md:col-span-7 bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-space font-bold text-white text-xl md:text-2xl tracking-tight">
                  Accelerated Learning Mechanics
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-md">
                  Get instant architectural recommendations, complex database query feedbacks, and CSS structural guidelines directly in your viewport. Skip hours of searching stackoverflow and keep your flow state pristine.
                </p>
              </div>
              
              {/* Dynamic Interactive Mini-Console Mockup to illustrate the point */}
              <div className="rounded-xl bg-slate-950/80 p-4 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-2 mt-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2 text-slate-500 text-[10px]">
                  <span>AI Prompt Suggestion Engine</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                </div>
                <div className="text-emerald-400"># Querying Vercel deployment logs...</div>
                <div className="text-slate-400">&gt; "How do I optimize cumulative layout shift on high-res images?"</div>
                <div className="text-teal-400">AI response: "Add exact aspect-ratio styling and referrers to prevent resizing frames."</div>
              </div>
            </motion.div>

            {/* Bento Block 2: Simple Standard Card (Spans 5 columns) */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(16, 185, 129, 0.25)" }}
              className="md:col-span-5 bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-space font-bold text-white text-xl tracking-tight">
                  No Boilerplate Slump
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Offload mundane configurations, file structures, and initial routes to models so you can focus 100% of your energy on custom features and UX.
                </p>
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest font-mono pt-4">
                BOILERPLATE FREE ZONE
              </div>
            </motion.div>

            {/* Bento Block 3: Standard Card (Spans 5 columns) */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(16, 185, 129, 0.25)" }}
              className="md:col-span-5 bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-space font-bold text-white text-xl tracking-tight">
                  Adaptive Scale Instruction
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Ask models to analyze your specific code and explain it as if you were a complete beginner, or deep-dive into complex architectural designs as a lead.
                </p>
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest font-mono pt-4">
                LEVEL: TAILORED FOR YOU
              </div>
            </motion.div>

            {/* Bento Block 4: Large Asymmetric Card (Spans 7 columns) */}
            <motion.div 
              whileHover={{ y: -4, borderColor: "rgba(16, 185, 129, 0.25)" }}
              className="md:col-span-7 bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-space font-bold text-white text-xl md:text-2xl tracking-tight">
                  Architectural Thinking First
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Learn to design the blueprint. When AI handles standard syntactical boilerplate, your primary engineering role elevates into that of an architect: orchestrating structures, APIs, design systems, and business ideas.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Database Schemas", "System Logic", "Client Interaction", "State Management"].map(lbl => (
                  <span key={lbl} className="px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-850 text-[10px] font-semibold text-slate-400 font-mono">
                    {lbl}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. YouTube Channel Subscribe Banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4 }}
        className="bg-gradient-to-br from-[#FF0000] via-[#E60000] to-[#B30000] text-white rounded-[2rem] p-8 md:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl shadow-red-600/15 group transition-all duration-300 border border-red-500/20"
      >
        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
        
        {/* Abstract glowing background circles */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-black/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <Youtube className="w-9 h-9 text-[#FF0000] fill-current" />
        </div>
        
        <div className="relative z-10 space-y-2 max-w-2xl mx-auto">
          <h2 className="font-space font-black text-2xl md:text-4xl tracking-tight leading-tight">
            Never Miss a Weekly Build
          </h2>
          <p className="text-xs md:text-sm text-red-50/90 leading-relaxed font-sans max-w-lg mx-auto">
            Join 45K+ subscribers learning how to build and deploy modern full-stack websites, mobile components, and AI agent networks. Episodes drop every Sunday.
          </p>
        </div>

        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="https://youtube.com/@buildcoolthingswithai"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-950 hover:bg-black text-white rounded-2xl text-sm font-bold font-space shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-800"
          >
            <span>Subscribe on YouTube</span>
            <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <motion.button
            onClick={() => onNavigate('contact')}
            whileHover={{ scale: 1.05, bg: "rgba(255, 255, 255, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-4 border border-white/25 hover:bg-white/10 text-white rounded-2xl text-sm font-bold font-space transition-all cursor-pointer backdrop-blur-sm"
          >
            Request an Episode Topic
          </motion.button>
        </div>
      </motion.section>

    </div>
  );
}
