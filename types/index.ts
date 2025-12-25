
export enum ExperienceLevel {
  FRESHER = 'Fresher',
  JUNIOR = '1-3 years',
  MID = '3-5 years',
  SENIOR = 'Senior'
}

export interface AnalysisInputs {
  resumeText: string;
  jobTitle: string;
  jobDescription: string;
  experienceLevel: ExperienceLevel;
}

export interface BulletRewrite {
  old: string;
  new: string;
}

export interface InterviewQuestion {
  question: string;
  type: 'technical' | 'behavioral' | 'situational';
  idealAnswerPoints: string[];
}

export interface NegotiationScript {
  phase: string;
  script: string;
  tacticalNote: string;
}

export interface JobStrategy {
  targetSectors: string[];
  networkingStrategy: string;
  dailyActionPlan: {
    day: string;
    tasks: string[];
  }[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  location: string;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
}

export interface AnalysisResult {
  id?: string;
  timestamp?: number;
  jobTitle?: string;
  atsScore: {
    score: number;
    issues: string[];
  };
  skillsMatch: {
    matched: string[];
    missingCritical: string[];
    missingNiceToHave: string[];
  };
  pros: string[];
  cons: string[];
  improvements: {
    sectionWise: string[];
    keywords: string[];
    bulletRewrites: BulletRewrite[];
  };
  verdict: {
    status: 'Hire' | 'Borderline' | 'Not Ready';
    reasoning: string;
  };
  emailTemplate: {
    subject: string;
    body: string;
    cta: string;
  };
  linkedInTemplate: {
    connectionRequest: string;
    followUp: string;
  };
  recruiterTip: string;
  projectSuggestions?: {
    title: string;
    description: string;
    difficulty: string;
  }[];
}

export type ViewState = 'home' | 'analyzer' | 'about' | 'roadmap' | 'templates' | 'interview' | 'negotiator' | 'builder';
