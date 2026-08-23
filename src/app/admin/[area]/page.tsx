import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

const areaNames: Record<string, string> = {
  search: "Workspace Search",
  notifications: "Notifications",
  circulars: "Circulars",
  awards: "Awards & Certificates",
  "roll-call": "Roll Call List",
  delegates: "Delegate Management",
  committees: "Committee Management",
  broadcasts: "Broadcast Centre",
  "rop-config": "Rules of Procedure",
};

export default function AdminAreaPage({ params }: { params: { area: string } }) {
  const title = areaNames[params.area] ?? "Admin Workspace";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to admin dashboard
        </Link>
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300"><LayoutDashboard className="h-6 w-6" /></div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Admin workspace</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">This workspace is ready for your Secretariat data and controls.</p>
        </section>
      </div>
    </main>
  );
}
