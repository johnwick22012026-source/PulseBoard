const filters = ['All', 'Active', 'Completed']

export default function FilterBar() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
        <p>Filters</p>
        <p>Search</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            className="rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm font-medium text-white transition hover:border-emerald-400"
            type="button"
          >
            {filter}
          </button>
        ))}
        <input
          type="search"
          placeholder="Search tasks"
          className="flex-1 min-w-[180px] rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
        />
      </div>
    </section>
  )
}
