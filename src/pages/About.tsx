/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CHANNEL_INFO, FAQS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Award, Users, MapPin, Milestone, ChevronDown, ChevronUp, Sparkles, Star } from 'lucide-react';

export default function About() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  const corePhilosophy = [
    {
      title: "The Architect Mindset",
      desc: "Syntax is easy; systems are hard. We focus on training you to become an architect who understands database structures, layout rules, and responsive workflows. We leave the raw typing of boilerplate loops to AI models.",
      icon: <Award className="w-5 h-5 text-[#10B981]" />
    },
    {
      title: "Real Production Quality",
      desc: "No mock setups, no unstyled boxes. Every project we build live is designed for speed, fully polished, accessible, and ready to be deployed to live production servers. We show you the real bugs and how to solve them.",
      icon: <BookOpen className="w-5 h-5 text-[#10B981]" />
    },
    {
      title: "Community Driven",
      desc: "Our channel grows when our community grows. We open-source 100% of our code, accept pull requests on project boards, and actively implement requests and feature ideas directly submitted by our learners.",
      icon: <Users className="w-5 h-5 text-[#10B981]" />
    }
  ];

  const futureMilestones = [
    { date: "Q3 2026", title: "Live Community Code-Alongs", desc: "Interactive streaming sessions where viewers participate in debugging complex edge cases in real-time." },
    { date: "Q4 2026", title: "Global Developer Hackathon", desc: "A weekend AI builder hackathon featuring cash rewards and direct mentoring from senior industry experts." },
    { date: "Q1 2027", title: "The BCTWAI Developer Academy", desc: "A free, deeply structured certified learning pathway for advanced agent orchestration and custom cloud SDKs." }
  ];

  return (
    <div className="space-y-20">
      
      {/* 1. Page Header / Mission */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
          Our Brand Mission
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
          Pioneering the Era of Collaborative Coding
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          At <strong className="text-slate-800 dark:text-white font-semibold">Build Cool Things With AI</strong>, our mission is to break down technical barriers. We believe that when humans leverage generative intelligence as partners, we shift from being manual writers into creative architects—enabling anyone to craft pristine, production-ready software in record time.
        </p>
      </section>

      {/* 2. Story / Creator Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Creator Avatar & Stats (5 columns) */}
        <div className="lg:col-span-5 flex flex-col items-center text-center space-y-6">
          <div className="relative w-48 h-48 rounded-[2.5rem] overflow-hidden border-2 border-[#10B981] p-2 bg-white dark:bg-slate-950 shadow-xl">
            <img
              src={CHANNEL_INFO.creator.avatarUrl}
              alt={CHANNEL_INFO.creator.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-[2rem]"
            />
            {/* Glowing spot */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#10B981] border-4 border-white dark:border-slate-950 flex items-center justify-center text-white text-[10px]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-[#0F172A] dark:text-white text-xl">
              {CHANNEL_INFO.creator.name}
            </h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              {CHANNEL_INFO.creator.role}
            </p>
          </div>

          {/* Quick channel statistics */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80">
              <span className="block font-extrabold text-[#10B981] text-lg md:text-2xl">
                {CHANNEL_INFO.stats.subscribers}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Subscribers
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80">
              <span className="block font-extrabold text-[#10B981] text-lg md:text-2xl">
                {CHANNEL_INFO.stats.githubStars}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                GitHub Stars
              </span>
            </div>
          </div>
        </div>

        {/* Creator Bio Content (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Behind the Mic</span>
            </span>
            <h2 className="font-bold text-[#0F172A] dark:text-white text-2xl md:text-3xl tracking-tight">
              The Creator's Story
            </h2>
          </div>
          
          <div className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              {CHANNEL_INFO.creator.bio}
            </p>
            <p>
              "For years in corporate tech, I noticed that developers spent 80% of their energy debugging syntax errors, rewriting boilerplates, and looking up API parameters—and only 20% designing systems and solving core business flows. When modern LLMs arrived, I realized everything was about to change.
            </p>
            <p>
              I launched 'Build Cool Things With AI' to showcase this paradigm shift. By letting models handle the rote mechanical drafting, we are freed to think bigger. We are here to help you skip the frustration and become an elite full-stack developer who can build anything they can imagine."
            </p>
          </div>
        </div>
      </section>

      {/* 3. Teaching Philosophy cards */}
      <section className="space-y-8 pt-6">
        <h2 className="font-bold text-[#0F172A] dark:text-white text-2xl md:text-3xl text-center tracking-tight">
          Our Teaching Philosophy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {corePhilosophy.map((phil, idx) => (
            <motion.div
              key={phil.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-[#0F172A]/40 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
            >
              {/* Subtle top indicator line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/50 transition-all duration-300"></div>
              
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                {phil.icon}
              </div>
              <h3 className="font-space font-bold text-slate-900 dark:text-white text-base">
                {phil.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                {phil.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Future Milestones Roadmap Timeline */}
      <section className="space-y-8 pt-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] flex items-center justify-center gap-1.5">
            <Milestone className="w-4 h-4" />
            <span>Community Vision</span>
          </span>
          <h2 className="font-space font-black text-[#0F172A] dark:text-white text-2xl md:text-3xl tracking-tight">
            Future Community Plans
          </h2>
        </div>

        <div className="relative border-l-2 border-slate-100 dark:border-slate-800 max-w-3xl mx-auto pl-6 md:pl-8 py-2 space-y-8">
          {futureMilestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Dot indicator with custom design */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-950 shadow group-hover:scale-110 transition-transform" />
              
              <div className="space-y-1.5 bg-slate-50/50 dark:bg-slate-900/30 border border-transparent hover:border-slate-200/40 dark:hover:border-slate-800/40 p-4 md:p-5 rounded-2xl transition-all duration-300">
                <span className="text-[9px] font-mono font-bold text-[#10B981] uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  {m.date}
                </span>
                <h4 className="font-space font-bold text-[#0F172A] dark:text-white text-base md:text-lg">
                  {m.title}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. FAQs Interactive Accordion */}
      <section className="space-y-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <h2 className="font-space font-black text-[#0F172A] dark:text-white text-2xl md:text-3xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
            Quick responses to common questions about our teaching, source code access, and how to start your coding journey.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3.5">
          {FAQS.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className={`bg-white dark:bg-[#0F172A]/40 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-emerald-500/40 dark:border-emerald-500/30 shadow-md shadow-emerald-500/5'
                    : 'border-slate-200/80 dark:border-slate-800/80 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left text-slate-800 dark:text-slate-100 hover:text-[#10B981] transition-colors focus:outline-none cursor-pointer font-bold"
                >
                  <span className="font-space text-sm md:text-base leading-tight">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-[#10B981]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="p-4 md:p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed bg-slate-50/20 dark:bg-slate-900/10 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
