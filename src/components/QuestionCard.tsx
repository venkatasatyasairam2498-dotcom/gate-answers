import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  Zap,
  Send,
  Loader2,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  isPracticeMode?: boolean;
  onBookmarkToggle?: (id: string) => void;
  isBookmarked?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isPracticeMode = false,
  onBookmarkToggle,
  isBookmarked = false,
}) => {
  const [showSolution, setShowSolution] = useState(!isPracticeMode);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [natAnswer, setNatAnswer] = useState('');

  // AI Generation state
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSolution, setAiSolution] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Doubt Chat state
  const [doubtQuery, setDoubtQuery] = useState('');
  const [isAskingDoubt, setIsAskingDoubt] = useState(false);
  const [doubtHistory, setDoubtHistory] = useState<{ query: string; reply: string }[]>([]);
  const [showDoubtBox, setShowDoubtBox] = useState(false);

  const handleSelectOption = (label: string) => {
    if (userSubmitted && isPracticeMode) return;
    setSelectedOption(label);
  };

  const handleSubmitPractice = () => {
    setUserSubmitted(true);
    setShowSolution(true);
  };

  const handleGenerateAiSolution = async () => {
    setIsGeneratingAi(true);
    setAiError(null);
    try {
      const optionsText = question.options
        ? question.options.map((o) => `(${o.label}) ${o.text}`).join('\n')
        : '';

      const res = await fetch('/api/generate-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          questionText: question.questionText,
          chapter: question.chapter,
          topic: question.topic,
          officialAnswer: question.officialAnswer,
          options: optionsText,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate solution');
      }
      setAiSolution(data.solution);
      setShowSolution(true);
    } catch (err: any) {
      setAiError(err.message || 'Error communicating with AI service');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleAskDoubt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuery.trim()) return;

    const currentQuery = doubtQuery;
    setDoubtQuery('');
    setIsAskingDoubt(true);

    try {
      const context = `Problem ID: ${question.id}
Exam: ${question.exam}
Topic: ${question.topic}
Problem: ${question.questionText}
Official Key: ${question.officialAnswer}
Solution: ${question.detailedSolution}`;

      const res = await fetch('/api/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionContext: context,
          userQuery: currentQuery,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer for doubt');
      }

      setDoubtHistory((prev) => [...prev, { query: currentQuery, reply: data.reply }]);
    } catch (err: any) {
      setDoubtHistory((prev) => [
        ...prev,
        { query: currentQuery, reply: `⚠️ Error: ${err.message}` },
      ]);
    } finally {
      setIsAskingDoubt(false);
    }
  };

  // Determine correct answer styling in Practice mode
  const isMcq = question.questionType === 'MCQ';
  const isCorrect = selectedOption === question.officialAnswer;

  return (
    <div
      id={`question-card-${question.id}`}
      className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden mb-6"
    >
      {/* Question Header Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2.5">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-600 text-white shadow-xs">
            {question.id}
          </span>
          <span className="text-xs font-semibold text-slate-700">{question.topic}</span>
          <span className="text-xs px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-medium">
            {question.chapter}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium">
            {question.questionType}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-medium">{question.exam}</span>
          {onBookmarkToggle && (
            <button
              onClick={() => onBookmarkToggle(question.id)}
              className="p-1 rounded-md text-slate-400 hover:text-amber-500 hover:bg-slate-100 transition-colors"
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Question Body */}
      <div className="p-5 sm:p-6">
        {/* Question Statement */}
        <div className="text-slate-800 text-sm sm:text-base font-normal leading-relaxed font-sans mb-5 whitespace-pre-line">
          {question.questionText}
        </div>

        {/* Options (MCQ) */}
        {question.options && question.options.length > 0 && (
          <div className="space-y-2.5 mb-5">
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt.label;
              const isOfficialKey = opt.label === question.officialAnswer;

              let optionClasses =
                'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300 text-slate-700';

              if (userSubmitted || !isPracticeMode) {
                if (isOfficialKey) {
                  optionClasses =
                    'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-medium ring-1 ring-emerald-500';
                } else if (isSelected && !isOfficialKey) {
                  optionClasses =
                    'border-rose-400 bg-rose-50 text-rose-800 line-through opacity-80';
                }
              } else if (isSelected) {
                optionClasses =
                  'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-medium ring-1 ring-indigo-500';
              }

              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption(opt.label)}
                  disabled={userSubmitted && isPracticeMode}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs sm:text-sm flex items-start space-x-3 transition-all ${optionClasses}`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold shrink-0 mt-0.5 ${
                      (userSubmitted || !isPracticeMode) && isOfficialKey
                        ? 'bg-emerald-600 text-white'
                        : isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span className="flex-1 font-mono">{opt.text}</span>
                  {(userSubmitted || !isPracticeMode) && isOfficialKey && (
                    <span className="inline-flex items-center text-xs text-emerald-700 font-semibold shrink-0">
                      <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                      Official Key
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* NAT Input if in Practice Mode */}
        {isPracticeMode && !isMcq && (
          <div className="mb-5 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Enter Numerical Answer:
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="e.g. 3.00, 0.25, -2..."
                value={natAnswer}
                onChange={(e) => setNatAnswer(e.target.value)}
                disabled={userSubmitted}
                className="px-3 py-1.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 font-mono"
              />
              <span className="text-xs text-slate-500">
                (Numerical Answer Type - NAT)
              </span>
            </div>
          </div>
        )}

        {/* Practice Mode Submit / Check Button */}
        {isPracticeMode && !userSubmitted && (
          <div className="mb-4">
            <button
              onClick={handleSubmitPractice}
              disabled={!selectedOption && !natAnswer}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              Verify Answer & Reveal Solution
            </button>
          </div>
        )}

        {/* Official Answer Key Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold mb-4">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Official Answer Key:{' '}
              <strong className="text-emerald-800 text-sm font-bold underline decoration-emerald-400">
                {isMcq ? `Option (${question.officialAnswer})` : question.officialAnswer}
              </strong>
            </span>
            {question.answerRange && (
              <span className="ml-1 text-xs text-emerald-700 font-normal">
                (Accepted range: {question.answerRange})
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSolution((prev) => !prev)}
              className="flex items-center space-x-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline decoration-dotted"
            >
              <span>{showSolution ? 'Hide Solution' : 'View Step-by-Step Derivation'}</span>
              {showSolution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Step-by-Step Derivation */}
        {showSolution && (
          <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
            {/* Key Formulas Box */}
            {question.keyFormulas && question.keyFormulas.length > 0 && (
              <div className="p-3.5 rounded-lg bg-indigo-50/70 border border-indigo-100">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-900 mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>GOVERNING FORMULAS & THEOREMS</span>
                </div>
                <ul className="space-y-1 text-xs text-indigo-950 font-mono">
                  {question.keyFormulas.map((f, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Mathematical Steps */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Step-by-Step Mathematical Solution</span>
                <span className="text-[11px] font-normal text-slate-500">Verified against GATE archive</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-800 font-sans leading-relaxed whitespace-pre-line space-y-2">
                {question.detailedSolution}
              </div>
            </div>

            {/* Exam Shortcut Tip */}
            {question.shortcutTips && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-950">GATE 3-Hour Exam Shortcut: </strong>
                  <span>{question.shortcutTips}</span>
                </div>
              </div>
            )}

            {/* Common Pitfalls Warning */}
            {question.commonPitfalls && (
              <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200 text-xs text-rose-900 flex items-start space-x-2">
                <span className="font-bold text-rose-600 shrink-0">⚠️ Pitfall:</span>
                <span>{question.commonPitfalls}</span>
              </div>
            )}

            {/* AI Generated Expanded Solution (if requested) */}
            {aiSolution && (
              <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50/90 via-sky-50/60 to-white border border-indigo-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-900 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>GEMINI AI RIGOROUS DEEP-DIVE DERIVATION</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                  {aiSolution}
                </div>
              </div>
            )}

            {aiError && (
              <div className="p-3 rounded-lg bg-rose-50 text-rose-700 text-xs border border-rose-200">
                {aiError}
              </div>
            )}

            {/* AI Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={handleGenerateAiSolution}
                disabled={isGeneratingAi}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors"
              >
                {isGeneratingAi ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                )}
                <span>
                  {isGeneratingAi
                    ? 'Deriving solution with Gemini...'
                    : aiSolution
                    ? 'Regenerate AI Solution'
                    : 'Generate Expanded AI Solution'}
                </span>
              </button>

              <button
                onClick={() => setShowDoubtBox((prev) => !prev)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>{showDoubtBox ? 'Close Doubt Chat' : 'Ask a Doubt about this problem'}</span>
              </button>
            </div>

            {/* Doubt Chat Box */}
            {showDoubtBox && (
              <div className="mt-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                <p className="text-xs font-semibold text-slate-700">
                  Ask any doubt or step explanation to the AI Mathematics Mentor:
                </p>

                {/* History */}
                {doubtHistory.length > 0 && (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1 text-xs">
                    {doubtHistory.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="p-2 rounded bg-indigo-100/70 text-indigo-900 font-medium">
                          <strong>You:</strong> {item.query}
                        </div>
                        <div className="p-2 rounded bg-white border border-slate-200 text-slate-800 whitespace-pre-line">
                          <strong>AI Mentor:</strong> {item.reply}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleAskDoubt} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="e.g. Why did the divergence equal 3? Or how was the eigenvalue factored?"
                    value={doubtQuery}
                    onChange={(e) => setDoubtQuery(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isAskingDoubt || !doubtQuery.trim()}
                    className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-1"
                  >
                    {isAskingDoubt ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>Ask</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
