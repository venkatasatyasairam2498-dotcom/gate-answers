import React, { useState } from 'react';
import { OFFICIAL_ANSWER_KEYS } from '../data/answerKeys';
import { Search, KeyRound, ArrowRight, BookOpen } from 'lucide-react';
import { Chapter } from '../types';

interface AnswerKeysTableModalProps {
  onSelectQuestionId?: (id: string) => void;
  onRequestSolve?: (id: string) => void;
}

export const AnswerKeysTableModal: React.FC<AnswerKeysTableModalProps> = ({
  onSelectQuestionId,
  onRequestSolve,
}) => {
  const [search, setSearch] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | 'All'>('All');

  const allEntries = Object.entries(OFFICIAL_ANSWER_KEYS).map(([id, key]) => {
    let chapter: Chapter = 'Calculus';
    if (id.startsWith('2.')) chapter = 'Linear Algebra';
    else if (id.startsWith('3.')) chapter = 'Probability';
    return { id, key, chapter };
  });

  const filteredEntries = allEntries.filter((item) => {
    const matchesChapter = selectedChapter === 'All' || item.chapter === selectedChapter;
    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.key.toLowerCase().includes(search.toLowerCase()) ||
      item.chapter.toLowerCase().includes(search.toLowerCase());
    return matchesChapter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <KeyRound className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                GATE Mathematics Complete Official Answer Keys (497 Questions)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Directly extracted from pages 47-48 (Calculus), 89-90 (Linear Algebra), and 109-110 (Probability) of the exam booklet.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg border border-indigo-200">
              Total 497 Keys
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by question ID (e.g. 1.0.1, 2.3.8, 3.14.5) or answer key value..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 w-full sm:w-auto">
            {(['All', 'Calculus', 'Linear Algebra', 'Probability'] as const).map((chap) => (
              <button
                key={chap}
                onClick={() => setSelectedChapter(chap)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedChapter === chap
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {chap}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Keys */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {filteredEntries.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-lg p-3 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-indigo-700 font-mono">Q {item.id}</span>
              <span className="text-[10px] text-slate-400 font-medium">
                {item.chapter === 'Linear Algebra' ? 'Linear Alg' : item.chapter}
              </span>
            </div>

            <div className="text-sm font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded text-center my-1.5 border border-emerald-200/80">
              {item.key}
            </div>

            {onRequestSolve && (
              <button
                onClick={() => onRequestSolve(item.id)}
                className="mt-1 w-full text-[11px] text-slate-600 hover:text-indigo-600 hover:bg-slate-50 py-1 rounded font-medium flex items-center justify-center space-x-1 border border-transparent hover:border-slate-200"
              >
                <span>View Solution</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          No question keys found matching "{search}".
        </div>
      )}
    </div>
  );
};
