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
  const [role, setRole] = useState<"student" | "admin">("student");
  const [activeItem, setActiveItem] = useState<string>("Syllabus");

  const currentSections = role === "student" ? studentSections : adminSections;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* ============================================================ */}
      {/* PC ONLY: LEFT HAND MAIN CONTENT AREA */}
      {/* ============================================================ */}
      <div className="hidden lg:flex flex-1 flex-col p-8 bg-slate-50 border-r border-slate-200">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">DelegateX Workspace</h1>
            <p className="text-sm text-slate-500">
              Active Module: <span className="font-semibold text-indigo-600">{activeItem}</span>
            </p>
          </div>
          
          {/* Quick Role Switcher */}
          <div className="flex bg-slate-200 p-1 rounded-xl">
            <button
              onClick={() => setRole("student")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === "student" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === "admin" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Admin / EB View
            </button>
          </div>
        </div>

        {/* Content Preview Box */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{activeItem} Panel</h2>
          <p className="text-sm text-slate-500 max-w-md">
            You are viewing the details for {activeItem}. Use the mobile-style navigation on the right to navigate across features.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE DASHBOARD CONTAINER */}
      {/* (Full-screen on Mobile, Docked Right on PC) */}
      {/* ============================================================ */}
      <div className="w-full lg:w-[420px] lg:min-w-[420px] bg-white min-h-screen flex flex-col shadow-2xl">
        
        {/* Dark Blue Header */}
        <header className="bg-[#37474f] text-white px-5 pt-8 pb-5 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3.5">
            {/* User Avatar */}
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

        {/* Mobile View Role Switch Toggle (Visible on Small Screens) */}
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
