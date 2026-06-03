import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  MousePointerClick, 
  RotateCcw, 
  Send, 
  Layers, 
  Check, 
  HelpCircle,
  ThumbsUp,
  Bolt
} from "lucide-react";

interface CarouselItem {
  id: number;
  title: string;
  role: string;
  image: string;
  rating: number;
  description: string;
}

const CAROUSEL_IMAGES: CarouselItem[] = [
  {
    id: 1,
    title: "The Dynamic Developer",
    role: "Full-Stack Engineer",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    rating: 98,
    description: "Features a structured grid displaying dynamic portfolio statistics and live API metrics to pass bot audits."
  },
  {
    id: 2,
    title: "The Creative Architect",
    role: "UX/UI Lead Specialist",
    image: "https://images.unsplash.com/photo-1521791136364-724f1c35350f?auto=format&fit=crop&w=800&q=80",
    rating: 94,
    description: "Built with eye-catching visual layout density, color theory rules, and interactive tactile references."
  },
  {
    id: 3,
    title: "System Operations",
    role: "Cloud Platform Engineer",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    rating: 99,
    description: "Hardcoded production data points directly linked to stable clusters, omitting generic buzzwords."
  },
  {
    id: 4,
    title: "Product Coordinator",
    role: "Senior Director of Product",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    rating: 91,
    description: "Clear business-driven results showcasing revenue growth matrices and zero generic boilerplate."
  }
];

export default function ThreeDSandbox() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeTab, setActiveTab ] = useState<"buttons" | "forms" | "carousel">("carousel");
  
  // 3D Button states
  const [isFlipped, setIsFlipped] = useState(false);
  const [buttonPressedCount, setButtonPressedCount] = useState(0);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("Software Engineer");
  const [formCreds, setFormCreds] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  // Magnetic button calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setMagneticPos({ x, y });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Form action
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setFormName("");
    setFormCreds("");
    setFormSubmitted(false);
  };

  return (
    <section 
      id="three-d-sandbox" 
      className="max-w-7xl mx-auto px-4 md:px-16 pt-12 pb-16 relative z-10 select-none"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary/10 text-primary font-mono text-[11px] font-bold uppercase tracking-widest border border-primary/20 mb-3 shadow-sm">
          <Layers className="h-3 w-3 animate-spin" /> Live 3D Interaction Lab
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Tactile <span className="text-primary italic">Resume Canvas</span>
        </h2>
        <p className="font-sans text-sm text-on-surface-variant mt-2 font-medium">
          Step into a truly immersive preview. Interact with physical, depth-driven UI models built on 3D perspective physics.
        </p>
      </div>

      {/* Grid Switcher for the 3D Sandbox Categories */}
      <div className="max-w-2xl mx-auto flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner mb-12">
        <button
          onClick={() => setActiveTab("carousel")}
          className={`flex-1 py-3 text-xs font-bold font-sans tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
            activeTab === "carousel" ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" : "text-slate-600 hover:text-[#0F172A]"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>3D Carousel</span>
        </button>
        <button
          onClick={() => setActiveTab("buttons")}
          className={`flex-1 py-3 text-xs font-bold font-sans tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
            activeTab === "buttons" ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" : "text-slate-600 hover:text-[#0F172A]"
          }`}
        >
          <MousePointerClick className="h-4 w-4" />
          <span>Interactive Buttons</span>
        </button>
        <button
          onClick={() => setActiveTab("forms")}
          className={`flex-1 py-3 text-xs font-bold font-sans tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
            activeTab === "forms" ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" : "text-slate-600 hover:text-[#0F172A]"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>3D Input Form</span>
        </button>
      </div>

      {/* Main Sandbox Interactive Area */}
      <div className="min-h-[500px] flex items-center justify-center bg-white rounded-3xl border border-outline-variant shadow-lg p-6 md:p-12 relative overflow-hidden">
        {/* Subtle decorative mesh backdrops */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 blur-3xl rounded-full pointer-events-none -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-85 h-85 bg-secondary/5 blur-3xl rounded-full pointer-events-none translate-x-12 translate-y-12"></div>

        <AnimatePresence mode="wait">
          {/* TAB 1: 3D CAROUSEL COVERFLOW EFFECT */}
          {activeTab === "carousel" && (
            <motion.div
              key="carousel-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-4xl flex flex-col items-center gap-8 relative z-10"
            >
              <div className="text-center mb-2">
                <span className="font-mono text-[11px] text-primary font-bold uppercase tracking-widest block mb-1">
                  Tactile Perspective Slide Deck
                </span>
                <p className="font-sans text-xs text-on-surface-variant font-medium">
                  Hover cards to witness true live physical depth with tilted 3D shadows.
                </p>
              </div>

              {/* Coverflow Frame container */}
              <div 
                ref={carouselRef} 
                className="relative w-full h-[320px] md:h-[350px] flex items-center justify-center select-none"
                style={{ perspective: "1200px" }}
              >
                {CAROUSEL_IMAGES.map((item, idx) => {
                  // Calculate dynamic distance to render perspective skews
                  const offset = idx - carouselIndex;
                  const isActive = idx === carouselIndex;
                  const isPrev = idx === (carouselIndex - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length;
                  const isNext = idx === (carouselIndex + 1) % CAROUSEL_IMAGES.length;

                  // Render state visibility configs
                  let isVisible = isActive || isPrev || isNext;
                  let translateX = 0;
                  let rotateY = 0;
                  let translateZ = 0;
                  let opacity = 0;
                  let pointerEvents: "auto" | "none" = "none";
                  let zIndex = 0;

                  if (isActive) {
                    translateX = 0;
                    rotateY = 0;
                    translateZ = 120; // Bring card forward
                    opacity = 1;
                    pointerEvents = "auto";
                    zIndex = 30;
                  } else if (isPrev) {
                    translateX = -260;
                    rotateY = 32; // Facing inwards
                    translateZ = -60;
                    opacity = 0.55;
                    pointerEvents = "auto";
                    zIndex = 20;
                  } else if (isNext) {
                    translateX = 260;
                    rotateY = -32; // Facing inwards
                    translateZ = -60;
                    opacity = 0.55;
                    pointerEvents = "auto";
                    zIndex = 20;
                  }

                  // Skip rendering elements that are fully out of sequence bounds for performance
                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => {
                        if (!isActive) {
                          setCarouselIndex(idx);
                        }
                      }}
                      animate={{
                        x: translateX,
                        rotateY: rotateY,
                        z: translateZ,
                        opacity: opacity,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 140,
                        damping: 20
                      }}
                      whileHover={isActive ? {
                        scale: 1.03,
                        rotateX: [0, -3, 3, 0],
                        transition: { duration: 0.5 }
                      } : undefined}
                      className={`absolute w-[240px] md:w-[280px] h-[300px] md:h-[320px] rounded-2xl cursor-pointer bg-white border border-slate-200 p-3 flex flex-col justify-between overflow-hidden shadow-[0_15px_30px_rgba(0,1,10,0.06)] hover:shadow-[0_25px_50px_rgba(59,130,246,0.12)] transition-shadow duration-300`}
                      style={{
                        zIndex: zIndex,
                        pointerEvents: pointerEvents,
                        transformStyle: "preserve-3d"
                      }}
                    >
                      {/* Image Frame with realistic bevel */}
                      <div className="relative w-full h-[150px] md:h-[160px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-primary border border-slate-200 flex items-center gap-1 shadow-sm">
                          <Bolt className="h-3 w-3" /> {item.rating}% REALITY
                        </div>
                      </div>

                      {/* Info & Micro Copy inside card */}
                      <div className="flex flex-col gap-1.5 mt-2 text-left" style={{ transform: "translateZ(30px)" }}>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-slate-400 font-bold tracking-wider uppercase">
                            {item.role}
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-[#0F172A] text-sm tracking-tight">
                          {item.title}
                        </h4>
                        <p className="font-sans text-[10px] text-on-surface-variant leading-relaxed line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Highlight link indicator for design completeness */}
                      <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-100">
                        <span className="font-mono text-[9px] text-[#0F172A] font-bold">UNSPLASH ARCHIVE</span>
                        <span className="font-sans text-[10px] text-primary font-bold hover:underline">Select &rarr;</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Manual Control Knobs */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200 rounded-xl transition-all shadow-sm active:translate-y-0.5"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {CAROUSEL_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === carouselIndex ? "w-8 bg-primary" : "w-2.5 bg-slate-200"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="p-3 bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200 rounded-xl transition-all shadow-sm active:translate-y-0.5"
                  aria-label="Next card"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: TACTILE 3D BUTTON PALETTE */}
          {activeTab === "buttons" && (
            <motion.div
              key="buttons-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-4xl flex flex-col items-center gap-10 relative z-10"
            >
              <div className="text-center">
                <span className="font-mono text-[11px] text-primary font-bold uppercase tracking-widest block mb-1">
                  TACTILE DEPTH EXAMPLES
                </span>
                <p className="font-sans text-xs text-on-surface-variant font-medium">
                  We design custom components with logical spatial gravity. Push or hover the elements block.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch pt-4 text-left">
                {/* BUTTON TYPE A: Neobrutalist Thick 3D Press Down Button */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-4">
                  <div>
                    <h4 className="font-mono text-xs font-bold text-slate-500 mb-1 uppercase">1. Interactive Neobrutalist Press</h4>
                    <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                      Features a deep physical drop shadow offset that transforms to zero upon active activation.
                    </p>
                  </div>

                  <div className="h-24 flex items-center justify-center">
                    <button
                      onClick={() => setButtonPressedCount(c => c + 1)}
                      className="w-full max-w-[200px] bg-primary text-white border-2 border-slate-900 px-6 py-3.5 rounded-xl font-sans font-bold text-xs tracking-wider shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 cursor-pointer focus:outline-none"
                    >
                      Pushed: {buttonPressedCount} times
                    </button>
                  </div>
                </div>

                {/* BUTTON TYPE B: Magnetic Floating Glass Engine */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-4">
                  <div>
                    <h4 className="font-mono text-xs font-bold text-slate-500 mb-1 uppercase">2. Magnetic Cursor Force</h4>
                    <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                      A dynamic interactive grid pulls and rotates the card according to mouse coordinates.
                    </p>
                  </div>

                  <div className="h-24 flex items-center justify-center">
                    <motion.button
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onMouseEnter={() => setIsHovered(true)}
                      animate={{
                        x: magneticPos.x,
                        y: magneticPos.y,
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 150, damping: 15 }}
                      className="w-full max-w-[200px] bg-white text-slate-800 border border-slate-300 px-6 py-3.5 rounded-xl font-sans font-bold text-xs tracking-wider shadow-sm hover:border-primary hover:text-primary active:scale-95 transition-colors cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
                    >
                      {isHovered ? (
                        <>
                          <Bolt className="h-3.5 w-3.5 text-primary animate-spin" />
                          <span>PULLING FORCE</span>
                        </>
                      ) : (
                        <span>HOVER MAGNETIC</span>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* BUTTON TYPE C: Double-Sided 3D Flipping Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-4">
                  <div>
                    <h4 className="font-mono text-xs font-bold text-slate-500 mb-1 uppercase">3. Real Flips (3D RotateY)</h4>
                    <p className="font-sans text-[11px] text-on-surface-variant leading-relaxed">
                      Leverages full spatial volume flipping by rotating exactly 180 degrees on click.
                    </p>
                  </div>

                  <div className="h-24 flex items-center justify-center relative" style={{ perspective: "1000px" }}>
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative w-full max-w-[200px] h-12 cursor-pointer"
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      {/* Front Side */}
                      <div 
                        className="absolute inset-0 bg-[#0F172A] text-white border border-[#1E293B] rounded-xl flex items-center justify-center gap-1.5 font-sans font-bold text-xs tracking-wider shadow-sm backface-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <RotateCcw className="h-3.5 w-3.5 text-secondary" />
                        <span>VERIFIED TEXT</span>
                      </div>

                      {/* Back Side */}
                      <div 
                        className="absolute inset-0 bg-secondary text-white rounded-xl flex items-center justify-center gap-1.5 font-sans font-bold text-xs tracking-wider shadow-md transform rotateY-180"
                        style={{ 
                          backfaceVisibility: "hidden", 
                          transform: "rotateY(180deg)" 
                        }}
                      >
                        <Check className="h-3.5 w-3.5 text-white" />
                        <span>REAL CANDIDATE</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: TACTILE 3D FEEDBACK FORM */}
          {activeTab === "forms" && (
            <motion.div
              key="forms-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-xl flex flex-col items-center gap-8 relative z-10"
            >
              <div className="text-center w-full">
                <span className="font-mono text-[11px] text-primary font-bold uppercase tracking-widest block mb-1">
                  TACTILE SUBMISSION GRID
                </span>
                <p className="font-sans text-xs text-on-surface-variant font-medium">
                  Fields implement focal 3D shadows that indent visually when activated.
                </p>
              </div>

              <div className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 relative overflow-hidden text-left shadow-[0_10px_25px_rgba(0,0,0,0.03)]">
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="active-form"
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono font-bold text-[#0F172A] uppercase tracking-wide">
                          Applicant Identifier (Name)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g. Alexis Martinez"
                            className="w-full bg-white text-[#0F172A] border border-slate-200 focus:border-primary px-4 py-3 text-xs md:text-sm rounded-xl outline-none shadow-[2px_2px_0px_0px_rgba(226,232,240,1)] focus:shadow-[4px_4px_0px_0px_#3b82f6] active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150"
                          />
                        </div>
                      </div>

                      {/* Dropdown with subtle 3D highlight */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono font-bold text-[#0F172A] uppercase tracking-wide">
                          Target Core Role Matrix
                        </label>
                        <select
                          value={formRole}
                          onChange={(e) => setFormRole(e.target.value)}
                          className="w-full bg-white text-[#0F172A] border border-slate-200 focus:border-primary px-4 py-3 text-xs md:text-sm rounded-xl outline-none shadow-[2px_2px_0px_0px_rgba(226,232,240,1)] focus:shadow-[4px_4px_0px_0px_#3b82f6] cursor-pointer"
                        >
                          <option value="Software Engineer">Software Engineer</option>
                          <option value="Product Manager">Product Director</option>
                          <option value="DevOps Analyst">Cloud & Infrastructure Analyst</option>
                          <option value="Data Scientist">Generative AI Specialist</option>
                        </select>
                      </div>

                      {/* Key credentials */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono font-bold text-[#0F172A] uppercase tracking-wide">
                          Key Non-AI Practical Credential or Skill
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formCreds}
                          onChange={(e) => setFormCreds(e.target.value)}
                          placeholder="e.g. Deployed core state engine reducing token cost by 45% using native fetch queues..."
                          className="w-full bg-white text-[#0F172A] border border-slate-200 focus:border-primary px-4 py-3 text-xs rounded-xl outline-none resize-none shadow-[2px_2px_0px_0px_rgba(226,232,240,1)] focus:shadow-[4px_4px_0px_0px_#3b82f6] active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150"
                        />
                      </div>

                      {/* Submit Button with physical drop state */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0F172A] text-white hover:bg-slate-800 border-2 border-[#1E293B] py-3.5 rounded-xl font-sans font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#3b82f6] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#3b82f6] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 cursor-pointer disabled:opacity-55 focus:outline-none"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>PROCESSING INPUTS...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            <span>SUBMIT 3D FORM METRIC</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    // FORM SUBMISSION SUCCESS SCREEN
                    <motion.div
                      key="success-form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center py-8 space-y-5"
                    >
                      <div className="w-16 h-16 bg-secondary-container text-secondary rounded-full flex items-center justify-center mx-auto border border-secondary/35 shadow-[4px_4px_0px_0px_#10b981] animate-bounce">
                        <ThumbsUp className="h-6 w-6" />
                      </div>

                      <div>
                        <h4 className="font-display font-extrabold text-[#0F172A] text-lg">
                          Metric Compiled Successfully!
                        </h4>
                        <p className="font-mono text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">
                          Result Payload: Ready for verification
                        </p>
                      </div>

                      <div className="bg-white border border-slate-200 p-4 rounded-xl text-left space-y-1.5 shadow-inner">
                        <div className="grid grid-cols-3 text-[11px] font-mono leading-relaxed">
                          <span className="text-slate-400 font-bold">NAME:</span>
                          <span className="col-span-2 text-[#0F172A] font-bold">{formName}</span>
                        </div>
                        <div className="grid grid-cols-3 text-[11px] font-mono leading-relaxed">
                          <span className="text-slate-400 font-bold">ROLE:</span>
                          <span className="col-span-2 text-[#0F172A] font-bold">{formRole}</span>
                        </div>
                        <div className="grid grid-cols-3 text-[11px] font-mono leading-relaxed">
                          <span className="text-slate-400 font-bold">CREDENTIAL:</span>
                          <span className="col-span-2 text-on-surface-variant line-clamp-2 italic">"{formCreds}"</span>
                        </div>
                      </div>

                      <button
                        onClick={resetForm}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all hover:scale-95 cursor-pointer focus:outline-none"
                      >
                        RESET INPUT GRAPH
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
