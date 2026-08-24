"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  googleMeetUrl: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<"MEETING" | "STAFF" | "ROSTER" | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2500);
  };

  const [staffList, setStaffList] = useState<StaffAccount[]>([
    { id: "1", name: "Sarah Jenkins", email: "sarah.eb@delegatex.org", role: "CHAIR" },
    { id: "2", name: "David Kim", email: "david.sec@delegatex.org", role: "ADMIN" },
  ]);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffPassword, setNewStaffPassword] = useState("");
  const [newStaffRole, setNewStaffRole] = useState<"ADMIN" | "CHAIR">("CHAIR");

  const [meetings, setMeetings] = useState<MeetingRoom[]>([
    {
      id: "1",
      code: "UNSC-ARCTIC-2026",
      title: "UNSC: Situation in Arctic",
      topic: "Militarization & Navigation",
      type: "LIVE_COMMITTEE",
      googleMeetUrl: "https://meet.google.com/example-arctic",
    },
    {
      id: "2",
      code: "TRAIN-ROP-01",
      title: "THIMUN RoP Masterclass",
      topic: "Resolution Drafting",
      type: "TRAINING",
      googleMeetUrl: "https://meet.google.com/example-training",
    },
  ]);
  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingTopic, setNewMeetingTopic] = useState("");
  const [newMeetingUrl, setNewMeetingUrl] = useState("");
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
    if (!newMeetingTitle.trim() || !newMeetingUrl.trim()) return;
    try {
      const meetingUrl = new URL(newMeetingUrl.trim());
      if (meetingUrl.hostname !== "meet.google.com") return;
    } catch {
      return;
    }
    const generatedCode = `${newMeetingTitle.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, "MUN")}-${Math.floor(1000 + Math.random() * 9000)}`;
    setMeetings([
      {
        id: Date.now().toString(),
        code: generatedCode,
        title: newMeetingTitle.trim(),
        topic: newMeetingTopic.trim() || "General Debate",
        type: newMeetingType,
        googleMeetUrl: newMeetingUrl.trim(),
      },
      ...meetings,
    ]);
    setNewMeetingTitle("");
    setNewMeetingTopic("");
    setNewMeetingUrl("");
  };

  const copyMeetingLink = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${origin}/room/${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffEmail.trim() || newStaffPassword.length < 8) return;
    setStaffList([
      ...staffList,
      { id: Date.now().toString(), name: newStaffName.trim(), email: newStaffEmail.trim(), role: newStaffRole },
    ]);
    setNewStaffName("");
    setNewStaffEmail("");
    setNewStaffPassword("");
  };

  const handleDeleteStaff = (id: string) => {
    setStaffList(staffList.filter((staff) => staff.id !== id));
  };

  const handleAddCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCountry.trim()) return;
    setCountries([...countries, newCountry.trim()]);
    setNewCountry("");
  };

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-950 text-white px-5 py-4 flex items-center justify-between sticky top-0 z-40 shadow-lg shadow-slate-950/40 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center font-bold text-white text-base shadow-md shadow-slate-950/40">
            AD
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight">Master Secretariat</h1>
            <p className="text-xs text-slate-300">Admin • ID: 0001</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-slate-200">
          <button onClick={() => router.push("/admin/search")} aria-label="Search" className="p-2 hover:bg-slate-700 rounded-full transition">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => router.push("/admin/notifications")} aria-label="Notifications" className="p-2 hover:bg-slate-700 rounded-full transition relative">
            <Bell className="w-5 h-5" />
            <span className="w-2 h-2 bg-indigo-400 rounded-full absolute top-1.5 right-1.5" />
          </button>
          <Link href="/auth" className="p-2 hover:bg-slate-700 rounded-full transition text-rose-300">
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40 text-slate-50">
            <h2 className="text-xs uppercase font-bold tracking-[0.24em] text-slate-300 mb-4">
              Recently Used
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <button onClick={() => setActiveModal("MEETING")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <Video className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Live Meetings</span>
              </button>

              <button onClick={() => setActiveModal("STAFF")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <UserPlus className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Staff & EB</span>
              </button>

              <button onClick={() => setActiveModal("ROSTER")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Country Roster</span>
              </button>

              <button onClick={() => router.push("/admin/circulars")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Circulars</span>
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40 text-slate-50">
            <h2 className="text-xs uppercase font-bold tracking-[0.24em] text-slate-300 mb-4">
              Secretariat & Oversight
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <button onClick={() => router.push("/admin/awards")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Awards & Certs</span>
              </button>

              <button onClick={() => router.push("/admin/roll-call")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Roll Call List</span>
              </button>

              <button onClick={() => router.push("/admin/delegates")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Delegates (120)</span>
              </button>

              <button onClick={() => router.push("/admin/committees")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Committees</span>
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/40 text-slate-50">
            <h2 className="text-xs uppercase font-bold tracking-[0.24em] text-slate-300 mb-4">
              Communication & Broadcast
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <button onClick={() => router.push("/admin/broadcasts")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">Broadcast SMS</span>
              </button>

              <button onClick={() => router.push("/admin/rop-config")} className="group flex flex-col items-center rounded-2xl p-3 transition hover:bg-slate-800/80 cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 group-hover:bg-slate-700 transition shadow-inner shadow-slate-950/40">
                  <Settings className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-200 mt-2">RoP Config</span>
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20">
          <div className="bg-slate-900/90 border border-slate-700 rounded-3xl p-5 shadow-lg shadow-slate-950/40 space-y-3 text-slate-50">
            <h2 className="text-sm font-bold flex items-center space-x-2 text-white">
              <LinkIcon className="w-4 h-4 text-sky-300" />
              <span>Create Live Meeting Link</span>
            </h2>
            <p className="text-xs text-slate-300">
              Generate room codes for live committee sessions or workshops.
            </p>

            <form onSubmit={handleCreateMeeting} className="space-y-2">
              <input
                type="text"
                required
                value={newMeetingTitle}
                onChange={(e) => setNewMeetingTitle(e.target.value)}
                placeholder="Committee (e.g. UNSC Arctic)"
                className="w-full bg-slate-900/70 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
              />
              <input
                type="url"
                required
                value={newMeetingUrl}
                onChange={(e) => setNewMeetingUrl(e.target.value)}
                placeholder="https://meet.google.com/qru-wspg-nzr"
                pattern="https://meet\\.google\\.com/.*"
                className="w-full bg-slate-900/70 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
              />
              <input
                type="text"
                value={newMeetingTopic}
                onChange={(e) => setNewMeetingTopic(e.target.value)}
                placeholder="Agenda / Topic"
                className="w-full bg-slate-900/70 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
              />
              <select
                value={newMeetingType}
                onChange={(e) => setNewMeetingType(e.target.value as "LIVE_COMMITTEE" | "TRAINING")}
                className="w-full bg-slate-900/70 border border-slate-600 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              >
                <option value="LIVE_COMMITTEE">Live Committee Simulation</option>
                <option value="TRAINING">Training Workshop</option>
              </select>
              <button
                type="submit"
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl text-xs transition shadow-sm"
              >
                Generate Link
              </button>
            </form>
          </div>

          <div className="bg-slate-900/90 border border-slate-700 rounded-3xl p-4 shadow-lg shadow-slate-950/40 space-y-2.5 text-slate-50">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-300 block">
              Active Room Codes ({meetings.length})
            </span>

            {meetings.map((m) => (
              <div
                key={m.id}
                className="bg-slate-900/70 border border-slate-700 rounded-xl p-3 flex items-center justify-between"
              >
                <div className="space-y-0.5 pr-2">
                  <p className="text-xs font-semibold text-white">{m.title}</p>
                  <p className="text-[10px] font-mono text-slate-400">Code: {m.code}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => copyMeetingLink(m.code)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition"
                    title="Copy Link"
                  >
                    {copiedCode === m.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <Link
                    href={`/room/${m.code}`}
                    className="px-2.5 py-1 bg-slate-700 text-white rounded-lg text-xs font-medium hover:bg-slate-600 transition"
                  >
                    Join
                  </Link>
                  <a href={m.googleMeetUrl} target="_blank" rel="noreferrer" className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-500 transition">
                    Meet
                  </a>
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

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 p-5 shadow-2xl border border-slate-700">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Master Secretariat</p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {activeModal === "MEETING" ? "Live Meetings" : activeModal === "STAFF" ? "Staff & Executive Board" : "Country Roster"}
                </h2>
              </div>
              <button onClick={() => setActiveModal(null)} aria-label="Close panel" className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">Close</button>
            </div>

            {activeModal === "MEETING" && (
              <div className="space-y-4">
                <form onSubmit={(e) => { handleCreateMeeting(e); setActiveModal(null); }} className="space-y-2">
                  <input required value={newMeetingTitle} onChange={(e) => setNewMeetingTitle(e.target.value)} placeholder="Committee title" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-400" />
                  <input value={newMeetingTopic} onChange={(e) => setNewMeetingTopic(e.target.value)} placeholder="Agenda or topic" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-400" />
                  <input required type="url" value={newMeetingUrl} onChange={(e) => setNewMeetingUrl(e.target.value)} placeholder="https://meet.google.com/qru-wspg-nzr" pattern="https://meet\\.google\\.com/.*" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-400" />
                  <button type="submit" className="w-full rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-white hover:bg-sky-500">Create meeting</button>
                </form>
                <div className="space-y-2 border-t border-slate-700 pt-4">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between rounded-lg bg-slate-800 p-3">
                      <div><p className="text-sm font-semibold text-white">{meeting.title}</p><p className="font-mono text-xs text-slate-400">{meeting.code}</p></div>
                      <div className="flex gap-2"><Link onClick={() => setActiveModal(null)} href={`/room/${meeting.code}`} className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-white">Open room</Link><a href={meeting.googleMeetUrl} target="_blank" rel="noreferrer" className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white">Meet</a></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === "STAFF" && (
              <div className="space-y-4">
                <form onSubmit={handleAddStaff} className="grid gap-2 sm:grid-cols-2">
                  <input required value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} placeholder="Full name" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-400" />
                  <input required type="email" value={newStaffEmail} onChange={(e) => setNewStaffEmail(e.target.value)} placeholder="Email address" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-400" />
                  <input required minLength={8} type="password" value={newStaffPassword} onChange={(e) => setNewStaffPassword(e.target.value)} placeholder="Password (8+ characters)" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-400" />
                  <select value={newStaffRole} onChange={(e) => setNewStaffRole(e.target.value as "ADMIN" | "CHAIR")} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"><option value="CHAIR">Executive Board</option><option value="ADMIN">Administrator</option></select>
                  <button type="submit" className="rounded-lg bg-sky-600 py-2 text-sm font-semibold text-white hover:bg-sky-500">Add account</button>
                </form>
                <div className="space-y-2 border-t border-slate-700 pt-4">
                  {staffList.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between rounded-lg bg-slate-800 p-3">
                      <div><p className="text-sm font-semibold text-white">{staff.name}</p><p className="text-xs text-slate-400">{staff.email}</p></div>
                      <div className="flex items-center gap-3"><span className="text-xs font-bold text-sky-300">{staff.role}</span><button type="button" onClick={() => handleDeleteStaff(staff.id)} className="rounded-md p-1.5 text-rose-400 hover:bg-slate-700" aria-label={`Delete ${staff.name}`} title="Delete account"><Trash2 className="h-4 w-4" /></button></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModal === "ROSTER" && (
              <div className="space-y-4">
                <form onSubmit={handleAddCountry} className="flex gap-2"><input required value={newCountry} onChange={(e) => setNewCountry(e.target.value)} placeholder="Add country or delegation" className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-400" /><button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500">Add</button></form>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{countries.map((country) => <div key={country} className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-200">{country}</div>)}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
