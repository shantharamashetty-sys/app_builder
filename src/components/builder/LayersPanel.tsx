import { useState } from 'react'
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Eye,
  File,
  Gauge,
  Grid3x3,
  Image as ImageIcon,
  Layers as LayersIcon,
  LineChart,
  List,
  Lock,
  MousePointerClick,
  PieChart,
  Plus,
  Rows3,
  Search,
  Square,
  Table,
  TextCursorInput,
  Type,
} from 'lucide-react'
import type { Widget, WidgetType } from '../../models'

interface LayersPanelProps {
  widgets: Widget[]
  selectedWidgetId: string | null
  onSelect: (widgetId: string) => void
}

const typeIcons: Record<WidgetType, typeof Square> = {
  container: Square,
  grid: Grid3x3,
  stack: LayersIcon,
  row: Rows3,
  button: MousePointerClick,
  input: TextCursorInput,
  text: Type,
  image: ImageIcon,
  card: CreditCard,
  table: Table,
  list: List,
  'bar-chart': BarChart3,
  'line-chart': LineChart,
  'pie-chart': PieChart,
  'stat-card': Gauge,
}

const INDENT_STEP = 16

interface LayerRowProps {
  widget: Widget
  depth: number
  selectedWidgetId: string | null
  onSelect: (widgetId: string) => void
}

function LayerRow({ widget, depth, selectedWidgetId, onSelect }: LayerRowProps) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = !!widget.children?.length
  const isSelected = widget.id === selectedWidgetId
  const Icon = typeIcons[widget.type] ?? Square

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(widget.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') onSelect(widget.id)
        }}
        style={{ paddingLeft: 8 + depth * INDENT_STEP }}
        className={`group flex h-8 w-full shrink-0 cursor-pointer items-center gap-1.5 rounded pr-2 ${
          isSelected ? 'bg-primary-tint' : 'hover:bg-canvas'
        }`}
      >
        {hasChildren ? (
          <button
            type="button"
            aria-label={expanded ? 'Collapse layer' : 'Expand layer'}
            onClick={(event) => {
              event.stopPropagation()
              setExpanded((value) => !value)
            }}
            className={`flex size-3 shrink-0 items-center justify-center ${isSelected ? 'text-primary' : 'text-muted'}`}
          >
            {expanded ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
          </button>
        ) : (
          <span className="block size-3 shrink-0" />
        )}
        <Icon className={`size-3.5 shrink-0 ${isSelected ? 'text-primary' : 'text-muted'}`} />
        <p
          className={`flex-1 truncate text-[13px] ${isSelected ? 'font-semibold text-primary' : 'text-ink'}`}
        >
          {widget.name}
        </p>
        <div
          className={`flex shrink-0 items-center gap-1.5 ${
            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <Eye className="size-3 text-muted" />
          <Lock className="size-3 text-muted" />
        </div>
      </div>
      {hasChildren && expanded && (
        <div>
          {widget.children!.map((child) => (
            <LayerRow
              key={child.id}
              widget={child}
              depth={depth + 1}
              selectedWidgetId={selectedWidgetId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function LayersPanel({ widgets, selectedWidgetId, onSelect }: LayersPanelProps) {
  return (
    <div className="flex h-full w-[268px] shrink-0 flex-col border-r border-border bg-surface">
      <div className="px-3 pt-3">
        <p className="text-xs font-bold text-ink">LAYERS</p>
      </div>
      <div className="px-3 py-3">
        <div className="flex items-center gap-2 rounded-md border border-border bg-canvas px-2.5 py-2">
          <Search className="size-3.5 shrink-0 text-muted" />
          <input
            type="text"
            placeholder="Search layers..."
            className="w-full bg-transparent text-[13px] text-ink placeholder:text-muted focus:outline-none"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-3">
        <div className="mb-0.5 flex h-8 shrink-0 items-center gap-1.5 rounded px-2 text-ink">
          <span className="block size-3 shrink-0" />
          <File className="size-3.5 shrink-0 text-muted" />
          <p className="flex-1 truncate text-[13px]">Page: Dashboard</p>
        </div>
        <div className="flex flex-col gap-0.5">
          {widgets.map((widget) => (
            <LayerRow
              key={widget.id}
              widget={widget}
              depth={0}
              selectedWidgetId={selectedWidgetId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 border-t border-border p-3">
        <Plus className="size-3.5 text-primary" />
        <p className="text-[13px] font-semibold text-primary">Add Layer</p>
      </div>
    </div>
  )
}
