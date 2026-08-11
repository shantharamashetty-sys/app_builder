import { BarChart3, Image as ImageIcon, LineChart, PieChart } from 'lucide-react'
import type { Widget, WidgetType } from '../../models'

interface BuilderCanvasProps {
  widgets: Widget[]
  selectedWidgetId: string | null
  onSelectWidget: (widgetId: string | null) => void
  zoomPercent: number
}

const STRUCTURAL_TYPES = new Set<WidgetType>(['container', 'grid', 'stack', 'row'])

const CANVAS_MIN_WIDTH = 1600
const CANVAS_MIN_HEIGHT = 1200
const CANVAS_PADDING = 200

function flattenWidgets(widgets: Widget[]): Widget[] {
  const flat: Widget[] = []
  const visit = (widget: Widget) => {
    flat.push(widget)
    widget.children?.forEach(visit)
  }
  widgets.forEach(visit)
  return flat
}

function renderWidgetBody(widget: Widget) {
  const { props } = widget

  switch (widget.type) {
    case 'text': {
      const label = typeof props.label === 'string' ? props.label : widget.name
      return <p className="truncate px-3 py-2 text-sm text-ink">{label}</p>
    }
    case 'stat-card': {
      const title = typeof props.title === 'string' ? props.title : undefined
      const value = typeof props.value === 'string' || typeof props.value === 'number' ? props.value : undefined
      return (
        <div className="flex h-full flex-col gap-2 p-4">
          {title ? <p className="text-xs font-medium text-muted">{title}</p> : <div className="h-3 w-20 rounded bg-border" />}
          {value !== undefined ? (
            <p className="truncate text-2xl font-bold text-ink">{value}</p>
          ) : (
            <div className="h-6 w-16 rounded bg-border" />
          )}
        </div>
      )
    }
    case 'button': {
      const label = typeof props.label === 'string' ? props.label : widget.name
      return (
        <div className="flex h-full items-center justify-center px-2">
          <span className="truncate rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">{label}</span>
        </div>
      )
    }
    case 'input': {
      const placeholder = typeof props.placeholder === 'string' ? props.placeholder : widget.name
      return (
        <div className="flex h-full items-center px-3">
          <span className="truncate text-sm text-muted">{placeholder}</span>
        </div>
      )
    }
    case 'image':
      return (
        <div className="flex h-full items-center justify-center">
          <ImageIcon className="size-6 text-muted" />
        </div>
      )
    case 'table':
      return (
        <div className="flex h-full flex-col gap-2.5 p-3">
          <div className="h-2 w-1/3 rounded bg-border" />
          {[0, 1, 2].map((row) => (
            <div key={row} className="h-px w-full bg-border" />
          ))}
        </div>
      )
    case 'list':
      return (
        <div className="flex h-full flex-col justify-center gap-2 p-3">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-muted" />
              <span className="h-2 w-2/3 rounded bg-border" />
            </div>
          ))}
        </div>
      )
    case 'bar-chart':
      return (
        <div className="flex h-full items-center justify-center">
          <BarChart3 className="size-6 text-muted" />
        </div>
      )
    case 'line-chart':
      return (
        <div className="flex h-full items-center justify-center">
          <LineChart className="size-6 text-muted" />
        </div>
      )
    case 'pie-chart':
      return (
        <div className="flex h-full items-center justify-center">
          <PieChart className="size-6 text-muted" />
        </div>
      )
    case 'card':
      return <div className="h-full w-full" />
    default:
      return (
        <span className="absolute left-2 top-2 text-[10px] font-medium uppercase tracking-wide text-muted">
          {widget.name}
        </span>
      )
  }
}

interface WidgetBoxProps {
  widget: Widget
  isSelected: boolean
  onSelect: (widgetId: string) => void
}

function WidgetBox({ widget, isSelected, onSelect }: WidgetBoxProps) {
  const structural = STRUCTURAL_TYPES.has(widget.type)

  const borderClasses = isSelected
    ? 'border-2 border-primary'
    : structural
      ? 'border border-dashed border-border'
      : 'border border-border'
  const fillClasses = structural ? 'bg-transparent' : 'bg-surface shadow-sm'

  return (
    <div
      className={`absolute cursor-pointer overflow-hidden rounded-[20px] ${fillClasses} ${borderClasses}`}
      style={{
        left: widget.position.x,
        top: widget.position.y,
        width: widget.position.width,
        height: widget.position.height,
      }}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(widget.id)
      }}
    >
      {renderWidgetBody(widget)}
      {isSelected && (
        <>
          <span className="absolute -left-1 -top-1 size-2 rounded-[2px] border-[1.5px] border-primary bg-white" />
          <span className="absolute -right-1 -top-1 size-2 rounded-[2px] border-[1.5px] border-primary bg-white" />
          <span className="absolute -bottom-1 -left-1 size-2 rounded-[2px] border-[1.5px] border-primary bg-white" />
          <span className="absolute -bottom-1 -right-1 size-2 rounded-[2px] border-[1.5px] border-primary bg-white" />
        </>
      )}
    </div>
  )
}

export default function BuilderCanvas({ widgets, selectedWidgetId, onSelectWidget, zoomPercent }: BuilderCanvasProps) {
  const flatWidgets = flattenWidgets(widgets)
  const contentWidth = Math.max(CANVAS_MIN_WIDTH, ...flatWidgets.map((w) => w.position.x + w.position.width)) + CANVAS_PADDING
  const contentHeight = Math.max(CANVAS_MIN_HEIGHT, ...flatWidgets.map((w) => w.position.y + w.position.height)) + CANVAS_PADDING

  return (
    <div
      className="relative flex-1 overflow-auto"
      style={{
        backgroundColor: 'var(--color-canvas)',
        backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      onClick={() => onSelectWidget(null)}
    >
      <div
        className="relative"
        style={{
          width: contentWidth,
          height: contentHeight,
          transform: `scale(${zoomPercent / 100})`,
          transformOrigin: 'top left',
        }}
      >
        {flatWidgets.map((widget) => (
          <WidgetBox
            key={widget.id}
            widget={widget}
            isSelected={widget.id === selectedWidgetId}
            onSelect={onSelectWidget}
          />
        ))}
      </div>
    </div>
  )
}
