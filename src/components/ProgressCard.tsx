import { Sparkles } from 'lucide-react'

type ProgressCardProps = {
  completed: number
  total: number
}

const getMotivationalMessage = (percent: number, total: number) => {
  if (total === 0 || percent === 0) {
    return 'Start knocking out tasks to see progress here.'
  }

  if (percent >= 100) {
    return 'Perfect score! Enjoy the break.'
  }

  if (percent >= 80) {
    return 'You are cruising — stay focused.'
  }

  if (percent >= 50) {
    return 'Great momentum. Keep pushing.'
  }

  return 'Let’s tackle the high-impact tasks first.'
}

export default function ProgressCard({ completed, total }: ProgressCardProps) {
  const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const message = getMotivationalMessage(progressPercent, total)

  return (
    <section className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 shadow-xl shadow-slate-900/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Focus meter</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-4xl font-semibold text-white">{progressPercent}%</p>
            <p className="text-sm text-slate-400">of completion</p>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            {completed} of {total} tasks completed
          </p>
        </div>
        <Sparkles className="h-10 w-10 text-emerald-400" aria-hidden />
      </div>

      <p className="mt-6 text-sm text-slate-200">{message}</p>

      <div className="mt-6 h-2 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  )
}
