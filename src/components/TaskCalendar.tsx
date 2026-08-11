import { useMemo } from 'react'

import type { Task } from '../types/task'

type TaskCalendarProps = {
  tasks: Task[]
  month: Date
  selectedTaskId: string | null
  onPreviousMonth: () => void
  onNextMonth: () => void
  onToday: () => void
  onSelectTask: (taskId: string) => void
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const formatMonthLabel = (value: Date) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(value)

export default function TaskCalendar({
  tasks,
  month,
  selectedTaskId,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onSelectTask,
}: TaskCalendarProps) {
  const monthLabel = useMemo(() => formatMonthLabel(month), [month])

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>()
    tasks.forEach(task => {
      if (!task.date) return
      const currentTasks = map.get(task.date) ?? []
      currentTasks.push(task)
      map.set(task.date, currentTasks)
    })
    return map
  }, [tasks])

  const gridDays = useMemo(() => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
    const leadingEmptyCells = startOfMonth.getDay()
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const totalSlots = Math.ceil((leadingEmptyCells + daysInMonth) / 7) * 7
    const todayIso = toIsoDate(new Date())

    return Array.from({ length: totalSlots }, (_, index) => {
      const cellDate = new Date(month.getFullYear(), month.getMonth(), index - leadingEmptyCells + 1)
      const iso = toIsoDate(cellDate)
      return {
        date: cellDate,
        iso,
        tasks: tasksByDate.get(iso) ?? [],
        isCurrentMonth: cellDate.getMonth() === month.getMonth(),
        isToday: iso === todayIso,
      }
    })
  }, [month, tasksByDate])

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-500">Calendar</p>
          <h3 className="text-lg font-semibold text-white">{monthLabel}</h3>
        </div>
        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.35em] text-slate-500">
          <button
            type="button"
            onClick={onPreviousMonth}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-200 transition duration-150 hover:border-slate-600"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={onToday}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-200 transition duration-150 hover:border-slate-600"
          >
            Today
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-200 transition duration-150 hover:border-slate-600"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 items-center gap-2 text-[0.55rem] uppercase tracking-[0.4em] text-slate-500">
        {WEEKDAY_LABELS.map(label => (
          <span key={label} className="text-center font-semibold">
            {label}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-7 gap-3">
        {gridDays.map(day => (
          <div
            key={day.iso}
            className={`flex flex-col gap-2 rounded-2xl border px-3 py-3 transition duration-150 ${
              day.isCurrentMonth
                ? 'border-slate-800 bg-slate-950/80'
                : 'border-transparent bg-slate-900/40 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between text-[0.65rem] font-semibold tracking-[0.4em] text-slate-400">
              <span className={`${day.isToday ? 'text-emerald-300' : 'text-slate-400'}`}>{day.date.getDate()}</span>
              {day.isToday && (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[0.55rem] font-semibold text-emerald-200">
                  Today
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 text-left">
              {day.tasks.length === 0 ? (
                <p className="text-[0.65rem] text-slate-500">No tasks</p>
              ) : (
                <>
                  {day.tasks.slice(0, 2).map(task => (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => onSelectTask(task.id)}
                      className={`w-full rounded-2xl border px-3 py-2 text-left text-[0.75rem] font-semibold transition ${
                        task.id === selectedTaskId
                          ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                          : 'border-transparent bg-white/5 text-white hover:border-slate-500'
                      }`}
                    >
                      <span className="block text-sm leading-5">{task.title}</span>
                      <span className="text-[0.6rem] uppercase tracking-[0.3em] text-slate-500">
                        {task.duration || task.time || 'No estimate'}
                      </span>
                    </button>
                  ))}
                  {day.tasks.length > 2 && (
                    <p className="text-[0.6rem] text-slate-500">+{day.tasks.length - 2} more</p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
