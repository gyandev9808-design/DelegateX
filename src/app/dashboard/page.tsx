"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Video,
  KeyRound,
  ArrowRight,
  Award,
  FileText,
  Clock,
  LogOut,
  Globe2,
  CheckCircle2,
} from "lucide-react";

export default function StudentDashboard() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");

  const handleJoinSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    router.push(`/room/${roomCode.trim().toUpperCase()}`);
  };

  const trainingModules = [
    {
      id: "rop-101",
      title: "Rules of Procedure (RoP) Fundamentals",
      progress: 100,
      status: "Completed",
      totalLessons: 6,
    },
    {
      id: "pos-paper",
      title: "Position Paper Writing & Policy Research",
      progress: 65,
      status: "In Progress",
      totalLessons: 4,
    },
    {
      id: "speech-drafting",
      title: "Opening Speech & GSL Mastery",
      progress: 20,
      status: "In Progress",
      totalLessons: 5,
    },
  ];

  const upcomingSessions = [
    {
      id: "1",
      code: "UNSC-ARCTIC-2026",
      committee: "UN Security Council",
      topic: "Arctic Maritime Security & Boundary Claims",
      time: "Tomorrow, 5:00 PM IST",
      type: "Live Simulation",
    },
    {
      id: "2",
      code: "TRAIN-ROP-01",
      committee: "THIMUN Caucus Workshop",
      topic: "Drafting Operative Clauses & Amendments",
      time: "Thursday, 6:30 PM IST",
      type: "Training Session",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Globe2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Delegate Portal</h1>
              <p className="text-xs text-slate-400">Welcome back, Delegate</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/training"
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>All Modules</span>
            </Link>
            <Link
              href="/auth"
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 text-xs font-medium transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Link>
          </div>
        </header>

        {/* Top Action: Quick Join Live Session */}
        <section className="bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[11px] font-semibold">
                Live Simulation Entry
              </span>
              <h2 className="text-lg font-bold text-white mt-2">Join a Live Committee Room</h2>
              <p className="text-xs text-slate-400">
                Enter the room code issued by your Executive Board or Secretariat.
              </p>
            </div>
            <form onSubmit={handleJoinSession} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Code (e.g. UNSC-01)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-1.5 shadow-md shadow-indigo-600/20"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </section>

        {/* Main Grid: Training Progress & Assigned Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Training Courses */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>My Training Progress</span>
              </h3>
              <Link href="/training" className="text-xs text-indigo-400 hover:underline">
                View curriculum →
              </Link>
            </div>

            <div className="space-y-3">
              {trainingModules.map((module) => (
                <div
                  key={module.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{module.title}</h4>
                      <span className="text-xs text-slate-400">{module.totalLessons} lessons</span>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded font-medium ${
                        module.progress === 100
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      }`}
                    >
                      {module.progress === 100 ? "Completed" : `${module.progress}%`}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-950 rounded-full h-1.5 border border-slate-800">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Scheduled Live Sessions */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Video className="w-4 h-4 text-cyan-400" />
              <span>Upcoming Committee Meetings</span>
            </h3>

            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase text-indigo-400">
                      {session.type}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-0.5">{session.committee}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{session.topic}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div className="flex items-center space-x-1.5 text-slate-400 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{session.time}</span>
                    </div>
                    <Link
                      href={`/room/${session.code}`}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold transition"
                    >
                      Enter
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
