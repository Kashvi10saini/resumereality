import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#0F172A] border-t border-[#1E293B] relative z-10" id="app-footer">
      <div>
        <div className="font-display text-xl font-bold text-white mb-3">
          ResumeReality
        </div>
        <p className="font-mono text-xs text-[#94A3B8] max-w-sm leading-relaxed">
          &copy; {new Date().getFullYear()} ResumeReality AI. Built for the competitive edge. We help the next generation of talent bypass the bots.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end items-center text-xs">
        <a 
          className="font-sans text-[#94A3B8] hover:text-[#3B82F6] transition-colors opacity-90 hover:opacity-100" 
          href="#privacy"
        >
          Privacy Policy
        </a>
        <a 
          className="font-sans text-[#94A3B8] hover:text-[#3B82F6] transition-colors opacity-90 hover:opacity-100" 
          href="#terms"
        >
          Terms of Service
        </a>
        <a 
          className="font-sans text-[#94A3B8] hover:text-[#3B82F6] transition-colors opacity-90 hover:opacity-100" 
          href="#ai-ethics"
        >
          AI Ethics
        </a>
        <a 
          className="font-sans text-[#94A3B8] hover:text-[#3B82F6] transition-colors opacity-90 hover:opacity-100" 
          href="#support"
        >
          Contact Support
        </a>
      </div>
    </footer>
  );
}
