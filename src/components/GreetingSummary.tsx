import type { LucideIcon } from 'lucide-react'
import { Activity, AlertTriangle, CheckCircle2, ClipboardList } from 'lucide-react'

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: string
  detail: string
}

function StatCard({ icon: Icon, label, value, detail }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5 shadow-xl shadow-slate-900/50 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-emerald-500/30">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{label}</p>
        <Icon className="h-6 w-6 text-slate-400" aria-hidden />
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="text-xs text-slate-400">{detail}</p>
    </article>
  )
}

type GreetingSummaryProps = {
  totalTasks: number
  completedTasks: number
  activeTasks: number
  highPriorityIncompleteTasks: number
  progressPercent: number
}

export default function GreetingSummary({
  totalTasks,
  completedTasks,
  activeTasks,
  highPriorityIncompleteTasks,
  progressPercent,
}: GreetingSummaryProps) {
  const stats: StatCardProps[] = [
    {
      label: 'Total tasks',
      value: totalTasks.toString(),
      detail: 'All work queued up',
      icon: ClipboardList,
    },
    {
      label: 'Completed',
      value: completedTasks.toString(),
      detail: 'Finished streaks',
      icon: CheckCircle2,
    },
    {
      label: 'Progress',
      value: `${progressPercent}%`,
      detail: 'Completion percentage',
      icon: Activity,
    },
    {
      label: 'High priority',
      value: highPriorityIncompleteTasks.toString(),
      detail: 'Need extra focus',
      icon: AlertTriangle,
    },
  ]

  return (
    <section className="space-y-6 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 shadow-xl shadow-slate-900/60">
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">PulseBoard</p>
        <h1 className="text-3xl font-semibold text-white">
          {activeTasks === 0
            ? 'Seize the day — kick off your first task'
            : `You have ${activeTasks} active ${activeTasks === 1 ? 'task' : 'tasks'}`}
        </h1>
        <p className="text-sm text-slate-400">
          Keep the momentum going by balancing focus with mindful breaks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}
