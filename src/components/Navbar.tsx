"use client";

import Link from "next/link";
import { Globe2, BookOpen, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-1/2 top-4 z-50 flex h-14 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-slate-950/70 px-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:px-7">
      <Link href="/" className="flex items-center space-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-cyan-300">
          <Globe2 className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">
          Delegate<span className="text-emerald-300">X</span>
        </span>
      </Link>

      <nav className="flex items-center gap-3 text-sm font-medium text-slate-400 sm:gap-6">
        <Link
          href="/training"
          className="hidden items-center gap-1.5 transition hover:text-cyan-300 sm:flex"
        >
          <BookOpen className="h-4 w-4 text-cyan-300" />
          <span>Training Modules</span>
        </Link>
        <Link
          href="/auth"
          className="flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
        >
          <LogIn className="h-4 w-4" />
          <span>Sign in</span>
        </Link>
      </nav>
    </header>
  );
}
