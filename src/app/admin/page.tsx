"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  UserPlus,
  Video,
  Globe,
  Link as LinkIcon,
  Copy,
  Check,
  Trash2,
  Search,
  Bell,
  LogOut,
  Calendar,
  Mail,
  FileCheck,
  Settings,
  Users,
  Award,
  Layers,
  Plus,
} from "lucide-react";

interface StaffAccount {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CHAIR";
}

interface MeetingRoom {
  id: string;
  code: string;
  title: string;
  topic: string;
  type: "LIVE_COMMITTEE" | "TRAINING";
}

export default function AdminDashboard() {
  const [activeModal, setActiveModal] = useState<"MEETING" | "STAFF" | "ROSTER" | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  };

  // State Management
  const [staffList, setStaffList] = useState<StaffAccount[]>([
    { id: "1", name: "Sarah Jenkins", email: "sarah.eb@delegatex.org", role: "CHAIR" },
    { id: "2", name: "David Kim", email: "david.sec@delegatex.org", role: "ADMIN" },
  ]);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffRole, setNewStaffRole] = useState<"ADMIN" | "CHAIR">("CHAIR");

  const [meetings, setMeetings] = useState<MeetingRoom[]>([
    {
      id: "1",
      code: "UNSC-ARCTIC-2026",
      title: "UNSC: Situation in Arctic",
      topic: "Militarization & Navigation",
      type: "LIVE_COMMITTEE",
    },
    {
      id: "2",
      code: "TRAIN-ROP-01",
      title: "THIMUN RoP Masterclass",
      topic: "Resolution Drafting",
      type: "TRAINING",
    },
  ]);
  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingTopic, setNewMeetingTopic] = useState("");
  const [newMeetingType, setNewMeetingType] = useState<"LIVE_COMMITTEE" | "TRAINING">("LIVE_COMMITTEE");

  const [countries, setCountries] = useState<string[]>([
    "United States of America",
    "French Republic",
    "United Kingdom",
    "People's Republic of China",
    "Russian Federation",
  ]);
  const [newCountry, setNewCountry] = useState("");

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingTitle.trim()) return;
    const generatedCode = `${newMeetingTitle.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, "MUN")}-${Math.floor(1000 + Math.random() * 9000)}`;
    setMeetings([
      {
        id: Date.now().toString(),
        code: generatedCode,
        title: newMeetingTitle.trim(),
        topic: newMeetingTopic.trim() || "General Debate",
        type: newMeetingType,
      },
      ...meetings,
    ]);
    setNewMeetingTitle("");
    setNewMeetingTopic("");
  };

  const copyMeetingLink = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${origin}/room/${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* Top Header Bar (Matching App Screenshot) */}
      <header className="bg-slate-700 text-white px-5 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center font-bold text-white text-base">
            AD
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight">Master Secretariat</h1>
            <p className="text-xs text-slate-300">Admin • ID: 0001</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-slate-200">
          <button onClick={() => showNotice("Search is ready for your workspace.")} aria-label="Search" className="p-2 hover:bg-slate-600 rounded-full transition">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => showNotice("You are all caught up.")} aria-label="Notifications" className="p-2 hover:bg-slate-600 rounded-full transition relative">
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
              <button onClick={() => setActiveModal("MEETING")} className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Video className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Live Meetings</span>
              </button>

              <button onClick={() => setActiveModal("STAFF")} className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <UserPlus className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Staff & EB</span>
              </button>

              <button onClick={() => setActiveModal("ROSTER")} className="flex flex-col items-center group">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Country Roster</span>
              </button>

              <button onClick={() => showNotice("Circulars are ready to be configured.")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Circulars</span>
              </button>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 2: SECRETARIAT & ACADEMICS */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800">
              Secretariat & Oversight
            </h2>
            <div className="grid grid-cols-4 gap-y-5 gap-x-3 text-center">
              <button onClick={() => showNotice("Awards and certificates are ready to be configured.")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Awards & Certs</span>
              </button>

              <button onClick={() => showNotice("Roll call lists are ready to be configured.")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Roll Call List</span>
              </button>

              <button onClick={() => showNotice("Delegate management is ready to be connected.")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Delegates (120)</span>
              </button>

              <button onClick={() => showNotice("Committee management is ready to be connected.")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Committees</span>
              </button>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 3: COMMUNICATION */}
          <section className="space-y-3">
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-800">
              Communication & Broadcast
            </h2>
            <div className="grid grid-cols-4 gap-y-5 gap-x-3 text-center">
              <button onClick={() => showNotice("Broadcast messaging is ready to be configured.")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">Broadcast SMS</span>
              </button>

              <button onClick={() => showNotice("Rules of Procedure settings are ready to be configured.")} className="flex flex-col items-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-slate-200 transition shadow-sm">
                  <Settings className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-700 mt-2">RoP Config</span>
              </button>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (PC): Live Meeting Generator & Quick Staff Box */}
        <aside className="space-y-4 lg:sticky lg:top-20">
          
          {/* Create Meeting Form */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <LinkIcon className="w-4 h-4 text-slate-700" />
              <span>Create Live Meeting Link</span>
            </h2>
            <p className="text-xs text-slate-500">
              Generate room codes for live committee sessions or workshops.
            </p>

            <form onSubmit={handleCreateMeeting} className="space-y-2">
              <input
                type="text"
                required
                value={newMeetingTitle}
                onChange={(e) => setNewMeetingTitle(e.target.value)}
                placeholder="Committee (e.g. UNSC Arctic)"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-700"
              />
              <input
                type="text"
                value={newMeetingTopic}
                onChange={(e) => setNewMeetingTopic(e.target.value)}
                placeholder="Agenda / Topic"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-700"
              />
              <select
                value={newMeetingType}
                onChange={(e) => setNewMeetingType(e.target.value as any)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-700"
              >
                <option value="LIVE_COMMITTEE">Live Committee Simulation</option>
                <option value="TRAINING">Training Workshop</option>
              </select>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs transition shadow-sm"
              >
                Generate Link
              </button>
            </form>
          </div>

          {/* Active Links List */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Active Room Codes ({meetings.length})
            </span>

            {meetings.map((m) => (
              <div
                key={m.id}
                className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-900">{m.title}</p>
                  <p className="text-[10px] font-mono text-slate-500">Code: {m.code}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => copyMeetingLink(m.code)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition"
                    title="Copy Link"
                  >
                    {copiedCode === m.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <Link
                    href={`/room/${m.code}`}
                    className="px-2.5 py-1 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700 transition"
                  >
                    Join
                  </Link>
                </div>
              </div>
            ))}
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
