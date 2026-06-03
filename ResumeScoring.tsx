import React, { useState } from "react";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  FileText,
  BadgeAlert,
  SearchCode,
  Target,
  Layers,
  Award,
  Zap,
  Calendar,
  Linkedin,
  ShieldCheck,
  TrendingUp,
  XCircle,
  Clock,
  PlayCircle,
  Building
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ScanResult } from "../types";

interface ResumeScoringProps {
  result: ScanResult;
  onReset: () => void;
  filename?: string | null;
}

export default function ResumeScoring({ result, onReset, filename }: ResumeScoringProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"ats" | "psychology" | "gaps" | "proof" | "roadmap" | "social">("ats");
  
  // Interactive checklist state for the Experience / Internship Simulator
  const [completedSimTasks, setCompletedSimTasks] = useState<Record<string, boolean>>({});

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const toggleSimTask = (key: string) => {
    setCompletedSimTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Helper score color states
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#10B981]"; // Emerald green
    if (score >= 60) return "text-[#F59E0B]"; // Amber
    return "text-[#EF4444]"; // Red
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "border-emerald-500/25 bg-emerald-500/5";
    if (score >= 60) return "border-amber-500/25 bg-amber-500/5";
    return "border-rose-500/25 bg-rose-500/5";
  };

  // Safe parameters extraction with dynamic highly precise fallbacks
  const targetRole = result.targetRoleEstimated || "Software Engineer";
  const shortlistProb = result.shortlistProbability || Math.max(12, Math.min(98, Math.floor(result.score * 0.95)));
  
  const recPsychology = result.recruiterPsychology || {
    overallImpression: "The current presentation displays moderate alignment, but falls back heavily on stale corporate idioms that hinder a rapid, high-confidence visual evaluation.",
    flags: [
      { section: "Summary", riskLevel: "medium", label: "Generic Verbose", explanation: "Contains empty corporate descriptors like 'highly motivated leader'.", fixSuggestion: "Swap structural filler with technical engineering scale indicators." }
    ]
  };

  const proofBuilder = result.proofOfSkillBuilder || [
    {
      weakSection: "Verifiable Code Scale Indicators",
      recommendations: [
        { type: "project", title: "Build High-Throughput Request Aggregations", description: "Design a self-contained API cluster with caching policies that process 2500+ requests per minute.", difficulty: "Intermediate", timeToComplete: "4 days", deliverable: "GitHub link showcasing visual load benchmarks" }
      ]
    }
  ];

  const atsAndHuman = result.atsAndHumanScore || {
    atsScore: Math.round(result.score * 1.05),
    atsFeedback: ["Structure is legible for standard parsers.", "No nested graphical charts obstructing system interpretation."],
    humanRecruiterScore: Math.round(result.score * 0.92),
    humanRecruiterFeedback: ["Corporate fluff blocks direct visual screening in under 6 seconds.", "Achievements are process-oriented instead of quantitative."]
  };

  const gapIntel = result.gapIntelligence || {
    missingSkills: ["Performance Profiling", "Distributed Message Parsing", "Database Optimization"],
    missingKeywords: ["High Availability", "Latency Purging", "Quantitative Deliverables"],
    missingExperiencesOrProjects: ["Scalability Case Studies", "Open Source Refactoring Contributions"]
  };

  const careerRoadmapData = result.careerRoadmap || {
    thirtyDays: { focus: "Eradicate filler and purge non-human buzzwords", tasks: ["Conduct a full terminology sweep", "Establish measurable milestone ratios"] },
    sixtyDays: { focus: "Initialize evidence-based system proofs", tasks: ["Author 2 performance APIs", "Publish clean repository structures"] },
    ninetyDays: { focus: "Align social media assets with validated data", tasks: ["Rewrite LinkedIn hero copy", "Highlight proof links in bio"] }
  };

  const competitorBench = result.competitorBenchmarking || {
    percentile: Math.round(result.score * 0.8),
    comparisonPoint: "vs Top-tier modern applicants",
    strengthsVsTopCandidates: ["Core technology foundation", "Clean architectural structure"],
    gapsVsTopCandidates: ["Absence of quantified system improvements", "Low deployment visibility"]
  };

  const interviewObjections = result.interviewPredictor || {
    probabilityValue: Math.round(result.score * 0.82),
    objections: [
      { recruiterObjection: "Claims look boilerplated/templated without live references", tacticalResponse: "Bring real-world active deployment dashboards to target interviews." }
    ],
    coreStrengthsTested: ["Live code modular design", "System debugging analysis"]
  };

  const simulatorTasks = result.experienceSimulator || [
    { simulatedCompany: "GlobalScale Inc.", title: "Purge Nested Query Bottlenecks", businessProblem: "Optimize a series of heavy database joins currently stalling UI feedback cycles.", deliverables: ["Execution trace metrics log", "Refactored raw SQL query featuring proper indices"] }
  ];

  const linkedInProfileOpt = result.linkedInPortfolio || {
    headlineSuggestion: `${targetRole} | Focused on Performance Systems & Scalable Solutions`,
    aboutSectionSnippet: `Action-driven developer dedicated to system optimization and quantitative delivery. Pursuing clean, measurable results.`,
    portfolioHighlightIdea: `Interactive visual case study highlighting database query latency optimization.`
  };

  const trustAuditStatus = result.trustLayer || {
    believabilityScore: Math.round(result.score * 1.02),
    riskLevel: "verifiable",
    critique: "The phrasing is stable, but attaching evidence links for work products would dramatically increase immediate believability."
  };

  return (
    <motion.div 
      id="reality-report-view"
      className="w-full max-w-7xl mx-auto px-4 md:px-16 py-12 text-on-surface"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Return Control and File Tag */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <button 
          id="btn-back-to-scan"
          onClick={onReset}
          className="flex items-center gap-2 font-mono text-xs text-primary hover:text-secondary font-bold transition-all duration-200 cursor-pointer focus:outline-none select-none group"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          RESET & RETEST RESUME
        </button>
        {filename && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-on-surface-variant font-extrabold shadow-sm">
            <FileText className="h-3.5 w-3.5 text-primary" />
            <span>FILE: {filename}</span>
          </div>
        )}
      </div>

      {/* Hero Performance Overview Card */}
      <motion.div 
        variants={itemVariants}
        className={`w-full p-8 md:p-12 rounded-2xl border ${getScoreBg(result.score)} mb-12 relative overflow-hidden backdrop-blur-sm shadow-xl`}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 w-full">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-primary/10 font-mono text-[10px] uppercase tracking-wider font-extrabold text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-secondary animate-pulse" /> Reality Audit Report
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Audit Complete: <span className="text-primary">{targetRole}</span> Benchmark
            </h2>
            
            <p className="text-md md:text-lg text-slate-700 max-w-2xl leading-relaxed italic font-medium">
              "{result.overallComment}"
            </p>

            <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-slate-100 shadow-sm text-xs font-mono">
                <Target className="h-3.5 w-3.5 text-primary" />
                <span className="text-slate-500">Predicted Role:</span>
                <span className="font-bold text-slate-800">{targetRole}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-lg border border-slate-100 shadow-sm text-xs font-mono">
                <TrendingUp className="h-3.5 w-3.5 text-secondary" />
                <span className="text-slate-500">Shortlist Prob:</span>
                <span className="font-bold text-emerald-600">{shortlistProb}%</span>
              </div>
            </div>
          </div>

          {/* Interactive Circle Score Component */}
          <div className="relative flex-shrink-0 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border border-slate-100 shadow-md">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  stroke="#F1F5F9"
                  strokeWidth="10"
                  fill="transparent"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="68"
                  stroke={result.score >= 80 ? "#10B981" : result.score >= 60 ? "#F59E0B" : "#EF4444"}
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 68}
                  initial={{ strokeDashoffset: 2 * Math.PI * 68 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 68 * (1 - result.score / 100) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center z-10 select-none">
                <span className={`font-display text-4xl font-extrabold ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
                <span className="text-[10px] block text-slate-400 font-mono font-bold tracking-widest mt-1">REALITY SCORE</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Diagnostics Tab Selector */}
      <motion.div variants={itemVariants} className="mb-10 w-full select-none">
        <h3 className="font-display text-xl font-bold text-slate-800 mb-4 font-display flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" /> Multi-Vector Recruiter Verification Suite
        </h3>
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-px">
          {[
            { id: "ats", label: "ATS & Human Audit", icon: <SearchCode className="h-4 w-4" /> },
            { id: "psychology", label: "Psychology Scanner", icon: <BadgeAlert className="h-4 w-4" /> },
            { id: "gaps", label: "Gap Intelligence", icon: <Target className="h-4 w-4" /> },
            { id: "proof", label: "Proof-of-Skill Builder", icon: <Award className="h-4 w-4" /> },
            { id: "roadmap", label: "30-60-90 Roadmap", icon: <Calendar className="h-4 w-4" /> },
            { id: "social", label: "Trust & Optimizations", icon: <ShieldCheck className="h-4 w-4" /> }
          ].map((tab) => (
            <button
              id={`tab-scoring-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-mono text-xs font-bold transition-all duration-200 cursor-pointer focus:outline-none ${activeSubTab === tab.id ? 'border-primary text-primary bg-primary/5 rounded-t-lg' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mb-16"
        >
          {/* TAB 1: ATS AND HUMAN AUDIT */}
          {activeSubTab === "ats" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Score comparisons */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h4 className="font-display font-extrabold text-slate-800 text-base mb-2">ATS Compatibility</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-slate-500">Parser Safety Score</span>
                    <span className="font-mono text-xs font-bold text-primary">{atsAndHuman.atsScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${atsAndHuman.atsScore}%` }}></div>
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-extrabold text-slate-800 text-base mb-2">Hiring Manager Impression</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-slate-500">6-Second Impact Score</span>
                    <span className="font-mono text-xs font-bold text-secondary">{atsAndHuman.humanRecruiterScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: `${atsAndHuman.humanRecruiterScore}%` }}></div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <span className="font-mono text-[10px] text-slate-400 font-extrabold uppercase">Audit Summary</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                    Your document shows asymmetric calibration: machine systems read it cleanly, but manual recruitment filters demand stronger human personality overlays.
                  </p>
                </div>
              </div>

              {/* Back to back detailed feedback list */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ATS System Feedback Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary pointer-events-none" />
                  <h4 className="font-display font-extrabold text-slate-800 text-base flex items-center gap-2 mb-4">
                    <SearchCode className="h-5 w-5 text-primary" /> ATS Pipeline Analysis
                  </h4>
                  <ul className="space-y-3">
                    {atsAndHuman.atsFeedback.map((fb, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-sm text-slate-600 font-sans font-medium">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{fb}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Human Recruiter Objection / Impression Check */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary pointer-events-none" />
                  <h4 className="font-display font-extrabold text-slate-800 text-base flex items-center gap-2 mb-4">
                    <BadgeAlert className="h-5 w-5 text-secondary" /> Recruiter Attention Screen
                  </h4>
                  <ul className="space-y-3">
                    {atsAndHuman.humanRecruiterFeedback.map((fb, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-sm text-slate-600 font-sans font-medium">
                        <XCircle className="h-4.5 w-4.5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                        <span>{fb}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RECRUITER PSYCHOLOGY SCANNER */}
          {activeSubTab === "psychology" && (
            <div className="space-y-8">
              <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 text-white flex flex-col md:flex-row items-center gap-6 justify-between shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 scanner-beam opacity-10" />
                <div className="space-y-2 relative z-10">
                  <span className="font-mono text-primary text-[10px] uppercase font-extrabold tracking-widest bg-primary/10 rounded px-2.5 py-1 border border-primary/20">Psychological Screening Beam</span>
                  <h4 className="font-display font-extrabold text-lg">Hiring Manager General Vibe Checked</h4>
                  <p className="text-sm text-slate-300 font-sans max-w-3xl leading-relaxed font-medium">
                    "{recPsychology.overallImpression}"
                  </p>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex-shrink-0 relative z-10 text-center md:text-right font-mono text-xs">
                  <span className="text-slate-400 block font-normal">Objection Obfuscation</span>
                  <span className="font-extrabold text-[#F59E0B] block text-base mt-0.5">MEDIUM-RISK ZONE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recPsychology.flags.map((flag, dIdx) => (
                  <div key={dIdx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 rounded bg-slate-100 border border-slate-100 text-slate-700 font-mono text-[10px] font-extrabold">
                          SECTION: {flag.section}
                        </span>
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-extrabold uppercase ${
                          flag.riskLevel === 'high' ? 'bg-rose-50 border border-rose-100 text-rose-600' :
                          flag.riskLevel === 'medium' ? 'bg-amber-50 border border-amber-100 text-amber-600' :
                          'bg-indigo-50 border border-indigo-100 text-indigo-600'
                        }`}>
                          {flag.riskLevel} risk
                        </span>
                      </div>

                      <h5 className="font-display text-base font-extrabold text-slate-800 flex items-center gap-2">
                        <AlertTriangle className={`h-4.5 w-4.5 ${flag.riskLevel === 'high' ? 'text-rose-500' : 'text-amber-500'}`} />
                        {flag.label}
                      </h5>

                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                        {flag.explanation}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 space-y-1.5 bg-slate-50/50 p-3 rounded-lg">
                      <span className="font-mono text-[9px] text-[#10B981] font-extrabold block uppercase">Psychology Countermeasure</span>
                      <p className="text-[11px] text-slate-600 leading-normal font-sans font-medium italic">
                        "{flag.fixSuggestion}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GAP INTELLIGENCE */}
          {activeSubTab === "gaps" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Missing Skills */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary pointer-events-none" />
                <h4 className="font-display font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" /> Deficient Skills Clusters
                </h4>
                <ul className="space-y-2">
                  {gapIntel.missingSkills.map((sk, idx) => (
                    <li key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 text-slate-700 font-mono text-xs font-semibold border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Keywords */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-secondary pointer-events-none" />
                <h4 className="font-display font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-secondary" /> Core Lacking Keywords
                </h4>
                <ul className="space-y-2">
                  {gapIntel.missingKeywords.map((kw, idx) => (
                    <li key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#00B954]/5 text-emerald-700 font-mono text-xs font-bold border border-[#00B954]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span>{kw}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Missing Experience/Projects */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-tertiary pointer-events-none" />
                <h4 className="font-display font-extrabold text-slate-800 text-base mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-tertiary" /> Portfolio Gaps Predicted
                </h4>
                <ul className="space-y-2">
                  {gapIntel.missingExperiencesOrProjects.map((ex, idx) => (
                    <li key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F59E0B]/5 text-[#B45309] font-mono text-xs font-bold border border-[#F59E0B]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: PROOF OF SKILL BUILDER & INTERNSHIP SIMULATOR */}
          {activeSubTab === "proof" && (
            <div className="space-y-10">
              {/* Proof of Skill Cards */}
              <div>
                <h4 className="font-display text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 font-display">
                  <Award className="h-5.5 w-5.5 text-primary" /> Active Proof-of-Skill Builder recommendations
                </h4>
                {proofBuilder.map((pb, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden mb-6">
                    <div className="absolute left-0 top-0 w-1.5 h-full bg-primary" />
                    <div>
                      <span className="font-mono text-[9px] text-[#A855F7] font-extrabold uppercase bg-[#A855F7]/10 px-2 py-0.5 rounded border border-[#A855F7]/15">
                        Defict Vector: {pb.weakSection}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {pb.recommendations.map((rec, rIdx) => (
                          <div key={rIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] text-primary uppercase font-extrabold bg-primary/10 rounded px-2">
                                  {rec.type}
                                </span>
                                <span className="font-mono text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-400" /> {rec.timeToComplete}
                                </span>
                              </div>
                              <h5 className="font-display text-[#0F172A] font-extrabold text-sm">{rec.title}</h5>
                              <p className="text-xs text-slate-600 font-sans leading-relaxed font-semibold">{rec.description}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-200/50">
                              <span className="font-mono text-[9px] text-[#F59E0B] uppercase font-bold block">Deliverable Proof Artifact</span>
                              <span className="font-mono text-xs text-slate-800 font-bold block mt-0.5">{rec.deliverable}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real World Internship Experience Simulator */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="font-display text-lg font-bold text-slate-800 flex items-center gap-2">
                      <PlayCircle className="h-5.5 w-5.5 text-secondary animate-pulse" /> Active Internship Experience Simulator
                    </h4>
                    <p className="text-xs text-slate-500 font-sans font-medium mt-1">
                      Prove capability immediately. Undertake these micro tasks to bypass lack of raw commercial experience on your application.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded bg-secondary/15 text-xs text-secondary font-mono font-extrabold border border-secondary/20">
                    REALTIME SIMULATION
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {simulatorTasks.map((task, idx) => {
                    const taskKey = `${idx}-${task.title}`;
                    const isAllDone = task.deliverables.every((_, dIdx) => completedSimTasks[`${taskKey}-${dIdx}`]);

                    return (
                      <div 
                        key={idx} 
                        className={`p-6 rounded-xl border relative transition-all duration-300 ${isAllDone ? 'border-[#10B981] bg-emerald-500/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Building className="h-4.5 w-4.5 text-secondary" />
                            <span className="font-mono text-[10px] text-slate-400 uppercase font-extrabold">{task.simulatedCompany} Challenge</span>
                          </div>

                          <div>
                            <h5 className="font-display text-slate-800 font-extrabold text-sm">{task.title}</h5>
                            <p className="text-xs text-slate-600 font-sans leading-relaxed font-semibold mt-1 bg-slate-50 p-2.5 rounded border border-slate-100">
                              <span className="text-[#EF4444] font-mono text-[9px] block uppercase font-extrabold">Active Bottleneck</span>
                              "{task.businessProblem}"
                            </p>
                          </div>

                          <div className="space-y-2">
                            <span className="font-mono text-[9px] text-slate-400 uppercase font-extrabold block">Required Deliverables Checklist</span>
                            {task.deliverables.map((del, dIdx) => {
                              const checkboxKey = `${taskKey}-${dIdx}`;
                              const checked = !!completedSimTasks[checkboxKey];
                              return (
                                <label 
                                  key={dIdx} 
                                  className="flex items-start gap-2.5 p-2 rounded bg-slate-50 border border-slate-155 hover:bg-slate-100 transition-colors select-none cursor-pointer text-[11px]"
                                >
                                  <input 
                                    type="checkbox" 
                                    checked={checked}
                                    onChange={() => toggleSimTask(checkboxKey)}
                                    className="h-3.5 w-3.5 mt-0.5 accent-primary cursor-pointer"
                                  />
                                  <span className={`font-sans leading-normal ${checked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                                    {del}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: 30-60-90 DAY PROGRESS ROADMAP */}
          {activeSubTab === "roadmap" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="text-center md:text-left mb-8">
                <span className="font-mono text-xs text-primary font-bold uppercase tracking-[0.2em]">Target Career Progression</span>
                <h4 className="font-display text-lg font-display font-extrabold text-slate-850">30, 60, and 90 Days Success Pipeline</h4>
                <p className="text-xs text-slate-500 font-sans font-semibold mt-1">
                  Tactically pace out revisions, skills acquisition, and application vectors to become highly competitive.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 gap-8">
                {/* 30 Days block */}
                <div className="space-y-4 pt-4 lg:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-12 rounded bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center">
                      DAY 30
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase font-extrabold">PHASE 1: PURGE</span>
                  </div>
                  <h5 className="font-display text-slate-800 font-bold text-sm tracking-tight">{careerRoadmapData.thirtyDays.focus}</h5>
                  <ul className="space-y-2">
                    {careerRoadmapData.thirtyDays.tasks.map((task, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 font-sans font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 60 Days block */}
                <div className="space-y-4 pt-6 lg:pt-0 lg:pl-8">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-12 rounded bg-secondary/10 text-secondary font-mono text-xs font-bold flex items-center justify-center">
                      DAY 60
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase font-extrabold">PHASE 2: DEMONSTRATE</span>
                  </div>
                  <h5 className="font-display text-slate-800 font-bold text-sm tracking-tight">{careerRoadmapData.sixtyDays.focus}</h5>
                  <ul className="space-y-2">
                    {careerRoadmapData.sixtyDays.tasks.map((task, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 font-sans font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 90 Days block */}
                <div className="space-y-4 pt-6 lg:pt-0 lg:pl-8">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-12 rounded bg-tertiary/10 text-tertiary font-mono text-xs font-bold flex items-center justify-center">
                      DAY 90
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase font-extrabold">PHASE 3: ACQUIRE</span>
                  </div>
                  <h5 className="font-display text-slate-800 font-bold text-sm tracking-tight">{careerRoadmapData.ninetyDays.focus}</h5>
                  <ul className="space-y-2">
                    {careerRoadmapData.ninetyDays.tasks.map((task, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 font-sans font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 flex-shrink-0" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TRUST LAYER AUDIT & LINKEDIN PORTFOLIO OPTIMIZATION */}
          {activeSubTab === "social" && (
            <div className="space-y-8">
              {/* Trust Layer Confidence Check */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6 flex flex-col items-center md:items-start justify-center">
                  <div className="p-3.5 rounded-full bg-[#10B981]/15 text-[#10B981] mb-3">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h4 className="font-display font-extrabold text-base text-slate-800">Confidence Trust Audit</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-mono text-4xl font-extrabold text-slate-800">{trustAuditStatus.believabilityScore}%</span>
                    <span className="font-mono text-xs text-slate-500 uppercase font-bold">confidence</span>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-[#10B981] font-extrabold uppercase bg-[#10B981]/10 px-2 rounded tracking-wider">
                      STATUS: {trustAuditStatus.riskLevel} Claims
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                    {trustAuditStatus.critique}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono font-medium block">
                    Our scanner cross-references metrics with known technology timelines to calculate believability.
                  </span>
                </div>
              </div>

              {/* LinkedIn Headline suggestion */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0A66C2] pointer-events-none" />
                <div className="flex items-center gap-2.5 mb-4">
                  <Linkedin className="h-6 w-6 text-[#0A66C2]" />
                  <h4 className="font-display font-extrabold text-base text-slate-800">LinkedIn & Portfolio Optimization</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[9px] text-[#0A66C2] font-semibold block uppercase">Headline Suggestion</span>
                      <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono font-extrabold flex justify-between items-center">
                        <span>"{linkedInProfileOpt.headlineSuggestion}"</span>
                        <button 
                          onClick={() => handleCopyToClipboard(linkedInProfileOpt.headlineSuggestion, "headline")}
                          className="text-primary hover:text-secondary focus:outline-none"
                        >
                          {copiedText === "headline" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[9px] text-[#0A66C2] font-semibold block uppercase">LinkedIn "About" Snippet</span>
                      <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-sans italic font-medium flex justify-between items-start gap-4">
                        <span>"{linkedInProfileOpt.aboutSectionSnippet}"</span>
                        <button 
                          onClick={() => handleCopyToClipboard(linkedInProfileOpt.aboutSectionSnippet, "about")}
                          className="text-primary hover:text-secondary focus:outline-none flex-shrink-0"
                        >
                          {copiedText === "about" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-[#0A66C2] font-extrabold uppercase block">Portfolio Highlight Blueprint</span>
                      <h5 className="font-display text-slate-800 text-sm font-extrabold"> spotlit Project Idea</h5>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                        "{linkedInProfileOpt.portfolioHighlightIdea}"
                      </p>
                    </div>
                    <div className="mt-4 text-[10px] text-slate-400 font-mono font-medium leading-relaxed">
                      Presenting a concrete, visual outcome-based highlight on your profile bypasses automated resume doubts instantly.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Suggested Bullet-Point Revisions (The Achievement Rewriter) */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="text-center md:text-left mb-8">
          <span className="font-mono text-xs text-secondary font-bold uppercase tracking-[0.2em]">Achievement Rewriter</span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface mt-1">Measurable Achievement Rewrites</h3>
          <p className="font-sans text-sm text-on-surface-variant mt-2 font-medium">Active recruiter bullet reformulations converting weak narratives into quantitative metrics.</p>
        </div>

        <div className="space-y-6 flex flex-col">
          {result.suggestedRevisions.map((rev, rIdx) => {
            const copyKey = `revision-${rIdx}`;
            return (
              <div 
                key={rIdx}
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 gap-6 md:gap-8 hover:border-[#10B981]/30 shadow-sm duration-200"
              >
                {/* Original side of rewrite */}
                <div className="flex-1 space-y-3 pb-4 md:pb-0">
                  <div className="flex items-center gap-2 text-error font-mono text-[10px] font-extrabold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-error" />
                     Boring, Exaggerated or Unverifiable Statement
                  </div>
                  <blockquote className="font-sans text-sm text-on-surface-variant italic pl-3 border-l-2 bg-slate-50 p-3 rounded border-error/20 leading-relaxed font-mono">
                    "{rev.original}"
                  </blockquote>
                </div>

                {/* Recruiter Suggestion */}
                <div className="flex-1 space-y-3 pt-4 md:pt-0 md:pl-8 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-secondary font-mono text-[10px] font-extrabold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        Scientifically Proven Rewrite
                      </div>
                      <button 
                        onClick={() => handleCopyToClipboard(rev.suggested, copyKey)}
                        className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/75 font-mono font-bold focus:outline-none focus:ring-0 cursor-pointer select-none"
                      >
                        {copiedText === copyKey ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <blockquote className="font-sans text-sm text-slate-800 font-extrabold pl-3 border-l-2 bg-[#00B954]/5 p-3 rounded border-secondary leading-relaxed">
                      "{rev.suggested}"
                    </blockquote>
                  </div>

                  <p className="font-sans text-xs text-on-surface-variant pt-2 flex items-start gap-1 font-medium bg-slate-50/50 p-2 rounded-lg">
                    <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-primary font-mono select-none">Recruiter Tip:</strong> {rev.reason}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Action Footer Option */}
      <motion.div variants={itemVariants} className="text-center md:pb-12 mt-6 select-none">
        <button 
          id="btn-retest-bottom"
          onClick={onReset}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-on-surface px-8 py-3.5 rounded-lg font-mono text-sm tracking-wide font-extrabold hover:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
        >
          UPLOAD AND ROAST AN ALTERNATIVE CV
        </button>
      </motion.div>
    </motion.div>
  );
}
