import { Question } from '../types';

export const CURATED_QUESTIONS: Question[] = [
  // ==========================================
  // CHAPTER 1: CALCULUS
  // ==========================================
  {
    id: '1.0.1',
    chapter: 'Calculus',
    sectionNumber: '1.0',
    topic: 'Discrete Fourier Transform & Calculus',
    exam: 'GATE ECE 2018 | Question: 55',
    examYear: 2018,
    branch: 'ECE',
    questionType: 'NAT',
    questionText: 'Let X[k] = k + 1, for 0 <= k <= 7 be 8-point DFT of a sequence x[n], where X[k] = \\sum_{n=0}^{N-1} x[n] e^{-j 2\\pi n k / N}. The value (correct to two decimal places) of \\sum_{n=0}^{3} x[2n] is ________.',
    officialAnswer: '3.00',
    answerRange: '2.90 : 3.10',
    keyFormulas: [
      'IDFT Formula: x[n] = (1/N) \\sum_{k=0}^{N-1} X[k] e^{j 2\\pi k n / N}',
      'Downsampling Property / Symmetry: \\sum_{n=0}^{3} x[2n] = (1/8) \\sum_{k=0}^{7} X[k] (1 + (-1)^k) = (1/4) \\sum_{m=0}^{3} X[2m]',
    ],
    detailedSolution: `Step 1: Understand the objective.
We are given an 8-point sequence x[n] with DFT X[k] = k + 1 for k = 0, 1, ..., 7.
We need to evaluate S = \\sum_{n=0}^{3} x[2n] = x[0] + x[2] + x[4] + x[6].

Step 2: Express x[n] using Inverse DFT:
x[n] = (1/8) * \\sum_{k=0}^{7} X[k] W_8^{-kn}, where W_8 = e^{-j 2\\pi / 8}.

Step 3: Compute sum for even indices n = 0, 2, 4, 6:
S = \\sum_{n=0}^{3} x[2n] = (1/8) \\sum_{k=0}^{7} X[k] \\sum_{n=0}^{3} e^{j (2\\pi/8) k (2n)}
Notice the inner summation:
\\sum_{n=0}^{3} e^{j (\\pi k n / 2)} = \\sum_{n=0}^{3} (j^k)^n.
If k is odd, j^k is either j or -j, so 1 + j^k + (j^k)^2 + (j^k)^3 = 1 + j^k - 1 - j^k = 0.
If k is not a multiple of 4, the geometric sum is zero.
Specifically, for k mod 4 == 0 (i.e., k = 0 and k = 4):
When k = 0: sum = 1 + 1 + 1 + 1 = 4.
When k = 4: e^{j 2\\pi n} = 1, so sum = 4.
For k = 1, 2, 3, 5, 6, 7, the inner sum vanishes:
- For k=2: 1 + (-1) + 1 + (-1) = 0.
- For k=6: 1 + (-1) + 1 + (-1) = 0.

Step 4: Substitute non-zero terms:
S = (1/8) * [ X[0] * 4 + X[4] * 4 ]
  = (4/8) * [ X[0] + X[4] ]
  = (1/2) * [ (0 + 1) + (4 + 1) ]
  = (1/2) * [ 1 + 5 ] = 6 / 2 = 3.00.

Conclusion:
The value is exactly 3.00 (within the official range 2.90 to 3.10).`,
    shortcutTips: 'When downsampling in time by factor M=2, the sum of even samples in time is equal to (1/2) the sum of the even-indexed frequency samples that map to alias frequencies.',
    commonPitfalls: 'Do not attempt to compute all 8 values of x[n] individually; using the summation interchange saves 10 minutes in the exam.'
  },
  {
    id: '1.0.4',
    chapter: 'Calculus',
    sectionNumber: '1.0',
    topic: 'Complex Numbers & Exponentials',
    exam: 'GATE ECE 2012 | Question: 25',
    examYear: 2012,
    branch: 'ECE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: 'e^(-pi / 2)' },
      { label: 'B', text: 'e^(pi / 2)' },
      { label: 'C', text: 'x' },
      { label: 'D', text: '1' }
    ],
    questionText: 'If x = \\sqrt{-1}, then the value of x^x is:',
    officialAnswer: 'A',
    keyFormulas: [
      'Euler Formula: e^{i\\theta} = \\cos\\theta + i\\sin\\theta',
      'Complex Logarithm: \\ln(i) = \\ln|i| + i\\cdot\\text{Arg}(i) = 0 + i(\\pi/2)',
      'x^x = e^{x \\ln x}'
    ],
    detailedSolution: `Step 1: Identify given quantities.
We are given x = \\sqrt{-1} = i (the imaginary unit).
We need to calculate i^i.

Step 2: Express i in exponential polar form:
i = \\cos(\\pi/2) + i \\sin(\\pi/2) = e^{i \\pi / 2}.

Step 3: Apply complex power definition:
x^x = i^i = (e^{i \\pi / 2})^i.

Step 4: Multiply exponents:
i^i = e^{i \\cdot (i \\pi / 2)} = e^{i^2 \\pi / 2}.
Since i^2 = -1:
i^i = e^{-\\pi / 2}.

Notice this is a purely REAL number approximately equal to e^{-1.5708} \\approx 0.20788.

Matching with given options:
Option A: e^{-\\pi/2} (CORRECT).`,
    shortcutTips: 'Remember as a standard identity: i^i = e^{-pi/2} is purely real! Many students incorrectly guess it must have an imaginary part.',
    commonPitfalls: 'Confusing (e^{i\\pi/2})^i with e^{i\\pi/2}, leading to choosing Option C or D.'
  },
  {
    id: '1.1.1',
    chapter: 'Calculus',
    sectionNumber: '1.1',
    topic: 'Area Under Curve & Surface Integrals',
    exam: 'GATE ME 2013 | Question: 26',
    examYear: 2013,
    branch: 'ME',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '\\pi' },
      { label: 'B', text: '2\\pi' },
      { label: 'C', text: '3\\pi / 4' },
      { label: 'D', text: '4\\pi' }
    ],
    questionText: 'The following surface integral is to be evaluated over a sphere for the given steady velocity vector field F = x i + y j + z k defined with respect to a Cartesian coordinate system having i, j and k as unit base vectors:\n\\iint_S \\frac{1}{4} (F \\cdot n) dA\nwhere S is the sphere x^2 + y^2 + z^2 = 1 and n is the outward unit normal vector to the sphere. The value of the surface integral is:',
    officialAnswer: 'A',
    keyFormulas: [
      'Gauss Divergence Theorem: \\iint_S (F \\cdot n) dA = \\iiint_V (\\nabla \\cdot F) dV',
      '\\nabla \\cdot F = \\frac{\\partial}{\\partial x}(x) + \\frac{\\partial}{\\partial y}(y) + \\frac{\\partial}{\\partial z}(z) = 1 + 1 + 1 = 3',
      'Volume of unit sphere = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi (1)^3 = \\frac{4\\pi}{3}'
    ],
    detailedSolution: `Step 1: State the integral to evaluate:
I = \\iint_S \\frac{1}{4} (F \\cdot n) dA = \\frac{1}{4} \\iint_S (F \\cdot n) dA.

Step 2: Apply Gauss Divergence Theorem:
\\iint_S (F \\cdot n) dA = \\iiint_V (\\nabla \\cdot F) dV.

Step 3: Compute Divergence of F:
F = x i + y j + z k
\\nabla \\cdot F = \\frac{\\partial x}{\\partial x} + \\frac{\\partial y}{\\partial y} + \\frac{\\partial z}{\\partial z} = 1 + 1 + 1 = 3.

Step 4: Integrate divergence over the sphere volume V:
\\iiint_V 3 dV = 3 \\times \\text{Volume}(V).
For the sphere x^2 + y^2 + z^2 = 1, radius R = 1.
\\text{Volume} = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi.
Therefore:
\\iint_S (F \\cdot n) dA = 3 \\times \\left(\\frac{4}{3}\\pi\\right) = 4\\pi.

Step 5: Multiply by the factor (1/4):
I = \\frac{1}{4} \\times (4\\pi) = \\pi.

Thus, the correct choice is Option A.`,
    shortcutTips: 'Always check if the integrand has an extra constant factor outside (here, 1/4). Computing divergence takes 5 seconds: div F = 3, 3 * (4/3)*pi = 4pi, then 4pi / 4 = pi.',
    commonPitfalls: 'Forgetting the 1/4 factor leads to incorrectly selecting 4pi (Option D).'
  },
  {
    id: '1.2.1',
    chapter: 'Calculus',
    sectionNumber: '1.2',
    topic: 'Cartesian Coordinates',
    exam: 'GATE IN 2016 | Question: 1',
    examYear: 2016,
    branch: 'IN',
    questionType: 'NAT',
    questionText: 'A straight line of the form y = mx + c passes through the origin and the point (x, y) = (2, 6). The value of m is _____.',
    officialAnswer: '3',
    answerRange: '3 : 3',
    keyFormulas: [
      'Slope-intercept form: y = mx + c',
      'Passing through origin (0,0) \\implies c = 0',
      'Slope m = (y_2 - y_1) / (x_2 - x_1)'
    ],
    detailedSolution: `Step 1: Since line passes through origin (0,0):
0 = m(0) + c \\implies c = 0.
So the equation reduces to y = mx.

Step 2: The line passes through (x, y) = (2, 6):
6 = m(2) \\implies m = 6 / 2 = 3.

Therefore, m = 3.`,
    shortcutTips: 'Origin passage means m = y/x = 6/2 = 3 immediately.',
    commonPitfalls: 'None, direct foundational question.'
  },
  {
    id: '1.2.2',
    chapter: 'Calculus',
    sectionNumber: '1.2',
    topic: 'Cartesian Coordinates',
    exam: 'GATE BT 2021 | Question: 5',
    examYear: 2021,
    branch: 'BT',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '(\\sqrt{3}, 2\\sqrt{2})' },
      { label: 'B', text: '(2, 2\\sqrt{3})' },
      { label: 'C', text: '(2\\sqrt{2}, \\sqrt{3})' },
      { label: 'D', text: '(2\\sqrt{2}, 2\\sqrt{2})' }
    ],
    questionText: 'The Cartesian coordinates (x, y) of a point A with polar coordinates (4, \\pi/4) is:',
    officialAnswer: 'D',
    keyFormulas: [
      'Polar to Cartesian transformation: x = r \\cos\\theta, y = r \\sin\\theta',
      '\\cos(\\pi/4) = \\sin(\\pi/4) = 1/\\sqrt{2}'
    ],
    detailedSolution: `Given polar coordinates (r, \\theta) = (4, \\pi/4).
x = r \\cos\\theta = 4 \\cos(\\pi/4) = 4 \\times \\frac{1}{\\sqrt{2}} = 2\\sqrt{2}.
y = r \\sin\\theta = 4 \\sin(\\pi/4) = 4 \\times \\frac{1}{\\sqrt{2}} = 2\\sqrt{2}.
Therefore (x, y) = (2\\sqrt{2}, 2\\sqrt{2}).
Option D is the correct answer.`,
    shortcutTips: 'When theta = pi/4 (45 degrees), x and y must be identical, ruling out A, B, and C instantly!'
  },
  {
    id: '1.3.1',
    chapter: 'Calculus',
    sectionNumber: '1.3',
    topic: 'Complex Number Limits',
    exam: 'GATE Electrical 2017 Set 1 | Question: 2',
    examYear: 2017,
    branch: 'EE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '-2i' },
      { label: 'B', text: '-i' },
      { label: 'C', text: 'i' },
      { label: 'D', text: '2i' }
    ],
    questionText: 'For a complex number z, \\lim_{z \\to i} \\frac{z^2 + 1}{z^3 + 2z - i(z^2 + 2)} is:',
    officialAnswer: 'D',
    keyFormulas: [
      'Factorization of numerator: z^2 + 1 = (z - i)(z + i)',
      'Denominator factorization: group terms with common factors or apply L\'Hopital\'s rule'
    ],
    detailedSolution: `Step 1: Check form at z = i:
Numerator: i^2 + 1 = -1 + 1 = 0.
Denominator: i^3 + 2i - i(i^2 + 2) = -i + 2i - i(-1 + 2) = i - i(1) = 0.
This is an indeterminate form 0/0.

Step 2: Factorize denominator:
Denom = z^3 + 2z - i z^2 - 2i
      = z^2(z - i) + 2(z - i)
      = (z^2 + 2)(z - i).

Step 3: Simplify the ratio:
\\frac{z^2 + 1}{z^3 + 2z - i(z^2 + 2)} = \\frac{(z - i)(z + i)}{(z - i)(z^2 + 2)} = \\frac{z + i}{z^2 + 2}.

Step 4: Evaluate the limit as z \\to i:
\\lim_{z \\to i} \\frac{z + i}{z^2 + 2} = \\frac{i + i}{i^2 + 2} = \\frac{2i}{-1 + 2} = \\frac{2i}{1} = 2i.

Option D is correct.`,
    shortcutTips: 'L\'Hôpital\'s rule works on holomorphic complex functions too: d/dz (z^2+1) = 2z -> 2i. d/dz Denom = 3z^2 + 2 - 2iz = -3 + 2 - 2i(i) = -1 + 2 = 1. Limit = 2i / 1 = 2i directly!',
    commonPitfalls: 'Sign error when substituting i^2 = -1 into the denominator.'
  },
  {
    id: '1.4.1',
    chapter: 'Calculus',
    sectionNumber: '1.4',
    topic: 'Complex Variables Argument',
    exam: 'GATE Mechanical 2014 Set 1 | Question: 3',
    examYear: 2014,
    branch: 'ME',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '-\\pi' },
      { label: 'B', text: '-\\pi / 2' },
      { label: 'C', text: '\\pi / 2' },
      { label: 'D', text: '\\pi' }
    ],
    questionText: 'The argument of the complex number \\frac{1 + i}{1 - i}, where i = \\sqrt{-1}, is:',
    officialAnswer: 'C',
    keyFormulas: [
      'Rationalization: \\frac{1+i}{1-i} = \\frac{(1+i)^2}{(1-i)(1+i)} = \\frac{1 + 2i - 1}{1 - i^2} = \\frac{2i}{2} = i',
      'Argument: \\text{Arg}(x + iy) = \\tan^{-1}(y/x) \\implies \\text{Arg}(i) = \\pi/2'
    ],
    detailedSolution: `Step 1: Simplify z = (1 + i) / (1 - i):
Multiply numerator and denominator by conjugate (1 + i):
z = \\frac{(1 + i)(1 + i)}{(1 - i)(1 + i)} = \\frac{1 + 2i + i^2}{1 - i^2} = \\frac{1 + 2i - 1}{1 - (-1)} = \\frac{2i}{2} = i.

Step 2: Find Argument of i:
i = 0 + 1i.
The point (0, 1) lies on the positive imaginary axis.
Therefore, Arg(z) = \\pi / 2.
Option C is correct.`,
    shortcutTips: 'Arg(z_1 / z_2) = Arg(z_1) - Arg(z_2) = (pi/4) - (-pi/4) = pi/2 in 3 seconds!',
    commonPitfalls: 'Mixing up positive and negative imaginary axis angles.'
  },
  {
    id: '1.4.2',
    chapter: 'Calculus',
    sectionNumber: '1.4',
    topic: 'Cauchy-Riemann Equations',
    exam: 'GATE Mechanical 2014 Set 2 | Question: 26',
    examYear: 2014,
    branch: 'ME',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: 'x^2 + y^2 + \\text{constant}' },
      { label: 'B', text: 'x^2 - y^2 + \\text{constant}' },
      { label: 'C', text: '-x^2 + y^2 + \\text{constant}' },
      { label: 'D', text: '-x^2 - y^2 + \\text{constant}' }
    ],
    questionText: 'An analytic function of a complex variable z = x + iy is expressed as f(z) = u(x,y) + i v(x,y), where i = \\sqrt{-1}. If u(x,y) = 2xy, then v(x,y) must be:',
    officialAnswer: 'C',
    keyFormulas: [
      'Cauchy-Riemann Equations: \\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y} and \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}'
    ],
    detailedSolution: `Step 1: Given u(x, y) = 2xy.
\\frac{\\partial u}{\\partial x} = 2y
\\frac{\\partial u}{\\partial y} = 2x.

Step 2: Apply Cauchy-Riemann equations:
\\frac{\\partial v}{\\partial y} = \\frac{\\partial u}{\\partial x} = 2y.
Integrating with respect to y:
v(x, y) = y^2 + g(x).

Step 3: Use the second C-R condition:
\\frac{\\partial v}{\\partial x} = -\\frac{\\partial u}{\\partial y} = -2x.
Differentiating v(x, y) = y^2 + g(x) with respect to x:
g'(x) = -2x \\implies g(x) = -x^2 + c.

Step 4: Combine terms:
v(x, y) = y^2 - x^2 + c = -x^2 + y^2 + \\text{constant}.
Matching with options:
Option C: -x^2 + y^2 + constant.`,
    shortcutTips: 'Milne-Thomson method: f\'(z) = u_x(z,0) - i u_y(z,0) = 0 - i(2z) = -2iz. Integrating: f(z) = -iz^2 + c = -i(x+iy)^2 = -i(x^2 - y^2 + 2ixy) = 2xy + i(y^2 - x^2). Im(f) = y^2 - x^2!',
    commonPitfalls: 'Careless sign error on the second Cauchy-Riemann equation: v_x = -u_y, not +u_y.'
  },
  {
    id: '1.4.4',
    chapter: 'Calculus',
    sectionNumber: '1.4',
    topic: 'Contour Integral & Residue Theorem',
    exam: 'GATE Mechanical 2021 Set 1 | Question: 27',
    examYear: 2021,
    branch: 'ME',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '0' },
      { label: 'B', text: '2' },
      { label: 'C', text: '\\pi i' },
      { label: 'D', text: '2\\pi i' }
    ],
    questionText: 'Let C represent the unit circle centered at origin in the complex plane, and complex variable z = x + iy. The value of the contour integral \\oint_C \\frac{\\cosh(3z)}{2z} dz (where integration is taken counter-clockwise) is:',
    officialAnswer: 'C',
    keyFormulas: [
      'Cauchy Residue Theorem: \\oint_C f(z) dz = 2\\pi i \\sum \\text{Res}(f, z_k)',
      'For a simple pole at z = z_0: \\text{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0) f(z)'
    ],
    detailedSolution: `Step 1: Identify singularity:
f(z) = \\frac{\\cosh(3z)}{2z}.
The only singularity inside the unit circle |z| = 1 is at z = 0.
z = 0 is a simple pole.

Step 2: Compute Residue at z = 0:
\\text{Res}(f, 0) = \\lim_{z \\to 0} (z - 0) \\frac{\\cosh(3z)}{2z} = \\lim_{z \\to 0} \\frac{\\cosh(3z)}{2} = \\frac{\\cosh(0)}{2} = \\frac{1}{2}.

Step 3: Apply Cauchy Integral Formula / Residue Theorem:
\\oint_C \\frac{\\cosh(3z)}{2z} dz = 2\\pi i \\times \\text{Res}(f, 0) = 2\\pi i \\times \\frac{1}{2} = \\pi i.

Option C is the correct answer.`,
    shortcutTips: 'By Cauchy Integral Formula: \\oint_C \\frac{g(z)}{z - 0} dz = 2\\pi i \\cdot g(0). Here g(z) = \\frac{1}{2}\\cosh(3z), so answer is 2\\pi i (1/2) = \\pi i.',
    commonPitfalls: 'Forgetting the factor of 2 in the denominator, which would give 2pi i.'
  },
  {
    id: '1.5.2',
    chapter: 'Calculus',
    sectionNumber: '1.5',
    topic: 'Continuity and Differentiability',
    exam: 'GATE CSE 1998 | Question: 1.4',
    examYear: 1998,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: 'continuous and differentiable' },
      { label: 'B', text: 'continuous but not differentiable' },
      { label: 'C', text: 'differentiable but not continuous' },
      { label: 'D', text: 'neither continuous nor differentiable' }
    ],
    questionText: 'Consider the function y = |x| in the interval [-1, 1]. In this interval, the function is:',
    officialAnswer: 'B',
    keyFormulas: [
      'Continuity: \\lim_{x \\to 0^-} |x| = \\lim_{x \\to 0^+} |x| = f(0) = 0',
      'Left-hand derivative: \\lim_{h \\to 0^-} \\frac{|h| - 0}{h} = -1',
      'Right-hand derivative: \\lim_{h \\to 0^+} \\frac{|h| - 0}{h} = +1'
    ],
    detailedSolution: `Step 1: Check continuity:
For all x \\in [-1, 1], |x| is well-defined and continuous everywhere on \\mathbb{R}, including at x = 0.

Step 2: Check differentiability at x = 0:
Left-hand derivative LHD = \\lim_{h \\to 0^-} \\frac{|h| - 0}{h} = \\frac{-h}{h} = -1.
Right-hand derivative RHD = \\lim_{h \\to 0^+} \\frac{|h| - 0}{h} = \\frac{h}{h} = 1.
Since LHD \\neq RHD, the derivative does not exist at x = 0.

Therefore, the function is continuous but not differentiable in [-1, 1].
Option B is correct.`,
    shortcutTips: 'The absolute value graph has a sharp corner (cusp) at x = 0, so it is continuous everywhere but not differentiable at the corner.',
    commonPitfalls: 'Assuming continuity implies differentiability.'
  },
  {
    id: '1.12.1',
    chapter: 'Calculus',
    sectionNumber: '1.12',
    topic: 'Definite Integral & Triple Integrals',
    exam: 'GATE CSE 2023 | Question: 21',
    examYear: 2023,
    branch: 'CSE',
    questionType: 'NAT',
    questionText: 'The value of the definite integral \\int_{-3}^{3} \\int_{-2}^{2} \\int_{-1}^{1} (4x^2 y - z^3) dz dy dx is _________. (Rounded off to the nearest integer)',
    officialAnswer: '0',
    answerRange: '0 : 0',
    keyFormulas: [
      'Odd function symmetry: \\int_{-a}^{a} g(u) du = 0 if g(-u) = -g(u)',
      'Linearity of integration: \\int (f_1 - f_2) = \\int f_1 - \\int f_2'
    ],
    detailedSolution: `Step 1: Split the integral into two terms by linearity:
I = I_1 - I_2
where
I_1 = \\int_{-3}^{3} \\int_{-2}^{2} \\int_{-1}^{1} 4x^2 y dz dy dx
I_2 = \\int_{-3}^{3} \\int_{-2}^{2} \\int_{-1}^{1} z^3 dz dy dx.

Step 2: Evaluate I_1:
Notice the y-integration: \\int_{-2}^{2} y dy.
Since y is an odd function of y and the limits [-2, 2] are symmetric about 0:
\\int_{-2}^{2} y dy = 0.
Thus, I_1 = 0.

Step 3: Evaluate I_2:
Notice the z-integration: \\int_{-1}^{1} z^3 dz.
Since z^3 is an odd function of z and limits [-1, 1] are symmetric:
\\int_{-1}^{1} z^3 dz = 0.
Thus, I_2 = 0.

Step 4: Combine results:
I = 0 - 0 = 0.

Result: 0.`,
    shortcutTips: 'Always inspect limits for symmetry [-a, a]. In 4x^2 y, y is odd in [-2,2]; in z^3, z is odd in [-1,1]. Both integrals vanish instantly to 0!',
    commonPitfalls: 'Spending several minutes computing powers and values of 3^3, 2^3, etc.'
  },
  {
    id: '1.12.2',
    chapter: 'Calculus',
    sectionNumber: '1.12',
    topic: 'Definite Integral Properties',
    exam: 'GATE CSE 2024 Set 2 | Question: 6',
    examYear: 2024,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '0' },
      { label: 'B', text: '1' },
      { label: 'C', text: '2' },
      { label: 'D', text: '-1' }
    ],
    questionText: 'Let f(x) be a continuous function from \\mathbb{R} to \\mathbb{R} such that f(x) = 1 - f(2 - x). Which one of the following options is the CORRECT value of \\int_0^2 f(x) dx?',
    officialAnswer: 'B',
    keyFormulas: [
      'King\'s Property of Definite Integrals: \\int_a^b f(x) dx = \\int_a^b f(a + b - x) dx'
    ],
    detailedSolution: `Step 1: Let I = \\int_0^2 f(x) dx.

Step 2: Apply the property \\int_a^b f(x) dx = \\int_a^b f(a+b-x) dx:
Here a = 0, b = 2, so a + b - x = 2 - x.
I = \\int_0^2 f(2 - x) dx.

Step 3: Use the given functional relation f(x) = 1 - f(2 - x):
This implies f(2 - x) = 1 - f(x).
Substitute this into the integral:
I = \\int_0^2 (1 - f(x)) dx
I = \\int_0^2 1 dx - \\int_0^2 f(x) dx
I = [x]_0^2 - I
I = 2 - I.

Step 4: Solve for I:
2I = 2 \\implies I = 1.

Option B is the correct answer.`,
    shortcutTips: 'If f(x) + f(2a - x) = c, then \\int_0^{2a} f(x) dx = a \\cdot c. Here 2a = 2 \\implies a = 1, and c = 1, so I = 1 * 1 = 1.',
    commonPitfalls: 'Forgetting to substitute both integrals back into 2I = 2.'
  },
  {
    id: '1.32.22',
    chapter: 'Calculus',
    sectionNumber: '1.32',
    topic: 'Limits',
    exam: 'GATE ME 2012 | Question: 12',
    examYear: 2012,
    branch: 'ME',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '1/4' },
      { label: 'B', text: '1/2' },
      { label: 'C', text: '1' },
      { label: 'D', text: '2' }
    ],
    questionText: '\\lim_{x \\to 0} \\left(\\frac{1 - \\cos x}{x^2}\\right) is:',
    officialAnswer: 'B',
    keyFormulas: [
      'Trigonometric identity: 1 - \\cos x = 2\\sin^2(x/2)',
      'Standard limit: \\lim_{u \\to 0} \\frac{\\sin u}{u} = 1',
      'Or L\'Hopital Rule: 0/0 form'
    ],
    detailedSolution: `Method 1: Half-angle identity
1 - \\cos x = 2\\sin^2(x/2)
\\lim_{x \\to 0} \\frac{2\\sin^2(x/2)}{x^2} = 2 \\lim_{x \\to 0} \\left(\\frac{\\sin(x/2)}{x/2}\\right)^2 \\times \\frac{1}{4} = 2 \\times 1^2 \\times \\frac{1}{4} = \\frac{1}{2}.

Method 2: L\'Hôpital\'s Rule (form 0/0)
First differentiation: \\lim_{x \\to 0} \\frac{\\sin x}{2x} = \\frac{1}{2} \\lim_{x \\to 0} \\frac{\\sin x}{x} = \\frac{1}{2} \\times 1 = \\frac{1}{2}.

Option B is correct.`,
    shortcutTips: 'Taylor series expansion: cos x = 1 - x^2/2 + ..., so 1 - cos x = x^2/2. Dividing by x^2 gives 1/2 directly.',
    commonPitfalls: 'Forgetting the 1/4 factor when squaring x/2.'
  },

  // ==========================================
  // CHAPTER 2: LINEAR ALGEBRA
  // ==========================================
  {
    id: '2.2.1',
    chapter: 'Linear Algebra',
    sectionNumber: '2.2',
    topic: 'Determinant',
    exam: 'GATE CSE 1997 | Question: 1.3',
    examYear: 1997,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '11' },
      { label: 'B', text: '-48' },
      { label: 'C', text: '0' },
      { label: 'D', text: '-24' }
    ],
    questionText: 'The determinant of the matrix:\n[[6, -8, 1, 1], [0, 2, 4, 6], [0, 0, 4, 8], [0, 0, 0, -1]] is:',
    officialAnswer: 'B',
    keyFormulas: [
      'Determinant of an Upper Triangular Matrix is the product of its diagonal elements: \\det(A) = a_{11} a_{22} \\dots a_{nn}'
    ],
    detailedSolution: `Step 1: Observe the structure of the given 4x4 matrix:
All elements strictly below the main diagonal are zero:
a_{21} = 0
a_{31} = 0, a_{32} = 0
a_{41} = 0, a_{42} = 0, a_{43} = 0.

Step 2: Recognize that this is an UPPER TRIANGULAR matrix.

Step 3: The determinant of any triangular (upper or lower) matrix equals the product of its main diagonal entries:
\\det(A) = 6 \\times 2 \\times 4 \\times (-1)
\\det(A) = 12 \\times 4 \\times (-1) = 48 \\times (-1) = -48.

Option B is correct.`,
    shortcutTips: 'Whenever you see all zeros below the diagonal, just multiply the diagonal numbers: 6 * 2 * 4 * (-1) = -48.',
    commonPitfalls: 'Spending unnecessary time computing cofactors along row 1.'
  },
  {
    id: '2.2.4',
    chapter: 'Linear Algebra',
    sectionNumber: '2.2',
    topic: 'Determinant & Rank',
    exam: 'GATE CSE 2014 Set 2 | Question: 4',
    examYear: 2014,
    branch: 'CSE',
    questionType: 'NAT',
    questionText: 'If the matrix A is such that A = [2; -4; 7] * [1, 9, 5], then the determinant of A is equal to ______.',
    officialAnswer: '0',
    answerRange: '0 : 0',
    keyFormulas: [
      'Outer product of two vectors u \\in \\mathbb{R}^{3 \\times 1} and v^T \\in \\mathbb{R}^{1 \\times 3} has rank \\le 1',
      'For any n x n matrix with rank < n, \\det(A) = 0'
    ],
    detailedSolution: `Step 1: Identify dimensions:
u = [2, -4, 7]^T is a 3x1 column vector.
v = [1, 9, 5] is a 1x3 row vector.
Their product A = u v^T is a 3x3 square matrix.

Step 2: Analyze the rank of an outer product:
Every row of A is a scalar multiple of [1, 9, 5]:
Row 1 = 2 * [1, 9, 5]
Row 2 = -4 * [1, 9, 5]
Row 3 = 7 * [1, 9, 5]
Thus, all rows are linearly dependent on the single vector [1, 9, 5].

Step 3: Conclude rank and determinant:
Rank(A) = 1.
For an n x n matrix where n = 3, since Rank(A) = 1 < 3, the columns and rows are linearly dependent.
Therefore, \\det(A) = 0.`,
    shortcutTips: 'Outer product of vectors u * v^T always has rank 1. For n >= 2, det is ALWAYS 0.',
    commonPitfalls: 'Multiplying out all 9 entries and expanding a 3x3 determinant manually.'
  },
  {
    id: '2.3.3',
    chapter: 'Linear Algebra',
    sectionNumber: '2.3',
    topic: 'Eigen Values',
    exam: 'GATE CSE 2005 | Question: 49',
    examYear: 2005,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '-1 and 1' },
      { label: 'B', text: '1 and 6' },
      { label: 'C', text: '2 and 5' },
      { label: 'D', text: '4 and -1' }
    ],
    questionText: 'What are the eigenvalues of the following 2x2 matrix?\n[[2, -1], [-4, 5]]',
    officialAnswer: 'B',
    keyFormulas: [
      'Trace property: \\lambda_1 + \\lambda_2 = \\text{Trace}(A) = a_{11} + a_{22}',
      'Determinant property: \\lambda_1 \\cdot \\lambda_2 = \\det(A) = a_{11} a_{22} - a_{12} a_{21}'
    ],
    detailedSolution: `Step 1: Compute Trace of matrix A:
Trace(A) = 2 + 5 = 7.
So, \\lambda_1 + \\lambda_2 = 7.

Step 2: Compute Determinant of matrix A:
\\det(A) = (2)(5) - (-1)(-4) = 10 - 4 = 6.
So, \\lambda_1 \\cdot \\lambda_2 = 6.

Step 3: Test the options:
Option A: -1 + 1 = 0 (Trace != 7) -> False
Option B: 1 + 6 = 7, and 1 * 6 = 6 -> TRUE!
Option C: 2 + 5 = 7, but 2 * 5 = 10 != 6 -> False
Option D: 4 + (-1) = 3 -> False

Thus, the eigenvalues are 1 and 6. Option B is correct.`,
    shortcutTips: 'Characteristic equation: \\lambda^2 - \\text{Trace}\\cdot\\lambda + \\det = 0 \\implies \\lambda^2 - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6) = 0.',
    commonPitfalls: 'Forgetting that in (a11*a22 - a12*a21), the two negatives (-1)(-4) equal +4, so det = 10 - 4 = 6.'
  },
  {
    id: '2.3.8',
    chapter: 'Linear Algebra',
    sectionNumber: '2.3',
    topic: 'Eigen Values of Matrix Powers',
    exam: 'GATE CSE 2012 | Question: 11',
    examYear: 2012,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '1024 and -1024' },
      { label: 'B', text: '1024\\sqrt{2} and -1024\\sqrt{2}' },
      { label: 'C', text: '4\\sqrt{2} and -4\\sqrt{2}' },
      { label: 'D', text: '512\\sqrt{2} and -512\\sqrt{2}' }
    ],
    questionText: 'Let A be the 2x2 matrix with elements a_{11} = a_{12} = a_{21} = +1 and a_{22} = -1. Then the eigenvalues of the matrix A^{19} are:',
    officialAnswer: 'D',
    keyFormulas: [
      'Spectral Mapping Theorem: If \\lambda is an eigenvalue of A, then \\lambda^k is an eigenvalue of A^k',
      'Eigenvalues of A: \\det(A - \\lambda I) = 0'
    ],
    detailedSolution: `Step 1: Write matrix A:
A = [[1, 1], [1, -1]].

Step 2: Find eigenvalues of A:
Characteristic equation:
\\det(A - \\lambda I) = (1 - \\lambda)(-1 - \\lambda) - (1)(1) = \\lambda^2 - 1 - 1 = \\lambda^2 - 2 = 0.
\\implies \\lambda = \\pm \\sqrt{2}.

Step 3: Find eigenvalues of A^{19}:
Using the eigenvalue property, the eigenvalues of A^{19} are \\lambda^{19}:
\\lambda_1^{19} = (+\\sqrt{2})^{19} = (\\sqrt{2})^{18} \\cdot \\sqrt{2} = (2^9) \\sqrt{2} = 512\\sqrt{2}.
\\lambda_2^{19} = (-\\sqrt{2})^{19} = -(\\sqrt{2})^{19} = -512\\sqrt{2}.

Matching with options:
Option D: 512\\sqrt{2} and -512\\sqrt{2}.`,
    shortcutTips: 'Notice 2^{19/2} = 2^9 * sqrt(2) = 512 * sqrt(2). Eliminates A and B immediately.',
    commonPitfalls: 'Thinking 2^9 is 1024 instead of 512 (2^{10} = 1024, 2^9 = 512).'
  },
  {
    id: '2.3.26',
    chapter: 'Linear Algebra',
    sectionNumber: '2.3',
    topic: 'Product of Eigenvalues',
    exam: 'GATE CSE 2024 Set 1 | Question: 2',
    examYear: 2024,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '-1' },
      { label: 'B', text: '0' },
      { label: 'C', text: '1' },
      { label: 'D', text: '2' }
    ],
    questionText: 'The product of all eigenvalues of the matrix [[1, 2, 3], [4, 5, 6], [7, 8, 9]] is:',
    officialAnswer: 'B',
    keyFormulas: [
      'Theorem: The product of all eigenvalues of a matrix is equal to its determinant: \\prod \\lambda_i = \\det(A)',
      'If the rows of a matrix form an arithmetic progression, the rows are linearly dependent and \\det(A) = 0'
    ],
    detailedSolution: `Step 1: Recall that for any square matrix A:
Product of eigenvalues = \\det(A).

Step 2: Inspect matrix A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]:
Perform row operations:
R_2 \\to R_2 - R_1 = [3, 3, 3]
R_3 \\to R_3 - R_2 = [3, 3, 3].
Now R_2 = R_3.
Two rows are identical!

Step 3: A matrix with two identical rows has determinant equal to 0:
\\det(A) = 0.
Therefore, product of eigenvalues = 0.
Option B is correct.`,
    shortcutTips: 'Numbers in each row and column differ by constant arithmetic steps: R_1 + R_3 = 2*R_2. Hence rows are linearly dependent -> Det = 0 -> Product of eigenvalues = 0.',
    commonPitfalls: 'Attempting to calculate the characteristic cubic equation.'
  },
  {
    id: '2.4.9',
    chapter: 'Linear Algebra',
    sectionNumber: '2.4',
    topic: 'Skew-Symmetric Matrix Eigenvalues',
    exam: 'GATE ECE 2010 | Question: 1',
    examYear: 2010,
    branch: 'ECE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: 'always zero' },
      { label: 'B', text: 'always pure imaginary' },
      { label: 'C', text: 'either zero or pure imaginary' },
      { label: 'D', text: 'always real' }
    ],
    questionText: 'The eigenvalues of a skew-symmetric matrix are:',
    officialAnswer: 'C',
    keyFormulas: [
      'Definition of Skew-Symmetric Matrix: A^T = -A',
      'For any real skew-symmetric matrix, if Ax = \\lambda x, then x^* A x = \\lambda x^* x',
      'Taking conjugate transpose: (x^* A x)^* = x^* A^T x = -x^* A x = -\\lambda x^* x',
      'Thus \\lambda^* = -\\lambda \\implies \\text{Re}(\\lambda) = 0'
    ],
    detailedSolution: `Step 1: Let A be a real skew-symmetric matrix (A^T = -A).
Let \\lambda be an eigenvalue of A with non-zero eigenvector x:
Ax = \\lambda x.

Step 2: Take conjugate transpose on both sides:
x^* A^* = \\bar{\\lambda} x^*
Since A is real, A^* = A^T = -A:
-x^* A = \\bar{\\lambda} x^*.

Step 3: Post-multiply by x:
-x^* (Ax) = \\bar{\\lambda} x^* x
-\\lambda (x^* x) = \\bar{\\lambda} (x^* x).
Since x is non-zero, x^* x = ||x||^2 > 0:
\\bar{\\lambda} = -\\lambda.

Step 4: Analyze \\bar{\\lambda} = -\\lambda:
Let \\lambda = a + ib where a, b \\in \\mathbb{R}.
a - ib = -(a + ib) = -a - ib
\\implies 2a = 0 \\implies a = 0.
Thus, the real part of \\lambda is zero.
This means \\lambda must be purely imaginary (if b \\neq 0) or zero (if b = 0).

Option C: either zero or pure imaginary is correct.`,
    shortcutTips: 'Standard property table:\n- Symmetric matrix -> all eigenvalues are REAL.\n- Skew-symmetric matrix -> eigenvalues are ZERO or PURELY IMAGINARY.\n- Orthogonal matrix -> eigenvalues have unit modulus (|lambda| = 1).',
    commonPitfalls: 'Forgetting that 0 is also possible (especially in odd-dimension skew-symmetric matrices where det = 0).'
  },
  {
    id: '2.4.32',
    chapter: 'Linear Algebra',
    sectionNumber: '2.4',
    topic: 'Eigenvalues of Matrix Powers',
    exam: 'GATE Electrical 2019 | Question: 2',
    examYear: 2019,
    branch: 'EE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '4 and 9' },
      { label: 'B', text: '2 and 3' },
      { label: 'C', text: '-2 and -3' },
      { label: 'D', text: '16 and 81' }
    ],
    questionText: 'M is a 2x2 matrix with eigenvalues 4 and 9. The eigenvalues of M^2 are:',
    officialAnswer: 'D',
    keyFormulas: [
      'If \\lambda is an eigenvalue of M, then \\lambda^k is an eigenvalue of M^k'
    ],
    detailedSolution: `Step 1: We are given that M has eigenvalues \\lambda_1 = 4 and \\lambda_2 = 9.
Step 2: By the spectral theorem / matrix polynomial property:
The eigenvalues of M^2 are \\lambda_1^2 and \\lambda_2^2.
\\lambda_1^2 = 4^2 = 16
\\lambda_2^2 = 9^2 = 81.

Therefore, the eigenvalues of M^2 are 16 and 81.
Option D is correct.`,
    shortcutTips: 'Direct squaring of eigenvalues: 4^2 = 16, 9^2 = 81.',
    commonPitfalls: 'Taking square roots (Option B) instead of powers.'
  },

  // ==========================================
  // CHAPTER 3: PROBABILITY
  // ==========================================
  {
    id: '3.1.1',
    chapter: 'Probability',
    sectionNumber: '3.1',
    topic: 'Binomial Distribution & Coin Tosses',
    exam: 'GATE CSE 2002 | Question: 2.16',
    examYear: 2002,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '1/16' },
      { label: 'B', text: '1/8' },
      { label: 'C', text: '7/8' },
      { label: 'D', text: '15/16' }
    ],
    questionText: 'Four fair coins are tossed simultaneously. The probability that at least one head and one tail turn up is:',
    officialAnswer: 'C',
    keyFormulas: [
      'Total possible outcomes for n coins: 2^n',
      'Complementary Probability: P(E) = 1 - P(E^c)',
      'E^c = "all heads" OR "all tails"'
    ],
    detailedSolution: `Step 1: Total number of outcomes when 4 coins are tossed:
|S| = 2^4 = 16 equally likely outcomes.

Step 2: Define event E:
E = "at least one head AND at least one tail".
The complement event E^c is:
E^c = "no heads (all tails)" OR "no tails (all heads)".

Step 3: Count favorable outcomes for E^c:
- All heads: (H, H, H, H) -> 1 outcome.
- All tails: (T, T, T, T) -> 1 outcome.
Total outcomes for E^c = 1 + 1 = 2 outcomes.

Step 4: Calculate probabilities:
P(E^c) = 2 / 16 = 1 / 8.
P(E) = 1 - P(E^c) = 1 - 1/8 = 7/8.

Option C is the correct answer.`,
    shortcutTips: 'Complement rule is always the fastest for "at least one": 1 - (1/16 + 1/16) = 1 - 2/16 = 14/16 = 7/8.',
    commonPitfalls: 'Misreading "at least one head and one tail" as only "at least one head", which would give 15/16 (Option D).'
  },
  {
    id: '3.1.2',
    chapter: 'Probability',
    sectionNumber: '3.1',
    topic: 'Binomial Probability',
    exam: 'GATE CSE 2005 | Question: 52',
    examYear: 2005,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '1 / 2^n' },
      { label: 'B', text: '1 - 1/n' },
      { label: 'C', text: '1 / n!' },
      { label: 'D', text: '1 - 1 / 2^n' }
    ],
    questionText: 'A random bit string of length n is constructed by tossing a fair coin n times and setting a bit to 0 or 1 depending on outcomes head and tail, respectively. The probability that two such randomly generated strings are not identical is:',
    officialAnswer: 'D',
    keyFormulas: [
      'Total possible bit strings of length n: 2^n',
      'P(two independent strings are identical) = 1 / 2^n',
      'P(not identical) = 1 - P(identical)'
    ],
    detailedSolution: `Step 1: First string generation:
Any particular bit string S_1 is generated from the 2^n possibilities.

Step 2: Second string generation:
The second bit string S_2 is generated independently. There are 2^n equally likely outcomes for S_2.
Exactly 1 of these 2^n outcomes matches S_1.
Therefore, P(S_1 = S_2) = \\frac{1}{2^n}.

Step 3: Probability that they are not identical:
P(S_1 \\neq S_2) = 1 - P(S_1 = S_2) = 1 - \\frac{1}{2^n}.

Option D is correct.`,
    shortcutTips: 'Whatever the first string is, the second string must match each of its n bits with probability (1/2)^n. Complement = 1 - 1/2^n.',
    commonPitfalls: 'Thinking the number of pairs is (2^n choose 2) and complicating the denominator.'
  },
  {
    id: '3.2.4',
    chapter: 'Probability',
    sectionNumber: '3.2',
    topic: 'Conditional Probability & Bayes Theorem',
    exam: 'GATE CSE 2005 | Question: 51',
    examYear: 2005,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '4/19' },
      { label: 'B', text: '5/19' },
      { label: 'C', text: '2/9' },
      { label: 'D', text: '19/30' }
    ],
    questionText: 'Box P has 2 red balls and 3 blue balls and box Q has 3 red balls and 1 blue ball. A ball is selected as follows: (i) select a box (ii) choose a ball from the selected box such that each ball in the box is equally likely to be chosen. The probabilities of selecting boxes P and Q are 1/3 and 2/3 respectively. Given that a ball selected in the above process is a red ball, the probability that it came from the box P is:',
    officialAnswer: 'A',
    keyFormulas: [
      'Bayes Theorem: P(P | Red) = \\frac{P(P) \\cdot P(\\text{Red} | P)}{P(P) \\cdot P(\\text{Red} | P) + P(Q) \\cdot P(\\text{Red} | Q)}'
    ],
    detailedSolution: `Step 1: Identify given probabilities:
P(Box P) = 1/3, P(Box Q) = 2/3.
Box P composition: 2 Red, 3 Blue (total 5 balls)
\\implies P(Red | P) = 2/5.

Box Q composition: 3 Red, 1 Blue (total 4 balls)
\\implies P(Red | Q) = 3/4.

Step 2: Total probability of selecting a Red ball:
P(Red) = P(P) \\cdot P(Red | P) + P(Q) \\cdot P(Red | Q)
P(Red) = \\left(\\frac{1}{3} \\times \\frac{2}{5}\\right) + \\left(\\frac{2}{3} \\times \\frac{3}{4}\\right)
P(Red) = \\frac{2}{15} + \\frac{6}{12} = \\frac{2}{15} + \\frac{1}{2} = \\frac{4 + 15}{30} = \\frac{19}{30}.

Step 3: Apply Bayes\' Theorem for P(P | Red):
P(P | Red) = \\frac{P(P \\cap Red)}{P(Red)} = \\frac{2/15}{19/30} = \\frac{2}{15} \\times \\frac{30}{19} = \\frac{4}{19}.

Option A is the correct answer.`,
    shortcutTips: 'Clear fractions by multiplying numerators by LCM(15, 2) = 30: P contribution from P is 2/15 * 30 = 4. Contribution from Q is 1/2 * 30 = 15. Fraction = 4 / (4 + 15) = 4/19!',
    commonPitfalls: '19/30 is the denominator (total probability of red ball), which is given as Option D to trap candidates.'
  },
  {
    id: '3.2.7',
    chapter: 'Probability',
    sectionNumber: '3.2',
    topic: 'Conditional Probability',
    exam: 'GATE CSE 2011 | Question: 3',
    examYear: 2011,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '1/3' },
      { label: 'B', text: '1/4' },
      { label: 'C', text: '1/2' },
      { label: 'D', text: '2/3' }
    ],
    questionText: 'If two fair coins are flipped and at least one of the outcomes is known to be a head, what is the probability that both outcomes are heads?',
    officialAnswer: 'A',
    keyFormulas: [
      'Conditional Probability: P(A | B) = \\frac{P(A \\cap B)}{P(B)}'
    ],
    detailedSolution: `Step 1: Define Sample space for two fair coins:
S = { (H, H), (H, T), (T, H), (T, T) }, with |S| = 4.

Step 2: Define events:
Event B = "at least one head" = { (H, H), (H, T), (T, H) }
So |B| = 3, and P(B) = 3/4.

Event A = "both outcomes are heads" = { (H, H) }
So A \\cap B = { (H, H) }, and P(A \\cap B) = 1/4.

Step 3: Calculate conditional probability:
P(A | B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{1/4}{3/4} = \\frac{1}{3}.

Option A is correct.`,
    shortcutTips: 'Restricted sample space: Condition "at least one head" eliminates (T, T), leaving exactly 3 outcomes {HH, HT, TH}. Only 1 of these has both heads, so probability is 1/3.',
    commonPitfalls: 'Assuming the answer is 1/2 by thinking "the other coin must be head with prob 1/2". That only applies if a SPECIFIC coin (e.g. the first coin) was specified as head.'
  },
  {
    id: '3.9.8',
    chapter: 'Probability',
    sectionNumber: '3.9',
    topic: 'Combinatorial Probability',
    exam: 'GATE CSE 2004 | Question: 25',
    examYear: 2004,
    branch: 'CSE',
    questionType: 'MCQ',
    options: [
      { label: 'A', text: '3/8' },
      { label: 'B', text: '1/2' },
      { label: 'C', text: '5/8' },
      { label: 'D', text: '3/4' }
    ],
    questionText: 'If a fair coin is tossed four times. What is the probability that two heads and two tails will result?',
    officialAnswer: 'A',
    keyFormulas: [
      'Binomial Distribution formula: P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}',
      'For fair coin: p = 1/2, 1-p = 1/2'
    ],
    detailedSolution: `Here n = 4 tosses, p = 1/2 (fair coin).
We want k = 2 heads:
P(2 Heads, 2 Tails) = \\binom{4}{2} \\left(\\frac{1}{2}\\right)^2 \\left(\\frac{1}{2}\\right)^2
\\binom{4}{2} = \\frac{4 \\times 3}{2 \\times 1} = 6.
Total outcomes = 2^4 = 16.
Probability = 6 / 16 = 3/8.

Option A is correct.`,
    shortcutTips: '4C2 / 16 = 6/16 = 3/8.',
    commonPitfalls: 'None, fundamental binomial question.'
  },
  {
    id: '3.14.5',
    chapter: 'Probability',
    sectionNumber: '3.14',
    topic: 'Uniform Distribution & Order Statistics',
    exam: 'GATE CSE 2014 Set 1 | Question: 2',
    examYear: 2014,
    branch: 'CSE',
    questionType: 'NAT',
    questionText: 'Suppose you break a stick of unit length at a point chosen uniformly at random. Then the expected length of the shorter stick is ________.',
    officialAnswer: '0.25',
    answerRange: '0.24 : 0.27',
    keyFormulas: [
      'Let break point X \\sim \\text{Uniform}(0, 1)',
      'Lengths of the two pieces are X and 1 - X',
      'Length of shorter piece L = \\min(X, 1 - X)',
      'Expected value E[L] = \\int_0^1 \\min(x, 1 - x) dx'
    ],
    detailedSolution: `Step 1: Model the random break point:
Let X be the point where the stick is broken, with probability density function:
f_X(x) = 1 for 0 <= x <= 1.

Step 2: Define shorter stick length L:
L = \\min(X, 1 - X).
Notice that:
- If 0 <= x <= 1/2, then \\min(x, 1 - x) = x.
- If 1/2 <= x <= 1, then \\min(x, 1 - x) = 1 - x.

Step 3: Compute Expected value:
E[L] = \\int_0^1 \\min(x, 1 - x) dx
     = \\int_0^{1/2} x dx + \\int_{1/2}^1 (1 - x) dx.

By symmetry, both integrals are equal:
E[L] = 2 \\int_0^{1/2} x dx = 2 \\left[ \\frac{x^2}{2} \\right]_0^{1/2} = 2 \\left( \\frac{1/4}{2} \\right) = \\frac{1}{4} = 0.25.

Conclusion:
The expected length of the shorter piece is 0.25 (within official range 0.24 to 0.27).`,
    shortcutTips: 'By symmetry, the shorter stick is uniformly distributed between 0 and 0.5. The mean of Uniform(0, 0.5) is simply (0 + 0.5) / 2 = 0.25!',
    commonPitfalls: 'Confusing the shorter stick with the longer stick (which has expectation 0.75).'
  },
  {
    id: '3.14.9',
    chapter: 'Probability',
    sectionNumber: '3.14',
    topic: 'Continuous Bivariate Uniform Distribution',
    exam: 'GATE DS&AI 2024 | Question: 46',
    examYear: 2024,
    branch: 'DA',
    questionType: 'NAT',
    questionText: 'Let X be a random variable uniformly distributed in the interval [1, 3] and Y be a random variable uniformly distributed in the interval [2, 4]. If X and Y are independent of each other, the probability P(X \\ge Y) is ________ (rounded off to three decimal places).',
    officialAnswer: '0.125',
    answerRange: '0.125 : 0.125',
    keyFormulas: [
      'Joint PDF for independent uniform variables: f_{X,Y}(x,y) = f_X(x) \\cdot f_Y(y) = (1/2) \\cdot (1/2) = 1/4',
      'Geometric Probability: P(X \\ge Y) = \\frac{\\text{Area of region where } x \\ge y}{\\text{Total sample space area}}'
    ],
    detailedSolution: `Step 1: Domain of (X, Y):
X \\in [1, 3] (length 2)
Y \\in [2, 4] (length 2)
The sample space is a square of dimensions [1, 3] x [2, 4] with Total Area = 2 x 2 = 4.

Step 2: Identify the event region X >= Y:
For (x, y) in the square:
x \\in [1, 3] and y \\in [2, 4].
The condition x >= y requires:
Since y >= 2, x must be at least 2.
So 2 <= y <= x <= 3.

Step 3: Geometry of the event region:
The region is bounded by:
x = 2 to x = 3, y = 2, and the line y = x.
This forms a right-angled triangle with vertices:
(2, 2), (3, 2), and (3, 3).
Base = 3 - 2 = 1.
Height = 3 - 2 = 1.
Area of this triangle = (1/2) * Base * Height = (1/2) * 1 * 1 = 0.5.

Step 4: Compute probability:
Since joint PDF is uniform:
P(X >= Y) = \\frac{\\text{Favorable Area}}{\\text{Total Area}} = \\frac{0.5}{4} = \\frac{1}{8} = 0.125.

Answer: 0.125.`,
    shortcutTips: 'Draw the 2x2 square. The line y = x cuts through the corner from (2,2) to (3,3). The triangle below y=x has area 0.5. Dividing by 4 gives 1/8 = 0.125 instantly.',
    commonPitfalls: 'Forgetting that Y ranges from 2 to 4, not 1 to 3.'
  }
];

// Complete Section Index from the Table of Contents in the PDF
export interface SectionInfo {
  sectionId: string;
  chapter: 'Calculus' | 'Linear Algebra' | 'Probability';
  title: string;
  count: number;
}

export const SECTIONS_INDEX: SectionInfo[] = [
  // Calculus (218)
  { sectionId: '1.1', chapter: 'Calculus', title: 'Area Under Curve', count: 1 },
  { sectionId: '1.2', chapter: 'Calculus', title: 'Cartesian Coordinates', count: 2 },
  { sectionId: '1.3', chapter: 'Calculus', title: 'Complex Number', count: 1 },
  { sectionId: '1.4', chapter: 'Calculus', title: 'Complex Variables', count: 5 },
  { sectionId: '1.5', chapter: 'Calculus', title: 'Continuity', count: 9 },
  { sectionId: '1.6', chapter: 'Calculus', title: 'Continuity and Differentiability', count: 5 },
  { sectionId: '1.7', chapter: 'Calculus', title: 'Contour Integral', count: 1 },
  { sectionId: '1.8', chapter: 'Calculus', title: 'Contour Plots', count: 1 },
  { sectionId: '1.9', chapter: 'Calculus', title: 'Convergence', count: 3 },
  { sectionId: '1.10', chapter: 'Calculus', title: 'Convergence Criteria', count: 1 },
  { sectionId: '1.11', chapter: 'Calculus', title: 'Curves', count: 3 },
  { sectionId: '1.12', chapter: 'Calculus', title: 'Definite Integral', count: 10 },
  { sectionId: '1.13', chapter: 'Calculus', title: 'Definite Integrals', count: 19 },
  { sectionId: '1.14', chapter: 'Calculus', title: 'Degree of Polynomial', count: 1 },
  { sectionId: '1.15', chapter: 'Calculus', title: 'Derivatives', count: 7 },
  { sectionId: '1.16', chapter: 'Calculus', title: 'Differential Equation', count: 1 },
  { sectionId: '1.17', chapter: 'Calculus', title: 'Differential Equations', count: 1 },
  { sectionId: '1.18', chapter: 'Calculus', title: 'Differentiation', count: 6 },
  { sectionId: '1.19', chapter: 'Calculus', title: 'Directional Derivatives', count: 3 },
  { sectionId: '1.20', chapter: 'Calculus', title: 'Divergence', count: 2 },
  { sectionId: '1.21', chapter: 'Calculus', title: 'Double Integral', count: 2 },
  { sectionId: '1.22', chapter: 'Calculus', title: 'Field Vector', count: 1 },
  { sectionId: '1.23', chapter: 'Calculus', title: 'Field Vectors', count: 4 },
  { sectionId: '1.24', chapter: 'Calculus', title: 'Fourier Series', count: 2 },
  { sectionId: '1.25', chapter: 'Calculus', title: 'Functions', count: 4 },
  { sectionId: '1.26', chapter: 'Calculus', title: 'Functions of Single Variable', count: 1 },
  { sectionId: '1.27', chapter: 'Calculus', title: 'Gradient', count: 3 },
  { sectionId: '1.28', chapter: 'Calculus', title: 'Graphs', count: 1 },
  { sectionId: '1.29', chapter: 'Calculus', title: 'Initial and Boundary Value Problems', count: 1 },
  { sectionId: '1.30', chapter: 'Calculus', title: 'Integrals', count: 2 },
  { sectionId: '1.31', chapter: 'Calculus', title: 'Integration', count: 11 },
  { sectionId: '1.32', chapter: 'Calculus', title: 'Limits', count: 26 },
  { sectionId: '1.33', chapter: 'Calculus', title: 'Line Integral', count: 5 },
  { sectionId: '1.34', chapter: 'Calculus', title: 'Matrices in Calculus', count: 1 },
  { sectionId: '1.35', chapter: 'Calculus', title: 'Maxima Minima', count: 32 },
  { sectionId: '1.36', chapter: 'Calculus', title: 'Mean Value Theorem', count: 1 },
  { sectionId: '1.37', chapter: 'Calculus', title: 'Out of Gatecse Syllabus', count: 4 },
  { sectionId: '1.38', chapter: 'Calculus', title: 'Partial Derivatives', count: 3 },
  { sectionId: '1.39', chapter: 'Calculus', title: 'Polynomials', count: 5 },
  { sectionId: '1.40', chapter: 'Calculus', title: 'Routh Hurwitz Array', count: 1 },
  { sectionId: '1.41', chapter: 'Calculus', title: 'Sequences and Series', count: 1 },
  { sectionId: '1.42', chapter: 'Calculus', title: 'Taylor Series', count: 6 },
  { sectionId: '1.43', chapter: 'Calculus', title: 'Triangles', count: 1 },
  { sectionId: '1.44', chapter: 'Calculus', title: 'Triple Integrals', count: 1 },
  { sectionId: '1.45', chapter: 'Calculus', title: 'Unit Vectors', count: 2 },
  { sectionId: '1.46', chapter: 'Calculus', title: 'Vector Identities', count: 10 },
  { sectionId: '1.47', chapter: 'Calculus', title: 'Volume Integral', count: 1 },

  // Linear Algebra (186)
  { sectionId: '2.1', chapter: 'Linear Algebra', title: 'Cartesian Coordinates', count: 1 },
  { sectionId: '2.2', chapter: 'Linear Algebra', title: 'Determinant', count: 10 },
  { sectionId: '2.3', chapter: 'Linear Algebra', title: 'Eigen Value', count: 30 },
  { sectionId: '2.4', chapter: 'Linear Algebra', title: 'Eigen Values', count: 40 },
  { sectionId: '2.5', chapter: 'Linear Algebra', title: 'Fractions', count: 1 },
  { sectionId: '2.6', chapter: 'Linear Algebra', title: 'Inequality', count: 1 },
  { sectionId: '2.7', chapter: 'Linear Algebra', title: 'Linear Equation', count: 1 },
  { sectionId: '2.8', chapter: 'Linear Algebra', title: 'Matrices', count: 36 },
  { sectionId: '2.9', chapter: 'Linear Algebra', title: 'Matrix Operations & Inverses', count: 19 },
  { sectionId: '2.10', chapter: 'Linear Algebra', title: 'Matrix Algebra', count: 7 },
  { sectionId: '2.11', chapter: 'Linear Algebra', title: 'Numerical Methods', count: 2 },
  { sectionId: '2.12', chapter: 'Linear Algebra', title: 'Matrix Norms (Out of Syllabus)', count: 1 },
  { sectionId: '2.13', chapter: 'Linear Algebra', title: 'Rank of Matrix', count: 6 },
  { sectionId: '2.14', chapter: 'Linear Algebra', title: 'Second Order Differential Equation', count: 1 },
  { sectionId: '2.15', chapter: 'Linear Algebra', title: 'Sequence', count: 1 },
  { sectionId: '2.16', chapter: 'Linear Algebra', title: 'State Equations', count: 2 },
  { sectionId: '2.17', chapter: 'Linear Algebra', title: 'Subspace', count: 1 },
  { sectionId: '2.18', chapter: 'Linear Algebra', title: 'System of Equations', count: 19 },
  { sectionId: '2.19', chapter: 'Linear Algebra', title: 'Transition Matrix', count: 1 },
  { sectionId: '2.20', chapter: 'Linear Algebra', title: 'Vector Analysis', count: 1 },
  { sectionId: '2.21', chapter: 'Linear Algebra', title: 'Vector Space', count: 5 },

  // Probability (93)
  { sectionId: '3.1', chapter: 'Probability', title: 'Binomial Distribution', count: 6 },
  { sectionId: '3.2', chapter: 'Probability', title: 'Conditional Probability', count: 15 },
  { sectionId: '3.3', chapter: 'Probability', title: 'Continuous Distribution', count: 1 },
  { sectionId: '3.4', chapter: 'Probability', title: 'Expectation & Variance', count: 11 },
  { sectionId: '3.5', chapter: 'Probability', title: 'Exponential Distribution', count: 3 },
  { sectionId: '3.6', chapter: 'Probability', title: 'Independent Events', count: 5 },
  { sectionId: '3.7', chapter: 'Probability', title: 'Normal Distribution', count: 2 },
  { sectionId: '3.8', chapter: 'Probability', title: 'Poisson Distribution', count: 4 },
  { sectionId: '3.9', chapter: 'Probability', title: 'General Probability Problems', count: 27 },
  { sectionId: '3.10', chapter: 'Probability', title: 'Probability Density Function', count: 1 },
  { sectionId: '3.11', chapter: 'Probability', title: 'Queuing Theory', count: 1 },
  { sectionId: '3.12', chapter: 'Probability', title: 'Random Variables', count: 5 },
  { sectionId: '3.13', chapter: 'Probability', title: 'Statistics', count: 3 },
  { sectionId: '3.14', chapter: 'Probability', title: 'Uniform Distribution', count: 9 }
];
