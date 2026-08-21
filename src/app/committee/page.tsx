"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mic, Hand, Play, Pause, RotateCcw, Plus, Shield, ArrowLeft } from "lucide-react";

export default function CommitteeLiveRoom() {
  const [speechTime, setSpeechTime] = useState(90);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isRunning, setIsRunning] = useState(false);

  // Dynamic speaker queue
  const [speakersList, setSpeakersList] = useState<string[]>([
    "United States of America",
    "French Republic",
    "United Kingdom",
  ]);
  const [newCountry, setNewCountry] = useState("");
  const [placardRaised, setPlacardRaised] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(speechTime);
  };

  const nextSpeaker = () => {
    setSpeakersList((prev) => prev.slice(1));
    resetTimer();
  };

  const addSpeaker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCountry.trim()) return;
    setSpeakersList([...speakersList, newCountry.trim()]);
    setNewCountry("");
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-semibold rounded">
            UNSC
          </div>
          <h1 className="font-semibold text-sm sm:text-base">Security Council: Arctic Security</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/admin"
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 transition"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Admin Roster</span>
          </Link>
          <button
            onClick={() => setPlacardRaised(!placardRaised)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              placardRaised
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
          >
            <Hand className="w-4 h-4" />
            <span>{placardRaised ? "Placard Raised" : "Raise Placard"}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2">Current Speaker Floor</span>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {speakersList[0] || "General Speakers List Exhausted"}
            </h2>

            <div className="text-7xl font-mono font-bold tracking-tight text-indigo-400 my-4">
              {formatTime(timeLeft)}
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={toggleTimer}
                className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition shadow-lg shadow-indigo-600/30"
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              <button
                onClick={nextSpeaker}
                disabled={speakersList.length === 0}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-full text-sm font-medium transition"
              >
                Yield / Next Speaker
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Motion</span>
              <p className="text-sm font-semibold mt-1">Moderated Caucus</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Active Quorum</span>
              <p className="text-sm font-semibold mt-1">15 Delegations</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Majority Needed</span>
              <p className="text-sm font-semibold mt-1">9 Votes (Simple)</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-indigo-400" />
              <h3 className="font-semibold text-white">Speakers List (GSL)</h3>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              {speakersList.length} queued
            </span>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto max-h-[380px] pr-1">
            {speakersList.map((country, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg text-sm border ${
                  idx === 0
                    ? "bg-indigo-950/40 border-indigo-500/40 text-indigo-200"
                    : "bg-slate-950 border-slate-800/80 text-slate-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs opacity-50">{idx + 1}.</span>
                  <span>{country}</span>
                </div>
                {idx === 0 && <span className="text-xs font-semibold text-indigo-400">On Floor</span>}
              </div>
            ))}
          </div>

          <form onSubmit={addSpeaker} className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Add Country to queue..."
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
