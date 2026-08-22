"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  BookOpen,
  MessageSquare,
  FileText,
  Award,
  Calendar,
  Building,
  TrendingUp,
  GraduationCap,
  Mail,
  Image as ImageIcon,
  Tv,
  Video,
  Settings,
  ShieldCheck,
  Users,
  Vote,
  Gavel,
  Radio,
  Link as LinkIcon,
  Copy,
  Check,
  Plus,
  Shield,
  UserCheck,
} from "lucide-react";

// --- Menu Data Definitions ---
const studentSections = [
  {
    title: "RECENTLY USED",
    items: [
      { label: "Syllabus", icon: BookOpen },
      { label: "SMS History", icon: MessageSquare },
      { label: "Homework", icon: FileText },
      { label: "Circulars", icon: Radio },
    ],
  },
  {
    title: "ACADEMICS",
    items: [
      { label: "Achievements", icon: Award },
      { label: "Attendance", icon: Calendar },
      { label: "Homework", icon: FileText },
      { label: "Hostel Attendance", icon: Building },
      { label: "Performance", icon: TrendingUp },
      { label: "Remarks", icon: MessageSquare },
      { label: "Results", icon: GraduationCap },
      { label: "Syllabus", icon: BookOpen },
      { label: "Teacher diary", icon: Tv },
    ],
  },
  {
    title: "COMMUNICATION",
    items: [
      { label: "Apply Leaves", icon: FileText },
      { label: "Calendar", icon: Calendar },
      { label: "Circulars", icon: Radio },
      { label: "Image Gallery", icon: ImageIcon },
      { label: "Mail Box", icon: Mail },
      { label: "School News", icon: FileText },
      { label: "SMS History", icon: MessageSquare },
    ],
  },
  {
    title: "DIGITAL LEARNING",
    items: [
      { label: "Virtual Class", icon: Video },
      { label: "Recorded Lectures", icon: Tv },
      { label: "MUN Prep Hub", icon: BookOpen },
    ],
  },
];

const adminSections = [
  {
    title: "EXECUTIVE BOARD ACTIONS",
    items: [
      { label: "Roll Call", icon: Users },
      { label: "GSL Timer", icon: Gavel },
      { label: "Motions & Votes", icon: Vote },
      { label: "Chamber Directives", icon: ShieldCheck },
    ],
  },
  {
    title: "DELEGATION MANAGEMENT",
    items: [
      { label: "Delegate Roster", icon: Users },
      { label: "Country Allocations", icon: Building },
      { label: "Attendance Tracker", icon: Calendar },
      { label: "Crisis Updates", icon: Radio },
    ],
  },
  {
    title: "COMMUNICATION & SETTINGS",
    items: [
      { label: "Broadcast Message", icon: Mail },
      { label: "Notepasser Logs", icon: MessageSquare },
      { label: "Chamber Config", icon: Settings },
    ],
  },
];

export default function DelegateXDashboard() {
  const [role, setRole] = useState<"admin" | "student">("admin");
  const [activeItem, setActiveItem] = useState<string>("GSL Timer");

  // Meeting Link Generator States
  const [committeeName, setCommitteeName] = useState("UNSC - Session 1");
  const [generatedLink, setGeneratedLink] = useState("https://delegatex.vercel.app/room/unsc-8921");
  const [copied, setCopied] = useState(false);

  // Staff & Chair Accounts State
  const [chairs, setChairs] = useState([
    { name: "Aarav Sharma", role: "Head Chair (UNSC)", status: "Active" },
    { name: "Siddharth Rao", role: "Vice Chair (UNSC)", status: "Active" },
    { name: "Ananya Mehta", role: "Rapporteur", status: "In Session" },
  ]);

  const handleGenerateLink = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const slug = committeeName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    setGeneratedLink(`https://delegatex.vercel.app/room/${slug}-${randomId}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSections = role === "student" ? studentSections : adminSections;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      
      {/* ============================================================ */}
      {/* PC LEFT WORKSPACE: ADMIN TOP CARDS (MEETING LINK & STAFF ACC) */}
      {/* ============================================================ */}
      <div className="hidden lg:flex flex-1 flex-col p-6 space-y-6 overflow-y-auto max-h-screen">
        
        {/* Workspace Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">DelegateX Command Hub</h1>
            <p className="text-sm text-slate-500">Live MUN Operations & Administration</p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-slate-200 p-1 rounded-xl">
            <button
              onClick={() => setRole("admin")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === "admin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Admin / EB
            </button>
            <button
              onClick={() => setRole("student")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === "student" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Student / Delegate
            </button>
          </div>
        </div>

        {/* TOP ROW: MEETING LINK GENERATOR (LEFT) + STAFF & CHAIR ACCOUNTS (RIGHT) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* 1. MEETING LINK GENERATOR (TOP LEFT) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">Meeting Link Generator</h2>
                    <p className="text-xs text-slate-400">Generate live virtual chamber URLs</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-semibold rounded-full">
                  Instant WebRTC
                </span>
              </div>

              <div className="space-y-3 mt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Chamber / Committee</label>
                  <input
                    type="text"
                    value={committeeName}
                    onChange={(e) => setCommitteeName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Generated Access URL</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700 select-all"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium flex items-center space-x-1.5 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateLink}
              className="mt-5 w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Room Link</span>
            </button>
          </div>

          {/* 2. STAFF & CHAIR ACCOUNTS (TOP RIGHT) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">Staff & Chair Accounts</h2>
                    <p className="text-xs text-slate-400">Manage Executive Board and Secretariat</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {chairs.length} Active
                </span>
              </div>

              {/* Staff Roster List */}
              <div className="space-y-2.5 mt-2">
                {chairs.map((chair, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                        {chair.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{chair.name}</p>
                        <p className="text-[10px] text-slate-500">{chair.role}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full">
                      {chair.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition border border-slate-200">
              <UserCheck className="w-4 h-4 text-slate-500" />
              <span>Assign New Chair Account</span>
            </button>
          </div>
        </div>

        {/* BOTTOM ACTIVE PANEL PREVIEW */}
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
            <Gavel className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">{activeItem} Selected</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Choose features from the mobile panel on the right to manage your live committee or switch to student mode.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE DASHBOARD (EXACT SCREENSHOT LAYOUT) */}
      {/* (Docked on Right for PC, Full-Screen on Mobile) */}
      {/* ============================================================ */}
      <div className="w-full lg:w-[420px] lg:min-w-[420px] bg-white min-h-screen flex flex-col shadow-2xl">
        
        {/* Dark Blue-Grey Header */}
        <header className="bg-[#37474f] text-white px-5 pt-8 pb-5 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white/20 overflow-hidden flex items-center justify-center text-slate-700 font-bold text-lg">
              {role === "student" ? "VC" : "EB"}
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">
                {role === "student" ? "Vivaan Chawla" : "Executive Board"}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 font-medium">
                {role === "student" ? "VIII- G • 4606" : "UNSC Chamber Admin"}
              </p>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            <button className="p-1.5 hover:bg-white/10 rounded-full transition">
              <Search className="w-5 h-5 text-slate-200" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-full transition relative">
              <Bell className="w-5 h-5 text-slate-200" />
              <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1 border-2 border-[#37474f]"></span>
            </button>
          </div>
        </header>

        {/* Mobile View Role Switch Toggle (Visible on Mobile Screens) */}
        <div className="lg:hidden flex bg-slate-100 p-1 m-3 rounded-xl">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
              role === "student" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
              role === "admin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
            }`}
          >
            Admin / EB
          </button>
        </div>

        {/* Category Sections & Circular Icon Grid */}
        <div className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-slate-100">
          {currentSections.map((section, sIdx) => (
            <div key={sIdx} className="py-4 first:pt-1">
              <h3 className="text-[11px] font-bold tracking-wider text-slate-800 uppercase mb-4 px-1">
                {section.title}
              </h3>

              {/* 4-Column Icon Grid */}
              <div className="grid grid-cols-4 gap-y-5 gap-x-2">
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  const isSelected = activeItem === item.label;

                  return (
                    <button
                      key={iIdx}
                      onClick={() => setActiveItem(item.label)}
                      className="flex flex-col items-center text-center group focus:outline-none"
                    >
                      {/* Circular Button Container */}
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition shadow-sm ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-indigo-200"
                            : "bg-[#eef2f5] text-[#455a64] group-hover:bg-slate-200"
                        }`}
                      >
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                      </div>

                      {/* Icon Label */}
                      <span className="text-[11px] font-medium text-slate-700 mt-2 leading-tight px-1 line-clamp-2">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
