import {
  BarChart3,
  CreditCard,
  Grid3x3,
  Image,
  LayoutDashboard,
  Layers,
  LineChart,
  List,
  MousePointerClick,
  PieChart,
  Rows3,
  Search,
  Square,
  Table,
  TextCursorInput,
  Type,
  type LucideIcon,
} from 'lucide-react'
import type { WidgetLibraryCategory, WidgetLibraryItem, WidgetType } from '../../models'

interface WidgetLibraryPanelProps {
  items: WidgetLibraryItem[]
  category: WidgetLibraryCategory | 'all'
  onCategoryChange: (category: WidgetLibraryCategory | 'all') => void
  search: string
  onSearchChange: (search: string) => void
  onInsert: (item: WidgetLibraryItem) => void
}

const WIDGET_ICONS: Record<WidgetType, LucideIcon> = {
  container: Square,
  grid: Grid3x3,
  stack: Layers,
  row: Rows3,
  button: MousePointerClick,
  input: TextCursorInput,
  text: Type,
  image: Image,
  card: CreditCard,
  table: Table,
  list: List,
  'bar-chart': BarChart3,
  'line-chart': LineChart,
  'pie-chart': PieChart,
  'stat-card': LayoutDashboard,
}

const CATEGORY_FILTERS: { value: WidgetLibraryCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'layout', label: 'Layout' },
  { value: 'ui', label: 'UI' },
  { value: 'data', label: 'Data' },
  { value: 'charts', label: 'Charts' },
]

const GROUP_ORDER: WidgetLibraryCategory[] = ['layout', 'ui', 'data', 'charts']

const GROUP_LABELS: Record<WidgetLibraryCategory, string> = {
  layout: 'Layout',
  ui: 'UI Elements',
  data: 'Data',
  charts: 'Charts',
}

export default function WidgetLibraryPanel({
  items,
  category,
  onCategoryChange,
  search,
  onSearchChange,
  onInsert,
}: WidgetLibraryPanelProps) {
  const groups = GROUP_ORDER.map((groupCategory) => ({
    category: groupCategory,
    items: items.filter((item) => item.category === groupCategory),
  })).filter((group) => group.items.length > 0)

  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex shrink-0 flex-col gap-3 border-b border-border p-4">
        <h2 className="text-lg font-extrabold text-ink">Widgets</h2>
        <div className="flex h-11 items-center gap-3 rounded-xl border border-border bg-canvas px-4">
          <Search className="size-[18px] shrink-0 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search components..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = category === filter.value
            return (
              <button
                key={filter.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => onCategoryChange(filter.value)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                  isActive ? 'bg-primary text-white' : 'bg-canvas text-muted hover:text-ink'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
        {items.length === 0 ? (
          <p className="py-8 text-center text-xs text-muted">No widgets found.</p>
        ) : (
          groups.map((group) => (
            <div key={group.category} className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                {GROUP_LABELS[group.category]}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {group.items.map((item) => {
                  const Icon = WIDGET_ICONS[item.type] ?? Square
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onInsert(item)}
                      className="group flex flex-col items-center gap-1.5 rounded-xl p-2 text-center"
                    >
                      <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-canvas text-ink transition-colors group-hover:border-primary group-hover:bg-primary-tint group-hover:text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="w-full truncate text-[11px] text-muted">{item.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}
