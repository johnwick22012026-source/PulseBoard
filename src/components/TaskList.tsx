import type { Task, Priority } from '../types/task'

import { Search, Sparkles } from 'lucide-react'

import EmptyState from './EmptyState'
import TaskItem from './TaskItem'

type TaskUpdatePayload = {
  title: string
  description?: string
  priority: Priority
}

type TaskListProps = {
  tasks: Task[]
  hasTasks: boolean
  onToggleComplete: (taskId: string) => void
  onDelete: (taskId: string) => void
  onUpdate: (taskId: string, payload: TaskUpdatePayload) => void
}

const getEnergyScore = (priority: Priority) => {
  switch (priority) {
    case 'high':
      return 3
    case 'medium':
      return 2
    case 'low':
      return 1
    default:
      return 0
  }
}

export default function TaskList({
  tasks,
  hasTasks,
  onToggleComplete,
  onDelete,
  onUpdate,
}: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const energyDiff = getEnergyScore(b.priority) - getEnergyScore(a.priority)

    if (energyDiff !== 0) {
      return energyDiff
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const hasMatchingResults = sortedTasks.length > 0
  const showNoMatchingState = hasTasks && !hasMatchingResults

  const emptyStateContent = showNoMatchingState
    ? {
        title: 'No matching tasks',
        description: 'Try a different search or filter.',
        tagline: 'Filter results',
      }
    : {
        title: 'No tasks yet',
        description: 'Create your first task and start making progress.',
        tagline: 'New beginnings',
      }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Tasks in focus</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">sorted by energy</span>
      </div>
      {hasMatchingResults ? (
        <div className="mt-4 space-y-3">
          {sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title={emptyStateContent.title}
            description={emptyStateContent.description}
            tagline={emptyStateContent.tagline}
            icon={
              showNoMatchingState ? (
                <Search className="h-6 w-6 text-slate-400" />
              ) : (
                <Sparkles className="h-6 w-6 text-emerald-300" />
              )
            }
          />
        </div>
      )}
    </section>
  )
}
