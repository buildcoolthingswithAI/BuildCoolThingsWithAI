/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Sun, Moon, Menu, X, Cpu, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ currentPage, onNavigate, theme, toggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; id: PageId }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Episodes', id: 'episodes' },
    { label: 'Projects', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-800/50 bg-white/85 dark:bg-[#0F172A]/80 backdrop-blur-md transition-all duration-300 h-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo Brand Link */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none rounded-xl p-1 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/10 group-hover:scale-115 group-hover:rotate-3 transition-all duration-300">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm md:text-base font-black tracking-tight text-[#0F172A] dark:text-white font-space leading-tight">
              Build Cool Things <br className="sm:hidden"/><span className="bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent font-black">With AI</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-bold h-full">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`h-16 flex items-center pt-0.5 relative cursor-pointer font-space focus:outline-none transition-colors ${
                    isActive
                      ? 'text-emerald-500 font-extrabold'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Utility Buttons */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors focus:outline-none cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Subscribe YouTube Link Button */}
            <a
              href="https://youtube.com/@buildcoolthingswithai"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-4.5 py-2 bg-gradient-to-r from-slate-900 to-slate-950 hover:from-slate-950 hover:to-black dark:from-white dark:to-slate-100 dark:hover:from-slate-100 dark:hover:to-slate-200 text-white dark:text-[#0F172A] rounded-xl text-xs font-bold font-space transition-all shadow-md shadow-emerald-500/5 focus:outline-none cursor-pointer"
            >
              <span>Subscribe</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800/80 md:hidden text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 w-full overflow-hidden absolute top-16 left-0 z-40 shadow-lg"
          >
            <div className="px-4 py-5 space-y-3">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </button>
                );
              })}
              
              {/* Subscribe inside mobile menu */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-900">
                <a
                  href="https://youtube.com/@buildcoolthingswithai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold font-space transition-colors shadow-md shadow-red-600/10"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Subscribe on YouTube</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
