"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Mic, Hand, Play, Pause, RotateCcw, Plus, ArrowLeft, Radio } from "lucide-react";

export default function DynamicCommitteeRoom() {
  const params = useParams();
  const roomId = (params?.id as string) || "SESSION";

  const [speechTime, setSpeechTime] = useState(90);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isRunning, setIsRunning] = useState(false);

  // Dynamic speakers list
  const [speakersList, setSpeakersList] = useState<string[]>([
    "United States of America",
    "French Republic",
    "United Kingdom",
  ]);
  const [newCountry, setNewCountry] = useState("");
  const [queueManager, setQueueManager] = useState<"ADMIN" | "EXECUTIVE_BOARD">("EXECUTIVE_BOARD");
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
    <div className="delegate-page min-h-screen text-slate-100 flex flex-col">
      {/* Room Header */}
      <header className="border-b border-white/10 bg-slate-950/65 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-slate-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>LIVE</span>
            </span>
            <span className="rounded border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 font-mono text-xs text-cyan-300">
              Room: {roomId}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
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

      {/* Main Committee Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        
        {/* Left: Speaker Clock Floor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2">Current Speaker Floor</span>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {speakersList[0] || "General Speakers List Exhausted"}
            </h2>

            <div className="my-4 text-7xl font-mono font-bold tracking-tight text-cyan-300">
              {formatTime(timeLeft)}
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={toggleTimer}
                className="rounded-full bg-cyan-300 p-3 text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200"
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
              <span className="text-xs text-slate-400 font-medium">Session Status</span>
              <p className="text-sm font-semibold mt-1 text-emerald-400">Formal Debate</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Active Delegations</span>
              <p className="text-sm font-semibold mt-1">15 Present</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Simple Majority</span>
              <p className="text-sm font-semibold mt-1">8 Votes</p>
            </div>
          </div>
        </div>

        {/* Right: Real-time Speakers Queue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Mic className="h-5 w-5 text-cyan-300" />
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
                    ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                    : "bg-slate-950 border-slate-800/80 text-slate-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs opacity-50">{idx + 1}.</span>
                  <span>{country}</span>
                </div>
                {idx === 0 && <span className="text-xs font-semibold text-cyan-300">On Floor</span>}
              </div>
            ))}
          </div>

          <form onSubmit={addSpeaker} className="mt-4 space-y-2 border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="room-queue-manager" className="text-xs font-semibold text-slate-300">Admin / EB queue control</label>
              <select id="room-queue-manager" value={queueManager} onChange={(e) => setQueueManager(e.target.value as "ADMIN" | "EXECUTIVE_BOARD")} className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-[10px] text-slate-300">
                <option value="EXECUTIVE_BOARD">Executive Board</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add Delegation to queue..."
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-300 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-cyan-300 p-2 text-slate-950 transition hover:bg-cyan-200"
            >
              <Plus className="w-4 h-4" />
            </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
