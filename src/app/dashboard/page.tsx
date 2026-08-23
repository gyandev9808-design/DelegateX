"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Video,
  Award,
  Calendar,
  Clock,
  Mail,
  Newspaper,
  Image as ImageIcon,
  CheckCircle2,
  Mic,
  MessageSquare,
  KeyRound,
  ArrowRight,
  Search,
  Bell,
  LogOut,
  Hand,
  FolderOpen,
  Library,
  FileCheck,
} from "lucide-react";

export default function DelegateDashboard() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [placardRaised, setPlacardRaised] = useState(false);

  const handleJoinSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    router.push(`/room/${roomCode.trim().toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* Top Header Bar (Matching App Screenshot) */}
      <header className="bg-slate-700 text-white px-5 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center font-bold text-white text-base">
            VC
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight">Vivaan Chawla</h1>
            <p className="text-xs text-slate-300">VIII- G • 4606</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-slate-200">
          <button className="p-2 hover:bg-slate-600 rounded-full transition">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-slate-600 rounded-full transition relative">
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 bg-indigo-400 rounded-full absolute top-1.5 right-1.5" />
          </button>
          <Link href="/auth" className="p-2 hover:bg-slate-600 rounded-full transition text-rose-300">
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT / CENTER (2 cols on PC): Icon Categories */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: RECENTLY USED */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800">
              Recently Used
            </h2>
            <div className="grid grid-cols-4 gap-4 text-center">
              <Link href="/training" className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Syllabus</span>
              </Link>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">SMS History</span>
              </div>

              <Link href="/training" className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Homework</span>
              </Link>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Circulars</span>
              </div>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 2: ACADEMICS & TRAINING */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800">
              Academics
            </h2>
            <div className="grid grid-cols-4 gap-y-5 gap-x-3 text-center">
              <Link href="/training" className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Achievements</span>
              </Link>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Attendance</span>
              </div>

              <Link href="/training" className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Homework</span>
              </Link>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Hostel Attendance</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Performance</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Remarks</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Results</span>
              </div>

              <Link href="/training" className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Syllabus</span>
              </Link>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 3: COMMUNICATION */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800">
              Communication
            </h2>
            <div className="grid grid-cols-4 gap-y-5 gap-x-3 text-center">
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Mail Box</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Calendar</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Newspaper className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">School News</span>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Image Gallery</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (PC): Quick Actions & Room Entry */}
        <aside className="space-y-4 lg:sticky lg:top-20">
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <KeyRound className="w-4 h-4 text-slate-700" />
              <span>Join Live Committee</span>
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Paste the room invite code provided by your Chair.
            </p>

            <form onSubmit={handleJoinSession} className="space-y-2">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Code (e.g. UNSC-2026)"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-700 font-mono uppercase"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs transition flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <span>Enter Live Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block">
              Floor Control
            </span>

            <button
              onClick={() => setPlacardRaised(!placardRaised)}
              className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-semibold transition ${
                placardRaised
                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Hand className="w-4 h-4" />
              <span>{placardRaised ? "Placard Raised (Active)" : "Raise Placard"}</span>
            </button>
          </div>
        </aside>

      </main>
    </div>
  );
}
