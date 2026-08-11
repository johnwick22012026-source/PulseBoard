import { useMemo, useState } from 'react'
import type { Priority, Task, TaskMetrics } from './types/task'
import { loadTasks, saveTasks } from './utils/storage'
import type { TaskFormPayload } from './components/TaskForm'

import Header from './components/Header'
import GreetingSummary from './components/GreetingSummary'
import ProgressCard from './components/ProgressCard'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'

type TaskUpdatePayload = {
  title: string
  description?: string
  priority: Priority
}

type FilterOption = 'All' | 'Active' | 'Completed'

const TITLE_MAX_LENGTH = 100
const DESCRIPTION_MAX_LENGTH = 300

const sanitizeTitle = (title: string) => title.trim().slice(0, TITLE_MAX_LENGTH)
const sanitizeDescription = (description?: string) =>
  description?.trim().slice(0, DESCRIPTION_MAX_LENGTH)

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterOption>('All')

  const persistTasks = (updater: (prevTasks: Task[]) => Task[]) => {
    setTasks(prevTasks => {
      const updatedTasks = updater(prevTasks)
      saveTasks(updatedTasks)
      return updatedTasks
    })
  }

  const handleCreateTask = (payload: TaskFormPayload) => {
    const trimmedTitle = sanitizeTitle(payload.title)

    if (!trimmedTitle) {
      return
    }

    const sanitizedDescription = sanitizeDescription(payload.description)

    const newTask: Task = {
      title: trimmedTitle,
      description: sanitizedDescription,
      priority: payload.priority,
      project: '',
      time: '',
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    persistTasks(prevTasks => [...prevTasks, newTask])
  }

  const handleToggleComplete = (taskId: string) => {
    persistTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (taskId: string) => {
    persistTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const handleUpdateTask = (taskId: string, payload: TaskUpdatePayload) => {
    persistTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id !== taskId) {
          return task
        }

        const trimmedTitle = sanitizeTitle(payload.title)

        if (!trimmedTitle) {
          return task
        }

        const updatedDescription =
          payload.description === undefined ? task.description : sanitizeDescription(payload.description)

        return {
          ...task,
          title: trimmedTitle,
          priority: payload.priority,
          description: updatedDescription,
        }
      }),
    )
  }

  const normalizedQuery = useMemo(() => searchQuery.trim().toLowerCase(), [searchQuery])

  const metrics: TaskMetrics = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const highPriorityIncomplete = tasks.filter(
      task => task.priority === 'high' && !task.completed,
    ).length
    const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100)

    return {
      total,
      completed,
      active: total - completed,
      highPriorityIncomplete,
      progressPercent,
    }
  }, [tasks])

  const visibleTasks = useMemo(() => {
    let result = tasks

    if (filter === 'Active') {
      result = result.filter(task => !task.completed)
    } else if (filter === 'Completed') {
      result = result.filter(task => task.completed)
    }

    if (!normalizedQuery) {
      return result
    }

    return result.filter(task => {
      const titleMatches = task.title.toLowerCase().includes(normalizedQuery)
      const descriptionMatches = task.description?.toLowerCase().includes(normalizedQuery)
      return titleMatches || descriptionMatches
    })
  }, [tasks, filter, normalizedQuery])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-12">
        <Header />

        <div className="space-y-6">
          <GreetingSummary metrics={metrics} />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="transition-all duration-200">
              <ProgressCard completed={metrics.completed} total={metrics.total} />
            </div>
            <div className="transition-all duration-200">
              <TaskForm onSubmit={handleCreateTask} />
            </div>
          </div>

          <FilterBar
            activeFilter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />

          <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-4 transition-all duration-200">
            <TaskList
              tasks={visibleTasks}
              hasTasks={visibleTasks.length > 0}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
