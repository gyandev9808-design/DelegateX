import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Globe2,
  Landmark,
  MessageSquareText,
  Mic2,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  [BookOpen, "Committee Briefs", "Fast, focused research packs for every agenda and country assignment."],
  [MessageSquareText, "Speech Coach", "Sharpen your opening speeches, moderated caucuses, and points of information."],
  [CalendarDays, "Conference Planner", "Build a clear preparation plan around your next conference and deadlines."],
  [ShieldCheck, "Evidence First", "Keep sources, policy positions, and talking points organized and traceable."],
  [Users, "Live Committees", "Join realistic committee rooms built for practice, feedback, and confident debate."],
  [Award, "Delegate Progress", "Track the skills that matter, from research depth to diplomatic delivery."],
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#080d18] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      <header className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-slate-950/65 px-5 py-3 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:px-7">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-cyan-300">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10"><Globe2 className="h-5 w-5" /></span>
          Delegate<span className="text-emerald-300">X</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
          <a className="border-b-2 border-cyan-300 pb-1 font-semibold text-cyan-300" href="#briefs">Committee Briefs</a>
          <a className="transition hover:text-cyan-300" href="#features">Delegate Toolkit</a>
          <a className="transition hover:text-cyan-300" href="#workflow">How It Works</a>
        </nav>
        <Link href="/auth" className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 sm:px-6">Enter DelegateX</Link>
      </header>

      <main>
        <section id="briefs" className="relative flex min-h-screen items-center px-5 pb-20 pt-36 sm:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_25%,rgba(6,182,212,.16),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,.09),transparent_30%)]" />
          <div className="absolute inset-x-0 top-0 -z-10 h-[58%] bg-[linear-gradient(rgba(76,215,246,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(76,215,246,.045)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="mx-auto w-full max-w-6xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-emerald-300">The delegate operating system</p>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">Prepare with purpose. <span className="text-cyan-300 [text-shadow:0_0_24px_rgba(34,211,238,.45)]">Debate with confidence.</span></h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">Research smarter, practise diplomacy, and walk into every MUN committee ready to make your country&apos;s case.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/training" className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-7 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-200 sm:w-auto"><Sparkles className="h-4 w-4" /> Build my brief</Link>
              <Link href="/auth" className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:bg-white/10 sm:w-auto">Explore DelegateX <ArrowRight className="h-4 w-4" /></Link>
            </div>

            <div className="relative mx-auto mt-20 h-[390px] max-w-5xl sm:h-[460px] [perspective:1200px]">
              <div className="absolute left-1/2 top-1/2 w-[min(88vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-slate-900/80 p-4 text-left shadow-2xl shadow-cyan-950/50 backdrop-blur-xl sm:p-7 [transform:rotateX(8deg)]">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4"><div className="flex items-center gap-3"><div className="rounded-lg bg-cyan-300/15 p-2 text-cyan-300"><Landmark className="h-5 w-5" /></div><div><p className="font-bold text-white">Security Council</p><p className="text-xs text-slate-500">UNSC · Emergency session</p></div></div><span className="rounded-full bg-emerald-300/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">Brief ready</span></div>
                <div className="grid gap-4 md:grid-cols-[1.15fr_.85fr]"><div className="rounded-lg border border-white/10 bg-slate-950/60 p-4"><p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-cyan-300">Your country brief · France</p><h2 className="text-lg font-bold text-white">The protection of critical infrastructure in conflict zones</h2><div className="mt-5 space-y-3"><div className="h-2 w-full rounded bg-slate-800"><div className="h-full w-[82%] rounded bg-cyan-300" /></div><div className="flex justify-between text-xs text-slate-500"><span>Research progress</span><span className="text-cyan-300">82%</span></div><div className="flex flex-wrap gap-2 pt-2"><span className="rounded border border-white/10 px-2 py-1 text-xs text-slate-400">Policy stance</span><span className="rounded border border-white/10 px-2 py-1 text-xs text-slate-400">Key allies</span><span className="rounded border border-white/10 px-2 py-1 text-xs text-slate-400">Evidence</span></div></div></div><div className="rounded-lg border border-white/10 bg-slate-950/60 p-4"><div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white"><Mic2 className="h-4 w-4 text-emerald-300" /> Speech rehearsal</div><div className="mb-4 flex h-20 items-center justify-center rounded-lg bg-emerald-300/10"><button aria-label="Play speech rehearsal" className="rounded-full bg-emerald-300 p-3 text-slate-950 transition hover:scale-105"><Play className="h-4 w-4 fill-current" /></button></div><p className="text-xs leading-5 text-slate-500">&quot;France believes multilateral action is the foundation of lasting security...&quot;</p><div className="mt-4 flex items-center justify-between text-xs"><span className="text-slate-500">Delivery score</span><span className="font-bold text-emerald-300">9.2 / 10</span></div></div></div>
              </div>
              <div className="absolute -left-2 top-20 hidden w-52 -rotate-6 rounded-xl border border-white/10 bg-slate-900/85 p-4 text-left shadow-xl backdrop-blur-lg sm:block"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Next session</p><p className="mt-2 font-bold text-white">Opening speeches</p><p className="mt-1 text-xs text-emerald-300">Today · 7:30 PM</p></div>
              <div className="absolute -right-2 bottom-4 hidden w-56 rotate-6 rounded-xl border border-white/10 bg-slate-900/85 p-4 text-left shadow-xl backdrop-blur-lg sm:block"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Delegate insight</p><p className="mt-2 text-sm leading-5 text-slate-200">Lead with your evidence, then invite the room in.</p></div>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-white/10 px-5 py-24 sm:px-8"><div className="mx-auto max-w-6xl"><div className="mb-14 max-w-xl"><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">One focused workspace</p><h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything you need to become the delegate people remember.</h2></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon, title, description]) => { const FeatureIcon = Icon as typeof BookOpen; return <div key={title as string} className="group rounded-xl border border-white/10 bg-white/[.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[.06]"><div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-300"><FeatureIcon className="h-5 w-5" /></div><h3 className="mb-2 font-bold text-white">{title as string}</h3><p className="text-sm leading-6 text-slate-400">{description as string}</p></div>; })}</div></div></section>

        <section id="workflow" className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-8"><div className="mx-auto max-w-6xl"><div className="mb-14 text-center"><h2 className="text-3xl font-bold text-white sm:text-4xl">From blank page to opening speech.</h2><p className="mt-4 text-slate-400">A sharper preparation loop in three deliberate steps.</p></div><div className="grid gap-5 md:grid-cols-3">{[["01", "Choose your committee", "Pick your conference, committee, country, and agenda.", Landmark], ["02", "Build your position", "Turn reliable research into a clear, defensible policy line.", BookOpen], ["03", "Practise the room", "Rehearse your delivery and join a simulation built for growth.", Mic2]].map(([number, title, description, Icon]) => { const StepIcon = Icon as typeof BookOpen; return <div key={number as string} className="relative rounded-xl border border-white/10 bg-[#0c1422] p-7"><span className="text-5xl font-black text-cyan-300/20">{number as string}</span><StepIcon className="absolute right-7 top-7 h-5 w-5 text-emerald-300" /><h3 className="mt-8 font-bold text-white">{title as string}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description as string}</p></div>; })}</div></div></section>

        <section className="border-t border-white/10 bg-slate-900/30 px-5 py-24 sm:px-8"><div className="mx-auto max-w-3xl text-center"><p className="text-xl font-medium leading-9 text-slate-200 sm:text-2xl">&quot;DelegateX made my preparation feel less like endless tabs and more like an actual strategy. I walked into committee knowing exactly what I wanted to achieve.&quot;</p><div className="mt-8 flex items-center justify-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300/15 font-bold text-emerald-300">A</span><div className="text-left"><p className="font-bold text-white">Ananya R.</p><p className="text-sm text-slate-500">Best Delegate · Class 11</p></div></div></div></section>
      </main>

      <footer className="border-t border-white/10 bg-[#050912] px-5 py-12 sm:px-8"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 md:flex-row"><Link href="/" className="flex items-center gap-2 text-lg font-bold text-cyan-300"><Globe2 className="h-5 w-5" /> Delegate<span className="text-emerald-300">X</span></Link><div className="flex flex-wrap justify-center gap-5 text-sm text-slate-500"><Link className="hover:text-cyan-300" href="/training">Training</Link><Link className="hover:text-cyan-300" href="/committee">Committees</Link><Link className="hover:text-cyan-300" href="/auth">Sign in</Link><a className="hover:text-cyan-300" href="mailto:support@delegatex.app">Support</a></div><p className="text-xs text-slate-600">© 2026 DelegateX</p></div></footer>
    </div>
  );
}
