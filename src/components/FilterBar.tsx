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
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
        <p>Filters</p>
        <p>Search</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {filters.map(filter => (
          <button
            key={filter}
            type="button"
            className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
              filter === activeFilter
                ? 'border-emerald-400 bg-emerald-500/10 text-emerald-200'
                : 'border-slate-800 bg-slate-950/40 text-white hover:border-emerald-400'
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
        <input
          type="search"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={event => onSearchQueryChange(event.target.value)}
          className="flex-1 min-w-[180px] rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
        />
      </div>
    </section>
  )
}
