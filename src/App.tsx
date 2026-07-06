/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import Home from './pages/Home';
import Episodes from './pages/Episodes';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { ArrowUp, Cpu, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [pageFilter, setPageFilter] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState('Initializing core telemetry...');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('bctwai_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Apply theme class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('bctwai_theme', theme);
    } catch (err) {
      console.error(err);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Simulation of custom high-speed system loading sequence
  useEffect(() => {
    const steps = [
      'Establishing connection...',
      'Accessing Google AI Studio platform...',
      'Bundling project specifications...',
      'Loading video pipeline...',
      'Systems fully synced.'
    ];
    
    let currentStepIdx = 0;
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAppLoading(false);
          }, 350);
          return 100;
        }
        const stepInc = Math.floor(Math.random() * 15) + 8;
        const nextProgress = Math.min(prev + stepInc, 100);
        
        const stepIdx = Math.min(
          Math.floor((nextProgress / 100) * steps.length),
          steps.length - 1
        );
        if (stepIdx !== currentStepIdx) {
          currentStepIdx = stepIdx;
          setLoadingStep(steps[stepIdx]);
        }
        return nextProgress;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  // Monitor scroll for back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageId, filter?: string) => {
    setCurrentPage(page);
    setPageFilter(filter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve dynamic subTitles for SEO
  const getPageSubTitle = () => {
    if (currentPage === 'episodes' && pageFilter) {
      return `Filter: ${pageFilter}`;
    }
    if (currentPage === 'projects' && pageFilter) {
      return `Filter: ${pageFilter}`;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#0F172A] dark:text-[#F8FAFC] flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isAppLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Absolute Ambient Glow Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[4000ms]"></div>
            
            {/* Ambient Hex/Grid Design Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center text-center space-y-8">
              
              {/* Spinner/Brand Icon Badge */}
              <div className="relative flex items-center justify-center">
                {/* Micro outer glowing ring */}
                <div className="absolute w-20 h-20 rounded-2xl border border-emerald-500/20 animate-spin duration-[6000ms]"></div>
                <div className="absolute w-16 h-16 rounded-xl bg-emerald-500/5 border border-emerald-500/40 animate-ping opacity-20"></div>
                
                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/10 relative">
                  <Cpu className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Loader Header Titles */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.25em] block">
                  Quantum Studio
                </span>
                <h1 className="text-xl md:text-2xl font-bold font-space text-white tracking-tight flex items-center justify-center gap-1.5">
                  Build Cool Things <span className="text-emerald-400 font-extrabold">With AI</span>
                </h1>
              </div>

              {/* Loading Bar Mechanism */}
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                  <span className="flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    {loadingStep}
                  </span>
                  <span className="text-emerald-400 font-bold">{loadingProgress}%</span>
                </div>
                
                {/* Physical slider bar track */}
                <div className="h-[4px] w-full bg-slate-900 rounded-full overflow-hidden p-[1px] border border-slate-800/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    style={{ width: `${loadingProgress}%` }}
                    layout
                  />
                </div>
              </div>

              {/* Developer Attribution Tag */}
              <div className="text-[9px] font-mono text-slate-500 tracking-wider pt-6">
                PROMPT TO PRODUCT SERIES • v2.0.0
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Dynamic SEO Header Manager */}
      <SEO page={currentPage} subTitle={getPageSubTitle()} />

      {/* 2. Sticky Header Navbar */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={(page) => handleNavigate(page, undefined)} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 3. Main Route Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {(() => {
              switch (currentPage) {
                case 'home':
                  return <Home onNavigate={handleNavigate} />;
                case 'episodes':
                  return <Episodes initialFilter={pageFilter} />;
                case 'projects':
                  return <Projects initialFilter={pageFilter} />;
                case 'about':
                  return <About />;
                case 'contact':
                  return <Contact />;
                default:
                  return <NotFound onNavigate={(page) => handleNavigate(page, undefined)} />;
              }
            })()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Footer Section */}
      <Footer currentPage={currentPage} onNavigate={(page) => handleNavigate(page, undefined)} />

      {/* 5. Floating Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleBackToTop}
            aria-label="Scroll to top of page"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
