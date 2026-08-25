"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  MessageSquareText,
  SendHorizonal,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

function buildAssistantReply(question: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes("opening") || normalized.includes("speech")) {
    return "Start with your country’s core interest, then move to the specific crisis, and finish with one clear ask. A strong opening is: 1) what is happening, 2) why it matters to your state, 3) what action you want the room to take.";
  }

  if (normalized.includes("point of information") || normalized.includes("question")) {
    return "Ask a precise, actionable question instead of a broad challenge. Example: ‘What specific action does the speaker propose to protect civilians while preserving regional stability?’ This keeps the room focused and makes your intervention diplomatic.";
  }

  if (normalized.includes("resolution") || normalized.includes("caucus") || normalized.includes("bloc")) {
    return "Frame the issue around a shared problem, then isolate the disagreement. Ask: ‘Which element of the draft creates the largest conflict with our national security interests, and what minimal amendment would improve it?’ That invites a constructive response.";
  }

  if (normalized.includes("country") || normalized.includes("position")) {
    return "Define your position in three parts: national interest, legal/political basis, and proposed solution. Then connect it to the committee mandate so it feels both principled and practical.";
  }

  return "Let’s sharpen it in four steps: first, name the concrete issue; second, identify the actor responsible or able to act; third, define the outcome your delegation wants; and fourth, add the constraint that must be protected. Then use this structure: ‘Given [issue], how can [actor] achieve [outcome] without undermining [principle or interest]?’ This keeps your question specific, diplomatic, and difficult to dismiss.";
}

export default function DoubtClarifierPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "I can help turn a vague concern into a stronger diplomatic question. Ask about your speech, committee strategy, caucus, or a stuck resolution draft.",
    },
  ]);

  const sendMessage = async (value?: string) => {
    const question = (value ?? input).trim();
    if (!question || isLoading) return;

    setError("");
    setInput("");
    setMessages((current) => [...current, { id: Date.now(), role: "user", text: question }]);
    setIsLoading(true);

    try {
      setThinkingSeconds(10);
      await new Promise<void>((resolve) => {
        let seconds = 10;
        const timer = window.setInterval(() => {
          seconds -= 1;
          setThinkingSeconds(seconds);
          if (seconds === 0) {
            window.clearInterval(timer);
            resolve();
          }
        }, 1000);
      });
      const response = await fetch("/api/ai-doubt-clarifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to get a response.");
      setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", text: data.answer || buildAssistantReply(question) }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to get a response.");
    } finally {
      setIsLoading(false);
      setThinkingSeconds(0);
    }

  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-cyan-300">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10">
              <Wand2 className="h-4 w-4" />
            </span>
            Delegate<span className="text-emerald-300">X</span>
          </Link>

          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/" className="transition hover:text-cyan-300">
              Home
            </Link>
            <Link href="/training" className="transition hover:text-cyan-300">
              Training
            </Link>
            <Link href="/dashboard" className="transition hover:text-cyan-300">
              Dashboard
            </Link>
          </div>

          <Link
            href="/auth"
            className="rounded-full border border-cyan-300/40 bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            Open app
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
        <section className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_1.35fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1729] via-[#0b1324] to-[#050b14] p-6 shadow-2xl shadow-cyan-950/20">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI doubt clarifier
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Turn your confusion into a sharper committee question.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Get instant help reframing uncertainty, sharpening speeches, and asking the right diplomatic question when the room gets tense.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Clarify my speech",
                "Improve my caucus question",
                "Reframe my country position",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-slate-950/40 sm:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">DelegateX Clarifier</p>
                  <p className="text-[11px] text-slate-400">Live guidance</p>
                </div>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                online
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-[#081322] p-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-cyan-400 text-slate-950"
                        : "border border-white/10 bg-slate-900 text-slate-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-cyan-300">Thinking... {thinkingSeconds > 0 ? `${thinkingSeconds}s` : ""}</div></div>}
            </div>

            <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about your speech, coalition, or committee strategy..."
                className="flex-1 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center justify-center rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send question"
              >
                <SendHorizonal className="h-4 w-4" />
              </button>
            </form>
            {error && <p role="alert" className="mt-3 text-xs text-rose-300">{error}</p>}
          </div>
        </section>

        <section className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6 md:grid-cols-3">
          {[
            [MessageSquareText, "Clearer questions", "Turn confused thoughts into concise, persuasive committee questions."],
            [ShieldCheck, "Stronger diplomacy", "Frame arguments in a way that sounds polished and principled."],
            [Sparkles, "Confidence boost", "Prepare for caucus, moderation, and cross-examination with more clarity."],
          ].map(([Icon, title, description]) => {
            const FeatureIcon = Icon as typeof MessageSquareText;
            return (
              <div key={title as string} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <FeatureIcon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{title as string}</h3>
                <p className="text-sm leading-6 text-slate-400">{description as string}</p>
              </div>
            );
          })}
        </section>

        <div className="mt-10 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-200"
          >
            Go to delegate dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
