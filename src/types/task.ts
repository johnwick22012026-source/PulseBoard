export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  project?: string
  time?: string
  completed: boolean
  createdAt: string
}

export type TaskMetrics = {
  total: number
  completed: number
  active: number
  highPriorityIncomplete: number
  progressPercent: number
}
