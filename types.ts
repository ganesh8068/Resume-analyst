
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

export interface AnalysisResult {
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
}
