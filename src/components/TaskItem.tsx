import { Circle, Check, Clock3, Square } from 'lucide-react'

type TaskItemProps = {
  id: string
  title: string
  project: string
  time: string
  priority: 'low' | 'medium' | 'high'
}

const priorityColor: Record<TaskItemProps['priority'], string> = {
  low: 'bg-slate-600',
  medium: 'bg-amber-500',
  high: 'bg-emerald-400',
}

export default function TaskItem({ title, project, time, priority }: TaskItemProps) {
  return (
    <article className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-200">
      <div className="flex items-center gap-3">
        <button className="rounded-full border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition hover:border-emerald-400">
          <Square className="h-4 w-4" />
        </button>
        <div>
          <p className="text-base font-medium text-white">{title}</p>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{project}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em]">
        <div className="flex items-center gap-1">
          <Clock3 className="h-4 w-4 text-slate-500" />
          <span>{time}</span>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] ${priorityColor[priority]}`}>
          <Circle className="h-2 w-2" />
          {priority}
        </div>
        <button className="rounded-full border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition hover:border-rose-500">
          <Check className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
