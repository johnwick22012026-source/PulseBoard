import { FormEvent, useEffect, useState } from 'react'
import { Check, Circle, Clock3, Pencil, Trash2, Calendar } from 'lucide-react'

import type { Priority, Task } from '../types/task'

type TaskUpdatePayload = {
  title: string
  description?: string
  priority: Priority
  date?: string
  duration?: string
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

const TITLE_MAX_LENGTH = 100
const DESCRIPTION_MAX_LENGTH = 300

export default function TaskItem({ task, onToggleComplete, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleInput, setTitleInput] = useState(task.title)
  const [descriptionInput, setDescriptionInput] = useState(task.description ?? '')
  const [priorityInput, setPriorityInput] = useState<Priority>(task.priority)
  const [dateInput, setDateInput] = useState(task.date ?? '')
  const [durationInput, setDurationInput] = useState(task.duration ?? '')
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})

  useEffect(() => {
    setTitleInput(task.title)
    setDescriptionInput(task.description ?? '')
    setPriorityInput(task.priority)
    setDateInput(task.date ?? '')
    setDurationInput(task.duration ?? '')
  }, [task.title, task.description, task.priority, task.date, task.duration])

  const validateInputs = () => {
    const trimmedTitle = titleInput.trim()
    const trimmedDescription = descriptionInput.trim()
    const trimmedDate = dateInput
    const trimmedDuration = durationInput.trim()
    const newErrors: { title?: string; description?: string } = {}

    if (!trimmedTitle) {
      newErrors.title = 'Task title is required'
    } else if (trimmedTitle.length > TITLE_MAX_LENGTH) {
      newErrors.title = `Title cannot exceed ${TITLE_MAX_LENGTH} characters`
    }

    if (trimmedDescription.length > DESCRIPTION_MAX_LENGTH) {
      newErrors.description = `Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters`
    }

    setErrors(newErrors)

    return { valid: Object.keys(newErrors).length === 0, trimmedTitle, trimmedDescription, trimmedDate, trimmedDuration }
  }

  const handleSaveEdits = () => {
    const { valid, trimmedTitle, trimmedDescription, trimmedDate, trimmedDuration } = validateInputs()

    if (!valid) {
      return
    }

    onUpdate(task.id, {
      title: trimmedTitle,
      priority: priorityInput,
      description: trimmedDescription || undefined,
      date: trimmedDate || undefined,
      duration: trimmedDuration || undefined,
    })

    setIsEditing(false)
  }

  const handleCancelEdits = () => {
    setTitleInput(task.title)
    setDescriptionInput(task.description ?? '')
    setPriorityInput(task.priority)
    setDateInput(task.date ?? '')
    setDurationInput(task.duration ?? '')
    setErrors({})
    setIsEditing(false)
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSaveEdits()
  }

  const handleEditToggle = () => {
    if (isEditing) {
      handleCancelEdits()
      return
    }

    setErrors({})
    setIsEditing(true)
  }

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-4 text-sm shadow-lg shadow-slate-950/40 transition ${
        task.completed ? 'opacity-70' : 'opacity-100'
      } ${isEditing ? 'ring-2 ring-emerald-500/40' : ''}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-1 items-start gap-3">
          <label className="flex items-center gap-3" htmlFor={`task-checkbox-${task.id}`}>
            <input
              id={`task-checkbox-${task.id}`}
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="peer sr-only"
            />
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border p-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                task.completed
                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-400'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-emerald-400'
              }`}
              aria-hidden
            >
              {task.completed ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4 opacity-0" />}
            </span>
            <span className="sr-only">Toggle completion for {task.title}</span>
          </label>
          <div className="flex-1">
            {!isEditing ? (
              <>
                <p
                  className={`text-base font-semibold transition ${
                    task.completed ? 'text-slate-500 line-through' : 'text-white'
                  }`}
                >
                  {task.title}
                </p>
                {task.description ? (
                  <p
                    className={`text-xs transition ${
                      task.completed ? 'text-slate-500 line-through' : 'text-slate-400'
                    }`}
                  >
                    {task.description}
                  </p>
                ) : (
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-600">No description</p>
                )}
              </>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-1 space-y-4">
                <div>
                  <label
                    htmlFor={`edit-title-${task.id}`}
                    className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500"
                  >
                    Title
                  </label>
                  <input
                    id={`edit-title-${task.id}`}
                    className={`mt-2 w-full rounded-2xl border px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 transition duration-150 ${
                      errors.title ? 'border-rose-500 focus-visible:ring-rose-500/70' : 'border-slate-800'
                    }`}
                    value={titleInput}
                    maxLength={TITLE_MAX_LENGTH}
                    onChange={event => setTitleInput(event.target.value)}
                    aria-invalid={Boolean(errors.title)}
                    aria-describedby={`edit-title-error-${task.id}`}
                  />
                  <p
                    id={`edit-title-error-${task.id}`}
                    className={`mt-1 text-[0.65rem] uppercase tracking-[0.3em] ${
                      errors.title ? 'text-rose-400' : 'text-slate-500'
                    }`}
                    role={errors.title ? 'alert' : undefined}
                  >
                    {errors.title ?? `${titleInput.trim().length}/${TITLE_MAX_LENGTH}`}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor={`edit-description-${task.id}`}
                    className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500"
                  >
                    Description
                  </label>
                  <textarea
                    id={`edit-description-${task.id}`}
                    className={`mt-2 h-20 w-full resize-none rounded-2xl border px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 transition duration-150 ${
                      errors.description ? 'border-rose-500 focus-visible:ring-rose-500/70' : 'border-slate-800'
                    }`}
                    value={descriptionInput}
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    onChange={event => setDescriptionInput(event.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={`edit-description-error-${task.id}`}
                  />
                  <p
                    id={`edit-description-error-${task.id}`}
                    className={`mt-1 text-[0.65rem] uppercase tracking-[0.3em] ${
                      errors.description ? 'text-rose-400' : 'text-slate-500'
                    }`}
                    role={errors.description ? 'alert' : undefined}
                  >
                    {errors.description ?? `${descriptionInput.trim().length}/${DESCRIPTION_MAX_LENGTH}`}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor={`edit-date-${task.id}`}
                    className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500"
                  >
                    Date
                  </label>
                  <input
                    id={`edit-date-${task.id}`}
                    type="date"
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    value={dateInput}
                    onChange={event => setDateInput(event.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`edit-duration-${task.id}`}
                    className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500"
                  >
                    Duration
                  </label>
                  <input
                    id={`edit-duration-${task.id}`}
                    type="text"
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    value={durationInput}
                    onChange={event => setDurationInput(event.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`edit-priority-${task.id}`}
                    className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500"
                  >
                    Priority
                  </label>
                  <select
                    id={`edit-priority-${task.id}`}
                    className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    value={priorityInput}
                    onChange={event => setPriorityInput(event.target.value as Priority)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-2xl bg-emerald-500/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950 transition duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 active:translate-y-[1px]"
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdits}
                    className="flex-1 rounded-2xl border border-slate-800 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 transition duration-150 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/80 focus-visible:ring-offset-2 active:translate-y-[1px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleEditToggle}
            aria-label={`Edit task`}
            className={`rounded-full border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition duration-150 hover:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 active:scale-95 ${
              isEditing ? 'border-emerald-400 text-white' : ''
            }`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="rounded-full border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition duration-150 hover:border-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 focus-visible:ring-offset-2 active:scale-95"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {!isEditing && (
        <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            <span>{task.duration || 'No estimate'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{task.date || 'No date'}</span>
          </div>
          <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[0.6rem] ${priorityColor[task.priority]}`}>
            <Circle className="h-2 w-2" />
            {task.priority}
          </div>
        </div>
      )}
      {isEditing && (
        <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            <span>{durationInput || 'No estimate'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{dateInput || 'No date'}</span>
          </div>
          <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[0.6rem] ${priorityColor[priorityInput]}`}>
            <Circle className="h-2 w-2" />
            {priorityInput}
          </div>
        </div>
      )}
      {task.project && <p className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-600">{task.project}</p>}
    </article>
  )
}
