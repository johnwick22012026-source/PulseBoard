import { CalendarDays, Sparkles, User } from 'lucide-react'

export default function Header() {
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <header className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-slate-900/40 backdrop-blur-md md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">PulseBoard</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Dashboard overview</h1>
        <p className="text-slate-400">Stay nimble, calm, and in control.</p>
      </div>
      <div className="flex items-center gap-4 text-slate-300">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-amber-400" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Today</p>
            <p className="text-sm font-medium text-white">{today}</p>
          </div>
        </div>
        <div className="h-12 w-12 shrink-0 rounded-2xl border border-slate-800 bg-slate-900/60 p-2">
          <User className="h-full w-full text-emerald-300" />
        </div>
        <Sparkles className="h-8 w-8 text-amber-400" />
      </div>
    </header>
  )
}
