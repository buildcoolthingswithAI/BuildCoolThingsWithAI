/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ContactForm from '../components/ContactForm';
import { Mail, Github, Youtube, Linkedin, Twitter, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const socialCards = [
    {
      name: 'GitHub Repositories',
      desc: 'Browse, fork, and review complete production-ready source codes from all episodes.',
      btnLabel: 'Fork on GitHub',
      url: 'https://github.com/build-cool-things-with-ai',
      icon: <Github className="w-5 h-5 text-purple-500" />,
      colorClass: 'hover:border-purple-500/40 hover:shadow-purple-500/5'
    },
    {
      name: 'YouTube Channel',
      desc: 'Subscribe, join the live chats, and request custom builds during weekly drops.',
      btnLabel: 'Subscribe on YouTube',
      url: 'https://youtube.com/@buildcoolthingswithai',
      icon: <Youtube className="w-5 h-5 text-red-500" />,
      colorClass: 'hover:border-red-500/40 hover:shadow-red-500/5'
    },
    {
      name: 'Twitter (X) Updates',
      desc: 'Follow for micro-tips, UI animations, prompt tricks, and behind-the-scenes channel previews.',
      btnLabel: 'Follow on Twitter',
      url: 'https://twitter.com',
      icon: <Twitter className="w-5 h-5 text-sky-500" />,
      colorClass: 'hover:border-sky-500/40 hover:shadow-sky-500/5'
    },
    {
      name: 'LinkedIn Network',
      desc: 'Connect with Alex Rivera for commercial collaborations and career opportunities.',
      btnLabel: 'Connect on LinkedIn',
      url: 'https://linkedin.com',
      icon: <Linkedin className="w-5 h-5 text-blue-500" />,
      colorClass: 'hover:border-blue-500/40 hover:shadow-blue-500/5'
    }
  ];

  return (
    <div className="space-y-16">
      
      {/* Page Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-widest text-[#10B981] bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/15 inline-block"
        >
          Get In Touch
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl md:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white font-space"
        >
          Connect With Our Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans"
        >
          Have a project suggestion, commercial collaboration proposal, or just want to say hi? Fill out our form or connect through our verified socials.
        </motion.p>
      </div>

      {/* Main Grid: Form Left, Quick Info Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-7 bg-white dark:bg-[#0F172A]/40 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-sm"
        >
          <div className="space-y-2 mb-6">
            <h2 className="font-space font-bold text-[#0F172A] dark:text-white text-xl flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#10B981]" />
              <span>Send Us a Direct Message</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Fill out the fields below. Messages are logged and monitored daily by Alex Rivera.
            </p>
          </div>

          <ContactForm />
        </motion.div>

        {/* Brand Info (5 Columns) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-5 space-y-6"
        >
          
          {/* Card 1: Direct Support */}
          <div className="bg-slate-50/50 dark:bg-[#0F172A]/20 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 space-y-5">
            <h3 className="font-space font-bold text-[#0F172A] dark:text-white text-base">
              Direct Contact Details
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              If you prefer standard emails, you can reach out directly to our support inbox. We prioritize responding to video-suggestion issues and pull request queries.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#10B981] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono font-bold text-[9px] text-slate-400 uppercase tracking-wider">Official Email</span>
                  <a href="mailto:support@buildcoolthingswithai.com" className="hover:text-[#10B981] hover:underline transition-colors font-semibold text-xs font-mono">
                    support@buildcoolthingswithai.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#10B981] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-mono font-bold text-[9px] text-slate-400 uppercase tracking-wider">Business queries</span>
                  <a href="mailto:collabs@buildcoolthingswithai.com" className="hover:text-[#10B981] hover:underline transition-colors font-semibold text-xs font-mono">
                    collabs@buildcoolthingswithai.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Tip */}
          <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 dark:from-slate-900/60 dark:to-slate-950/80 text-white rounded-3xl border border-slate-800/80 space-y-3 shadow-xl">
            <h4 className="font-space font-bold text-white text-sm">
              Want custom code reviews?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              The fastest way to get code feedback is to file an issue on our active GitHub repository or join our Sunday livestream chats. We perform community live audits of submitted student code.
            </p>
          </div>

        </motion.div>

      </div>

      {/* Social Network Cards Grid */}
      <section className="space-y-8 pt-10 border-t border-slate-100 dark:border-slate-800/80">
        <h2 className="font-space font-black text-[#0F172A] dark:text-white text-xl md:text-3xl text-center tracking-tight">
          Explore Our Verified Networks
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {socialCards.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className={`bg-white dark:bg-[#0F172A]/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5.5 space-y-4 flex flex-col justify-between shadow-sm transition-all duration-300 ${card.colorClass}`}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950/60 flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0">
                  {card.icon}
                </div>
                <h3 className="font-space font-bold text-slate-900 dark:text-white text-sm">
                  {card.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold font-space text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  {card.btnLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
