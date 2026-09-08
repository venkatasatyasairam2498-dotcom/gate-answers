import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { Chapter, FilterState } from '../types';
import { SECTIONS_INDEX } from '../data/questionsData';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableTopics: string[];
  totalQuestionsCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  availableTopics,
  totalQuestionsCount,
  filteredCount,
}) => {
  const handleReset = () => {
    setFilters({
      search: '',
      chapter: 'All',
      topic: 'All Topics',
      branch: 'All Branches',
      questionType: 'All Types',
    });
  };

  const branches = ['All Branches', 'CSE', 'ECE', 'ME', 'EE', 'Civil', 'Chemical', 'IN', 'BT', 'DA'];
  const questionTypes = ['All Types', 'MCQ', 'NAT', 'MSQ'];

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="question-search-input"
            type="text"
            placeholder="Search by keyword, formula, question ID (e.g. 1.0.4, 2.3.8, 3.2.4), or topic..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
          {filters.search && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Topic Select */}
          <div className="relative">
            <select
              id="filter-topic-select"
              value={filters.topic}
              onChange={(e) => setFilters((prev) => ({ ...prev, topic: e.target.value }))}
              className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium"
            >
              <option value="All Topics">All Topics ({availableTopics.length})</option>
              {availableTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Branch Select */}
          <div className="relative">
            <select
              id="filter-branch-select"
              value={filters.branch}
              onChange={(e) => setFilters((prev) => ({ ...prev, branch: e.target.value }))}
              className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium"
            >
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Type Select */}
          <div className="relative">
            <select
              id="filter-type-select"
              value={filters.questionType}
              onChange={(e) => setFilters((prev) => ({ ...prev, questionType: e.target.value }))}
              className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium"
            >
              {questionTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          {(filters.search ||
            filters.topic !== 'All Topics' ||
            filters.branch !== 'All Branches' ||
            filters.questionType !== 'All Types') && (
            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-2.5 py-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Results Badge */}
          <div className="px-2.5 py-1.5 bg-slate-100 rounded-lg text-slate-600 font-medium">
            Showing <strong className="text-slate-900">{filteredCount}</strong> of {totalQuestionsCount}
          </div>
        </div>
      </div>
    </div>
  );
};
