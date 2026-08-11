export default function TaskForm() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">New task</h3>
        <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Draft</span>
      </div>
      <div className="mt-4 grid gap-3 text-sm text-slate-400">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2">
          Task title
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2">
          Select project
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-center">Focus</div>
          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-center">Plan</div>
          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-center">Reflect</div>
        </div>
      </div>
      <button
        className="mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:opacity-90"
        type="button"
      >
        Save placeholder
      </button>
    </section>
  )
}
