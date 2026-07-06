/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId } from '../types';
import { Cpu, Github, Youtube, Linkedin, Twitter, Facebook, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CHANNEL_INFO } from '../data';

interface FooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Footer({ currentPage, onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      try {
        const savedSubscribers = localStorage.getItem('bctwai_subscribers');
        const list = savedSubscribers ? JSON.parse(savedSubscribers) : [];
        if (!list.includes(email.trim())) {
          list.push(email.trim());
          localStorage.setItem('bctwai_subscribers', JSON.stringify(list));
        }
      } catch (err) {
        console.error(err);
      }
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-4 h-4" />, url: CHANNEL_INFO.creator.socials.github },
    { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, url: CHANNEL_INFO.creator.socials.youtube },
    { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, url: CHANNEL_INFO.creator.socials.linkedin },
    { name: 'Twitter', icon: <Twitter className="w-4 h-4" />, url: CHANNEL_INFO.creator.socials.twitter },
    { name: 'Facebook', icon: <Facebook className="w-4 h-4" />, url: CHANNEL_INFO.creator.socials.facebook },
  ];

  const quickLinks: { label: string; page: PageId }[] = [
    { label: 'Home Feed', page: 'home' },
    { label: 'YouTube Episodes', page: 'episodes' },
    { label: 'Open Repositories', page: 'projects' },
    { label: 'Our Story', page: 'about' },
    { label: 'Get In Touch', page: 'contact' },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-white dark:bg-[#0B0F19] border-t border-slate-200/60 dark:border-slate-900/80 transition-colors duration-300 pt-20 pb-12 mt-24 overflow-hidden"
    >
      {/* Footer Ambient Backdrop Neon Glow */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      {/* Tech line indicator top of footer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-slate-200/60 dark:border-slate-900/60">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-5">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1 group cursor-pointer"
            >
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform duration-300">
                <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0F172A] dark:text-white font-space">
                Build Cool Things <span className="text-emerald-500 font-extrabold">With AI</span>
              </span>
            </button>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-sans">
              An educational channel exploring how software development and advanced AI models collaborate to launch products directly from prompts.
            </p>
            <div className="flex items-center gap-3 pt-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${link.name}`}
                  whileHover={{ scale: 1.12, y: -2, borderColor: '#10B981' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Sitemap Quick Links */}
          <div className="md:col-span-3 space-y-5">
            <h4 className="font-space font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm uppercase tracking-widest relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-emerald-500">
              Sitemap Navigation
            </h4>
            <ul className="space-y-3 pt-1">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleNavClick(link.page)}
                    className={`text-xs md:text-sm transition-all cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded py-0.5 relative hover:translate-x-1 duration-250 ${
                      currentPage === link.page
                        ? 'text-emerald-500 font-bold pl-1.5 border-l-2 border-emerald-500'
                        : 'text-slate-500 hover:text-[#0F172A] dark:hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="font-space font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm uppercase tracking-widest relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[2px] after:bg-emerald-500">
              Weekly Intel Feed
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Get notified of new episodes, technical cheat-sheets, source code updates, and project deep-dives directly in your inbox. No spam.
            </p>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="subscribed-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 p-4 rounded-2xl shadow-inner shadow-emerald-500/5"
                >
                  <Check className="w-4 h-4 shrink-0 text-emerald-500 animate-bounce" />
                  <span>Successfully Subscribed! Welcome onboard!</span>
                </motion.div>
              ) : (
                <motion.form
                  key="subscribe-form"
                  onSubmit={handleSubscribe}
                  className="flex gap-2 relative bg-slate-50 dark:bg-slate-900/40 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800"
                >
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-transparent border-0 rounded-xl text-xs md:text-sm focus:outline-none text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-space font-semibold text-xs md:text-sm rounded-xl transition-colors shadow-lg shadow-emerald-500/10 focus:outline-none shrink-0 flex items-center justify-center cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500 font-sans">
          <p>© 2026 Build Cool Things With AI. Open Source and Community Built.</p>
          <div className="flex items-center gap-5">
            <a href="#privacy" className="hover:text-[#10B981] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#10B981] transition-colors">Terms of Service</a>
            <span className="text-[#10B981]/40">●</span>
            <span className="font-space tracking-wider text-slate-400 dark:text-slate-500">PROMPT TO PRODUCT</span>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}
