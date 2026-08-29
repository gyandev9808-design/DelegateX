import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DelegateDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  const delegateModules = [
    {
      title: "Committee Chamber",
      description: "Join your allocated committee, view agendas, and enter live debates.",
      href: "/committee",
      badge: "Live",
    },
    {
      title: "Training & Resources",
      description: "Rules of procedure, position paper guides, and delegate handbooks.",
      href: "/training",
      badge: "Prep",
    },
    {
      title: "Virtual Meeting Room",
      description: "Enter your active session chamber and interact with executive board.",
      href: "/room/main",
      badge: "Connect",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Delegate Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-2 text-white">
              Welcome back, {session.user?.name || "Delegate"}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Access your committee chambers, debate resources, and active sessions.
            </p>
          </div>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {delegateModules.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all shadow-lg"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                  <span className="text-slate-500 group-hover:text-indigo-400 transition-colors">
                    →
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-medium text-indigo-400 group-hover:underline">
                Open module &rarr;
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
