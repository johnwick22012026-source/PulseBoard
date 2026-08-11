type ProgressCardProps = {
  progressPercent: number
  message: string
}

export default function ProgressCard({ progressPercent, message }: ProgressCardProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <p>Productivity</p>
        <p>Focus meter</p>
      </div>
      <h2 className="mt-4 text-3xl font-semibold text-white">{progressPercent}% focus</h2>
      <p className="mt-2 text-slate-400">{message}</p>
      <div className="mt-6 h-2 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  )
}
