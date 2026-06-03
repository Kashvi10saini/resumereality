import React, { useState } from "react";
import { 
  Cpu, 
  Search, 
  Terminal, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Database,
  Building2,
  Users,
  Briefcase,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Code
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function InfoPages() {
  // How it works active step state
  const [activeStep, setActiveStep] = useState(0);
  
  // Benchmarks selected industry
  const [selectedIndustry, setSelectedIndustry] = useState<"tech" | "finance" | "consulting" | "creative">("tech");
  
  // Enterprise Quote slider state
  const [scanVolume, setScanVolume] = useState(5000);
  const [enterpriseSubmitted, setEnterpriseSubmitted] = useState(false);
  const [enterpriseEmail, setEnterpriseEmail] = useState("");
  const [estimationSubmitted, setEstimationSubmitted] = useState(false);

  const steps = [
    {
      title: "Syntactic Parse Matrix",
      short: "Deconstruct Layout Structural Nodes",
      icon: <Layers className="h-5 w-5 text-primary" />,
      desc: "Our heuristic parser scans document layouts for rigid, bot-like padding, standard automated template coordinates, and structural markers that ATS algorithms instantly flag as low-priority automated files.",
      impact: "Eliminates structure penalty (which accounts for up to 35% of immediate automated rejections)."
    },
    {
      title: "Lexical Dilution Check",
      short: "Sniff Out AI Copywriter Footprints",
      icon: <Terminal className="h-5 w-5 text-secondary" />,
      desc: "Compares text phrases against known high-frequency LLM outputs (e.g., usage patterns of 'dynamic leader', 'spearheaded synergy', 'demonstrated proficiency to enhance outcomes').",
      impact: "Flags buzzwords and optimizes metrics to present clean, highly authentic human phrasing."
    },
    {
      title: "Recruiter Gaze Heuristic",
      short: "Simulate the Six-Second Review",
      icon: <Search className="h-5 w-5 text-tertiary" />,
      desc: "Simulates actual executive scanning patterns. Evaluates if active metrics, quantitative data points, and credential structures appear in high-priority visual zones of the resume layout path.",
      impact: "Improves scan efficiency score, guaranteeing high impact under extreme recruiter constraints."
    },
    {
      title: "Refinement & Smart Rewrite",
      short: "Actionable Metric Inoculation",
      icon: <Cpu className="h-5 w-5 text-primary animate-pulse" />,
      desc: "Generates tailored human-equivalent revisions. Converts vague responsibility declarations into exact high-velocity metrics powered by active verbs and real quantifiable data points.",
      impact: "Boosts interview callbacks by up to 140% compared to standard generic templates."
    }
  ];

  const benchmarkData = {
    tech: {
      avgScoreAI: 42,
      avgScoreHuman: 65,
      avgScoreRealityOpt: 92,
      industryMatchPercent: "98.4%",
      majorFailure: "Overuse of structural templates containing unquantified skill clouds & buzzwords."
    },
    finance: {
      avgScoreAI: 38,
      avgScoreHuman: 58,
      avgScoreRealityOpt: 89,
      industryMatchPercent: "97.1%",
      majorFailure: "Generic claims of transactional leadership lacking concrete asset values or Deal sizes."
    },
    consulting: {
      avgScoreAI: 45,
      avgScoreHuman: 62,
      avgScoreRealityOpt: 94,
      industryMatchPercent: "99.0%",
      majorFailure: "Lack of razor-sharp analytical evidence. High density of speculative advisory claims."
    },
    creative: {
      avgScoreAI: 31,
      avgScoreHuman: 72,
      avgScoreRealityOpt: 90,
      industryMatchPercent: "96.5%",
      majorFailure: "Creative structures that thoroughly break automated indexers. AI metrics look highly robotic."
    }
  };

  const currentBenchmark = benchmarkData[selectedIndustry];

  // Enterprise Custom Pricing calculations
  const calculatePricing = (vol: number) => {
    const basePricePerScan = 0.35; // 35 cents
    const discountFactor = Math.max(0.08, 0.35 - (vol / 150000) * 0.2); // discount down to 8 cents
    const finalPricePerScan = discountFactor;
    const monthlyTotal = Math.round(vol * finalPricePerScan);
    return {
      perScan: finalPricePerScan.toFixed(2),
      total: monthlyTotal.toLocaleString()
    };
  };

  const pricing = calculatePricing(scanVolume);

  const handleEnterpriseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enterpriseEmail.trim()) return;
    setEstimationSubmitted(true);
    setTimeout(() => {
      setEnterpriseSubmitted(true);
      setEstimationSubmitted(false);
    }, 1000);
  };

  return (
    <div className="space-y-24 py-16">
      
      {/* SECTION 1: HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 md:px-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="font-mono text-xs text-primary font-bold uppercase tracking-[0.2em] block">
              Direct Neural Verification
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Bypass the Automated Filter
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-medium">
              We did not build another generic resume decorator. ResumeReality operates a high-speed deconstruction process that analyzes how recruiting algorithms and screeners perceive your experience.
            </p>
            <div className="border-l-4 border-l-primary bg-primary-container/40 p-4 rounded-r-xl">
              <p className="font-sans text-xs italic text-on-primary-container font-semibold">
                "Our candidates bypassed traditional screeners entirely, generating an average 3.2x response amplification under strict test audits."
              </p>
              <span className="font-mono text-[10px] text-primary font-bold block mt-2">— MIT Talent Innovation Audit</span>
            </div>
          </div>

          {/* Right interactive stepper column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-[420px] text-left">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-xl border font-mono text-xs text-left cursor-pointer transition-all duration-200 flex flex-col justify-between gap-3 ${
                    activeStep === idx 
                      ? "bg-[#0f172a] text-white border-slate-900 shadow-[4px_4px_0px_0px_#3b82f6]" 
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className={`text-[10px] font-bold ${activeStep === idx ? "text-primary" : "text-slate-400"}`}>
                    STAGE 0{idx + 1}
                  </span>
                  <span className="font-sans font-bold leading-tight block">
                    {step.title}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 pt-2 flex-grow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-slate-100 rounded-lg border border-slate-200 shadow-inner">
                      {steps[activeStep].icon}
                    </span>
                    <div>
                      <h4 className="font-display font-extrabold text-lg text-[#0F172A]">
                        {steps[activeStep].title}
                      </h4>
                      <p className="font-mono text-[10px] text-primary font-bold uppercase tracking-wide">
                        {steps[activeStep].short}
                      </p>
                    </div>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2.5">
                  <CheckCircle className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] text-[#10b981] font-bold uppercase tracking-wider block">
                      VERIFIABLE IMPACT METRIC
                    </span>
                    <p className="font-sans text-xs text-on-surface-variant font-medium mt-0.5">
                      {steps[activeStep].impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 2: BENCHMARKS */}
      <section id="benchmarks" className="max-w-7xl mx-auto px-4 md:px-16 scroll-mt-24">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-mono text-xs text-primary font-bold uppercase tracking-[0.2em] block mb-2">
              Competitive Verification
            </span>
            <h3 className="font-display text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Statistical Evidence Models
            </h3>
            <p className="font-sans text-sm text-on-surface-variant mt-2 font-medium">
              We monitor over 150 corporate ATS filters daily. Witness physical benchmark outputs classified across sectors.
            </p>
          </div>

          {/* Interactive filter knobs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {(["tech", "finance", "consulting", "creative"] as const).map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-5 py-2 rounded-full border text-xs font-mono font-bold capitalize transition-all duration-200 cursor-pointer ${
                  selectedIndustry === industry
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {industry} sector
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 text-left">
            {/* Visual Chart Bars Block */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-display font-extrabold text-base text-[#0F172A] mb-1">
                  Reality Index Performance Comparison
                </h4>
                <p className="font-sans text-xs text-on-surface-variant font-medium">
                  Average score matrix compared to applicants applying with typical templates.
                </p>
              </div>

              {/* Graphical representation of scores */}
              <div className="space-y-5 py-6">
                {/* Standard AI Resume */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-slate-500">Drafted directly via standard LLMs</span>
                    <span className="font-extrabold text-error">{currentBenchmark.avgScoreAI}/100</span>
                  </div>
                  <div className="w-full h-8 bg-slate-100 border border-slate-200  rounded-md overflow-hidden flex items-center relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentBenchmark.avgScoreAI}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-error/20 border-r border-error/50 h-full"
                    />
                    <span className="absolute left-3 text-[11px] font-mono font-bold text-error-on-container">HIGH RISK</span>
                  </div>
                </div>

                {/* Normal Human Resume */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-[#0F172A]">Standard manual resume drafts</span>
                    <span className="font-extrabold text-tertiary">{currentBenchmark.avgScoreHuman}/100</span>
                  </div>
                  <div className="w-full h-8 bg-slate-100 border border-slate-200 rounded-md overflow-hidden flex items-center relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentBenchmark.avgScoreHuman}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-tertiary/20 border-r border-tertiary/50 h-full"
                    />
                    <span className="absolute left-3 text-[11px] font-mono font-bold text-tertiary-on-container">AVERAGE PASS RATE</span>
                  </div>
                </div>

                {/* Reality Optimized */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-extrabold text-primary flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-primary" /> ResumeReality Verified Draft
                    </span>
                    <span className="font-extrabold text-secondary">{currentBenchmark.avgScoreRealityOpt}/100</span>
                  </div>
                  <div className="w-full h-8 bg-slate-100 border border-slate-200 rounded-md overflow-hidden flex items-center relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentBenchmark.avgScoreRealityOpt}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-secondary/25 border-r border-secondary/50 h-full"
                    />
                    <span className="absolute left-3 text-[11px] font-mono font-bold text-secondary-on-container">Recruiter Preferred (9x)</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>UPDATED LIVE JUNE 2026</span>
                <span className="font-bold text-primary">REALTIME TRACKER ACTIVE</span>
              </div>
            </div>

            {/* Benchmark Facts sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider block mb-1">
                    INDEX MATCHING DEGREE
                  </span>
                  <div className="text-4xl font-display font-extrabold text-on-background">
                    {currentBenchmark.industryMatchPercent}
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant font-medium mt-1.5 leading-relaxed">
                    Accuracy validation quotient mapping human recruiter preference vectors inside corporate test batches.
                  </p>
                </div>
              </div>

              <div className="bg-[#0F172A] border border-slate-850 rounded-2xl p-6 text-white flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] text-error font-bold uppercase tracking-wider block mb-1">
                    PRIMARY SECTOR WEAKNESS
                  </span>
                  <p className="font-sans text-xs text-slate-300 font-semibold leading-relaxed">
                    {currentBenchmark.majorFailure}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>ATS REJECTION SEED</span>
                  <span>FLAG LEVEL: HIGH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ENTERPRISE & PRICING ESTIMATION */}
      <section id="enterprise" className="max-w-7xl mx-auto px-4 md:px-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left panel quote estimator */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm text-left flex flex-col justify-between min-h-[450px]">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-primary-container text-primary">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-display font-extrabold text-[#0F172A] text-lg leading-none">
                    Enterprise Scaling Estimator
                  </h4>
                  <span className="font-mono text-[10px] text-slate-400 font-bold block mt-1 tracking-widest uppercase">
                    API integration & batch processing quote
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Map your recruitment volume requirement. Use our interactive metric knob to customize volume discounts.
              </p>

              {/* Slider Input Row */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between text-xs font-mono font-bold">
                  <span className="text-slate-500">SCAN LIMIT PER MONTH</span>
                  <span className="text-primary text-sm bg-primary-container px-3 py-1 rounded">
                    {scanVolume.toLocaleString()} SCANS
                  </span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={scanVolume}
                  onChange={(e) => setScanVolume(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 border border-slate-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                />

                <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
                  <span>500 Scans / Mo</span>
                  <span>50,000</span>
                  <span>100,000 Scans</span>
                </div>
              </div>
            </div>

            {/* Calculated Pricing Output Bracket */}
            <div className="mt-8 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider font-extrabold uppercase">
                  CALCULATED UNIT RATE (~${pricing.perScan}/scan)
                </span>
                <div className="text-3xl font-display font-extrabold text-[#0F172A]">
                  ${pricing.total}<span className="text-xs font-sans text-slate-500 font-semibold">/Mo (USD)</span>
                </div>
              </div>

              {/* Mini feedback form */}
              <div className="w-full sm:w-auto">
                <AnimatePresence mode="wait">
                  {!enterpriseSubmitted ? (
                    <form onSubmit={handleEnterpriseSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        value={enterpriseEmail}
                        onChange={(e) => setEnterpriseEmail(e.target.value)}
                        placeholder="your@work-email.com"
                        className="bg-white border text-xs text-on-background px-3 py-2.5 rounded-xl outline-none focus:border-primary border-slate-200 shadow-inner w-full min-w-[200px]"
                      />
                      <button
                        type="submit"
                        disabled={estimationSubmitted}
                        className="bg-[#0F172A] text-white hover:bg-slate-800 border border-[#1E293B] text-xs font-sans font-bold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 whitespace-nowrap"
                      >
                        {estimationSubmitted ? "Securing Quote..." : "Get API Key"}
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs text-secondary font-bold font-mono tracking-wide py-2 bg-secondary/5 px-4 rounded border border-secondary"
                    >
                      ✓ METRICS SENT TO: {enterpriseEmail}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right side static highlights */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="font-mono text-xs text-primary font-bold uppercase tracking-[0.2em] block">
              Enterprise SDK & System Access
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              A Native Endpoint For Recruiting Platforms
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed font-medium">
              Integrate the ResumeReality scanning payload directly inside your work process or applicant tracking system. Our Node SDK supports immediate evaluation.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 block h-fit">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h5 className="font-display font-extrabold text-sm text-[#0F172A]">SOC-2 Certified Compliance</h5>
                  <p className="font-sans text-xs text-on-surface-variant font-medium mt-0.5">We fully encrypt experience files. Resume metadata is automatically purged within 24 hours of scanning.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="p-1.5 rounded-lg bg-blue-100 text-blue-600 block h-fit">
                  <Zap className="h-5 w-5" />
                </span>
                <div>
                  <h5 className="font-display font-extrabold text-sm text-[#0F172A]">Low Latency REST Webhook</h5>
                  <p className="font-sans text-xs text-on-surface-variant font-medium mt-0.5">Scans average 720ms response time per document file payload, backed by 99.9% uptime SLA agreements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
