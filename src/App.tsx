import { useEffect, useRef, useState } from 'react'
import type { Task } from './types/task'
import { loadTasks, saveTasks } from './utils/storage'

import Header from './components/Header'
import GreetingSummary from './components/GreetingSummary'
import ProgressCard from './components/ProgressCard'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import EmptyState from './components/EmptyState'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const isInitialMount = useRef(true)

  useEffect(() => {
    setTasks(loadTasks())
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    saveTasks(tasks)
  }, [tasks])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 lg:px-12">
        <Header />

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <GreetingSummary />
            <ProgressCard />
            <TaskForm />
            <FilterBar />
            <TaskList />
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
