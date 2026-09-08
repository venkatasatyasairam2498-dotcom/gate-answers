import React, { useState, useMemo, useEffect } from 'react';
import { CURATED_QUESTIONS, SECTIONS_INDEX } from './data/questionsData';
import { OFFICIAL_ANSWER_KEYS } from './data/answerKeys';
import { Question, Chapter, FilterState } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TOCSectionNavigator } from './components/TOCSectionNavigator';
import { QuestionCard } from './components/QuestionCard';
import { PdfExportModal } from './components/PdfExportModal';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { AnswerKeysTableModal } from './components/AnswerKeysTableModal';
import { CustomProblemSolver } from './components/CustomProblemSolver';
import { Download, Sparkles, BookOpen, KeyRound, Award, CheckCircle, RefreshCw } from 'lucide-react';
import { generateSolutionsPdf } from './utils/pdfGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'solutions' | 'practice' | 'custom' | 'formulas' | 'answerKeys'>('solutions');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | 'All'>('All');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    chapter: 'All',
    topic: 'All Topics',
    branch: 'All Branches',
    questionType: 'All Types',
  });

  // Bookmarks stored in local storage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gate_math_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gate_math_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const handleBookmarkToggle = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  // Sync selectedChapter with filters
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      chapter: selectedChapter,
      topic: 'All Topics', // reset topic when switching chapter
    }));
  }, [selectedChapter]);

  // Extract available topics for current chapter
  const availableTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    CURATED_QUESTIONS.forEach((q) => {
      if (selectedChapter === 'All' || q.chapter === selectedChapter) {
        topicsSet.add(q.topic);
      }
    });
    return Array.from(topicsSet).sort();
  }, [selectedChapter]);

  // Filtered Questions list
  const filteredQuestions = useMemo(() => {
    return CURATED_QUESTIONS.filter((q) => {
      // Chapter filter
      if (selectedChapter !== 'All' && q.chapter !== selectedChapter) {
        return false;
      }

      // Topic filter
      if (filters.topic !== 'All Topics' && q.topic !== filters.topic) {
        return false;
      }

      // Branch filter
      if (filters.branch !== 'All Branches' && q.branch !== filters.branch) {
        return false;
      }

      // Type filter
      if (filters.questionType !== 'All Types' && q.questionType !== filters.questionType) {
        return false;
      }

      // Search text query
      if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        const matchesId = q.id.toLowerCase().includes(query);
        const matchesTopic = q.topic.toLowerCase().includes(query);
        const matchesExam = q.exam.toLowerCase().includes(query);
        const matchesText = q.questionText.toLowerCase().includes(query);
        const matchesSolution = q.detailedSolution.toLowerCase().includes(query);
        const matchesFormulas = q.keyFormulas?.some((f) => f.toLowerCase().includes(query));

        if (!matchesId && !matchesTopic && !matchesExam && !matchesText && !matchesSolution && !matchesFormulas) {
          return false;
        }
      }

      return true;
    });
  }, [selectedChapter, filters]);

  // Quick Direct PDF Download of current filtered set
  const handleDirectPdfDownload = () => {
    const doc = generateSolutionsPdf(filteredQuestions, {
      title: `GATE MATHEMATICS SOLUTIONS: ${selectedChapter.toUpperCase()}`,
      subtitle: 'Complete Derivations & Verified Answer Keys',
      chapterFilter: selectedChapter === 'All' ? undefined : selectedChapter,
      includeSolutions: true,
      includeKeyFormulas: true,
      includeExamTips: true,
    });
    doc.save(`GATE_Math_Solutions_${selectedChapter}.pdf`);
  };

  const handleSelectFromTOC = (topicName: string, chap: Chapter) => {
    setSelectedChapter(chap);
    setFilters((prev) => ({
      ...prev,
      chapter: chap,
      topic: topicName,
    }));
    setActiveTab('solutions');
  };

  const handleSelectQuestionFromKeys = (id: string) => {
    // Set search to ID
    setFilters((prev) => ({
      ...prev,
      search: id,
    }));
    setActiveTab('solutions');
  };

  // Chapter Question counts according to PDF index
  const totalCalculus = 218;
  const totalLinearAlgebra = 186;
  const totalProbability = 93;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
        totalCalculus={totalCalculus}
        totalLinearAlgebra={totalLinearAlgebra}
        totalProbability={totalProbability}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* TAB 1 & 2: SOLUTIONS EXPLORER & PRACTICE MODE */}
        {(activeTab === 'solutions' || activeTab === 'practice') && (
          <div>
            {/* Filter Bar */}
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              availableTopics={availableTopics}
              totalQuestionsCount={CURATED_QUESTIONS.length}
              filteredCount={filteredQuestions.length}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              {/* Table of Contents Topic Carousel */}
              <TOCSectionNavigator
                currentChapter={selectedChapter}
                selectedTopic={filters.topic}
                onSelectTopic={(t, c) => handleSelectFromTOC(t, c)}
              />

              {/* Practice Mode Intro Banner */}
              {activeTab === 'practice' && (
                <div className="mb-6 p-4 rounded-xl bg-indigo-900 text-white flex items-center justify-between shadow-xs">
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-amber-400" />
                    <div>
                      <h3 className="font-bold text-sm sm:text-base font-serif">
                        GATE Examination Self-Test Mode
                      </h3>
                      <p className="text-xs text-indigo-200">
                        Test your problem-solving speed. Select your answers, check them against the official answer keys, and reveal in-depth mathematical derivations!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions Bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-slate-500 font-medium">
                  Viewing {filteredQuestions.length} questions in{' '}
                  <strong className="text-slate-800">{selectedChapter}</strong>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleDirectPdfDownload}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Download PDF ({filteredQuestions.length})</span>
                  </button>
                </div>
              </div>

              {/* Questions List */}
              {filteredQuestions.length > 0 ? (
                <div className="space-y-4">
                  {filteredQuestions.map((q) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      isPracticeMode={activeTab === 'practice'}
                      isBookmarked={bookmarks.includes(q.id)}
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center my-6">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">
                    No questions matched your current filter criteria
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                    Try clearing the search text or resetting topics. You can also paste this exact question into our AI Problem Solver to generate an instant solution!
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        search: '',
                        chapter: 'All',
                        topic: 'All Topics',
                        branch: 'All Branches',
                        questionType: 'All Types',
                      });
                      setSelectedChapter('All');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM PROBLEM AI SOLVER */}
        {activeTab === 'custom' && <CustomProblemSolver />}

        {/* TAB 4: FORMULAS SHEET */}
        {activeTab === 'formulas' && <FormulaSheetModal />}

        {/* TAB 5: OFFICIAL ANSWER KEYS TABLE */}
        {activeTab === 'answerKeys' && (
          <AnswerKeysTableModal
            onSelectQuestionId={handleSelectQuestionFromKeys}
            onRequestSolve={(id) => {
              // Check if we have curated question
              const found = CURATED_QUESTIONS.find((q) => q.id === id);
              if (found) {
                setFilters((prev) => ({ ...prev, search: id }));
                setActiveTab('solutions');
              } else {
                // Open Custom solver with question id
                setActiveTab('custom');
              }
            }}
          />
        )}
      </main>

      {/* PDF Export Customization Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        allQuestions={CURATED_QUESTIONS}
        currentFilteredQuestions={filteredQuestions}
        selectedChapter={selectedChapter}
      />
    </div>
  );
}
