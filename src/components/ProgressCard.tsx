export default function ProgressCard() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <p>Productivity</p>
        <p>Solid balance</p>
      </div>
      <h2 className="mt-4 text-3xl font-semibold text-white">74% focus</h2>
      <p className="mt-2 text-slate-400">
        Keep pushing. Hydrate, breathe, and let the momentum guide your next sprint.
      </p>
      <div className="mt-6 h-2 rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-emerald-400" style={{ width: '74%' }} />
      </div>
    </section>
  )
}
