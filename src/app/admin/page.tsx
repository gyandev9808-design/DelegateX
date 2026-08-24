"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  Gauge,
  LogOut,
  Mail,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: Gauge, active: true },
  { label: "Rooms", icon: Video },
  { label: "Members", icon: Users },
  { label: "Committees", icon: Building2 },
  { label: "Messages", icon: Mail },
  { label: "Settings", icon: Settings },
];

const stats = [
  { label: "Active rooms", value: "18", delta: "+4 this week", tone: "cyan" },
  { label: "Delegates", value: "1,284", delta: "+96 today", tone: "emerald" },
  { label: "Committee tasks", value: "42", delta: "8 due soon", tone: "violet" },
  { label: "Attendance", value: "92%", delta: "+6% vs target", tone: "amber" },
];

const rooms = [
  { code: "UNSC-ARCTIC-2026", title: "UNSC | Arctic Security", status: "Live", people: 32 },
  { code: "SOCHUM-204", title: "SOCHUM | Migration", status: "Queued", people: 18 },
  { code: "TRAIN-ROP-01", title: "RoP Training Lab", status: "Open", people: 48 },
];

const staff = [
  { name: "Sarah Jenkins", role: "Chair", email: "sarah@delegatex.org" },
  { name: "David Kim", role: "Admin", email: "david@delegatex.org" },
  { name: "Aisha Rahman", role: "Operations", email: "aisha@delegatex.org" },
];

const alerts = [
  { title: "Roll-call verification", detail: "3 delegates need final attendance confirmation." },
  { title: "Training workshop", detail: "Drafting clinic starts in 45 minutes." },
  { title: "New briefing note", detail: "Climate crisis update was added to the secretariat feed." },
];

const actions = [
  { label: "Create room", icon: Plus },
  { label: "Add delegate", icon: Users },
  { label: "Send notice", icon: Mail },
  { label: "Open brief", icon: FileText },
];

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ef]">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-[#121923] p-6 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/15 text-xl font-black text-cyan-300">
              DX
            </div>
            <div>
              <p className="text-xl font-extrabold text-white">DelegateX</p>
              <p className="text-xs text-slate-400">Admin command</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                onClick={() => router.push(label === "Overview" ? "/admin" : "/admin")}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active ? "border border-cyan-400/30 bg-cyan-300/10 text-cyan-300" : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-bold text-cyan-300">
                AD
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">Alicia Daniels</p>
                <p className="truncate text-xs text-slate-500">Secretary General</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-slate-300">
              <button aria-label="Notifications" className="rounded-xl p-2 hover:bg-white/5 hover:text-cyan-300">
                <Bell className="h-4 w-4" />
              </button>
              <Link href="/auth" aria-label="Sign out" className="rounded-xl p-2 hover:bg-white/5 hover:text-rose-300">
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Admin dashboard</p>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Welcome back, Alicia</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 sm:flex hover:border-cyan-300/40 hover:text-cyan-300">
                <Search className="h-4 w-4" />
                Search
              </button>
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200"
              >
                <Sparkles className="h-4 w-4" />
                New action
              </button>
            </div>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ label, value, delta, tone }) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                      tone === "cyan"
                        ? "bg-cyan-300/10 text-cyan-300"
                        : tone === "emerald"
                          ? "bg-emerald-300/10 text-emerald-300"
                          : tone === "violet"
                            ? "bg-violet-300/10 text-violet-300"
                            : "bg-amber-300/10 text-amber-300"
                    }`}
                  >
                    {delta}
                  </span>
                </div>
                <div className="text-3xl font-black text-white">{value}</div>
              </div>
            ))}
          </section>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200">
                  <CalendarDays className="h-4 w-4 text-cyan-300" />
                  <h2 className="text-lg font-bold text-white">Upcoming sessions</h2>
                </div>
                <button className="flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200">
                  View all
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {rooms.map((room) => (
                  <div key={room.code} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#111827]/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-white">{room.title}</p>
                        <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          {room.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">Room code: {room.code}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1.5">
                        <Users className="h-3.5 w-3.5 text-cyan-300" />
                        {room.people}
                      </span>
                      <button className="rounded-full bg-cyan-300 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-200">
                        Open
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center gap-2 text-slate-200">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                <h2 className="text-lg font-bold text-white">Quick actions</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {actions.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => router.push("/admin")}
                    className="flex min-h-[110px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111827]/60 p-4 text-center transition hover:border-cyan-300/30 hover:bg-cyan-300/5"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-200">{label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200">
                  <TrendingUp className="h-4 w-4 text-cyan-300" />
                  <h2 className="text-lg font-bold text-white">Team overview</h2>
                </div>
                <button className="text-sm font-medium text-cyan-300 hover:text-cyan-200">Manage</button>
              </div>

              <div className="space-y-3">
                {staff.map((member) => (
                  <div key={member.email} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#111827]/60 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10 text-sm font-bold text-cyan-300">
                        {member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{member.email}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="mb-5 flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                <h2 className="text-lg font-bold text-white">Secretariat alerts</h2>
              </div>

              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.title} className="rounded-2xl border border-white/10 bg-[#111827]/60 p-4">
                    <p className="text-sm font-semibold text-white">{alert.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{alert.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
