import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Globe2, ShieldCheck, Sparkles, BookOpen, Users2, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pt-16">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[500px] h-[500px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation MUN Simulation Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-white">
          Empowering Next-Gen Diplomats on{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
            DelegateX
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          From intensive Rules of Procedure training to dynamic online committee sessions with real-time speaker timers, placard tracking, and customizable rosters.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
          <Link
            href="/committee"
            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25"
          >
            <span>Enter Committee Room</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/admin"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium rounded-xl transition flex items-center justify-center space-x-2"
          >
            <span>Secretariat Admin</span>
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 w-fit rounded-xl mb-4 border border-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Interactive Training</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Master UN4MUN, THIMUN, and HMUN procedures with guided caucus simulations and real-time speech clocks.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 w-fit rounded-xl mb-4 border border-cyan-500/20">
            <Users2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Real Committee Flow</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Raise placards, queue in the General Speakers List, yield time, and vote on substantive draft resolutions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col">
          <div className="p-3 bg-amber-500/10 text-amber-400 w-fit rounded-xl mb-4 border border-amber-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Admin Customization</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Secretariat dashboard to create custom committees, add/edit/reorder country delegations on the fly.
          </p>
        </div>
      </section>
    </div>
  );
}
