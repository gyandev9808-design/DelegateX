"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  UserPlus,
  Link as LinkIcon,
  Copy,
  Check,
  Trash2,
  Video,
  Users,
  LogOut,
  Globe,
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
  createdAt: string;
}

export default function MasterAdminPanel() {
  const [activeTab, setActiveTab] = useState<"MEETINGS" | "STAFF" | "COUNTRIES">("MEETINGS");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 1. Staff State
  const [staffList, setStaffList] = useState<StaffAccount[]>([
    { id: "1", name: "Sarah Jenkins", email: "sarah.eb@delegatex.org", role: "CHAIR" },
    { id: "2", name: "David Kim", email: "david.sec@delegatex.org", role: "ADMIN" },
  ]);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffRole, setNewStaffRole] = useState<"ADMIN" | "CHAIR">("CHAIR");

  // 2. Meeting Link Generator State
  const [meetings, setMeetings] = useState<MeetingRoom[]>([
    {
      id: "1",
      code: "UNSC-ARCTIC-2026",
      title: "UNSC: The Situation in the Arctic",
      topic: "Militarization and Navigation Rights",
      type: "LIVE_COMMITTEE",
      createdAt: "Active",
    },
    {
      id: "2",
      code: "TRAIN-ROP-01",
      title: "THIMUN Rules of Procedure Workshop",
      topic: "Resolution Drafting Masterclass",
      type: "TRAINING",
      createdAt: "Active",
    },
  ]);
  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingTopic, setNewMeetingTopic] = useState("");
  const [newMeetingType, setNewMeetingType] = useState<"LIVE_COMMITTEE" | "TRAINING">("LIVE_COMMITTEE");

  // 3. Country Delegations State
  const [countries, setCountries] = useState<string[]>([
    "United States of America",
    "French Republic",
    "United Kingdom",
    "People's Republic of China",
    "Russian Federation",
  ]);
  const [newCountry, setNewCountry] = useState("");

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffEmail.trim()) return;
    setStaffList([
      ...staffList,
      {
        id: Date.now().toString(),
        name: newStaffName.trim(),
        email: newStaffEmail.trim(),
        role: newStaffRole,
      },
    ]);
    setNewStaffName("");
    setNewStaffEmail("");
  };

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
        createdAt: "Just now",
      },
      ...meetings,
    ]);
    setNewMeetingTitle("");
    setNewMeetingTopic("");
  };

  const copyMeetingLink = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const fullLink = `${origin}/room/${code}`;
    navigator.clipboard.writeText(fullLink);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-6">
        {/* Admin Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Master Secretariat Admin</h1>
              <p className="text-xs text-slate-400">
                Manage Staff, Generate Meeting Links, and Configure Rosters
              </p>
            </div>
          </div>
          <Link
            href="/auth"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 rounded-lg text-xs font-medium border border-slate-800 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 space-x-4">
          <button
            onClick={() => setActiveTab("MEETINGS")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 transition border-b-2 ${
              activeTab === "MEETINGS"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Live Meetings & Links ({meetings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("STAFF")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 transition border-b-2 ${
              activeTab === "STAFF"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Staff Accounts ({staffList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("COUNTRIES")}
            className={`pb-3 text-sm font-semibold flex items-center space-x-2 transition border-b-2 ${
              activeTab === "COUNTRIES"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Country Roster ({countries.length})</span>
          </button>
        </div>

        {/* TAB 1: MEETINGS */}
        {activeTab === "MEETINGS" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center space-x-2">
                <LinkIcon className="w-4 h-4 text-indigo-400" />
                <span>Create New Meeting Session</span>
              </h2>
              <form onSubmit={handleCreateMeeting} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  value={newMeetingTitle}
                  onChange={(e) => setNewMeetingTitle(e.target.value)}
                  placeholder="Committee / Workshop Title"
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  value={newMeetingTopic}
                  onChange={(e) => setNewMeetingTopic(e.target.value)}
                  placeholder="Agenda Topic"
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <div className="flex gap-2">
                  <select
                    value={newMeetingType}
                    onChange={(e) => setNewMeetingType(e.target.value as any)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="LIVE_COMMITTEE">Live Committee</option>
                    <option value="TRAINING">Training Workshop</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Generate
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-3">
              {meetings.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-semibold text-white text-sm">{m.title}</h4>
                    <p className="text-xs text-slate-400">{m.topic}</p>
                    <span className="font-mono text-xs text-indigo-300 mt-1 inline-block">
                      Room Code: {m.code}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 w-full md:w-auto">
                    <button
                      onClick={() => copyMeetingLink(m.code)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition"
                    >
                      {copiedCode === m.code ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedCode === m.code ? "Copied" : "Copy Link"}</span>
                    </button>
                    <Link
                      href={`/room/${m.code}`}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                    >
                      Enter
                    </Link>
                    <button
                      onClick={() => setMeetings(meetings.filter((item) => item.id !== m.id))}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded bg-slate-950 border border-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: STAFF */}
        {activeTab === "STAFF" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center space-x-2">
                <UserPlus className="w-4 h-4 text-indigo-400" />
                <span>Create Staff Account</span>
              </h2>
              <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  placeholder="Full Name"
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="email"
                  required
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  placeholder="chair@delegatex.org"
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <div className="flex gap-2">
                  <select
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value as any)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="CHAIR">Executive Board / Chair</option>
                    <option value="ADMIN">Secretariat Admin</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-2">
              {staffList.map((staff) => (
                <div
                  key={staff.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{staff.name}</p>
                    <p className="text-xs text-slate-400">{staff.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-indigo-300 font-mono">
                      {staff.role}
                    </span>
                    <button
                      onClick={() => setStaffList(staffList.filter((s) => s.id !== staff.id))}
                      className="p-1 text-slate-400 hover:text-rose-400 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COUNTRIES */}
        {activeTab === "COUNTRIES" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newCountry.trim()) return;
                  setCountries([...countries, newCountry.trim()]);
                  setNewCountry("");
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  placeholder="Add Country (e.g. Germany, Japan)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </form>

              <div className="space-y-2">
                {countries.map((country, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200"
                  >
                    <span>
                      {idx + 1}. {country}
                    </span>
                    <button
                      onClick={() => setCountries(countries.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
