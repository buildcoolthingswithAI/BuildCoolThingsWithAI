/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Episode } from '../types';
import { EPISODES } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Calendar, Clock, Play, Bookmark, BookmarkCheck, AlertCircle, FileText, X, Sparkles, Send } from 'lucide-react';

interface EpisodesProps {
  initialFilter?: string;
}

export default function Episodes({ initialFilter }: EpisodesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedBlueprint, setSelectedBlueprint] = useState<Episode | null>(null);
  
  // Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bctwai_bookmarked_episodes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // If initialFilter was passed (from roadmap step jump), set corresponding states
  useEffect(() => {
    if (initialFilter) {
      // Find the episode to see if initialFilter represents an ID
      const matchingEp = EPISODES.find(e => e.id === initialFilter);
      if (matchingEp) {
        setSearchQuery(matchingEp.title.split(' ')[0] || '');
      } else {
        setSelectedTag(initialFilter);
      }
    }
  }, [initialFilter]);

  // Handle bookmarking
  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const isBookmarked = prev.includes(id);
      const updated = isBookmarked ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('bctwai_bookmarked_episodes', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Extract all tags for filter list
  const allTags = ['All', ...Array.from(new Set(EPISODES.flatMap(e => e.tags)))];

  // Filtering Logic
  const filteredEpisodes = EPISODES.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          episode.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || episode.tags.includes(selectedTag);
    const matchesBookmark = !showBookmarksOnly || bookmarkedIds.includes(episode.id);

    return matchesSearch && matchesTag && matchesBookmark;
  });

  return (
    <div className="space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
          Video Catalog
        </span>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F172A] dark:text-white" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
          YouTube Episode Masterclasses
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Browse through all of our video guides. Learn backend systems, state architecture, user security, and intelligent interfaces step-by-step.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="space-y-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-inner">
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
              placeholder="Search episodes by title, topic..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] text-[#0F172A] dark:text-slate-100 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Bookmarks toggle */}
          <button
            onClick={() => setShowBookmarksOnly(prev => !prev)}
            className={`w-full md:w-auto px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              showBookmarksOnly
                ? 'bg-[#10B981] border-[#10B981] text-white shadow-md'
                : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            {showBookmarksOnly ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>Bookmarked Only ({bookmarkedIds.length})</span>
          </button>

        </div>

        {/* Tag Filters list */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by technology</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#10B981] text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Episodes Grid with animations */}
      <AnimatePresence mode="popLayout">
        {filteredEpisodes.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredEpisodes.map((episode, idx) => {
              const isBookmarked = bookmarkedIds.includes(episode.id);
              return (
                <motion.article
                  key={episode.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                  className="group bg-white dark:bg-[#0F172A]/40 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between relative"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500/60 transition-all duration-500"></div>

                  <div>
                    {/* Thumbnail video player/image with hover effect */}
                    {episode.youtubeId ? (
                      <div className="aspect-video bg-slate-950 relative overflow-hidden group/thumb">
                        {/* Dynamic YouTube High Quality MQ Thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${episode.youtubeId}/mqdefault.jpg`}
                          alt={episode.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Dark overlay with dynamic play button glow */}
                        <div className="absolute inset-0 bg-slate-950/20 group-hover/thumb:bg-slate-950/40 transition-colors flex items-center justify-center">
                          <motion.a
                            href={episode.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, backgroundColor: '#b91c1c' }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300"
                          >
                            <Play className="w-5 h-5 fill-current translate-x-0.5" />
                          </motion.a>
                        </div>

                        {/* Episode Badge left-top */}
                        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-xl bg-slate-950/90 text-[10px] font-bold font-space text-white uppercase tracking-wider shadow-sm">
                          EP {episode.number}
                        </span>

                        {/* Duration Badge right-bottom */}
                        <span className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-slate-950/90 text-[10px] font-mono text-white shadow-sm border border-slate-800/20">
                          {episode.duration}
                        </span>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden group/draft flex flex-col justify-center items-center p-6 text-center">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[#10B981] flex items-center justify-center mb-3 group-hover/draft:scale-110 transition-transform">
                          <Clock className="w-6 h-6 animate-pulse" />
                        </div>
                        <span className="text-[9px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-lg mb-1.5 font-mono">
                          Draft Resource Live
                        </span>
                        <p className="text-xs text-slate-400 font-medium font-sans">
                          Official Blueprint Available Below
                        </p>

                        {/* Episode Badge left-top */}
                        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-xl bg-slate-950/90 text-[10px] font-bold font-space text-white uppercase tracking-wider shadow-sm">
                          EP {episode.number}
                        </span>

                        {/* Duration Badge right-bottom */}
                        <span className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-slate-950/90 text-[10px] font-mono text-white shadow-sm">
                          {episode.duration}
                        </span>
                      </div>
                    )}

                    {/* Meta info & text details */}
                    <div className="p-6 md:p-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(episode.publishDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleBookmark(episode.id)}
                          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark episode"}
                          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-[#10B981] transition-colors cursor-pointer"
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 text-[#10B981]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <h3 className="font-space font-bold text-[#0F172A] dark:text-white text-lg md:text-xl leading-snug group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        <a href={episode.youtubeUrl} target="_blank" rel="noopener noreferrer">
                          {episode.title}
                        </a>
                      </h3>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {episode.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags and CTA */}
                  <div className="p-6 md:p-7 pt-0 space-y-5">
                    <div className="flex flex-wrap gap-1.5">
                      {episode.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all font-mono cursor-pointer ${
                            selectedTag === tag
                              ? 'bg-[#10B981] text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-transparent dark:border-slate-800/40'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                      {episode.youtubeId ? (
                        <motion.a
                          href={episode.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, backgroundColor: '#dc2626' }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white text-xs font-semibold font-space rounded-xl transition-colors shadow-sm cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Video</span>
                        </motion.a>
                      ) : (
                        <motion.a
                          href={episode.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold font-space rounded-xl transition-colors cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Visit Channel</span>
                        </motion.a>
                      )}
                      
                      <div className="flex items-center gap-3.5 justify-between sm:justify-end">
                        {episode.hasBlueprint && (
                          <motion.button
                            onClick={() => setSelectedBlueprint(episode)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/15 text-[#10B981] text-xs font-bold rounded-xl transition-colors cursor-pointer border border-emerald-500/10"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Blueprint</span>
                          </motion.button>
                        )}
                        <a
                          href="https://github.com/CyderCoder"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-slate-500 hover:text-[#10B981] dark:text-slate-400 dark:hover:text-[#10B981] transition-colors"
                        >
                          Source Code
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 text-center space-y-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-space font-bold text-slate-950 dark:text-white text-base">
                No Masterclasses Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                We couldn't find any episodes matching your search queries or filter categories. Try resetting the filters or check your spelling.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('All');
                  setShowBookmarksOnly(false);
                }}
                className="px-4 py-2 bg-[#10B981] text-white rounded-xl text-xs font-bold hover:bg-[#059669] transition-colors cursor-pointer"
              >
                Reset Filter Settings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blueprint Resource Modal */}
      <AnimatePresence>
        {selectedBlueprint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#10B981] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider block">EP {selectedBlueprint.number} Resource</span>
                    <h2 className="font-space font-bold text-[#0F172A] dark:text-white text-base">
                      Official Project Blueprint
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBlueprint(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans scrollbar-thin">
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50 font-mono">
                    This specification acts as the structural foundation for Episode {selectedBlueprint.number} of Build Cool Things With AI.
                  </p>
                  
                  {/* Parsing & Displaying Content */}
                  <div className="space-y-6">
                    {selectedBlueprint.blueprintContent?.split('\n\n').map((section, idx) => {
                      if (section.startsWith('# ')) {
                        return (
                          <h1 key={idx} className="text-base font-bold font-space text-[#0F172A] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 pt-2 text-center text-emerald-600 dark:text-[#10B981]">
                            {section.replace('# ', '')}
                          </h1>
                        );
                      }
                      if (section.startsWith('## ')) {
                        const lines = section.split('\n');
                        const header = lines[0].replace('## ', '');
                        const bodyLines = lines.slice(1);
                        return (
                          <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl space-y-2">
                            <h3 className="font-space font-bold text-[#0F172A] dark:text-white text-xs uppercase tracking-wider text-[#10B981] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {header}
                            </h3>
                            <div className="space-y-1.5 pl-3.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                              {bodyLines.map((line, lIdx) => {
                                if (line.trim().startsWith('* ')) {
                                  return (
                                    <div key={lIdx} className="flex items-start gap-1.5">
                                      <span className="text-[#10B981] mt-1">•</span>
                                      <span>{line.replace('* ', '')}</span>
                                    </div>
                                  );
                                }
                                if (line.trim().match(/^\d+\./)) {
                                  return (
                                    <div key={lIdx} className="flex items-start gap-1.5">
                                      <span className="text-[#10B981] font-bold">{line.match(/^\d+\./)?.[0]}</span>
                                      <span>{line.replace(/^\d+\.\s*/, '')}</span>
                                    </div>
                                  );
                                }
                                return <p key={lIdx}>{line}</p>;
                              })}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <p key={idx} className="text-xs whitespace-pre-line font-mono bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                          {section}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end bg-slate-50 dark:bg-slate-900/50 gap-3">
                <button
                  onClick={() => {
                    if (selectedBlueprint.blueprintContent) {
                      navigator.clipboard.writeText(selectedBlueprint.blueprintContent);
                    }
                  }}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 text-[#10B981] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Copy Raw Specification</span>
                </button>
                <button
                  onClick={() => setSelectedBlueprint(null)}
                  className="px-5 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close Spec
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
