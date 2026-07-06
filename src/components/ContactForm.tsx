/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, Send, CheckCircle2, MessageSquare, History, Trash2 } from 'lucide-react';
import { ContactSubmission } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionHistory, setSubmissionHistory] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('bctwai_contact_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormError('Please fill in all fields before submitting.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission delay (1.2s)
    setTimeout(() => {
      const newSubmission: ContactSubmission = {
        id: `sub-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      try {
        const updatedHistory = [newSubmission, ...submissionHistory];
        localStorage.setItem('bctwai_contact_submissions', JSON.stringify(updatedHistory));
        setSubmissionHistory(updatedHistory);
      } catch (err) {
        console.error("Failed to save to localStorage", err);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('bctwai_contact_submissions');
      setSubmissionHistory([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Tab toggle */}
      <div className="flex border-b border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => setShowHistory(false)}
          className={`pb-3 text-sm font-space font-bold transition-all border-b-2 px-4 -mb-[2px] cursor-pointer ${
            !showHistory
              ? 'border-emerald-500 text-emerald-500 font-extrabold'
              : 'border-transparent text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        >
          Send a Message
        </button>
        {submissionHistory.length > 0 && (
          <button
            onClick={() => setShowHistory(true)}
            className={`pb-3 text-sm font-space font-bold transition-all border-b-2 px-4 -mb-[2px] flex items-center gap-2 cursor-pointer ${
              showHistory
                ? 'border-emerald-500 text-emerald-500 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Submission Logs ({submissionHistory.length})</span>
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!showHistory ? (
          <motion.div
            key="contact-form-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {submitSuccess ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-sm"
              >
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto text-[#10B981]">
                  <CheckCircle2 className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-space font-bold text-slate-900 dark:text-white text-lg md:text-xl">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm max-w-md mx-auto font-sans leading-relaxed">
                    Thank you for reaching out. Your message has been logged, and Alex or a team member will review it and reply as soon as possible.
                  </p>
                </div>
                <div className="pt-3">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-3 rounded-xl text-xs font-bold font-space bg-[#10B981] hover:bg-[#059669] text-white shadow-md shadow-emerald-500/10 transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formError && (
                  <div className="p-3 bg-red-500/5 border border-red-500/20 text-red-600 dark:text-red-400 text-xs rounded-xl font-medium font-sans">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-space font-bold text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/60 dark:bg-[#0F172A]/30 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-xs md:text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 text-slate-800 dark:text-slate-100 transition-all placeholder:text-slate-400/80 font-sans"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-space font-bold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/60 dark:bg-[#0F172A]/30 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-xs md:text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 text-slate-800 dark:text-slate-100 transition-all placeholder:text-slate-400/80 font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="form-subject" className="text-xs font-space font-bold text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <input
                      id="form-subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Project suggestion / Collaboration request"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50/60 dark:bg-[#0F172A]/30 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-xs md:text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 text-slate-800 dark:text-slate-100 transition-all placeholder:text-slate-400/80 font-sans"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="form-message" className="text-xs font-space font-bold text-slate-700 dark:text-slate-300">
                    Your Message
                  </label>
                  <textarea
                    id="form-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about what you are building, or what you would like to see covered on the channel..."
                    className="w-full p-4 bg-slate-50/60 dark:bg-[#0F172A]/30 border border-slate-200/80 dark:border-slate-800/80 rounded-xl text-xs md:text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 text-slate-800 dark:text-slate-100 transition-all placeholder:text-slate-400/80 resize-none font-sans"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs md:text-sm font-bold font-space shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="submission-history-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Sent message logs saved to your local browser storage:
              </span>
              <button
                onClick={handleClearHistory}
                className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 font-medium transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All Logs</span>
              </button>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {submissionHistory.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs md:text-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h5 className="font-space font-semibold text-slate-800 dark:text-slate-200">
                        {sub.subject}
                      </h5>
                      <span className="text-slate-500">From: {sub.name} ({sub.email})</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">{sub.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800/40">
                    {sub.message}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
