import React from 'react';
import { BookOpen, Download, HelpCircle, FileSpreadsheet, Sparkles, KeyRound } from 'lucide-react';
import { Chapter } from '../types';

interface HeaderProps {
  activeTab: 'solutions' | 'practice' | 'custom' | 'formulas' | 'answerKeys';
  setActiveTab: (tab: 'solutions' | 'practice' | 'custom' | 'formulas' | 'answerKeys') => void;
  onOpenPdfModal: () => void;
  selectedChapter: Chapter | 'All';
  setSelectedChapter: (c: Chapter | 'All') => void;
  totalCalculus: number;
  totalLinearAlgebra: number;
  totalProbability: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPdfModal,
  selectedChapter,
  setSelectedChapter,
  totalCalculus,
  totalLinearAlgebra,
  totalProbability,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-serif">
                GATE Mathematics Solutions
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                1987 – 2024 Archive
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Complete step-by-step derivations & printable solutions PDF
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            id="open-pdf-modal-btn"
            onClick={onOpenPdfModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Download Solutions PDF document"
          >
            <Download className="w-4 h-4" />
            <span>Download Solutions PDF</span>
          </button>

          <button
            id="tab-custom-solver"
            onClick={() => setActiveTab('custom')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'custom'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Problem Solver</span>
          </button>

          <button
            id="tab-answer-keys"
            onClick={() => setActiveTab('answerKeys')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'answerKeys'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
            <span>Answer Keys (497)</span>
          </button>

          <button
            id="tab-formulas"
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'formulas'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-sky-400" />
            <span>Formulas Sheet</span>
          </button>
        </div>
      </div>

      {/* Chapter Navigation & Summary Counters */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-1 overflow-x-auto py-0.5">
            <span className="text-slate-400 mr-2 font-medium hidden sm:inline">Chapter:</span>
            {(['All', 'Calculus', 'Linear Algebra', 'Probability'] as const).map((chap) => {
              const isActive = selectedChapter === chap;
              let count = 0;
              if (chap === 'Calculus') count = totalCalculus;
              else if (chap === 'Linear Algebra') count = totalLinearAlgebra;
              else if (chap === 'Probability') count = totalProbability;
              else count = totalCalculus + totalLinearAlgebra + totalProbability;

              return (
                <button
                  key={chap}
                  onClick={() => {
                    setSelectedChapter(chap);
                    if (activeTab !== 'solutions' && activeTab !== 'practice') {
                      setActiveTab('solutions');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center space-x-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-indigo-500 text-white font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{chap}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mode Switch: Study Solutions vs Test Yourself */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('solutions')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeTab === 'solutions'
                  ? 'bg-slate-800 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Study Solutions
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeTab === 'practice'
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Practice Quiz
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
