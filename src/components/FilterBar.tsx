const filters = ['All', 'Active', 'Completed'] as const

type FilterOption = (typeof filters)[number]

type FilterBarProps = {
  activeFilter: FilterOption
  onFilterChange: (filter: FilterOption) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

export default function FilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchQueryChange,
}: FilterBarProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/60">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-slate-500">
        <p>Filters</p>
        <p>Search</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {filters.map(filter => {
          const isActive = filter === activeFilter
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => onFilterChange(filter)}
              className={`rounded-2xl border px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
                isActive
                  ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200 shadow-[0_0_0_1px_rgba(16,185,129,0.5)]'
                  : 'border-slate-800 bg-slate-950/40 text-white hover:border-emerald-400'
              }`}
            >
              {filter}
            </button>
          )
        })}

        <label htmlFor="task-search" className="sr-only">
          Search tasks
        </label>
        <input
          id="task-search"
          type="search"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={event => onSearchQueryChange(event.target.value)}
          className="flex-1 min-w-[180px] rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 transition duration-150 focus:border-emerald-400 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        />
      </div>
    </section>
  )
}
