import React, { useState, useRef } from "react";
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Trash2, 
  Bolt, 
  Loader2,
  FileSignature,
  FileCheck,
  CheckCircle,
  X,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResumeScoring from "./components/ResumeScoring";
import ThreeDSandbox from "./components/ThreeDSandbox";
import InfoPages from "./components/InfoPages";
import { SAMPLE_TEMPLATES } from "./data/templates";
import { ScanResult, ResumeTemplate } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [pasteText, setPasteText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileBase64, setSelectedFileBase64] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState("");
  
  // Scanning cycle states
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<ScanResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scanning text steps
  const SCAN_MESSAGES = [
    "Extracting text matrices & metadata...",
    "Benchmarking lexical frequency models...",
    "Detecting synergistic AI buzzword soup...",
    "Running structural layout ATS evaluation...",
    "Compiling critical recruiter feedback...",
    "Generating final high-velocity verdict..."
  ];

  // Reset to original slate
  const handleReset = () => {
    setAnalysisResult(null);
    setPasteText("");
    setSelectedFile(null);
    setSelectedFileBase64(null);
    setErrorStatus(null);
    setIsScanning(false);
    setScanStep(0);
    setTargetRole("");
  };

  // Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    // PDF or TXT
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'pdf' && extension !== 'txt') {
      setErrorStatus("Only PDF and TXT plain text formats are natively supported for high-fidelity scanning.");
      return;
    }
    setErrorStatus(null);
    setSelectedFile(file);

    // Read file
    const reader = new FileReader();
    if (extension === 'pdf') {
      reader.onload = () => {
        const resultString = reader.result as string;
        // Strip base64 metadata to get raw base64 data string
        const base64Data = resultString.split(',')[1];
        setSelectedFileBase64(base64Data);
      };
      reader.readAsDataURL(file);
    } else {
      // It is plain text
      reader.onload = () => {
        setPasteText(reader.result as string);
        setSelectedFileBase64(null);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelector = () => {
    fileInputRef.current?.click();
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setSelectedFileBase64(null);
  };

  // Immediate evaluation using pre-loaded templates
  const selectTemplate = (template: ResumeTemplate) => {
    setPasteText(template.content);
    setTargetRole(template.role);
    setActiveTab("paste");
    // Clear selected file if any
    setSelectedFile(null);
    setSelectedFileBase64(null);
  };

  // Run structured scan
  const executeScan = async () => {
    if (activeTab === 'upload' && !selectedFile && !selectedFileBase64) {
      setErrorStatus("Please drag in or select a PDF/TXT resume document file to scan.");
      return;
    }
    if (activeTab === 'paste' && !pasteText.trim()) {
      setErrorStatus("Please paste your resume text content or pick one of our sample templates below.");
      return;
    }

    setErrorStatus(null);
    setIsScanning(true);
    setScanStep(0);

    // Dynamic scanning animation cycles on frontend
    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < SCAN_MESSAGES.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 900);

    try {
      const payload: any = { targetRole };
      if (activeTab === 'upload' && selectedFileBase64) {
        payload.pdfBase64 = selectedFileBase64;
        payload.filename = selectedFile?.name;
      } else {
        payload.textContent = pasteText;
      }

      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Heuristic scanning module timed out. Let's try again.");
      }

      const scanResult: ScanResult = await response.json();
      
      // Let the simulation complete gently before updating state
      setTimeout(() => {
        setAnalysisResult(scanResult);
        clearInterval(interval);
        setIsScanning(false);
      }, 1500);

    } catch (err: any) {
      clearInterval(interval);
      setIsScanning(false);
      setErrorStatus(err.message || "The AI scanning server was unresponsive. Confirm process env GEMINI_API_KEY is active.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-sans selection:bg-primary selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      {/* Grid scaffolding overlay matching styling rules */}
      <div className="fixed inset-0 cyber-grid opacity-50 pointer-events-none z-0"></div>

      {/* Header and Brand */}
      <Header onReset={handleReset} />

      {/* Floating Widget - QUICK SCORE */}
      <div className="fixed bottom-8 right-8 z-50 group flex items-center justify-end select-none">
        <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        <button 
          onClick={() => {
            if (analysisResult) {
              handleReset();
            } else {
              selectTemplate(SAMPLE_TEMPLATES[0]);
            }
          }}
          className="relative bg-primary text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer text-sm font-display font-extrabold focus:outline-none"
        >
          <Bolt className="h-5 w-5 fill-current animate-pulse text-secondary" />
          <span>QUICK SCORE</span>
        </button>
      </div>

      <main className="z-10 relative flex-grow pt-24 md:pt-32 pb-16">
        
        {/* SCANNING ACTIVE SCREEN OVERLAY */}
        {isScanning && (
          <div className="fixed inset-0 bg-[#0F172A]/95 backdrop-blur-md flex flex-col justify-center items-center z-[100] p-6 text-center">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-1.5 flex items-center justify-center bg-slate-950 rounded-full">
                <Loader2 className="h-8 w-8 text-primary animate-pulse" />
              </div>
            </div>

            <h3 className="font-display text-2xl font-extrabold tracking-tight mb-2 text-white">
              Compiling Reality Score
            </h3>
            
            <p className="font-mono text-sm text-[#10B981] mt-1 h-6 transition-all duration-300">
              {SCAN_MESSAGES[scanStep]}
            </p>

            <p className="font-sans text-xs text-slate-400 max-w-sm mt-8 leading-relaxed">
              Recruiters spend 6 seconds reviewing resumes. Our neural matrix model evaluates formatting alignment, credentials, and AI filler keywords.
            </p>
          </div>
        )}

        {/* Dynamic Display based on analysisResult state */}
        {analysisResult ? (
          <ResumeScoring 
            result={analysisResult} 
            onReset={handleReset} 
            filename={selectedFile ? selectedFile.name : activeTab === "paste" ? "Pasted Resume Text" : null} 
          />
        ) : (
          <div>
            {/* HERO LANDING VIEW */}
            <section className="max-w-7xl mx-auto px-4 md:px-16 text-center pt-10 pb-8">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] mb-6 leading-[1.1] select-none">
                Is Your Resume <span className="text-primary italic">Real?</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed select-none">
                Recruiters spend 6 seconds on your CV. Our AI scans for the "AI-fluff" that's killing your chances. Get your Reality Score in seconds.
              </p>

              {/* TARGET ROLE BENCHMARK INPUT */}
              <div className="max-w-3xl mx-auto mb-6 text-left select-none relative z-10">
                <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-primary" /> Target Role / Job Title (Optional Calibration)
                </label>
                <div className="relative">
                  <input
                    id="input-target-role"
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Junior Web Developer, Product Manager, Financial Analyst..."
                    className="w-full bg-white border border-outline-variant hover:border-primary/50 focus:border-primary px-4 py-3.5 rounded-xl text-sm font-sans placeholder-slate-400 font-medium focus:outline-none transition-all duration-200 outline-none shadow-sm"
                  />
                  {targetRole && (
                    <button
                      onClick={() => setTargetRole("")}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-0 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-2 block font-medium leading-relaxed">
                  Calibrating a target role activates <strong>Gap Intelligence</strong> and aligns <strong>Interview Objections</strong> to your specific field.
                </span>
              </div>

              {/* TAB SWITCHERS BETWEEN GRAPHIC UPLOAD AND DIRECT PASTE */}
              <div className="max-w-3xl mx-auto bg-white p-1.5 rounded-xl border border-outline-variant mb-8 flex justify-center items-center gap-2 shadow-sm">
                <button 
                  onClick={() => { setActiveTab("upload"); setErrorStatus(null); }}
                  className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-lg text-sm font-bold transition-all duration-150 cursor-pointer ${activeTab === 'upload' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  <UploadCloud className="h-4.5 w-4.5" />
                  <span>Upload Document</span>
                </button>
                <button 
                  onClick={() => { setActiveTab("paste"); setErrorStatus(null); }}
                  className={`flex-1 flex gap-2 justify-center items-center py-3 rounded-lg text-sm font-bold transition-all duration-150 cursor-pointer ${activeTab === 'paste' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  <FileSignature className="h-4.5 w-4.5" />
                  <span>Paste Text directly</span>
                </button>
              </div>

              {/* CORE CONTENT CONTROLS */}
              <div className="max-w-3xl mx-auto mb-10">
                {errorStatus && (
                  <div className="p-4 bg-error-container border border-error/20 text-on-error-container rounded-xl flex items-start gap-3 text-left text-sm mb-6 animate-pulse">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-error" />
                    <span className="font-mono leading-relaxed">{errorStatus}</span>
                  </div>
                )}

                {activeTab === 'upload' ? (
                  // DRAG AND DROP UPLODER CONTAINER
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileSelector}
                    className={`relative w-full h-72 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group overflow-hidden bg-white shadow-sm ${dragActive ? 'border-primary bg-primary-container/20' : 'border-outline-variant hover:border-primary hover:bg-surface-dim/40'}`}
                  >
                    <div className="scanner-beam hidden group-hover:block"></div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept=".pdf,.txt"
                      onChange={handleFileChange}
                    />

                    {selectedFile ? (
                      <div className="space-y-4 p-6 text-center z-10" onClick={(e) => e.stopPropagation()}>
                        <div className="mx-auto p-4 rounded-full bg-primary-container border border-outline-variant w-fit shadow-inner">
                          <FileCheck className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                          <p className="font-display font-extrabold text-lg text-on-surface">
                            {selectedFile.name}
                          </p>
                          <p className="font-mono text-xs text-on-surface-variant mt-1 font-semibold">
                            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <div className="flex justify-center gap-4 pt-1">
                          <button 
                            onClick={clearSelectedFile}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/20 text-[#EF4444] rounded-lg cursor-pointer transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            REMOVE
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); executeScan(); }}
                            className="flex items-center gap-2 px-6 py-2 text-xs font-mono font-extrabold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-md cursor-pointer transition-all duration-150"
                          >
                            <Bolt className="h-3.5 w-3.5 fill-current" />
                            START REALITY TEST
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 p-6 pointer-events-none select-none text-center">
                        <div className="p-4 rounded-full bg-slate-100 border border-slate-200 w-fit mx-auto group-hover:scale-110 transition-transform shadow-inner">
                          <UploadCloud className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                          <p className="font-display font-extrabold text-xl text-on-surface mb-1">
                            Drop your resume here
                          </p>
                          <p className="font-mono text-xs text-on-surface-variant font-bold tracking-wider uppercase">
                            Supports PDF, TXT (MAX 5MB)
                          </p>
                        </div>
                        <div className="flex gap-2 justify-center items-center pt-2">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary glow-pulse"></span>
                          <span className="font-mono text-xs text-primary font-bold tracking-widest">
                            AI SCANNER ACTIVE
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // TEXT AREA DIRECT COPING CONTAINER
                  <div className="space-y-4 bg-white border border-outline-variant shadow-sm rounded-2xl p-5 md:p-6 text-left">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
                        <FileSignature className="h-4 w-4" />
                        <span>PASTE YOUR RESUME TEXT DATA</span>
                      </div>
                      {pasteText.length > 0 && (
                        <button 
                          onClick={() => setPasteText("")}
                          className="text-xs font-mono text-error hover:underline flex items-center gap-1 focus:outline-none cursor-pointer"
                        >
                          Clear Text
                        </button>
                      )}
                    </div>
                    <textarea 
                      placeholder="Paste formatting body here, e.g. details under experience headings, skills checklists..."
                      className="w-full h-64 bg-slate-50 border border-outline-variant rounded-xl p-4 text-sm text-on-surface font-mono placeholder-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                      value={pasteText}
                      onChange={(e) => setPasteText(e.target.value)}
                    />
                    <div className="flex justify-between items-center pt-2 font-mono text-[11px] text-on-surface-variant">
                      <div>{pasteText.length} characters</div>
                      <button 
                        onClick={executeScan}
                        className="bg-primary hover:bg-primary/95 text-white font-bold py-2.5 px-6 rounded-lg font-sans text-xs tracking-wider flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-0 shadow-sm transition-all duration-150"
                      >
                        <Bolt className="h-3.5 w-3.5 fill-current" />
                        SCAN RAW TEXT
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* SAMPLE TEMPLATE SELECTORS CONTAINER */}
              <div className="max-w-4xl mx-auto pt-10 border-t border-outline-variant/60 select-none">
                <span className="font-mono text-[11px] text-tertiary-fixed-dim bg-slate-800 text-white font-bold px-3 py-1 rounded uppercase tracking-widest block w-fit mx-auto mb-6 shadow-sm">
                  No Resume file on Hand? Test Immediately with a Sample Case
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="template-showcase">
                  {SAMPLE_TEMPLATES.map((template, idx) => (
                    <div 
                      key={idx}
                      onClick={() => selectTemplate(template)}
                      className="p-5 rounded-xl bg-white hover:bg-slate-50/80 border border-outline-variant hover:border-primary/50 transition-all cursor-pointer group text-left flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display font-extrabold text-on-surface text-sm tracking-tight group-hover:text-primary transition-colors">
                            {template.name}
                          </h4>
                          <span className="text-[10px] font-mono text-on-surface-variant border border-outline-variant bg-slate-50 px-2 py-0.5 rounded font-bold uppercase">
                            Case {idx+1}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-4">
                          {template.description}
                        </p>
                      </div>
                      <div className="font-mono text-[10px] text-secondary font-bold flex items-center justify-between pt-1">
                        <span>{template.role}</span>
                        <span className="text-primary group-hover:translate-x-1 duration-150">Load &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INTERACTIVE 3D LAB */}
              <div className="mt-16 pt-12 border-t border-outline-variant/60">
                <ThreeDSandbox />
              </div>

              {/* HOW IT WORKS, BENCHMARKS, ENTERPRISE SECTIONS */}
              <div className="mt-16 pt-12 border-t border-outline-variant/60">
                <InfoPages />
              </div>

              {/* SOCIAL NUMERICAL TRUST ROW */}
              <div className="mt-20 py-8 border-y border-outline-variant/60 bg-white/40 flex flex-wrap justify-center items-center gap-12 select-none">
                <div className="flex flex-col items-center">
                  <span className="font-display text-3xl font-extrabold text-primary">15,000+</span>
                  <span className="font-mono text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Resumes Roasted</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-display text-3xl font-extrabold text-secondary">98%</span>
                  <span className="font-mono text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Accuracy Rate</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-display text-3xl font-extrabold text-[#F59E0B]">2.4k</span>
                  <span className="font-mono text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Interns Hired</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
