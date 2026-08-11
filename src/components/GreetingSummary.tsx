export default function GreetingSummary() {
  const stats = [
    { label: 'Tasks this week', value: '12', delta: '+2' },
    { label: 'Focus streak', value: '5 days', delta: '+1' },
    { label: 'Energy', value: '87%', delta: 'steady' },
  ]

  return (
    <section className="grid gap-4 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-6 shadow-xl shadow-slate-900/60 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-1">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
          <p className="text-2xl font-semibold text-white">{stat.value}</p>
          <p className="text-xs text-emerald-300">{stat.delta}</p>
        </div>
      ))}
    </section>
  )
}
