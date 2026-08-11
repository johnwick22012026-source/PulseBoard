export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  description?: string
  project: string
  time: string
  priority: Priority
  completed: boolean
  createdAt: string
}
