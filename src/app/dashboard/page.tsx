"use client";

import { useEffect, useState } from "react";
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
  LayoutDashboard,
  UserRound,
  Settings,
  Sun,
} from "lucide-react";

export default function DelegateDashboard() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [placardRaised, setPlacardRaised] = useState(false);
  const [greeting, setGreeting] = useState("Good day");
  const [notice, setNotice] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  };

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
    };

    updateGreeting();
    const timer = window.setInterval(updateGreeting, 60_000);
    return () => window.clearInterval(timer);
  }, []);

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
          <button onClick={() => router.push("/dashboard/search")} aria-label="Search" className="p-2 hover:bg-slate-600 rounded-full transition">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => router.push("/dashboard/notifications")} aria-label="Notifications" className="p-2 hover:bg-slate-600 rounded-full transition relative">
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 bg-indigo-400 rounded-full absolute top-1.5 right-1.5" />
          </button>
          <Link href="/auth" className="p-2 hover:bg-slate-600 rounded-full transition text-rose-300">
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_300px] gap-6 items-start">
        {/* Desktop navigation rail */}
        <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-24 bg-slate-900 text-white rounded-2xl p-4 min-h-[calc(100vh-7rem)] shadow-xl shadow-slate-900/10">
          <div className="px-3 pt-2 pb-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Delegate workspace</p>
            <p className="mt-2 text-lg font-semibold">Your command centre</p>
          </div>
          <nav className="space-y-1 text-sm" aria-label="Delegate navigation">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 font-medium text-white">
              <LayoutDashboard className="h-4 w-4 text-cyan-300" /> Overview
            </Link>
            <Link href="/training" className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-300 hover:bg-white/10 hover:text-white transition">
              <BookOpen className="h-4 w-4" /> Training library
            </Link>
            <Link href="/committee" className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-300 hover:bg-white/10 hover:text-white transition">
              <Video className="h-4 w-4" /> Live committees
            </Link>
          </nav>
          <div className="mt-auto border-t border-white/10 pt-4">
            <Link href="/auth" className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-300 hover:bg-white/10 hover:text-white transition">
              <Settings className="h-4 w-4" /> Account settings
            </Link>
          </div>
        </aside>
        
        {/* LEFT / CENTER (2 cols on PC): Icon Categories */}
        <div className="space-y-6">
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-amber-50 border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                <Sun className="h-4 w-4" /> DelegateX briefing
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">{greeting}, Vivaan.</h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">Your next strong argument starts with one focused session. Pick up where you left off or step into the room.</p>
            </div>
            <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border-[18px] border-amber-200/60" />
          </section>

          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Delegate summary">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Next session</span><Calendar className="h-4 w-4 text-cyan-700" /></div>
              <p className="mt-3 text-lg font-bold text-slate-900">UNSC Arctic</p>
              <p className="mt-1 text-xs text-slate-500">Today, 4:30 PM</p>
              <Link href="/committee" className="mt-3 inline-flex text-xs font-semibold text-cyan-700 hover:text-cyan-900">View committee <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Training progress</span><Award className="h-4 w-4 text-amber-600" /></div>
              <p className="mt-3 text-lg font-bold text-slate-900">68% complete</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-[68%] rounded-full bg-amber-500" /></div>
              <Link href="/training" className="mt-3 inline-flex text-xs font-semibold text-amber-700 hover:text-amber-900">Continue learning <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Delegate standing</span><CheckCircle2 className="h-4 w-4 text-emerald-600" /></div>
              <p className="mt-3 text-lg font-bold text-slate-900">Good momentum</p>
              <p className="mt-1 text-xs text-slate-500">3 sessions attended this month</p>
              <button onClick={() => router.push("/dashboard/report")} className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-900">View report <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></button>
            </div>
          </section>
          
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

              <button onClick={() => router.push("/dashboard/messages")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">SMS History</span>
              </button>

              <Link href="/training" className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Homework</span>
              </Link>

              <button onClick={() => router.push("/dashboard/circulars")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Circulars</span>
              </button>
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

              <button onClick={() => router.push("/dashboard/attendance")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Attendance</span>
              </button>

              <Link href="/training" className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Homework</span>
              </Link>

              <button onClick={() => router.push("/dashboard/hostel-attendance")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Hostel Attendance</span>
              </button>

              <button onClick={() => router.push("/dashboard/performance")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Performance</span>
              </button>

              <button onClick={() => router.push("/dashboard/remarks")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Remarks</span>
              </button>

              <button onClick={() => router.push("/dashboard/results")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Results</span>
              </button>

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
              <button onClick={() => router.push("/dashboard/mailbox")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Mail Box</span>
              </button>

              <button onClick={() => router.push("/dashboard/calendar")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Calendar</span>
              </button>

              <button onClick={() => router.push("/dashboard/news")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Newspaper className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">School News</span>
              </button>

              <button onClick={() => router.push("/dashboard/gallery")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Image Gallery</span>
              </button>
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
      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-medium text-white shadow-xl">
          {notice}
        </div>
      )}
    </div>
  );
}
