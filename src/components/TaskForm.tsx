import { FormEvent, useMemo, useState } from 'react'
import type { Priority } from '../types/task'

export type TaskFormPayload = {
  title: string
  description?: string
  priority: Priority
}

type TaskFormProps = {
  onSubmit: (payload: TaskFormPayload) => void
}

const priorityLabels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [error, setError] = useState('')

  const priorityOptions = useMemo(() => ['low', 'medium', 'high'] as Priority[], [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Task title is required')
      return
    }

    setError('')

    const payload: TaskFormPayload = {
      title: trimmedTitle,
      priority,
    }

    const trimmedDescription = description.trim()
    if (trimmedDescription) {
      payload.description = trimmedDescription
    }

    onSubmit(payload)
    setTitle('')
    setDescription('')
    setPriority('medium')
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/70 via-slate-900/80 to-slate-900/60 p-6 shadow-2xl shadow-slate-900/60">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.5em] text-slate-500">Task</p>
          <h3 className="text-lg font-semibold text-white">Create new task</h3>
        </div>
        <span className="text-[0.7rem] uppercase tracking-[0.4em] text-slate-500">Draft</span>
      </div>
      <form onSubmit={handleSubmit} className="mt-5 space-y-5 text-sm text-slate-400">
        <div className="space-y-2">
          <label htmlFor="task-title" className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Title
          </label>
          <input
            id="task-title"
            placeholder="e.g. Brainstorm landing page"
            className="w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            value={title}
            maxLength={100}
            onChange={(event) => setTitle(event.target.value)}
            aria-required="true"
          />
          {error && <p className="text-[0.7rem] text-rose-400">{error}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="task-description" className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Description
          </label>
          <textarea
            id="task-description"
            placeholder="Add helpful context, steps, or relevant links (optional)"
            className="h-24 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            value={description}
            maxLength={300}
            onChange={(event) => setDescription(event.target.value)}
          />
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-500">
            {description.length}/300
          </p>
        </div>
        <fieldset className="space-y-2">
          <legend className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">Priority</legend>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((option) => {
              const isActive = option === priority
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPriority(option)}
                  className={`flex-1 min-w-[90px] rounded-2xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                    isActive
                      ? option === 'low'
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300'
                        : option === 'medium'
                          ? 'border-sky-400 bg-sky-500/10 text-sky-300'
                          : 'border-rose-400 bg-rose-500/10 text-rose-300'
                      : 'border-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                  aria-pressed={isActive}
                >
                  {priorityLabels[option]}
                </button>
              )
            })}
          </div>
        </fieldset>
        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-slate-950 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          + Add Task
        </button>
      </form>
    </section>
  )
}
