const greetings = ['Good morning', 'Good afternoon', 'Good evening']

function getGreeting(hour: number) {
  if (hour < 12) return greetings[0]
  if (hour < 18) return greetings[1]
  return greetings[2]
}

export default function Header() {
  const today = new Date()
  const friendlyDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(today)
  const currentGreeting = getGreeting(today.getHours())

  return (
    <header className="flex flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl shadow-slate-900/40 backdrop-blur-xl md:gap-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-fuchsia-500 p-0.5 shadow-lg shadow-amber-500/40">
            <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 text-xs font-bold uppercase tracking-[0.4em] text-white">
              PB
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-200">PulseBoard</p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">{currentGreeting}</h1>
            <p className="text-sm text-slate-400">Here's what your day looks like.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 self-end">
          <div className="space-y-1 rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-left shadow-lg shadow-slate-900/60">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Today</p>
            <p className="text-sm font-semibold text-white">{friendlyDate}</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-800 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 text-sm font-semibold uppercase tracking-[0.3em] text-white">
            MT
          </div>
        </div>
      </div>
    </header>
  )
}
