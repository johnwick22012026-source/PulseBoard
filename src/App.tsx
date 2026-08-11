import { Sun } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 md:px-8">
        <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-900/40 backdrop-blur">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">PulseBoard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back!</h1>
            <p className="text-slate-400">Track tasks, routines, and wins—all in your browser.</p>
          </div>
          <Sun className="h-12 w-12 text-amber-400" />
        </header>
        <main className="flex flex-1 flex-col gap-6">
          <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-6 shadow-xl shadow-slate-900/60">
            <p className="text-sm text-slate-400">Spot the calm, stay on track.</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                All tasks
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-white">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                Focus time
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-white">
                <Sun className="h-4 w-4 text-amber-400" />
                Fresh ideas
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/60 p-6 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-500">Ready?</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Start a new habit or quick task.</h2>
            <p className="mt-2 text-slate-400">Tailwind, Lucide, React, Vite—and your focus.</p>
          </section>
        </main>
      </div>
    </div>
  )
}
