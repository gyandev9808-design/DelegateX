import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, BookOpen } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pt-16">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[500px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Diplomacy & MUN Simulation on{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent">
              DelegateX
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Access specialized Model UN training modules or sign in to your delegate and secretariat accounts.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/training"
              className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Training Modules</span>
            </Link>
            <Link
              href="/auth"
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-medium rounded-xl transition flex items-center justify-center space-x-2"
            >
              <span>Sign In / Register</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
