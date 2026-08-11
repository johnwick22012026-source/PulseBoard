import { useEffect, useMemo, useState } from 'react'
import type { Priority, Task, TaskMetrics } from './types/task'
import { loadTasks, saveTasks } from './utils/storage'
import type { ThemeMode } from './utils/storage'
import type { TaskFormPayload } from './components/TaskForm'

import Header from './components/Header'
import GreetingSummary from './components/GreetingSummary'
import ProgressCard from './components/ProgressCard'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import TaskCalendar from './components/TaskCalendar'
import TaskItem from './components/TaskItem'

type TaskUpdatePayload = {
  title: string
  description?: string
  priority: Priority
}

type FilterOption = 'All' | 'Active' | 'Completed'

type ProgressData = {
  total: number
  completed: number
  highPriorityIncomplete: number
  progressPercent: number
  message: string
}

const TITLE_MAX_LENGTH = 100
const DESCRIPTION_MAX_LENGTH = 300

const sanitizeTitle = (title: string) => title.trim().slice(0, TITLE_MAX_LENGTH)
const sanitizeDescription = (description?: string) =>
  description?.trim().slice(0, DESCRIPTION_MAX_LENGTH)

const getMotivationalMessage = (percent: number, total: number) => {
  if (total === 0 || percent === 0) {
    return 'Start knocking out tasks to see progress here.'
  }

  if (percent >= 100) {
    return 'Perfect score! Enjoy the break.'
  }

  if (percent >= 80) {
    return 'You are cruising — stay focused.'
  }

  if (percent >= 50) {
    return 'Great momentum. Keep pushing.'
  }

  return 'Let’s tackle the high-impact tasks first.'
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterOption>('All')
  const [theme, setTheme] = useState<ThemeMode>('dark')
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const persistTasks = (updater: (prevTasks: Task[]) => Task[]) => {
    setTasks(prevTasks => {
      const updatedTasks = updater(prevTasks)
      saveTasks(updatedTasks)
      return updatedTasks
    })
  }

  const handleToggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'))
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

  const handlePreviousMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleResetMonth = () => {
    const now = new Date()
    setCalendarMonth(new Date(now.getFullYear(), now.getMonth(), 1))
  }

  const handleCalendarTaskSelect = (taskId: string) => {
    const task = tasks.find(taskItem => taskItem.id === taskId)

    if (task?.date) {
      const [year, month] = task.date.split('-')
      setCalendarMonth(new Date(Number(year), Number(month) - 1, 1))
    }

    setSelectedTaskId(taskId)
  }

  useEffect(() => {
    if (selectedTaskId && !tasks.some(task => task.id === selectedTaskId)) {
      setSelectedTaskId(null)
    }
  }, [selectedTaskId, tasks])

  const selectedTask = useMemo(
    () => (selectedTaskId ? tasks.find(task => task.id === selectedTaskId) ?? null : null),
    [tasks, selectedTaskId],
  )

  const normalizedQuery = useMemo(() => searchQuery.trim().toLowerCase(), [searchQuery])

  const progressData = useMemo<ProgressData>(() => {
    const total = tasks.length
    let completed = 0
    let highPriorityIncomplete = 0

    tasks.forEach(task => {
      if (task.completed) {
        completed += 1
      } else if (task.priority === 'high') {
        highPriorityIncomplete += 1
      }
    })

    const rawPercent = total === 0 ? 0 : Math.round((completed / total) * 100)
    const progressPercent = Math.min(Math.max(rawPercent, 0), 100)
    const message = getMotivationalMessage(progressPercent, total)

    return {
      total,
      completed,
      highPriorityIncomplete,
      progressPercent,
      message,
    }
  }, [tasks])

  const metrics: TaskMetrics = useMemo(() => {
    const { total, completed, highPriorityIncomplete, progressPercent } = progressData

    return {
      total,
      completed,
      active: total - completed,
      highPriorityIncomplete,
      progressPercent,
    }
  }, [progressData])

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

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = theme
  }, [theme])

  const shellThemeClasses = theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'

  return (
    <div className={`min-h-screen ${shellThemeClasses}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 lg:px-12 xl:px-16">
        <Header theme={theme} onToggleTheme={handleToggleTheme} />

        <main className="mt-6 flex flex-col gap-6">
          <GreetingSummary metrics={metrics} />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-6">
              <ProgressCard
                completed={progressData.completed}
                total={progressData.total}
                progressPercent={progressData.progressPercent}
                message={progressData.message}
              />
              <FilterBar
                activeFilter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
              />
            </div>
            <TaskForm onSubmit={handleCreateTask} />
          </div>

          <TaskList
            tasks={visibleTasks}
            hasTasks={visibleTasks.length > 0}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <TaskCalendar
              tasks={tasks}
              month={calendarMonth}
              selectedTaskId={selectedTaskId}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
              onToday={handleResetMonth}
              onSelectTask={handleCalendarTaskSelect}
            />
            <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.5em] text-slate-500">Calendar focus</p>
                  <h3 className="text-lg font-semibold text-white">Task details</h3>
                </div>
              </div>
              <div className="mt-5">
                {selectedTask ? (
                  <TaskItem
                    task={selectedTask}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    onUpdate={handleUpdateTask}
                  />
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-700/60 px-4 py-6 text-sm text-slate-400">
                    Select a dated task from the calendar to view or edit it.
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
