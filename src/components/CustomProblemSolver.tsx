import React, { useState } from 'react';
import { Sparkles, Send, Loader2, BookOpen, Download, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { generateSolutionsPdf } from '../utils/pdfGenerator';
import { Question } from '../types';

export const CustomProblemSolver: React.FC = () => {
  const [questionText, setQuestionText] = useState('');
  const [chapter, setChapter] = useState<'Calculus' | 'Linear Algebra' | 'Probability'>('Calculus');
  const [topic, setTopic] = useState('');
  const [officialKey, setOfficialKey] = useState('');
  const [options, setOptions] = useState('');

  const [isSolving, setIsSolving] = useState(false);
  const [solutionResult, setSolutionResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quick sample questions from the PDF that users can click to instantly test
  const quickSamples = [
    {
      title: 'Q 1.0.4 - Complex Power (x^x when x = sqrt(-1))',
      chapter: 'Calculus' as const,
      topic: 'Complex Numbers',
      text: 'If x = \\sqrt{-1}, then the value of x^x is:\nA. e^{-\\pi/2}\nB. e^{\\pi/2}\nC. x\nD. 1',
      key: 'A',
    },
    {
      title: 'Q 2.3.8 - Matrix Power Eigenvalues (A^19 for A=[[1,1],[1,-1]])',
      chapter: 'Linear Algebra' as const,
      topic: 'Eigen Values of Matrix Powers',
      text: 'Let A be the 2x2 matrix with elements a11 = a12 = a21 = +1 and a22 = -1. Then the eigenvalues of the matrix A^19 are:\nA. 1024 and -1024\nB. 1024\\sqrt{2} and -1024\\sqrt{2}\nC. 4\\sqrt{2} and -4\\sqrt{2}\nD. 512\\sqrt{2} and -512\\sqrt{2}',
      key: 'D',
    },
    {
      title: 'Q 3.2.4 - Bayes Theorem (Two Boxes with Red and Blue Balls)',
      chapter: 'Probability' as const,
      topic: 'Conditional Probability & Bayes Theorem',
      text: 'Box P has 2 red balls and 3 blue balls and box Q has 3 red balls and 1 blue ball. The probabilities of selecting boxes P and Q are 1/3 and 2/3 respectively. Given that a ball selected is red, what is the probability that it came from box P?\nA. 4/19\nB. 5/19\nC. 2/9\nD. 19/30',
      key: 'A',
    },
  ];

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSolving(true);
    setErrorMsg(null);
    setSolutionResult(null);

    try {
      const res = await fetch('/api/generate-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: 'Custom / PDF Query',
          questionText,
          chapter,
          topic: topic || 'GATE Engineering Mathematics',
          officialAnswer: officialKey || undefined,
          options: options || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate solution');
      }

      setSolutionResult(data.solution);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with AI service');
    } finally {
      setIsSolving(false);
    }
  };

  const handleExportSingleToPdf = () => {
    if (!solutionResult) return;

    const dummyQuestion: Question = {
      id: 'AI-Solution',
      chapter,
      sectionNumber: 'Custom',
      topic: topic || 'GATE Mathematics',
      exam: 'GATE Archive Solution Generator',
      questionText,
      questionType: 'Descriptive',
      officialAnswer: officialKey || 'Derived by AI',
      detailedSolution: solutionResult,
      keyFormulas: ['Governing mathematical principles derived in solution text'],
    };

    const doc = generateSolutionsPdf([dummyQuestion], {
      title: 'GATE MATHEMATICS CUSTOM SOLUTION',
      subtitle: 'Generated Step-by-Step Mathematical Derivation',
      includeSolutions: true,
      includeKeyFormulas: true,
      includeExamTips: true,
    });

    doc.save('GATE_Custom_Solution.pdf');
  };

  const loadSample = (sample: typeof quickSamples[0]) => {
    setQuestionText(sample.text);
    setChapter(sample.chapter);
    setTopic(sample.topic);
    setOfficialKey(sample.key);
    setSolutionResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 border border-indigo-500/20">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-400/30 text-indigo-300">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">
              AI Mathematical Solution Engine (Gemini 3.8)
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
              Paste ANY problem from your PDF or coursework. The AI will provide a step-by-step mathematical proof, governing theorems, alternative examination shortcuts, and verification against official keys.
            </p>
          </div>
        </div>

        {/* Quick Samples */}
        <div className="mt-6 pt-5 border-t border-slate-700/60">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
            Or test with a sample question from the PDF:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickSamples.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => loadSample(s)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white transition-colors border border-slate-700"
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSolve} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8 space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
            Problem Statement / Question from PDF *
          </label>
          <textarea
            rows={5}
            required
            placeholder="Paste problem text here (e.g. Find the eigenvalues of matrix..., Evaluate the contour integral..., A fair coin is tossed...)"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Chapter
            </label>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value as any)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Calculus">Calculus</option>
              <option value="Linear Algebra">Linear Algebra</option>
              <option value="Probability">Probability</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Topic (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Limits, Eigenvalues, Bayes"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Official Key (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Option B, or 0.25"
              value={officialKey}
              onChange={(e) => setOfficialKey(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSolving || !questionText.trim()}
            className="w-full py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-98 cursor-pointer"
          >
            {isSolving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Computing Step-by-Step Derivation with Gemini 3.8...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Mathematical Solution</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Display */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl mb-6">
          <strong>Error: </strong> {errorMsg}
        </div>
      )}

      {/* Solution Result Card */}
      {solutionResult && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Step-by-Step Mathematical Solution
                </h3>
                <span className="text-xs text-slate-500">
                  {chapter} • {topic || 'Engineering Mathematics'}
                </span>
              </div>
            </div>

            <button
              onClick={handleExportSingleToPdf}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
              title="Download this solution as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export as PDF</span>
            </button>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
            {solutionResult}
          </div>
        </div>
      )}
    </div>
  );
};
