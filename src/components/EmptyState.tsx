import { Smile } from 'lucide-react'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  title?: string
  description?: string
  tagline?: string
  icon?: ReactNode
}

export default function EmptyState({
  title = 'Ready when you are',
  description = 'Build your first focus sprint or open the quick add to organize what’s next.',
  tagline = 'Moment of calm',
  icon,
}: EmptyStateProps) {
  return (
    <section className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/50 p-6 text-center text-slate-400">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/50 text-emerald-400 shadow-inner">
        {icon ?? <Smile className="h-6 w-6" />}
      </div>
      <p className="mt-4 text-sm uppercase tracking-[0.4em] text-slate-500">{tagline}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <div className="mt-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500">
        <span className="h-px w-8 bg-slate-800" aria-hidden="true" />
        <span>{tagline}</span>
        <span className="h-px w-8 bg-slate-800" aria-hidden="true" />
      </div>
    </section>
  )
}
