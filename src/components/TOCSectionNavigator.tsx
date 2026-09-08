import React from 'react';
import { SECTIONS_INDEX, SectionInfo } from '../data/questionsData';
import { Chapter } from '../types';
import { FolderGit2, ChevronRight, Layers } from 'lucide-react';

interface TOCSectionNavigatorProps {
  currentChapter: Chapter | 'All';
  selectedTopic: string;
  onSelectTopic: (topic: string, chapter: Chapter) => void;
}

export const TOCSectionNavigator: React.FC<TOCSectionNavigatorProps> = ({
  currentChapter,
  selectedTopic,
  onSelectTopic,
}) => {
  const filteredSections = SECTIONS_INDEX.filter((s) => {
    if (currentChapter === 'All') return true;
    return s.chapter === currentChapter;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs mb-6">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            PDF Table of Contents Topics ({filteredSections.length})
          </h3>
        </div>
        <span className="text-[11px] text-slate-400">
          Click any topic to filter questions
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
        <button
          onClick={() => onSelectTopic('All Topics', currentChapter === 'All' ? 'Calculus' : currentChapter)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
            selectedTopic === 'All Topics'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Topics
        </button>

        {filteredSections.map((sec) => {
          const isSelected = selectedTopic === sec.title;
          return (
            <button
              key={sec.sectionId}
              onClick={() => onSelectTopic(sec.title, sec.chapter)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center space-x-1 shrink-0 ${
                isSelected
                  ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300'
              }`}
            >
              <span className="text-[10px] opacity-70 font-mono">{sec.sectionId}</span>
              <span>{sec.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {sec.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
