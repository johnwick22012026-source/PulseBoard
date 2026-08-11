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

type FilterOption = 'All' | 'Active' | 'Completed'

const TITLE_MAX_LENGTH = 100
const DESCRIPTION_MAX_LENGTH = 300

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterOption>('All')

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const handleCreateTask = (payload: TaskFormPayload) => {
    const trimmedTitle = payload.title.trim().slice(0, TITLE_MAX_LENGTH)

    if (!trimmedTitle) {
      return
    }

    const trimmedDescription = payload.description?.trim()
    const clampedDescription = trimmedDescription
      ? trimmedDescription.slice(0, DESCRIPTION_MAX_LENGTH)
      : undefined

    const sanitizedPayload: TaskFormPayload = {
      title: trimmedTitle,
      priority: payload.priority,
    }

    if (clampedDescription) {
      sanitizedPayload.description = clampedDescription
    }

    const newTask: Task = {
      ...sanitizedPayload,
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
      prevTasks.map(task => {
        if (task.id !== taskId) {
          return task
        }

        const trimmedTitle = payload.title.trim().slice(0, TITLE_MAX_LENGTH)

        if (!trimmedTitle) {
          return task
        }

        const trimmedDescription = payload.description?.trim()
        const clampedDescription = trimmedDescription
          ? trimmedDescription.slice(0, DESCRIPTION_MAX_LENGTH)
          : undefined

        return {
          ...task,
          title: trimmedTitle,
          priority: payload.priority,
          description:
            payload.description === undefined
              ? task.description
              : clampedDescription || undefined,
        }
      }),
    )
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const completedTasks = useMemo(
    () => tasks.filter(task => task.completed).length,
    [tasks],
  )

  const highPriorityIncompleteTasks = useMemo(
    () => tasks.filter(task => task.priority === 'high' && !task.completed).length,
    [tasks],
  )

  const totalTasks = tasks.length
  const activeTasks = totalTasks - completedTasks
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  const filteredTasks = useMemo(() => {
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

  const shouldShowTasks = filteredTasks.length > 0
  const shouldShowEmptySearchState = totalTasks > 0 && filteredTasks.length === 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-12">
        <Header />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <GreetingSummary
              totalTasks={totalTasks}
              completedTasks={completedTasks}
              activeTasks={activeTasks}
              highPriorityIncompleteTasks={highPriorityIncompleteTasks}
              progressPercent={progressPercent}
            />
            <ProgressCard completed={completedTasks} total={totalTasks} />
            <TaskForm onSubmit={handleCreateTask} />
            <FilterBar
              activeFilter={filter}
              onFilterChange={setFilter}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />

            {shouldShowTasks ? (
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            ) : shouldShowEmptySearchState ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center">
                <p className="text-lg font-semibold text-slate-100">No tasks match that query.</p>
                <p className="mt-2 text-sm text-slate-400">
                  Try clearing the search or selecting a different filter to see your tasks again.
                </p>
              </div>
            ) : null}
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
