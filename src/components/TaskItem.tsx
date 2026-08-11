import { useEffect, useState } from 'react'
import { Check, Circle, Clock3, Pencil, Square, Trash2 } from 'lucide-react'

import type { Priority, Task } from '../types/task'

type TaskUpdatePayload = {
  title: string
  description?: string
  priority: Priority
}

type TaskItemProps = {
  task: Task
  onToggleComplete: (taskId: string) => void
  onDelete: (taskId: string) => void
  onUpdate: (taskId: string, payload: TaskUpdatePayload) => void
}

const priorityColor: Record<Priority, string> = {
  low: 'bg-slate-600',
  medium: 'bg-amber-500',
  high: 'bg-emerald-400',
}

export default function TaskItem({ task, onToggleComplete, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleInput, setTitleInput] = useState(task.title)
  const [descriptionInput, setDescriptionInput] = useState(task.description ?? '')
  const [priorityInput, setPriorityInput] = useState<Priority>(task.priority)
  const [error, setError] = useState('')

  useEffect(() => {
    setTitleInput(task.title)
    setDescriptionInput(task.description ?? '')
    setPriorityInput(task.priority)
  }, [task.title, task.description, task.priority])

  const handleSaveEdits = () => {
    const trimmedTitle = titleInput.trim()

    if (!trimmedTitle) {
      setError('Task title is required')
      return
    }

    setError('')

    const trimmedDescription = descriptionInput.trim()

    onUpdate(task.id, {
      title: trimmedTitle,
      priority: priorityInput,
      description: trimmedDescription || undefined,
    })

    setIsEditing(false)
  }

  const handleCancelEdits = () => {
    setTitleInput(task.title)
    setDescriptionInput(task.description ?? '')
    setPriorityInput(task.priority)
    setError('')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-sm text-slate-400 shadow-xl shadow-slate-950/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Task</p>
            <h4 className="text-base font-semibold text-white">Edit task</h4>
          </div>
          <button
            type="button"
            onClick={handleCancelEdits}
            className="text-xs uppercase tracking-[0.3em] text-slate-500 hover:text-white"
          >
            cancel
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor={`edit-title-${task.id}`} className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Title
            </label>
            <input
              id={`edit-title-${task.id}`}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              value={titleInput}
              maxLength={100}
              onChange={event => setTitleInput(event.target.value)}
            />
            {error && <p className="mt-1 text-rose-400">{error}</p>}
          </div>
          <div>
            <label htmlFor={`edit-description-${task.id}`} className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Description
            </label>
            <textarea
              id={`edit-description-${task.id}`}
              className="mt-2 h-20 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              value={descriptionInput}
              maxLength={300}
              onChange={event => setDescriptionInput(event.target.value)}
            />
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              {descriptionInput.length}/300
            </p>
          </div>
          <div>
            <label htmlFor={`edit-priority-${task.id}`} className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Priority
            </label>
            <select
              id={`edit-priority-${task.id}`}
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none"
              value={priorityInput}
              onChange={event => setPriorityInput(event.target.value as Priority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveEdits}
              className="flex-1 rounded-2xl bg-emerald-500/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:opacity-90"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={handleCancelEdits}
              className="flex-1 rounded-2xl border border-slate-800 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition hover:border-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-4 text-sm shadow-lg shadow-slate-950/40 transition ${
        task.completed ? 'opacity-70' : 'opacity-100'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            className={`rounded-full border p-2 transition ${
              task.completed
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-400'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-emerald-400'
            }`}
          >
            {task.completed ? <Check className="h-4 w-4" /> : <Square className="h-4 w-4" />}
          </button>
          <div>
            <p className={`text-base font-semibold ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
              {task.title}
            </p>
            {task.description ? (
              <p className="text-xs text-slate-400">{task.description}</p>
            ) : (
              <p className="text-xs uppercase tracking-[0.3em] text-slate-600">No description</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-full border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition hover:border-slate-500"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-full border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition hover:border-rose-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4" />
          <span>{task.time || 'No estimate'}</span>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[0.6rem] ${priorityColor[task.priority]}`}>
          <Circle className="h-2 w-2" />
          {task.priority}
        </div>
      </div>
      {task.project && <p className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-600">{task.project}</p>}
    </article>
  )
}
