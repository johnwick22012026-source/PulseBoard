import { Smile } from 'lucide-react'

export default function EmptyState() {
  return (
    <section className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/50 p-6 text-center text-slate-400">
      <Smile className="mx-auto h-12 w-12 text-emerald-400" />
      <p className="mt-4 text-sm uppercase tracking-[0.4em] text-slate-500">No distractions</p>
      <h3 className="mt-3 text-xl font-semibold text-white">Ready when you are</h3>
      <p className="mt-2 text-sm text-slate-400">
        Build your first focus sprint or open the quick add to organize what's next.
      </p>
      <div className="mt-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-500">
        <span className="h-px w-8 bg-slate-800" aria-hidden="true" />
        <span>Moment of calm</span>
        <span className="h-px w-8 bg-slate-800" aria-hidden="true" />
      </div>
    </section>
  )
}
