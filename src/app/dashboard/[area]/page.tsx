import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";

const areaNames: Record<string, string> = {
  search: "Dashboard Search",
  notifications: "Notifications",
  report: "Delegate Report",
  messages: "SMS History",
  circulars: "Circulars",
  attendance: "Attendance",
  "hostel-attendance": "Hostel Attendance",
  performance: "Performance",
  remarks: "Remarks",
  results: "Results",
  mailbox: "Mailbox",
  calendar: "Calendar",
  news: "School News",
  gallery: "Image Gallery",
};

export default function DelegateAreaPage({ params }: { params: { area: string } }) {
  const title = areaNames[params.area] ?? "Delegate Workspace";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> Back to delegate dashboard
        </Link>
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700"><LayoutDashboard className="h-6 w-6" /></div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Delegate workspace</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Your {title.toLowerCase()} will appear here as activity is added.</p>
        </section>
      </div>
    </main>
  );
}
