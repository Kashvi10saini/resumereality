export interface ScoringMatrix {
  believableScore: number; // 0-100 indicating percentage of authenticity
  believableRating: string; // e.g. "85% REAL" or "40% BOT-LIKE"
  competitiveScore: number; // 0-100
  competitiveRating: string; // e.g. "TOP 15%" or "BELOW AVERAGE"
  internReadyScore: number; // 0-100
  internReadyRating: string; // e.g. "FAANG READY" or "NEED EXPERIENCE"
  overstuffedScore: number; // 0-100 indicating how "stuffed" with buzzwords/formatting clutter
  overstuffedRating: string; // e.g. "LOW RISK" or "HIGH SCAN-RISK"
}

export interface Critique {
  type: 'error' | 'success' | 'info'; // error = warning / AI fluff, success = positive, info = formatting / general insight
  title: string;
  description: string;
}

export interface SuggestedRevision {
  original: string;
  suggested: string;
  reason: string;
}

// 1. Recruiter Psychology
export interface PsychologyFlag {
  section: string;
  riskLevel: 'high' | 'medium' | 'low';
  label: string; // e.g. "Exaggerated", "Generic Verbose", "Weak Metrics"
  explanation: string;
  fixSuggestion: string;
}

export interface RecruiterPsychology {
  overallImpression: string;
  flags: PsychologyFlag[];
}

// 2. Proof-of-Skill Builder & Internship Simulator
export interface ProofRecommendation {
  type: 'project' | 'certification' | 'simulation' | 'experience';
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToComplete: string; // e.g. "4 days", "1 week"
  deliverable: string; // concrete proof artifact
}

export interface ProofOfSkillBuilder {
  weakSection: string;
  recommendations: ProofRecommendation[];
}

// 3. ATS + Human Score
export interface AtsAndHumanScore {
  atsScore: number;
  atsFeedback: string[];
  humanRecruiterScore: number;
  humanRecruiterFeedback: string[];
}

// 4. Gap Intelligence
export interface GapIntelligence {
  missingSkills: string[];
  missingKeywords: string[];
  missingExperiencesOrProjects: string[];
}

// 5. Career Roadmap
export interface RoadmapPeriod {
  focus: string;
  tasks: string[];
}

export interface CareerRoadmap {
  thirtyDays: RoadmapPeriod;
  sixtyDays: RoadmapPeriod;
  ninetyDays: RoadmapPeriod;
}

// 6. Competitor Benchmarking
export interface CompetitorBenchmarking {
  percentile: number;
  comparisonPoint: string; // e.g., "vs FAANG applicants", "vs typical entry-level grads"
  strengthsVsTopCandidates: string[];
  gapsVsTopCandidates: string[];
}

// 7. Interview & Objections
export interface ObjectionInfo {
  recruiterObjection: string;
  tacticalResponse: string;
}

export interface InterviewPredictor {
  probabilityValue: number; // 0-100
  objections: ObjectionInfo[];
  coreStrengthsTested: string[];
}

// 8. Experience Simulator Microtasks
export interface SimulationTask {
  simulatedCompany: string;
  title: string;
  businessProblem: string;
  deliverables: string[];
}

// 9. LinkedIn & Portfolio
export interface LinkedInPortfolioOptimization {
  headlineSuggestion: string;
  aboutSectionSnippet: string;
  portfolioHighlightIdea: string;
}

// 10. Trust Layer
export interface TrustLayer {
  believabilityScore: number; // 0-100 indicating validity confidence
  riskLevel: 'verifiable' | 'exaggerated_risk' | 'unverifiable';
  critique: string;
}

export interface ScanResult {
  score: number; // overall competitive reality score
  overallComment: string; // dynamic roaster verdict / high-velocity summary
  targetRoleEstimated: string; // predicted or target role
  shortlistProbability: number; // predicted shortlist chance (0-100)
  scoringMatrix: ScoringMatrix;
  critiques: Critique[];
  suggestedRevisions: SuggestedRevision[];
  
  // NEW HIGH-FIDELITY OUTSIDE METRICS
  recruiterPsychology: RecruiterPsychology;
  proofOfSkillBuilder: ProofOfSkillBuilder[];
  atsAndHumanScore: AtsAndHumanScore;
  gapIntelligence: GapIntelligence;
  careerRoadmap: CareerRoadmap;
  competitorBenchmarking: CompetitorBenchmarking;
  interviewPredictor: InterviewPredictor;
  experienceSimulator: SimulationTask[];
  linkedInPortfolio: LinkedInPortfolioOptimization;
  trustLayer: TrustLayer;
}

export interface ResumeTemplate {
  name: string;
  role: string;
  description: string;
  content: string;
}
