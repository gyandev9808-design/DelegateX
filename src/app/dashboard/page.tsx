"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, CalendarDays, Check, CheckCircle2, FileText, FolderOpen, GraduationCap, LogOut, Menu, Mic2, Moon, Play, Search, Sparkles, Trophy, Users, Video, X } from "lucide-react";

const subjects = [
  ["Policy Research", "Sources & country position", "100%", "bg-cyan-300", "text-cyan-300"],
  ["Speech Delivery", "Opening speeches & GSL", "60%", "bg-emerald-300", "text-emerald-300"],
  ["Procedure", "Motions & caucuses", "20%", "bg-violet-300", "text-violet-300"],
  ["Negotiation", "Alliances & resolutions", "70%", "bg-cyan-400", "text-cyan-400"],
];

export default function DelegateDashboard() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusItems, setFocusItems] = useState([false, false, false]);

  const joinSession = (event: React.FormEvent) => {
    event.preventDefault();
    if (roomCode.trim()) router.push(`/room/${roomCode.trim().toUpperCase()}`);
  };

  const toggleFocus = (index: number) => setFocusItems((items) => items.map((done, itemIndex) => itemIndex === index ? !done : done));

  return (
    <div className="delegate-dashboard min-h-screen bg-[#0f131c] text-[#dfe2ef] selection:bg-cyan-300 selection:text-slate-950">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#0f131c]/90 px-5 backdrop-blur-xl md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-extrabold text-cyan-300"><GraduationCap className="h-6 w-6" />Delegate<span className="text-emerald-300">X</span></Link>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" className="text-slate-300">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <aside className={`${menuOpen ? "flex" : "hidden"} fixed inset-0 z-40 w-64 flex-col border-r border-white/10 bg-[#181b25] p-4 pt-24 md:flex`}>
        <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-300 shadow-lg shadow-cyan-500/20"><GraduationCap className="h-6 w-6" /></div><div><p className="text-2xl font-extrabold text-cyan-300">DelegateX</p><p className="text-xs text-slate-500">Delegate workspace</p></div></Link>
        <nav className="mt-2 space-y-1"><Link href="/committee" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/15"><Users className="h-4 w-4" />MUNs</Link></nav>
        <div className="mt-auto border-t border-white/10 pt-4"><div className="flex items-center gap-3 px-3 py-2"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/10 font-bold text-cyan-300">DX</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-white">Delegate</p><p className="truncate text-xs text-slate-500">MUN Delegate · Active</p></div></div><div className="mt-2 flex justify-between px-3 text-slate-500"><button aria-label="Dark mode" className="rounded-lg p-2 hover:bg-white/5 hover:text-cyan-300"><Moon className="h-4 w-4" /></button><Link href="/auth" aria-label="Sign out" className="rounded-lg p-2 hover:bg-white/5 hover:text-rose-300"><LogOut className="h-4 w-4" /></Link></div></div>
      </aside>

      <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(ellipse_at_top_right,rgba(49,49,192,.18),transparent_35%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,.08),transparent_32%)] px-4 pb-12 pt-24 sm:px-6 md:ml-64 md:px-12 md:pt-10">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Your delegate command center</p><h1 className="text-3xl font-bold text-white sm:text-4xl">Welcome back, <span className="text-cyan-300">Delegate</span></h1><p className="mt-2 text-slate-400">Ready to make your country&apos;s case?</p></div><div className="flex gap-3"><button onClick={() => router.push("/training")} className="flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200"><Sparkles className="h-4 w-4" />Build country brief</button><button aria-label="Search dashboard" className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-400 hover:text-cyan-300"><Search className="h-4 w-4" /></button></div></div>
          <section><SectionTitle icon={<BookOpen />} title="Subject mastery" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{subjects.map(([subject, detail, progress, bar, color]) => <div key={subject} className="rounded-xl border border-white/10 bg-white/[.035] p-5 transition hover:-translate-y-1 hover:border-cyan-300/30"><div className="mb-5 flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 ${color}`}><BookOpen className="h-5 w-5" /></div><span className={`rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-bold ${color}`}>{progress}</span></div><h3 className="font-semibold text-white">{subject}</h3><p className="mt-1 text-xs text-slate-500">{detail}</p><div className="mt-5 h-1.5 rounded-full bg-slate-800"><div className={`h-full rounded-full ${bar}`} style={{ width: progress }} /></div></div>)}</div></section>
          <div className="grid gap-5 lg:grid-cols-12"><section className="rounded-2xl border border-white/10 bg-white/[.035] p-6 lg:col-span-4"><SectionTitle icon={<FileText />} title="Syllabus tracker" /><div className="space-y-6 border-l-2 border-cyan-300/50 pl-5"><Tracker title="Country policy" meta="Research · Completed" done /><Tracker title="Moderated caucus" meta="Procedure · In progress (45%)" active /><Tracker title="Draft resolution" meta="Negotiation · Up next" /></div><button className="mt-6 w-full rounded-lg border border-white/10 py-2.5 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-white">View full syllabus</button></section><section className="rounded-2xl border border-white/10 bg-white/[.035] p-6 lg:col-span-5"><SectionTitle icon={<CheckCircle2 />} title="Daily focus" /><div className="space-y-3">{["Review country policy brief", "practice moderated caucus", "prepare opening speech"].map((item, index) => <label key={item} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${focusItems[index] ? "border-emerald-300/30 bg-emerald-300/10" : index === 1 ? "border-cyan-300/30 bg-cyan-300/5" : "border-white/10 bg-white/[.025]"}`}><input type="checkbox" checked={focusItems[index]} onChange={() => toggleFocus(index)} className="mt-1 accent-cyan-300" /><span className="flex-1 text-sm text-slate-200"><span className={focusItems[index] ? "line-through opacity-60" : ""}>{item}</span><span className="mt-1 block text-xs text-slate-500">{index === 0 ? "Research complete · Earned 50 influence" : index === 1 ? "+150 influence · Due today" : "Recommended delegate task"}</span></span></label>)}</div></section><section className="space-y-5 lg:col-span-3"><div className="rounded-2xl border border-white/10 bg-white/[.035] p-6"><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300"><span className="h-2 w-2 animate-pulse rounded-full bg-rose-300" />Live now</div><h3 className="font-bold text-white">Opening speech workshop</h3><p className="mt-1 text-xs text-slate-500">Join 42 other delegates</p><button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"><Video className="h-4 w-4" />Join session</button></div><div className="rounded-2xl border border-white/10 bg-white/[.035] p-6"><SectionTitle icon={<Trophy />} title="Global rank" /><div className="space-y-3">{[["1", "Alex M.", "15.2k"], ["2", "You", "14.3k"], ["3", "Sarah K.", "13.8k"]].map(([rank, name, points]) => <div key={rank} className={`flex items-center justify-between rounded-lg p-2 text-sm ${rank === "2" ? "border border-cyan-300/20 bg-cyan-300/10" : "bg-white/[.025]"}`}><span className="flex items-center gap-2"><span className="w-3 text-xs text-slate-500">{rank}</span><span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300/10 text-xs font-bold text-cyan-300">{name[0]}</span><span className={rank === "2" ? "font-bold text-cyan-300" : "text-slate-300"}>{name}</span></span><span className="text-xs text-slate-400">{points}</span></div>)}</div></div></section></div>
          <div className="grid gap-5 lg:grid-cols-12"><section className="lg:col-span-12"><SectionTitle icon={<Sparkles />} title="Quick actions" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[[Trophy, "Motion practice"], [CalendarDays, "Conference plan"], [Mic2, "Speech coach"], [FolderOpen, "Brief library"]].map(([Icon, label]) => { const ActionIcon = Icon as typeof Trophy; return <button key={label as string} onClick={() => router.push("/training")} className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[.035] p-5 text-center transition hover:border-cyan-300/30 hover:bg-white/[.07]"><ActionIcon className="mb-3 h-7 w-7 text-cyan-300" /><span className="text-sm font-semibold text-white">{label as string}</span></button>; })}</div></section></div>
          <section className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[.04] p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Join a live committee</p><h2 className="mt-2 text-xl font-bold text-white">Have a room code? Enter the floor.</h2></div><form onSubmit={joinSession} className="flex w-full gap-2 sm:w-auto"><input value={roomCode} onChange={(event) => setRoomCode(event.target.value)} placeholder="UNSC-ARCTIC-2026" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-300 sm:w-52" /><button className="rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"><Play className="h-4 w-4" /></button></form></div></section>
        </div>
      </main>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-200"><span className="text-cyan-300">{icon}</span>{title}</h2>;
}

function Badge({ icon, label, tone, muted }: { icon: ReactNode; label: string; tone?: string; muted?: boolean }) {
  return <span className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${muted ? "border-white/10 text-slate-600" : tone === "emerald" ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-300" : "border-cyan-300/20 bg-cyan-300/10 text-cyan-300"}`}>{icon}<span>{label}</span></span>;
}

function Tracker({ title, meta, done, active }: { title: string; meta: string; done?: boolean; active?: boolean }) {
  return <div className="relative"><span className={`absolute -left-[27px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 ${done ? "border-cyan-300 bg-cyan-300 text-slate-950" : active ? "border-cyan-300 bg-[#0f131c]" : "border-slate-700 bg-[#0f131c]"}`}>{done && <Check className="h-2.5 w-2.5" />}</span><p className="text-sm font-semibold text-white">{title}</p><p className={`mt-1 text-xs ${active ? "text-cyan-300" : "text-slate-500"}`}>{meta}</p>{active && <div className="mt-3 h-1.5 rounded-full bg-slate-800"><div className="h-full w-[45%] rounded-full bg-cyan-300" /></div>}</div>;
}
