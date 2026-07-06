/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { AlertTriangle, Terminal, ArrowLeft, RefreshCw, Cpu } from 'lucide-react';
import { useState } from 'react';

interface NotFoundProps {
  onNavigate: (page: PageId) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  const [attempts, setAttempts] = useState(0);
  const [statusMessage, setStatusMessage] = useState('CRITICAL_ERR_PAGE_NOT_FOUND: The requested route token could not be parsed by our React router.');

  const quotes = [
    "Even state-of-the-art models hallucinate sometimes. This path does not exist.",
    "Error 404: Prompt context exceeded. Please reset your routing queries.",
    "Alex forgot to build this specific edge-case. Let's redirect you back to safety.",
    "The neural network scanned our site, but returned 0.0 confidence score for this URL."
  ];

  const handleQueryRetry = () => {
    setAttempts(p => p + 1);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setStatusMessage(`[Attempt ${attempts + 1}] Re-querying database... Result: ${randomQuote}`);
  };

  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-8">
      {/* Alert Graphic */}
      <div className="relative inline-block">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-white dark:border-slate-950 text-white text-xs flex items-center justify-center font-bold">
          404
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-[#0F172A] dark:text-white" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
          Route Resolution Failure
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          The prompt or URL query you entered resulted in a dead end. Let's inspect the system logs.
        </p>
      </div>

      {/* Retro developer diagnostic terminal */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left font-mono text-[11px] leading-relaxed text-slate-300 shadow-xl space-y-3">
        <div className="flex items-center gap-1.5 border-b border-slate-900 pb-2 text-slate-500">
          <Terminal className="w-4 h-4 text-[#10B981]" />
          <span>router_diagnostics.log</span>
        </div>
        <div className="space-y-1.5">
          <p className="text-[#10B981]">&gt; python check_integrity.py --url={window.location.pathname}</p>
          <p className="text-slate-500">Connecting to client-router...</p>
          <p className="text-red-400">Error: {statusMessage}</p>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('home')}
          className="w-full sm:w-auto px-5 py-3 bg-[#10B981] text-white rounded-xl text-xs font-bold hover:bg-[#059669] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Back Home</span>
        </button>
        <button
          onClick={handleQueryRetry}
          className="w-full sm:w-auto px-5 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl text-xs font-semibold font-space text-slate-600 dark:text-slate-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Re-Query Endpoint</span>
        </button>
      </div>

    </div>
  );
}
