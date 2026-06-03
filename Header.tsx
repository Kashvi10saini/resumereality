import React from "react";
import { User } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-16 h-20 bg-surface/85 backdrop-blur-xl border-b border-outline-variant">
      {/* Brand Logo & Interactive link back to homepage */}
      <div 
        onClick={onReset}
        className="font-display text-2xl font-extrabold text-on-surface tracking-tighter cursor-pointer hover:opacity-90 select-none flex items-center gap-2"
        id="nav-logo"
      >
        <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          ResumeReality
        </span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex gap-8 items-center" id="nav-links">
        <a 
          className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors duration-200" 
          href="#how-it-works"
        >
          How it Works
        </a>
        <a 
          className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors duration-200" 
          href="#benchmarks"
        >
          Benchmarks
        </a>
        <a 
          className="font-sans text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors duration-200" 
          href="#enterprise"
        >
          Enterprise
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <button 
          onClick={onReset}
          className="hidden md:block bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold hover:scale-95 transition-all duration-200 cursor-pointer text-sm shadow-sm"
          id="btn-nav-action"
        >
          Score My Resume
        </button>
        <div className="p-2 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-dim duration-150 cursor-pointer">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
