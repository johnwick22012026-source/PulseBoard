import TaskItem from './TaskItem'

const placeholderTasks: {
  id: string
  title: string
  project: string
  time: string
  priority: 'low' | 'medium' | 'high'
}[] = [
  { id: '1', title: 'Review sprint goals', project: 'PulseBoard', time: '10 min', priority: 'high' },
  { id: '2', title: 'Design icon set', project: 'Visuals', time: '25 min', priority: 'medium' },
  { id: '3', title: 'Stretch break', project: 'Wellness', time: '5 min', priority: 'low' },
]

export default function TaskList() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Tasks in focus</h3>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">sorted by energy</span>
      </div>
      <div className="mt-4 space-y-3">
        {placeholderTasks.map((task) => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
    </section>
  )
}
