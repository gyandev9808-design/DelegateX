"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Globe2, Mail, Lock, User, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (isLogin) {
      // 1. Master Admin check
      if (normalizedEmail === "admin@delegatex.org" && password === "Secretariat2026!") {
        router.push("/admin");
        return;
      }

      // 2. Staff / Secretariat check
      if (normalizedEmail.includes("admin") || normalizedEmail.includes("secretariat")) {
        router.push("/admin");
        return;
      }

      // 3. Delegate / Student check -> goes to /dashboard
      router.push("/dashboard");
    } else {
      if (normalizedEmail === "admin@delegatex.org") {
        setErrorMessage("This email is reserved for the Master Admin account.");
        return;
      }

      setStatusMessage("Account registered successfully! Please sign in.");
      setIsLogin(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="flex items-center space-x-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? "Sign in to DelegateX" : "Create New Account"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isLogin
              ? "Access your student or admin dashboard"
              : "Register as a delegate on the platform"}
          </p>
        </div>

        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setStatusMessage("");
              setErrorMessage("");
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition ${
              isLogin ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setStatusMessage("");
              setErrorMessage("");
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition ${
              !isLogin ? "bg-indigo-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            New User (Register)
          </button>
        </div>

        {statusMessage && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@delegatex.org or delegate@mun.org"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition mt-2 flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-600/20"
          >
            <span>{isLogin ? "Sign In" : "Register Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <Link href="/" className="text-xs text-indigo-400 hover:underline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
