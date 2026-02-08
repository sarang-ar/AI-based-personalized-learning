
export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isOnboarded: boolean;
  institution?: string;
  skills?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  modules: CourseModule[];
  type: 'academic' | 'personal';
  joinCode?: string;
  progress?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  quiz?: Quiz;
  assignment?: Assignment;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  type: 'typed' | 'handwritten' | 'code';
}

export type ExamMode = 1 | 2 | 3;
export type ExamStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'UPLOAD_PENDING' | 'DISQUALIFIED' | 'EVALUATED' | 'RESULT_PUBLISHED';

export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  mode: ExamMode;
  strictness: 'Low' | 'Moderate' | 'High';
  status: ExamStatus;
  date: string;
}

export interface OnboardingData {
  academicLevel: string;
  stream: string;
  interests: string[];
  learningStyle: 'visual' | 'reading' | 'kinesthetic';
  attentionScore: number;
}

export interface Opportunity {
  id: string;
  type: 'job' | 'internship' | 'hackathon';
  title: string;
  company: string;
  location: string;
  skillsRequired: string[];
  description: string;
  readinessScore: number;
  url: string;
  postedDate: string;
}
