type GreetingSummaryProps = {
  totalTasks: number
  completedTasks: number
  activeTasks: number
  highPriorityTasks: number
}

export default function GreetingSummary({
  totalTasks,
  completedTasks,
  activeTasks,
  highPriorityTasks,
}: GreetingSummaryProps) {
  const stats = [
    { label: 'Total tasks', value: totalTasks.toString(), detail: 'All work queued' },
    {
      label: 'Completed',
      value: completedTasks.toString(),
      detail: 'Finished streaks',
    },
    { label: 'Active', value: activeTasks.toString(), detail: 'Work in progress' },
    { label: 'High priority', value: highPriorityTasks.toString(), detail: 'Need attention' },
  ]

  return (
    <section className="grid gap-4 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-6 shadow-xl shadow-slate-900/60 md:grid-cols-4">
      {stats.map(stat => (
        <div key={stat.label} className="space-y-1">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
          <p className="text-2xl font-semibold text-white">{stat.value}</p>
          <p className="text-xs text-slate-400">{stat.detail}</p>
        </div>
      ))}
    </section>
  )
}
