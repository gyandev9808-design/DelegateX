"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  UserPlus, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Video, 
  Users, 
  LogOut,
  Calendar
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
  const [activeTab, setActiveTab] = useState<"MEETINGS" | "STAFF">("MEETINGS");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // 1. Staff Management State (Master admin creates other admins/EBs)
  const [staffList, setStaffList] = useState<StaffAccount[]>([
    { id: "1", name: "Sarah Jenkins", email: "sarah.eb@delegatex.org", role: "CHAIR" },
    { id: "2", name: "David Kim", email: "david.sec@delegatex.org", role: "ADMIN" },
  ]);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffRole, setNewStaffRole] = useState<"ADMIN" | "CHAIR">("CHAIR");

  // 2. Meeting & Link Generator State
  const [meetings, setMeetings] = useState<MeetingRoom[]>([
    {
      id: "1",
      code: "UNSC-ARCTIC-2026",
      title: "UNSC: The Situation in the Arctic",
      topic: "Militarization and Navigation Rights",
      type: "LIVE_COMMITTEE",
      createdAt: "Today",
    },
    {
      id: "2",
      code: "TRAIN-ROP-01",
      title: "THIMUN Rules of Procedure Workshop",
      topic: "Resolution Drafting Masterclass",
      type: "TRAINING",
      createdAt: "Today",
    },
  ]);

  const [newMeetingTitle, setNewMeetingTitle] = useState("");
  const [newMeetingTopic, setNewMeetingTopic] = useState("");
  const [newMeetingType, setNewMeetingType] = useState<"LIVE_COMMITTEE" | "TRAINING">("LIVE_COMMITTEE");

  // Add Staff Account
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

  const handleDeleteStaff = (id: string) => {
    setStaffList(staffList.filter((s) => s.id !== id));
  };

  // Generate New Meeting Session & Link
  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingTitle.trim()) return;

    const generatedCode = `${newMeetingTitle.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, "MUN")}-${Math.floor(1000 + Math.random() * 9000)}`;

    setMeetings([
      {
        id: Date.now().toString(),
        code: generatedCode,
        title: newMeetingTitle.trim(),
        topic: newMeetingTopic.trim() || "General Session",
        type: newMeetingType,
        createdAt: "Just now",
      },
      ...meetings,
    ]);

    setNewMeetingTitle("");
    setNewMeetingTopic("");
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings(meetings.filter((m) => m.id !== id));
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

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Master Secretariat Admin</h1>
              <p className="text-xs text-slate-400">Manage Staff Accounts and Generate Committee / Workshop Links</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-800 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Admin</span>
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
            <span>Meeting Link Generator ({meetings.length})</span>
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
            <span>Staff & Chair Accounts ({staffList.length})</span>
          </button>
        </div>

        {/* TAB 1: MEETING LINK GENERATOR */}
        {activeTab === "MEETINGS" && (
          <div className="space-y-6">
            {/* Create Meeting Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center space-x-2">
                <LinkIcon className="w-4 h-4 text-indigo-400" />
                <span>Create New Live Meeting Session</span>
              </h2>

              <form onSubmit={handleCreateMeeting} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Session Title / Committee</label>
                  <input
                    type="text"
                    required
                    value={newMeetingTitle}
                    onChange={(e) => setNewMeetingTitle(e.target.value)}
                    placeholder="e.g. UNGA DISEC or Crisis Workshop"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Agenda / Topic</label>
                  <input
                    type="text"
                    value={newMeetingTopic}
                    onChange={(e) => setNewMeetingTopic(e.target.value)}
                    placeholder="e.g. Autonomous Weapons Systems"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Session Type</label>
                  <div className="flex gap-2">
                    <select
                      value={newMeetingType}
                      onChange={(e) => setNewMeetingType(e.target.value as any)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="LIVE_COMMITTEE">Live Committee Simulation</option>
                      <option value="TRAINING">Training / Workshop</option>
                    </select>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Generated Meetings List */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400">Active Generated Links</h3>
              {meetings.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-semibold">
                        {m.type === "LIVE_COMMITTEE" ? "Committee" : "Training"}
                      </span>
                      <h4 className="font-semibold text-white text-sm">{m.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400">{m.topic}</p>
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-xs text-slate-500 font-mono">Room Code:</span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800">
                        {m.code}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 w-full md:w-auto">
                    <button
                      onClick={() => copyMeetingLink(m.code)}
                      className="flex-1 md:flex-none flex items-center justify-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
                    >
                      {copiedCode === m.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === m.code ? "Link Copied!" : "Copy Invite Link"}</span>
                    </button>
                    <Link
                      href={`/room/${m.code}`}
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                    >
                      Enter Room
                    </Link>
                    <button
                      onClick={() => handleDeleteMeeting(m.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 rounded-lg bg-slate-950 border border-slate-800"
                      title="Delete Session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: STAFF & CHAIR ACCOUNTS */}
        {activeTab === "STAFF" && (
          <div className="space-y-6">
            {/* Create Staff Account Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-semibold text-white mb-4 flex items-center space-x-2">
                <UserPlus className="w-4 h-4 text-indigo-400" />
                <span>Create New Staff Account</span>
              </h2>

              <form onSubmit={handleAddStaff} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newStaffEmail}
                    onChange={(e) => setNewStaffEmail(e.target.value)}
                    placeholder="chair@delegatex.org"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Assigned Role</label>
                  <div className="flex gap-2">
                    <select
                      value={newStaffRole}
                      onChange={(e) => setNewStaffRole(e.target.value as any)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="CHAIR">Executive Board / Chair</option>
                      <option value="ADMIN">Secretariat / Admin</option>
                    </select>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Staff Accounts List */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400">Created Staff & Chairs</h3>
              {staffList.map((staff) => (
                <div
                  key={staff.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                      {staff.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{staff.name}</p>
                      <p className="text-xs text-slate-400">{staff.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-indigo-300 font-mono">
                      {staff.role}
                    </span>
                    <button
                      onClick={() => handleDeleteStaff(staff.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded bg-slate-950 border border-slate-800"
                      title="Remove Account"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
