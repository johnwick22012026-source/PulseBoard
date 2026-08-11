import { FormEvent, useState } from 'react'
import type { Priority } from '../types/task'

type TaskFormPayload = {
  title: string
  description?: string
  priority: Priority
}

type TaskFormProps = {
  onSubmit: (payload: TaskFormPayload) => void
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [error, setError] = useState('')

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
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Task</p>
          <h3 className="text-lg font-semibold text-white">Create new task</h3>
        </div>
        <span className="text-xs uppercase tracking-[0.4em] text-slate-500">Draft</span>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm text-slate-400">
        <div>
          <label htmlFor="task-title" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Title
          </label>
          <input
            id="task-title"
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
            placeholder="e.g. Brainstorm landing page"
            value={title}
            maxLength={100}
            onChange={(event) => setTitle(event.target.value)}
          />
          {error && <p className="mt-1 text-rose-400">{error}</p>}
        </div>
        <div>
          <label htmlFor="task-description" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Description
          </label>
          <textarea
            id="task-description"
            className="mt-2 h-24 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
            placeholder="Add helpful context, steps, or relevant links (optional)"
            value={description}
            maxLength={300}
            onChange={(event) => setDescription(event.target.value)}
          />
          <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
            {description.length}/300
          </p>
        </div>
        <div>
          <label htmlFor="task-priority" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Priority
          </label>
          <select
            id="task-priority"
            className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
            value={priority}
            onChange={(event) => setPriority(event.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:opacity-90"
        >
          Add task
        </button>
      </form>
    </section>
  )
}
