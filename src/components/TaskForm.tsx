import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
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

const TITLE_MAX_LENGTH = 100
const DESCRIPTION_MAX_LENGTH = 300

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const priorityOptions = useMemo(() => ['low', 'medium', 'high'] as Priority[], [])

  const validate = () => {
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    let hasError = false
    if (!trimmedTitle) {
      setTitleError('Task title is required')
      hasError = true
    } else if (trimmedTitle.length > TITLE_MAX_LENGTH) {
      setTitleError(`Title cannot exceed ${TITLE_MAX_LENGTH} characters`)
      hasError = true
    } else {
      setTitleError('')
    }

    if (trimmedDescription.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(`Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters`)
      hasError = true
    } else {
      setDescriptionError('')
    }

    return { hasError, trimmedTitle, trimmedDescription }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { hasError, trimmedTitle, trimmedDescription } = validate()

    if (hasError) {
      return
    }

    const payload: TaskFormPayload = {
      title: trimmedTitle,
      priority,
    }

    if (trimmedDescription) {
      payload.description = trimmedDescription
    }

    onSubmit(payload)
    setTitle('')
    setDescription('')
    setPriority('medium')
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value
    setDescription(nextValue)
    if (nextValue.trim().length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(`Description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters`)
    } else {
      setDescriptionError('')
    }
  }

  const isSubmitDisabled = !title.trim() || Boolean(titleError) || Boolean(descriptionError)

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
            className={`w-full rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition duration-150 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
              titleError ? 'border-rose-500 focus-visible:ring-rose-500/60' : ''
            }`}
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            onChange={(event) => setTitle(event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(titleError)}
          />
          {titleError ? (
            <p className="text-[0.7rem] text-rose-400" role="alert" aria-live="assertive">
              {titleError}
            </p>
          ) : (
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-500">
              {title.trim().length}/{TITLE_MAX_LENGTH}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="task-description" className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
            Description
          </label>
          <textarea
            id="task-description"
            placeholder="Add helpful context, steps, or relevant links (optional)"
            className={`h-24 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/40 px-3 py-3 text-sm text-slate-200 placeholder:text-slate-500 transition duration-150 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
              descriptionError ? 'border-rose-500 focus-visible:ring-rose-500/60' : ''
            }`}
            value={description}
            maxLength={DESCRIPTION_MAX_LENGTH}
            onChange={handleDescriptionChange}
            aria-invalid={Boolean(descriptionError)}
            aria-describedby="description-help"
          />
          {descriptionError ? (
            <p className="text-[0.7rem] text-rose-400" role="alert" aria-live="assertive">
              {descriptionError}
            </p>
          ) : (
            <p id="description-help" className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-500">
              {description.trim().length}/{DESCRIPTION_MAX_LENGTH}
            </p>
          )}
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
                  className={`flex-1 min-w-[90px] rounded-2xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400/70 focus-visible:outline-none active:translate-y-[1px] ${
                    isActive
                      ? option === 'low'
                        ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-[0_0_0_2px_rgba(16,185,129,0.35)]'
                        : option === 'medium'
                          ? 'border-sky-400 bg-sky-500/10 text-sky-300 shadow-[0_0_0_2px_rgba(14,165,233,0.35)]'
                          : 'border-rose-400 bg-rose-500/10 text-rose-300 shadow-[0_0_0_2px_rgba(244,63,94,0.35)]'
                      : 'border-slate-800 text-slate-400 hover:border-emerald-400/80 hover:text-emerald-100'
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
          disabled={isSubmitDisabled}
          className={`w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-slate-950 transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 active:translate-y-[1px] ${
            isSubmitDisabled
              ? 'cursor-not-allowed opacity-50'
              : 'hover:opacity-90 hover:shadow-lg focus-visible:ring-4 focus-visible:ring-emerald-400/40'
          }`}
          aria-disabled={isSubmitDisabled}
        >
          + Add Task
        </button>
      </form>
    </section>
  )
}
