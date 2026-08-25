"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Globe2, Mail, Lock, User, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (isLogin) {
      // Master Admin login
      if (normalizedEmail === "admin@delegatex.org" && password === "Secretariat2026!") {
        router.push("/admin");
        return;
      }

      // Demo delegate login for the frontend-only experience.
      if (normalizedEmail === "delegate@mun.org" && password === "Delegate2026!") {
        router.push("/dashboard");
        return;
      }

      const result = await signIn("credentials", { email: normalizedEmail, password, redirect: false });
      if (result?.error) {
        setErrorMessage("Incorrect email or password. Please check your details and try again.");
      } else {
        router.push("/dashboard");
      }
    } else {
      if (normalizedEmail === "admin@delegatex.org") {
        setErrorMessage("This email is reserved for the Master Admin account.");
        return;
      }

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email: normalizedEmail, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          setErrorMessage(data.error || "Registration failed. Please try again.");
          return;
        }
        const loginResult = await signIn("credentials", {
          email: normalizedEmail,
          password,
          redirect: false,
        });
        if (loginResult?.error) {
          setStatusMessage("Account created. Please sign in with your new account.");
          setIsLogin(true);
          setPassword("");
          setName("");
          return;
        }
        router.push("/dashboard");
      } catch {
        setErrorMessage("Registration failed. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="delegate-page flex min-h-screen items-center justify-center p-6 text-slate-100">
      <div className="delegate-panel w-full max-w-md rounded-2xl p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="flex items-center space-x-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
              <Globe2 className="h-6 w-6" />
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
              isLogin ? "bg-cyan-300 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
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
              !isLogin ? "bg-cyan-300 text-slate-950 shadow-sm" : "text-slate-400 hover:text-white"
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
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 pl-9 text-sm text-white focus:border-cyan-300 focus:outline-none"
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
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 pl-9 text-sm text-white focus:border-cyan-300 focus:outline-none"
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
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 pl-9 text-sm text-white focus:border-cyan-300 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center space-x-1.5 rounded-lg bg-cyan-300 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-cyan-500/20 transition hover:bg-cyan-200"
          >
            <span>{isLogin ? "Sign In" : "Register Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <Link href="/" className="text-xs text-cyan-300 hover:underline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
