/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ROADMAP_STEPS } from '../data';
import { RoadmapStep, PageId } from '../types';
import { Award, CheckCircle, ChevronRight, BookOpen, Layers, Cpu, Sparkles } from 'lucide-react';

interface RoadmapProps {
  onNavigate: (page: PageId, filter?: string) => void;
}

export default function Roadmap({ onNavigate }: RoadmapProps) {
  const [activeStepId, setActiveStepId] = useState<string>('rm-1');

  const getStepIcon = (level: string) => {
    switch (level) {
      case 'Beginner':
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
      case 'Intermediate':
        return <Layers className="w-5 h-5 text-amber-500" />;
      case 'Advanced':
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      default:
        return <Award className="w-5 h-5 text-emerald-500" />;
    }
  };

  const activeStep = ROADMAP_STEPS.find(s => s.id === activeStepId) || ROADMAP_STEPS[0];

  return (
    <div id="learning-roadmap-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Roadmap Navigation Steps (Left Col / 5 Cols) */}
      <div className="lg:col-span-5 space-y-4">
        {ROADMAP_STEPS.map((step, idx) => {
          const isActive = step.id === activeStepId;
          return (
            <motion.button
              key={step.id}
              onClick={() => setActiveStepId(step.id)}
              whileHover={{ x: isActive ? 0 : 4 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 relative overflow-hidden group focus:outline-none cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#0F172A] border-emerald-500 shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-900/60'
              }`}
            >
              {/* Connection Line */}
              {idx < ROADMAP_STEPS.length - 1 && (
                <div className="absolute left-[34px] bottom-0 w-0.5 h-6 bg-slate-200 dark:bg-slate-800 pointer-events-none translate-y-full" />
              )}

              <div className="flex items-start gap-4">
                {/* Step indicator */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${
                  isActive
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                }`}>
                  <span className="text-sm font-bold font-space">{idx + 1}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg font-mono ${
                      step.level === 'Beginner'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                        : step.level === 'Intermediate'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                        : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-400'
                    }`}>
                      {step.level}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{step.subtitle}</span>
                  </div>
                  <h4 className="font-space font-bold text-slate-800 dark:text-slate-100 text-base md:text-lg group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h4>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Step Detail Box (Right Col / 7 Cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-[#0F172A]/40 border border-slate-200/85 dark:border-slate-800/85 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        {/* Decorative Grid Overlay inside Step Detail */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 relative z-10"
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-inner">
                {getStepIcon(activeStep.level)}
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider font-mono">
                  Roadmap Milestone
                </span>
                <h3 className="font-space font-black text-slate-900 dark:text-slate-50 text-xl md:text-2xl tracking-tight">
                  {activeStep.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs md:text-sm">
              {activeStep.description}
            </p>

            {/* Core learning topics */}
            <div className="space-y-3.5 bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/40">
              <h5 className="font-space font-bold text-slate-800 dark:text-slate-200 text-xs tracking-wider uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                What You Will Master:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeStep.topics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-slate-600 dark:text-slate-400 text-xs leading-tight">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              {/* Episodes */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold font-space text-xs uppercase tracking-wide">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span>Episode Tutorial</span>
                </div>
                {activeStep.recommendedEpisodes.map(epId => (
                  <motion.button
                    key={epId}
                    onClick={() => onNavigate('episodes', epId)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between w-full text-left px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-emerald-500/5 hover:border-emerald-500/25 text-xs text-slate-600 dark:text-slate-400 font-medium transition-colors border border-slate-100 dark:border-slate-800/40 cursor-pointer"
                  >
                    <span>View Tutorial Spec</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </motion.button>
                ))}
              </div>

              {/* Projects */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold font-space text-xs uppercase tracking-wide">
                  <Layers className="w-4 h-4 text-emerald-500" />
                  <span>Reference Project</span>
                </div>
                {activeStep.recommendedProjects.map(projId => (
                  <motion.button
                    key={projId}
                    onClick={() => onNavigate('projects', projId)}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between w-full text-left px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-emerald-500/5 hover:border-emerald-500/25 text-xs text-slate-600 dark:text-slate-400 font-medium transition-colors border border-slate-100 dark:border-slate-800/40 cursor-pointer"
                  >
                    <span>View Reference Code</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
