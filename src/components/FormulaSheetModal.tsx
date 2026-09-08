import React, { useState } from 'react';
import { BookMarked, Search, Copy, Check, Sparkles } from 'lucide-react';
import { Chapter } from '../types';

interface FormulaCategory {
  chapter: Chapter;
  topic: string;
  formulas: {
    name: string;
    latex: string;
    explanation: string;
  }[];
}

const FORMULA_DATABASE: FormulaCategory[] = [
  // Calculus
  {
    chapter: 'Calculus',
    topic: 'Limits & L\'Hôpital\'s Rule',
    formulas: [
      {
        name: 'L\'Hôpital\'s Rule (0/0 or inf/inf)',
        latex: '\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)}',
        explanation: 'Valid only when f(c)/g(c) evaluates to indeterminate form 0/0 or ±∞/±∞.',
      },
      {
        name: 'Standard Limits',
        latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}, \\quad \\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1',
        explanation: 'Extremely high-frequency trigonometric and exponential limits in GATE.',
      },
      {
        name: 'Euler\'s Limit Form',
        latex: '\\lim_{x \\to \\infty} \\left(1 + \\frac{k}{x}\\right)^x = e^k, \\quad \\lim_{x \\to 0} (1 + kx)^{1/x} = e^k',
        explanation: 'Used for 1^∞ indeterminate forms.',
      },
    ],
  },
  {
    chapter: 'Calculus',
    topic: 'Vector Calculus Theorems',
    formulas: [
      {
        name: 'Gauss Divergence Theorem',
        latex: '\\iint_S (\\mathbf{F} \\cdot \\mathbf{n}) \\, dA = \\iiint_V (\\nabla \\cdot \\mathbf{F}) \\, dV',
        explanation: 'Converts closed surface flux integral into volume integral of divergence.',
      },
      {
        name: 'Stokes\' Theorem',
        latex: '\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\mathbf{n} \\, dA',
        explanation: 'Relates circulation along boundary curve C to surface integral of curl.',
      },
      {
        name: 'Green\'s Theorem in Plane',
        latex: '\\oint_C (P \\, dx + Q \\, dy) = \\iint_R \\left(\\frac{\\partial Q}{\\partial x} - \\frac{\\partial P}{\\partial y}\\right) dx \\, dy',
        explanation: '2D special case of Stokes theorem for planar regions.',
      },
      {
        name: 'Conservative Vector Field',
        latex: '\\nabla \\times \\mathbf{F} = \\mathbf{0} \\iff \\mathbf{F} = \\nabla \\phi',
        explanation: 'Line integral between two points is path-independent: \\int_A^B \\mathbf{F} \\cdot d\\mathbf{r} = \\phi(B) - \\phi(A).',
      },
    ],
  },
  {
    chapter: 'Calculus',
    topic: 'Complex Variables & Cauchy Residue',
    formulas: [
      {
        name: 'Cauchy-Riemann Equations',
        latex: '\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\quad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}',
        explanation: 'Necessary conditions for complex function f(z) = u + iv to be analytic/holomorphic.',
      },
      {
        name: 'Cauchy Residue Theorem',
        latex: '\\oint_C f(z) \\, dz = 2\\pi i \\sum_{k} \\text{Res}(f, z_k)',
        explanation: 'Sum of residues for all poles enclosed inside counter-clockwise contour C.',
      },
      {
        name: 'Residue at Simple Pole z = z_0',
        latex: '\\text{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0) f(z)',
        explanation: 'Direct limit formula for simple (order 1) poles.',
      },
    ],
  },

  // Linear Algebra
  {
    chapter: 'Linear Algebra',
    topic: 'Eigenvalues & Cayley-Hamilton',
    formulas: [
      {
        name: 'Trace and Determinant Properties',
        latex: '\\sum_{i=1}^n \\lambda_i = \\text{Trace}(A), \\quad \\prod_{i=1}^n \\lambda_i = \\det(A)',
        explanation: 'Sum of eigenvalues equals sum of main diagonal entries; product equals determinant.',
      },
      {
        name: 'Eigenvalues of Matrix Powers',
        latex: 'A \\mathbf{x} = \\lambda \\mathbf{x} \\implies A^k \\mathbf{x} = \\lambda^k \\mathbf{x}, \\quad A^{-1} \\mathbf{x} = \\frac{1}{\\lambda} \\mathbf{x}',
        explanation: 'Spectral mapping property for polynomials and powers of matrices.',
      },
      {
        name: 'Cayley-Hamilton Theorem',
        latex: 'p(A) = 0 \\quad \\text{where } p(\\lambda) = \\det(A - \\lambda I)',
        explanation: 'Every square matrix satisfies its own characteristic equation.',
      },
      {
        name: 'Symmetric & Skew-Symmetric Eigenvalues',
        latex: 'A^T = A \\implies \\lambda \\in \\mathbb{R}; \\quad A^T = -A \\implies \\text{Re}(\\lambda) = 0 \\, (\\text{0 or pure imaginary})',
        explanation: 'Fundamental spectral theorems for real symmetric and skew-symmetric matrices.',
      },
    ],
  },
  {
    chapter: 'Linear Algebra',
    topic: 'Rank-Nullity & Linear Systems',
    formulas: [
      {
        name: 'Rank-Nullity Theorem',
        latex: '\\text{Rank}(A) + \\text{Nullity}(A) = n \\quad (\\text{number of columns})',
        explanation: 'Fundamental dimension theorem for linear transformations.',
      },
      {
        name: 'Consistency of Linear System Ax = b',
        latex: '\\text{Rank}(A) = \\text{Rank}([A|b]) = r',
        explanation: 'If r = n: Unique solution. If r < n: Infinitely many solutions (n - r free parameters). If Rank(A) < Rank([A|b]): Inconsistent (no solution).',
      },
      {
        name: 'Orthogonal Matrix',
        latex: 'A^T A = A A^T = I \\implies A^{-1} = A^T, \\quad \\det(A) = \\pm 1',
        explanation: 'Columns and rows form an orthonormal basis.',
      },
    ],
  },

  // Probability
  {
    chapter: 'Probability',
    topic: 'Distributions & Expectations',
    formulas: [
      {
        name: 'Bayes\' Theorem',
        latex: 'P(A_i | B) = \\frac{P(B | A_i) P(A_i)}{\\sum_{j} P(B | A_j) P(A_j)}',
        explanation: 'Revises prior probability P(A_i) given observed evidence B.',
      },
      {
        name: 'Binomial Distribution',
        latex: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad E[X] = np, \\quad \\text{Var}(X) = np(1-p)',
        explanation: 'n independent Bernoulli trials with probability of success p.',
      },
      {
        name: 'Poisson Distribution',
        latex: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad E[X] = \\text{Var}(X) = \\lambda',
        explanation: 'Model for rare count events; mean equals variance.',
      },
      {
        name: 'Exponential Distribution',
        latex: 'f(x) = \\lambda e^{-\\lambda x} \\, (x \\ge 0), \\quad E[X] = \\frac{1}{\\lambda}, \\quad \\text{Var}(X) = \\frac{1}{\\lambda^2}',
        explanation: 'Memoryless continuous distribution for inter-arrival times.',
      },
      {
        name: 'Standard Normal Distribution',
        latex: 'Z = \\frac{X - \\mu}{\\sigma} \\sim \\mathcal{N}(0, 1), \\quad E[Z] = 0, \\quad \\text{Var}(Z) = 1',
        explanation: 'Z-score normalization and standard bell curve properties.',
      },
    ],
  },
];

export const FormulaSheetModal: React.FC = () => {
  const [search, setSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [activeChap, setActiveChap] = useState<Chapter | 'All'>('All');

  const handleCopy = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const filteredCategories = FORMULA_DATABASE.filter((cat) => {
    if (activeChap !== 'All' && cat.chapter !== activeChap) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      cat.topic.toLowerCase().includes(s) ||
      cat.formulas.some(
        (f) =>
          f.name.toLowerCase().includes(s) ||
          f.latex.toLowerCase().includes(s) ||
          f.explanation.toLowerCase().includes(s)
      )
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BookMarked className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                GATE Mathematics High-Yield Formula Reference
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated core definitions, formulas, and governing theorems for Calculus, Linear Algebra, and Probability.
            </p>
          </div>

          <div className="flex items-center space-x-1.5">
            {(['All', 'Calculus', 'Linear Algebra', 'Probability'] as const).map((chap) => (
              <button
                key={chap}
                onClick={() => setActiveChap(chap)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeChap === chap
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {chap}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search formulas by name, concept, theorem (e.g. Stokes, Bayes, Cayley-Hamilton, Divergence)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="space-y-6">
        {filteredCategories.map((cat, cIdx) => (
          <div key={cIdx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base font-serif flex items-center space-x-2">
                <span>{cat.topic}</span>
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {cat.chapter}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.formulas.map((f, fIdx) => {
                const copyId = `${cIdx}-${fIdx}`;
                const isCopied = copiedIndex === copyId;

                return (
                  <div
                    key={fIdx}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-indigo-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
                        <span>{f.name}</span>
                        <button
                          onClick={() => handleCopy(f.latex, copyId)}
                          className="text-slate-400 hover:text-indigo-600 p-1"
                          title="Copy Formula"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="bg-white p-2.5 rounded border border-slate-200 text-xs font-mono text-indigo-950 font-semibold mb-2 overflow-x-auto whitespace-pre-wrap break-all">
                        {f.latex}
                      </div>

                      <p className="text-[11px] text-slate-600 leading-normal font-sans">
                        {f.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
