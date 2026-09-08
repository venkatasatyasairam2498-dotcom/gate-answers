export type Chapter = 'Calculus' | 'Linear Algebra' | 'Probability';

export type QuestionType = 'MCQ' | 'NAT' | 'MSQ' | 'Descriptive';

export interface QuestionOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string; // e.g., '1.0.1', '1.0.4', '2.2.1', '3.1.1'
  chapter: Chapter;
  sectionNumber: string;
  topic: string;
  exam: string; // e.g. "GATE ECE 2012 | Question: 25"
  examYear?: number;
  branch?: string; // CSE, ECE, ME, EE, Civil, Chemical, IN, BT, DA
  questionText: string;
  questionType: QuestionType;
  options?: QuestionOption[];
  officialAnswer: string; // e.g., "A", "2.90 : 3.10", "16", "0"
  answerRange?: string; // for NAT questions
  detailedSolution: string;
  keyFormulas?: string[];
  shortcutTips?: string;
  commonPitfalls?: string;
}

export interface FilterState {
  search: string;
  chapter: Chapter | 'All';
  topic: string;
  branch: string;
  questionType: string;
}

export interface SolvedStatus {
  [questionId: string]: {
    userAnswer?: string;
    isCorrect?: boolean;
    bookmarked?: boolean;
    notes?: string;
  };
}
