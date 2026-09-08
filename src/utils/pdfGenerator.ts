import jsPDF from 'jspdf';
import { Question } from '../types';

export interface PdfExportOptions {
  title?: string;
  subtitle?: string;
  chapterFilter?: string;
  includeSolutions?: boolean;
  includeKeyFormulas?: boolean;
  includeExamTips?: boolean;
  includeAnswerKeyTable?: boolean;
}

export function generateSolutionsPdf(
  questions: Question[],
  options: PdfExportOptions = {}
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let cursorY = margin;

  // Helper to ensure enough space on page or add a new page
  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      cursorY = margin + 10;
      drawHeader();
    }
  };

  const drawHeader = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('GATE Engineering Mathematics Solutions Handbook', margin, margin);
    doc.text(options.chapterFilter ? `Chapter: ${options.chapterFilter}` : 'All Chapters', pageWidth - margin, margin, { align: 'right' });
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, margin + 2, pageWidth - margin, margin + 2);
  };

  // ============================================
  // COVER / TITLE BLOCK
  // ============================================
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(margin, cursorY, contentWidth, 36, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(options.title || 'GATE ENGINEERING MATHEMATICS', margin + 6, cursorY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(226, 232, 240);
  doc.text(
    options.subtitle || 'Step-by-Step Mathematical Derivations & Verified Answer Keys',
    margin + 6,
    cursorY + 20
  );

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  const filterDesc = options.chapterFilter && options.chapterFilter !== 'All' 
    ? `Topic Focus: ${options.chapterFilter} | Questions: ${questions.length}`
    : `Complete Syllabus (Calculus 218 • Linear Algebra 186 • Probability 93) | Curated Solutions: ${questions.length}`;
  doc.text(filterDesc, margin + 6, cursorY + 29);

  cursorY += 44;

  // ============================================
  // QUESTIONS & STEP-BY-STEP SOLUTIONS
  // ============================================
  questions.forEach((q, index) => {
    checkPageBreak(35);

    // Question Box Header
    doc.setFillColor(241, 245, 249); // slate-100
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.rect(margin, cursorY, contentWidth, 7, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(`[${q.id}] ${q.chapter} — ${q.topic}`, margin + 3, cursorY + 4.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`${q.exam}`, pageWidth - margin - 3, cursorY + 4.8, { align: 'right' });

    cursorY += 10;

    // Question Text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    const qLines = doc.splitTextToSize(q.questionText, contentWidth - 4);
    checkPageBreak(qLines.length * 4.2 + 10);
    doc.text(qLines, margin + 2, cursorY);
    cursorY += qLines.length * 4.2 + 2;

    // Options (if MCQ)
    if (q.options && q.options.length > 0) {
      checkPageBreak(q.options.length * 4.5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      q.options.forEach((opt) => {
        const isOfficial = opt.label === q.officialAnswer;
        if (isOfficial) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(16, 185, 129); // green
        } else {
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(51, 65, 85);
        }
        const optText = `(${opt.label}) ${opt.text}${isOfficial ? '  ✓ [Official Key]' : ''}`;
        const optLines = doc.splitTextToSize(optText, contentWidth - 8);
        doc.text(optLines, margin + 4, cursorY);
        cursorY += optLines.length * 4.2;
      });
      cursorY += 2;
    }

    // Official Answer Badge
    checkPageBreak(7);
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.setDrawColor(52, 211, 153);
    doc.rect(margin + 2, cursorY, 65, 6, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(6, 95, 70); // emerald-800
    const ansBadge = q.answerRange ? `Official Key: ${q.officialAnswer} (Range: ${q.answerRange})` : `Official Answer Key: Option ${q.officialAnswer}`;
    doc.text(ansBadge, margin + 4, cursorY + 4.2);
    cursorY += 9;

    // Key Formulas Used
    if (options.includeKeyFormulas !== false && q.keyFormulas && q.keyFormulas.length > 0) {
      checkPageBreak(12 + q.keyFormulas.length * 4);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin + 2, cursorY, contentWidth - 4, 5 + q.keyFormulas.length * 4, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(79, 70, 229); // indigo-600
      doc.text('KEY FORMULAS & THEOREMS:', margin + 4, cursorY + 3.5);
      
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      q.keyFormulas.forEach((formula, fIdx) => {
        doc.text(`• ${formula}`, margin + 6, cursorY + 7.5 + fIdx * 4);
      });
      cursorY += 7 + q.keyFormulas.length * 4;
    }

    // Step-by-Step Derivation
    if (options.includeSolutions !== false && q.detailedSolution) {
      checkPageBreak(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 58, 138); // blue-900
      doc.text('Step-by-Step Mathematical Derivation:', margin + 2, cursorY);
      cursorY += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);
      const solLines = doc.splitTextToSize(q.detailedSolution, contentWidth - 4);
      
      // Print lines with page break checking
      solLines.forEach((line: string) => {
        checkPageBreak(4.2);
        doc.text(line, margin + 2, cursorY);
        cursorY += 4.0;
      });
      cursorY += 2;
    }

    // Exam Tips / Shortcut
    if (options.includeExamTips !== false && q.shortcutTips) {
      checkPageBreak(10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(180, 83, 9); // amber-700
      doc.text('⚡ GATE 3-HOUR EXAM SHORTCUT TIP:', margin + 2, cursorY);
      cursorY += 3.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 53, 15);
      const tipLines = doc.splitTextToSize(q.shortcutTips, contentWidth - 6);
      tipLines.forEach((tLine: string) => {
        checkPageBreak(3.8);
        doc.text(tLine, margin + 4, cursorY);
        cursorY += 3.8;
      });
      cursorY += 2;
    }

    // Divider between questions
    checkPageBreak(6);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 6;
  });

  // ============================================
  // FOOTERS ON ALL PAGES
  // ============================================
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - margin + 2, pageWidth - margin, pageHeight - margin + 2);
    doc.text('GATE Mathematics Complete Solution Portal — Generated from Archive', margin, pageHeight - margin + 6);
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - margin, pageHeight - margin + 6, { align: 'right' });
  }

  return doc;
}
