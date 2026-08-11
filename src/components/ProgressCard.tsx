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

  return 'text-slate-900 dark:text-slate-200'
}

export default function ProgressCard({
  completed,
  total,
  progressPercent,
  message,
}: ProgressCardProps) {
  const safeCompleted = Number.isFinite(completed) ? Math.max(completed, 0) : 0
  const safeTotal = Number.isFinite(total) ? Math.max(total, 0) : 0

  const computedPercent = safeTotal === 0 ? 0 : (safeCompleted / safeTotal) * 100
  const effectivePercent = Number.isFinite(progressPercent)
    ? progressPercent
    : computedPercent
  const clampedPercent = Math.min(Math.max(effectivePercent, 0), 100)

  const activeMessage =
    safeTotal === 0
      ? 'Nothing to track yet — add a task to kick off your focus sprint.'
      : safeCompleted === safeTotal
      ? 'All done! Take a mindful break or plan your next wins.'
      : message

  const taskLabel = safeTotal === 1 ? 'task' : 'tasks'

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100/80 via-white to-slate-50/70 p-6 shadow-xl shadow-slate-900/10 transition-colors duration-300 dark:border-slate-800/70 dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-900/40 dark:shadow-slate-900/50">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-600 dark:text-slate-500">Focus meter</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">Today&apos;s Progress</h3>
        </div>
        <Sparkles className="h-9 w-9 text-emerald-400" aria-hidden />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <p className={`text-4xl font-semibold ${getTextColor(clampedPercent)}`}>{clampedPercent}%</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">complete</p>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
            {safeCompleted} / {safeTotal} {taskLabel}
          </p>
        </div>

        <div className="relative h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
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

      <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-200/90 transition-colors duration-300">{activeMessage}</p>
    </section>
  )
}
