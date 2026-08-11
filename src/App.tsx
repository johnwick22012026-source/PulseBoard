import { useEffect, useState } from 'react'
import type { Task } from './types/task'
import { loadTasks, saveTasks } from './utils/storage'
import type { TaskFormPayload } from './components/TaskForm'

import Header from './components/Header'
import GreetingSummary from './components/GreetingSummary'
import ProgressCard from './components/ProgressCard'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import EmptyState from './components/EmptyState'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-12">
        <Header />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <GreetingSummary />
            <ProgressCard />
            <TaskForm onSubmit={handleCreateTask} />
            <FilterBar />
            {/* Render TaskList with tasks so that it displays when tasks exist */}
            <TaskList tasks={tasks} />
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
