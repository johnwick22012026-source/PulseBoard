import { Sparkles } from 'lucide-react'

type ProgressCardProps = {
  completed: number
  total: number
  progressPercent: number
  message: string
}

export default function ProgressCard({
  completed,
  total,
  progressPercent,
  message,
}: ProgressCardProps) {
  const clampedPercent = Math.min(Math.max(progressPercent, 0), 100)

  return (
    <section className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 shadow-xl shadow-slate-900/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Focus meter</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-4xl font-semibold text-white">{clampedPercent}%</p>
            <p className="text-sm text-slate-400">of completion</p>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            {completed} of {total} {total === 1 ? 'task' : 'tasks'} completed
          </p>
        </div>
        <Sparkles className="h-10 w-10 text-emerald-400" aria-hidden />
      </div>

      <p className="mt-6 text-sm text-slate-200">{message}</p>

      <div className="mt-6 h-2 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-300"
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
    </section>
  )
}
