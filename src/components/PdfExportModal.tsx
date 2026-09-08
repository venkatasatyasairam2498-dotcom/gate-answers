import React, { useState } from 'react';
import { Download, Printer, X, Check, FileText, Sparkles, Loader2 } from 'lucide-react';
import { Question } from '../types';
import { generateSolutionsPdf } from '../utils/pdfGenerator';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  allQuestions: Question[];
  currentFilteredQuestions: Question[];
  selectedChapter: string;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  allQuestions,
  currentFilteredQuestions,
  selectedChapter,
}) => {
  const [exportScope, setExportScope] = useState<'filtered' | 'all' | 'calculus' | 'linear' | 'probability'>('all');
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [includeFormulas, setIncludeFormulas] = useState(true);
  const [includeExamTips, setIncludeExamTips] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  // Determine which questions to export
  let targetQuestions: Question[] = [];
  let scopeTitle = '';

  if (exportScope === 'filtered') {
    targetQuestions = currentFilteredQuestions;
    scopeTitle = `Current Filtered (${targetQuestions.length} questions)`;
  } else if (exportScope === 'calculus') {
    targetQuestions = allQuestions.filter((q) => q.chapter === 'Calculus');
    scopeTitle = 'Calculus Solutions';
  } else if (exportScope === 'linear') {
    targetQuestions = allQuestions.filter((q) => q.chapter === 'Linear Algebra');
    scopeTitle = 'Linear Algebra Solutions';
  } else if (exportScope === 'probability') {
    targetQuestions = allQuestions.filter((q) => q.chapter === 'Probability');
    scopeTitle = 'Probability Solutions';
  } else {
    targetQuestions = allQuestions;
    scopeTitle = 'Complete GATE Mathematics Booklet';
  }

  const handleDownloadPdf = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      try {
        const doc = generateSolutionsPdf(targetQuestions, {
          title: `GATE MATHEMATICS: ${scopeTitle.toUpperCase()}`,
          subtitle: 'Comprehensive Step-by-Step Solutions & Verified Answer Keys',
          chapterFilter: exportScope === 'all' ? undefined : scopeTitle,
          includeSolutions,
          includeKeyFormulas: includeFormulas,
          includeExamTips,
        });

        const safeFileName = `GATE_Math_Solutions_${scopeTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
        doc.save(safeFileName);
        setDownloadSuccess(true);
      } catch (err) {
        console.error('PDF Generation failed:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 150);
  };

  const handleBrowserPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif">Export Solutions PDF</h3>
              <p className="text-xs text-slate-400">High-resolution printable handbook generation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Scope Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Export Scope
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setExportScope('all')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  exportScope === 'all'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">All Questions</div>
                <div className="text-[11px] text-slate-500">Complete solutions ({allQuestions.length})</div>
              </button>

              <button
                type="button"
                onClick={() => setExportScope('filtered')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  exportScope === 'filtered'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">Current Filtered</div>
                <div className="text-[11px] text-slate-500">Active view ({currentFilteredQuestions.length})</div>
              </button>

              <button
                type="button"
                onClick={() => setExportScope('calculus')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  exportScope === 'calculus'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">Calculus Only</div>
                <div className="text-[11px] text-slate-500">Limits, integrals, derivatives</div>
              </button>

              <button
                type="button"
                onClick={() => setExportScope('linear')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  exportScope === 'linear'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">Linear Algebra</div>
                <div className="text-[11px] text-slate-500">Matrices, eigenvalues, rank</div>
              </button>

              <button
                type="button"
                onClick={() => setExportScope('probability')}
                className={`p-3 rounded-lg border text-left transition-all col-span-2 ${
                  exportScope === 'probability'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">Probability & Statistics Only</div>
                <div className="text-[11px] text-slate-500">Distributions, Bayes theorem, expectations</div>
              </button>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Content Inclusions
            </label>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSolutions}
                  onChange={(e) => setIncludeSolutions(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-medium">Include Detailed Step-by-Step Mathematical Derivations</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFormulas}
                  onChange={(e) => setIncludeFormulas(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-medium">Include Key Formulas & Governing Theorems Box</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeExamTips}
                  onChange={(e) => setIncludeExamTips(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-medium">Include 3-Hour Exam Shortcuts & Pitfall Warnings</span>
              </label>
            </div>
          </div>

          {/* Download Success Notice */}
          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2 text-xs text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Solutions PDF downloaded successfully! Check your browser downloads folder.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              id="confirm-pdf-download-btn"
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-98 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Compiling PDF Document...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Solutions PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handleBrowserPrint}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors border border-slate-200"
              title="Print directly or save as PDF via system dialog"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print / System PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
