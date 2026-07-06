/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Github, ExternalLink, Grid, List, AlertCircle, Sparkles, Layers, Cpu, Code2 } from 'lucide-react';

interface ProjectsProps {
  initialFilter?: string;
}

export default function Projects({ initialFilter }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // If initialFilter was passed from a roadmap click, set states
  useEffect(() => {
    if (initialFilter) {
      const matchProj = PROJECTS.find(p => p.id === initialFilter);
      if (matchProj) {
        setSearchQuery(matchProj.title);
      } else {
        setSelectedTech(initialFilter);
      }
    }
  }, [initialFilter]);

  // Extract unique tech tags
  const allTechs = ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.technologies)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtering Logic
  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
    const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech);

    return matchesSearch && matchesDifficulty && matchesTech;
  });

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'Beginner':
        return <Sparkles className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Intermediate':
        return <Layers className="w-3.5 h-3.5 text-amber-500" />;
      case 'Advanced':
        return <Cpu className="w-3.5 h-3.5 text-indigo-500" />;
      default:
        return <Code2 className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/10';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/10';
      default:
        return 'bg-slate-50 text-slate-500 dark:bg-slate-900/50 dark:text-slate-400 border-slate-200/50 dark:border-slate-800/10';
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
          Code Repositories
        </span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F172A] dark:text-white" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
          Open-Source Reference Builds
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Clone, explore, and modify our complete production-ready source codes. Check out live previews and review the exact files built in each class.
        </p>
      </div>

      {/* Toolbar: Filters, Difficulty, and View Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl space-y-4 shadow-inner">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories by name, features..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] text-slate-800 dark:text-slate-100 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Difficulty Selector */}
            <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 w-full md:w-auto">
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-white dark:bg-slate-900 text-[#10B981] shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* View Mode Switcher (Hidden on mobile for layout density) */}
            <div className="hidden sm:flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view layout"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-[#10B981] shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view layout"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-[#10B981] shadow-sm'
                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Tech Selector row */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by technology stack</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto no-scrollbar py-0.5">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedTech === tech
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Projects Listing */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length > 0 ? (
          viewMode === 'grid' ? (
            /* GRID VIEW with premium animations */
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="group bg-white dark:bg-[#0F172A]/40 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between relative"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/60 transition-all duration-500"></div>

                  <div>
                    {/* Visual Preview */}
                    <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-950 relative overflow-hidden group/img">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Difficulty Level badge */}
                      <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl bg-slate-950/90 text-white flex items-center gap-1.5 shadow-sm">
                        {getDifficultyIcon(project.difficulty)}
                        <span className="font-space">{project.difficulty}</span>
                      </span>
                      {/* Status indicator */}
                      <span className={`absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl border shadow-sm ${getStatusClass(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Body texts */}
                    <div className="p-6 md:p-7 space-y-3.5">
                      <h3 className="font-space font-bold text-[#0F172A] dark:text-white text-lg md:text-xl group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Badges and action buttons */}
                  <div className="p-6 md:p-7 pt-0 space-y-5">
                    <div className="flex flex-wrap gap-1.5 border-t border-slate-100/80 dark:border-slate-800/50 pt-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-[9px] font-semibold text-slate-500 dark:text-slate-400 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100/80 dark:border-slate-800/50">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 text-xs text-slate-700 dark:text-slate-300 font-semibold font-space rounded-xl transition-all cursor-pointer"
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
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#10B981] text-white text-xs font-semibold font-space rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* LIST VIEW with premium layouts */
            <motion.div
              layout
              className="space-y-5"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white dark:bg-[#0F172A]/40 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-emerald-500/20 dark:hover:border-emerald-500/20 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative"
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center flex-1">
                    {/* Square visual preview avatar frame */}
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 dark:bg-slate-950 overflow-hidden shrink-0 border border-slate-200/40 dark:border-slate-800/40 relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="space-y-2.5 flex-1 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-space font-bold text-[#0F172A] dark:text-white text-base md:text-lg group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xl border shadow-sm ${getStatusClass(project.status)}`}>
                          {project.status}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded-xl flex items-center gap-1.5 border border-slate-200/40 dark:border-slate-850">
                          {getDifficultyIcon(project.difficulty)}
                          <span className="font-space">{project.difficulty}</span>
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tech list */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 text-[9px] font-semibold text-slate-500 dark:text-slate-400 font-mono border border-slate-100 dark:border-slate-800/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex sm:flex-col gap-2 w-full md:w-44 border-t border-slate-100 dark:border-slate-800/50 md:border-0 pt-4 md:pt-0 shrink-0">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 sm:w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 text-xs text-slate-700 dark:text-slate-300 font-semibold font-space rounded-xl transition-all cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code Repo</span>
                    </motion.a>
                    {project.liveDemoUrl && (
                      <motion.a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, backgroundColor: '#059669' }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 sm:w-full flex items-center justify-center gap-2 py-2.5 bg-[#10B981] text-white text-xs font-semibold font-space rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )
        ) : (
          /* EMPTY STATE */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 text-center space-y-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#0F172A] dark:text-white text-base">
                No Projects Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                We couldn't find any repositories matching your selection. Try clearing search keywords or selecting a different technology.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDifficulty('All');
                  setSelectedTech('All');
                }}
                className="px-4 py-2 bg-[#10B981] text-white rounded-xl text-xs font-bold hover:bg-[#059669] transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
