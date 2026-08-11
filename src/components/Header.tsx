import { Moon, Sun } from 'lucide-react'

import type { ThemeMode } from '../utils/storage'

const greetings = ['Good morning', 'Good afternoon', 'Good evening']

function getGreeting(hour: number) {
  if (hour < 12) return greetings[0]
  if (hour < 18) return greetings[1]
  return greetings[2]
}

type HeaderProps = {
  theme: ThemeMode
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  const today = new Date()
  const friendlyDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(today)
  const currentGreeting = getGreeting(today.getHours())
  const isDarkMode = theme === 'dark'

  return (
    <header className="flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-500/20 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-2xl dark:text-slate-50">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-fuchsia-500 p-0.5 shadow-lg shadow-amber-500/40">
            <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 text-xs font-bold uppercase tracking-[0.4em] text-white">
              PB
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-500 dark:text-amber-200">PulseBoard</p>
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white">{currentGreeting}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Here's what your day looks like.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 self-end">
          <div className="space-y-1 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-left shadow-lg shadow-slate-500/10 dark:border-slate-800 dark:bg-slate-950/50 dark:shadow-slate-900/60">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Today</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{friendlyDate}</p>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 transition duration-150 hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:border-slate-500"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            <span className="text-[0.65rem] tracking-[0.4em] text-slate-700 dark:text-slate-100">
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-emerald-400/30 dark:border-slate-800">
            MT
          </div>
        </div>
      </div>
    </header>
  )
}
