import type { Task } from '../types/task'

const TASKS_STORAGE_KEY = 'pulseboard:tasks'

const SAMPLE_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Review Monday sprint goals',
    description:
      'Quickly audit the top priorities for the week and align with the team checklist.',
    completed: false,
    priority: 'high',
    createdAt: new Date().toISOString(),
    dueDate: undefined,
  },
  {
    id: 'task-2',
    title: 'Focus mode writing block',
    description: 'Draft the executive summary and inspiration memo for the new initiative.',
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    dueDate: undefined,
  },
  {
    id: 'task-3',
    title: 'Celebrate wins',
    description: 'Capture three small wins from last week and share them with the team.',
    completed: false,
    priority: 'low',
    createdAt: new Date().toISOString(),
    dueDate: undefined,
  },
]

const isTask = (value: unknown): value is Task => {
  if (typeof value !== 'object' || value === null) return false
  const task = value as Task
  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    typeof task.completed === 'boolean' &&
    (task.priority === 'low' || task.priority === 'medium' || task.priority === 'high') &&
    typeof task.createdAt === 'string'
  )
}

const isTaskArray = (value: unknown): value is Task[] => {
  return Array.isArray(value) && value.every(isTask)
}

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Unable to persist tasks to localStorage', error)
  }
}

export const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return SAMPLE_TASKS

  const raw = localStorage.getItem(TASKS_STORAGE_KEY)
  if (!raw) return SAMPLE_TASKS

  try {
    const parsed = JSON.parse(raw)
    if (isTaskArray(parsed)) {
      return parsed
    }
  } catch (error) {
    console.warn('Unable to parse stored tasks, falling back to sample data', error)
  }

  return SAMPLE_TASKS
}
