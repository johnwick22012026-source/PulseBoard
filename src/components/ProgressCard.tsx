import { Sparkles } from 'lucide-react'

type ProgressCardProps = {
  completed: number
  total: number
  progressPercent: number
  message: string
}

const getTextColor = (percent: number) => {
  if (percent >= 80) {
    return 'text-emerald-400'
  }

  if (percent >= 50) {
    return 'text-amber-400'
  }

  return 'text-slate-200'
}

export default function ProgressCard({
  completed,
  total,
  progressPercent,
  message,
}: ProgressCardProps) {
  const clampedPercent = Math.min(Math.max(progressPercent, 0), 100)

  return (
    <section className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 shadow-xl shadow-slate-900/50 transition-colors duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Focus meter</p>
          <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Today&apos;s Progress</h3>
        </div>
        <Sparkles className="h-9 w-9 text-emerald-400" aria-hidden />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <p className={`text-4xl font-semibold ${getTextColor(clampedPercent)}`}>{clampedPercent}%</p>
            <p className="text-sm text-slate-400">complete</p>
          </div>
          <p className="text-sm font-medium text-slate-300">
            {completed} / {total} {total === 1 ? 'task' : 'tasks'}
          </p>
        </div>

        <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400/80 to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${clampedPercent}%` }}
          />
          <div
            className="pointer-events-none absolute -inset-0.5 rounded-full border border-white/10 opacity-0 transition-opacity duration-300"
            style={{ width: `${clampedPercent}%` }}
          />
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-slate-200/90 transition-colors duration-300">{message}</p>
    </section>
  )
}
