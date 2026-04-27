import { BookOpen, Languages, MessageSquareText, PenSquare, Puzzle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Subject {
  id: string;
  name: string;
  nameEn: string;
  icon: LucideIcon;
  color: string;
  grade: number;
  countryId: string;
}

const ENGLISH_TRACK = (grade: number): Subject[] => [
  {
    id: `phonics-${grade}`,
    name: 'اأص^ات ^احر^ف',
    nameEn: 'Phonics',
    icon: Languages,
    color: 'bg-amber-500',
    grade,
    countryId: 'eg',
  },
  {
    id: `vocabulary-${grade}`,
    name: 'ا".فردات',
    nameEn: 'Vocabulary',
    icon: Puzzle,
    color: 'bg-emerald-500',
    grade,
    countryId: 'eg',
  },
  {
    id: `speaking-${grade}`,
    name: 'ا".حادثة',
    nameEn: 'Speaking',
    icon: MessageSquareText,
    color: 'bg-sky-500',
    grade,
    countryId: 'eg',
  },
  {
    id: `reading-${grade}`,
    name: 'ا",راءة',
    nameEn: 'Reading',
    icon: BookOpen,
    color: 'bg-rose-500',
    grade,
    countryId: 'eg',
  },
  {
    id: `grammar-${grade}`,
    name: 'ا",^اعد ا".بسطة',
    nameEn: 'Grammar',
    icon: PenSquare,
    color: 'bg-violet-500',
    grade,
    countryId: 'eg',
  },
];

export const SUBJECTS_BY_GRADE: Record<number, Subject[]> = {
  0: ENGLISH_TRACK(0),
  1: ENGLISH_TRACK(1),
  2: ENGLISH_TRACK(2),
  3: ENGLISH_TRACK(3),
  4: ENGLISH_TRACK(4),
  5: ENGLISH_TRACK(5),
  6: ENGLISH_TRACK(6),
};

export const getStudentSubjects = (grade: number): Subject[] => {
  return SUBJECTS_BY_GRADE[grade] || SUBJECTS_BY_GRADE[1];
};

export const getSubjectById = (subjectId: string): Subject | undefined => {
  for (const grade in SUBJECTS_BY_GRADE) {
    const found = SUBJECTS_BY_GRADE[grade].find((subject) => subject.id === subjectId);
    if (found) {
      return found;
    }
  }

  return undefined;
};



