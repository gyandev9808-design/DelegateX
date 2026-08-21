import Link from 'next/link';
import Counter from '@/components/Counter';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          DelegateX
        </h1>
        <p className="text-lg text-slate-300">
          Online MUN training sessions & real online committee simulations.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/committee"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-500/25"
          >
            Launch Committee Room
          </Link>
          <Counter />
        </div>
      </div>
    </main>
  );
}
