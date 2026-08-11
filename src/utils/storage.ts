import type { Task } from '../types/task'

const TASKS_STORAGE_KEY = 'pulseboard:tasks'

const SAMPLE_TASKS: Task[] = [
  {
    id: 'task-landing-page',
    title: 'Finish landing page',
    description: 'Polish hero copy, responsive layout, and call-to-action buttons for launch.',
    completed: false,
    priority: 'high',
    createdAt: '2024-08-01T09:00:00.000Z',
  },
  {
    id: 'task-project-proposal',
    title: 'Review project proposal',
    description: 'Double-check timelines, dependencies, and budget before the stakeholder review.',
    completed: true,
    priority: 'medium',
    createdAt: '2024-07-30T14:30:00.000Z',
  },
  {
    id: 'task-read-pages',
    title: 'Read 20 pages',
    description: 'Cover the next chapter of the design systems reference book for inspiration.',
    completed: false,
    priority: 'low',
    createdAt: '2024-07-25T18:15:00.000Z',
  },
  {
    id: 'task-workout',
    title: 'Workout',
    description: 'Finish the HIIT routine and post-workout stretch for lasting energy.',
    completed: true,
    priority: 'medium',
    createdAt: '2024-07-29T07:10:00.000Z',
  },
  {
    id: 'task-plan-tomorrow',
    title: 'Plan tomorrow',
    description: 'Outline priorities and prep quick notes to hit the ground running in the morning.',
    completed: false,
    priority: 'high',
    createdAt: '2024-08-01T19:45:00.000Z',
  },
]

const isTask = (value: unknown): value is Task => {
  if (typeof value !== 'object' || value === null) return false
  const task = value as Task
  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    (typeof task.description === 'undefined' || typeof task.description === 'string') &&
    typeof task.completed === 'boolean' &&
    (task.priority === 'low' || task.priority === 'medium' || task.priority === 'high') &&
    typeof task.createdAt === 'string'
  )
}

const isTaskArray = (value: unknown): value is Task[] => {
  return Array.isArray(value) && value.every(isTask)
}

const cloneTasks = (tasks: Task[]): Task[] => tasks.map(task => ({ ...task }))

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Unable to persist tasks to localStorage', error)
  }
}

export const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return cloneTasks(SAMPLE_TASKS)

  const raw = localStorage.getItem(TASKS_STORAGE_KEY)
  if (!raw) return cloneTasks(SAMPLE_TASKS)

  try {
    const parsed = JSON.parse(raw)
    if (isTaskArray(parsed)) {
      return parsed
    }
  } catch (error) {
    console.warn('Unable to parse stored tasks, falling back to sample data', error)
  }

  return cloneTasks(SAMPLE_TASKS)
}
