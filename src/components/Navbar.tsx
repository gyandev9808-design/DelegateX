"use client";

import Link from "next/link";
import { Globe2, LogIn } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur fixed top-0 left-0 right-0 z-50 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
          <Globe2 className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg text-white tracking-tight">
          Delegate<span className="text-indigo-400">X</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
        <Link href="/committee" className="hover:text-white transition">
          Live Committee
        </Link>
      </nav>

      <div className="flex items-center space-x-3">
        <Link
          href="/auth"
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition shadow-sm"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In / Register</span>
        </Link>
      </div>
    </header>
  );
}
