import { useEffect, useMemo, useState } from 'react'
import type { Priority, Task } from './types/task'
import { loadTasks, saveTasks } from './utils/storage'
import type { TaskFormPayload } from './components/TaskForm'

import Header from './components/Header'
import GreetingSummary from './components/GreetingSummary'
import ProgressCard from './components/ProgressCard'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import EmptyState from './components/EmptyState'

type TaskUpdatePayload = {
  title: string
  description?: string
  priority: Priority
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const handleCreateTask = (payload: TaskFormPayload) => {
    const newTask: Task = {
      ...payload,
      project: '',
      time: '',
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const handleToggleComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const handleUpdateTask = (taskId: string, payload: TaskUpdatePayload) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              title: payload.title,
              priority: payload.priority,
              description: payload.description?.trim() ?? undefined,
            }
          : task,
      ),
    )
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()
  const filteredTasks = useMemo(() => {
    if (!normalizedQuery) {
      return tasks
    }

    return tasks.filter(task => {
      const titleMatches = task.title.toLowerCase().includes(normalizedQuery)
      const descriptionMatches = task.description?.toLowerCase().includes(normalizedQuery)
      return titleMatches || descriptionMatches
    })
  }, [normalizedQuery, tasks])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-12">
        <Header />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <GreetingSummary />
            <ProgressCard />
            <TaskForm onSubmit={handleCreateTask} />
            <FilterBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          </div>

          {tasks.length === 0 && (
            <aside className="space-y-6">
              <EmptyState />
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
