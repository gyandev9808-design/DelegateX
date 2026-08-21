import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BookOpen, CheckCircle2, FileText, Mic, Users, ArrowLeft } from "lucide-react";

export default function TrainingPage() {
  const modules = [
    {
      title: "1. Rules of Procedure (RoP) Fundamentals",
      desc: "Differences between UN4MUN, THIMUN, and North American Parliamentary procedure.",
      icon: BookOpen,
      duration: "15 min read",
    },
    {
      title: "2. Structuring Position Papers & Research",
      desc: "Country policy analysis, UN treaties citation, and policy-aligned solutions.",
      icon: FileText,
      duration: "20 min guide",
    },
    {
      title: "3. General Speakers List & Floor Strategy",
      desc: "Delivering impactful 90-second opening speeches and handling points of inquiry.",
      icon: Mic,
      duration: "10 min guide",
    },
    {
      title: "4. Moderated vs. Unmoderated Caucuses",
      desc: "Forming voting blocs, negotiating working papers, and leading informal consultations.",
      icon: Users,
      duration: "25 min simulation",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full space-y-8">
        <div className="flex items-center space-x-3">
          <Link href="/" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">DelegateX Training Academy</h1>
            <p className="text-xs text-slate-400">Essential resources and simulation guides for aspiring delegates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                    {m.duration}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{m.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
