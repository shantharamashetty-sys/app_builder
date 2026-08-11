import { useState, type ReactNode } from 'react'
import {
  Activity,
  Box,
  ChevronDown,
  DollarSign,
  Settings,
  ShoppingCart,
  Square,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { Widget } from '../../models'

interface PropertiesPanelProps {
  widget: Widget | undefined
  onChangePropsAction: (props: Record<string, unknown>) => void
}

export default function PropertiesPanel({ widget, onChangePropsAction }: PropertiesPanelProps) {
  if (!widget) {
    return (
      <aside className="flex h-full w-[300px] shrink-0 flex-col items-center justify-center border-l border-border bg-surface p-6 text-center">
        <p className="text-sm text-muted">Select an element to edit its properties.</p>
      </aside>
    )
  }

  switch (widget.type) {
    case 'stat-card':
      return <StatCardProperties widget={widget} onChangePropsAction={onChangePropsAction} />
    case 'button':
      return <ButtonProperties widget={widget} onChangePropsAction={onChangePropsAction} />
    default:
      return <FrameProperties widget={widget} onChangePropsAction={onChangePropsAction} />
  }
}

function getStringProp(props: Record<string, unknown>, key: string, fallback: string): string {
  const value = props[key]
  return typeof value === 'string' ? value : fallback
}

function PanelShell({ children }: { children: ReactNode }) {
  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col overflow-y-auto border-l border-border bg-surface">
      {children}
    </aside>
  )
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[11px] font-bold tracking-wide text-muted uppercase">{label}</p>
      <ChevronDown className="size-3 text-muted" />
    </div>
  )
}

function FieldLabel({ label }: { label: string }) {
  return <p className="text-[10px] font-semibold tracking-wide text-muted uppercase">{label}</p>
}

function ValueTag({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange?: (value: string) => void
  disabled?: boolean
}) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className="w-full rounded-md border border-border bg-canvas px-2.5 py-2 font-mono text-xs text-ink outline-none focus:border-primary disabled:text-muted"
    />
  )
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
        checked ? 'bg-primary' : 'bg-border'
      }`}
    >
      <span
        className={`size-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  )
}

function TabRow<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: T; label: string }[]
  active: T
  onChange: (id: T) => void
}) {
  return (
    <div className="flex w-full border-b border-border">
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex-1 border-b-2 py-2.5 text-xs whitespace-nowrap ${
              isActive ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

// Fallback for every widget type without a dedicated variant (container, grid, stack,
// row, input, text, image, card, table, list, and the chart types) — a generic Frame
// editor matching the design system's default properties panel.
function FrameProperties({ widget, onChangePropsAction }: PropertiesPanelProps & { widget: Widget }) {
  const [shadowOn, setShadowOn] = useState(false)
  const [border, setBorder] = useState({ width: '2', radius: '20' })
  const [padding, setPadding] = useState({ t: '24', b: '24', l: '24', r: '24' })

  const fill = getStringProp(widget.props, 'fill', '#f9fafb')

  return (
    <PanelShell>
      <div className="flex items-center justify-between border-b border-border p-4">
        <p className="text-[13px] font-bold text-muted">PROPERTIES</p>
      </div>

      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Square className="size-4 text-primary" />
        <p className="text-sm font-bold text-ink">{widget.name}</p>
      </div>

      <div className="flex flex-col gap-5 p-4">
        <div className="flex flex-col gap-3">
          <SectionHeader label="Position" />
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <FieldLabel label="X" />
              <ValueTag value={`${widget.position.x}px`} disabled />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel label="Y" />
              <ValueTag value={`${widget.position.y}px`} disabled />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel label="W" />
              <ValueTag value={`${widget.position.width}px`} disabled />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel label="H" />
              <ValueTag value={`${widget.position.height}px`} disabled />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SectionHeader label="Fill" />
          <div className="flex items-center gap-2">
            <span
              className="size-8 shrink-0 rounded-md border border-border"
              style={{ backgroundColor: fill }}
            />
            <div className="flex-1">
              <FieldLabel label="Hex" />
              <ValueTag value={fill} onChange={(value) => onChangePropsAction({ fill: value })} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SectionHeader label="Border" />
          <div className="flex items-center gap-2">
            <span className="size-8 shrink-0 rounded-md bg-primary" />
            <div className="flex-1">
              <FieldLabel label="Width" />
              <ValueTag value={border.width} onChange={(value) => setBorder((b) => ({ ...b, width: value }))} />
            </div>
            <div className="flex-1">
              <FieldLabel label="Radius" />
              <ValueTag value={border.radius} onChange={(value) => setBorder((b) => ({ ...b, radius: value }))} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SectionHeader label="Padding" />
          <div className="grid grid-cols-4 gap-2">
            {(['t', 'b', 'l', 'r'] as const).map((side) => (
              <div key={side} className="flex flex-col gap-1">
                <FieldLabel label={side.toUpperCase()} />
                <ValueTag value={padding[side]} onChange={(value) => setPadding((p) => ({ ...p, [side]: value }))} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold tracking-wide text-muted uppercase">Shadow</p>
          <ToggleSwitch checked={shadowOn} onChange={setShadowOn} />
        </div>
      </div>
    </PanelShell>
  )
}

const statCardIconMap: Record<string, LucideIcon> = {
  'dollar-sign': DollarSign,
  'trending-up': TrendingUp,
  users: Users,
  activity: Activity,
  'shopping-cart': ShoppingCart,
}

type StatCardTab = 'style' | 'data' | 'events'

function StatCardProperties({ widget, onChangePropsAction }: PropertiesPanelProps & { widget: Widget }) {
  const [tab, setTab] = useState<StatCardTab>('style')
  const [shadowOn, setShadowOn] = useState(false)

  const title = getStringProp(widget.props, 'title', '')
  const value = getStringProp(widget.props, 'value', '')
  const trend = getStringProp(widget.props, 'trend', '')
  const icon = getStringProp(widget.props, 'icon', 'dollar-sign')
  const IconPreview = statCardIconMap[icon] ?? DollarSign

  return (
    <PanelShell>
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Box className="size-4 text-muted" />
          <p className="text-[13px] font-bold text-ink">Stat Card</p>
        </div>
        <Settings className="size-4 text-muted" />
      </div>

      <TabRow
        tabs={[
          { id: 'style', label: 'Style' },
          { id: 'data', label: 'Data' },
          { id: 'events', label: 'Events' },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === 'style' && (
        <div className="flex flex-col gap-5 p-4">
          <div className="flex flex-col gap-3">
            <SectionHeader label="Appearance" />
            <div className="flex items-center justify-between">
              <p className="w-20 text-xs text-muted">Fill</p>
              <div className="flex items-center gap-2">
                <span className="size-5 rounded border border-primary bg-primary-tint" />
                <span className="font-mono text-[11px] text-ink">#F1EFFE</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-20 text-xs text-muted">Shadow</p>
              <ToggleSwitch checked={shadowOn} onChange={setShadowOn} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SectionHeader label="Component Props" />
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted">Title</p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => onChangePropsAction({ title: e.target.value })}
                  className="rounded-md border border-border bg-canvas px-2 py-2 text-xs text-ink outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted">Value</p>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => onChangePropsAction({ value: e.target.value })}
                  className="rounded-md border border-border bg-canvas px-2 py-2 text-xs text-ink outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted">Trend</p>
                <input
                  type="text"
                  value={trend}
                  onChange={(e) => onChangePropsAction({ trend: e.target.value })}
                  className="rounded-md border border-border bg-canvas px-2 py-2 text-xs text-ink outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted">Icon</p>
                <div className="flex items-center gap-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-canvas">
                    <IconPreview className="size-4 text-ink" />
                  </span>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => onChangePropsAction({ icon: e.target.value })}
                    className="flex-1 rounded-md border border-border bg-canvas px-2 py-2 text-xs text-ink outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'data' && (
        <div className="p-4">
          <p className="text-xs text-muted">No data bindings yet.</p>
        </div>
      )}

      {tab === 'events' && (
        <div className="p-4">
          <p className="text-xs text-muted">No events yet.</p>
        </div>
      )}
    </PanelShell>
  )
}

type ButtonTab = 'style' | 'data'
type DisplayMode = 'Flex' | 'Block' | 'Grid'

function ButtonProperties({ widget, onChangePropsAction }: PropertiesPanelProps & { widget: Widget }) {
  const [tab, setTab] = useState<ButtonTab>('style')
  const [display, setDisplay] = useState<DisplayMode>('Flex')
  const [size, setSize] = useState({ width: '200', height: '48' })
  const [opacity, setOpacity] = useState(100)
  const [borderProps, setBorderProps] = useState({ width: '0', radius: '12' })

  const label = getStringProp(widget.props, 'label', 'Button')
  const bg = getStringProp(widget.props, 'bg', '#5b4be0')

  return (
    <PanelShell>
      <div className="border-b border-border p-4">
        <p className="text-[13px] font-bold text-ink">Button</p>
      </div>

      <TabRow
        tabs={[
          { id: 'style', label: 'Style' },
          { id: 'data', label: 'Data' },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === 'style' && (
        <div className="flex flex-col gap-5 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted">Label</p>
            <input
              type="text"
              value={label}
              onChange={(e) => onChangePropsAction({ label: e.target.value })}
              className="rounded-md border border-border bg-canvas px-2 py-2 text-xs text-ink outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-3">
            <SectionHeader label="Layout" />
            <div className="flex items-center justify-between">
              <p className="w-20 text-xs text-muted">Display</p>
              <div className="flex gap-1">
                {(['Flex', 'Block', 'Grid'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setDisplay(mode)}
                    className={`rounded px-2 py-1 text-[11px] font-semibold ${
                      display === mode ? 'bg-primary text-white' : 'border border-border bg-canvas text-muted'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="w-20 text-xs text-muted">Size</p>
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  value={size.width}
                  onChange={(e) => setSize((s) => ({ ...s, width: e.target.value }))}
                  className="w-full rounded-md border border-border bg-canvas px-2 py-1.5 font-mono text-[11px] text-ink outline-none focus:border-primary"
                />
                <input
                  type="text"
                  value={size.height}
                  onChange={(e) => setSize((s) => ({ ...s, height: e.target.value }))}
                  className="w-full rounded-md border border-border bg-canvas px-2 py-1.5 font-mono text-[11px] text-ink outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SectionHeader label="Appearance" />
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bg}
                onChange={(e) => onChangePropsAction({ bg: e.target.value })}
                className="size-5 shrink-0 cursor-pointer rounded border border-border p-0"
              />
              <div className="flex flex-1 items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-border">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${opacity}%` }} />
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-10 shrink-0 rounded-md border border-border bg-canvas px-1 py-0.5 text-right font-mono text-[10px] text-ink outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border px-2.5 py-2">
              <p className="text-xs text-ink">Solid</p>
              <ChevronDown className="size-3 text-muted" />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={borderProps.width}
                onChange={(e) => setBorderProps((b) => ({ ...b, width: e.target.value }))}
                className="w-full rounded-md border border-border bg-canvas px-2 py-1.5 font-mono text-[11px] text-ink outline-none focus:border-primary"
              />
              <input
                type="text"
                value={borderProps.radius}
                onChange={(e) => setBorderProps((b) => ({ ...b, radius: e.target.value }))}
                className="w-full rounded-md border border-border bg-canvas px-2 py-1.5 font-mono text-[11px] text-ink outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <SectionHeader label="Typography" />
            <div className="flex items-center justify-between rounded-md border border-border px-2.5 py-2">
              <p className="text-xs text-ink">Inter</p>
              <ChevronDown className="size-3 text-muted" />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border px-2.5 py-2">
              <p className="text-xs text-ink">600 SemiBold</p>
              <ChevronDown className="size-3 text-muted" />
            </div>
          </div>
        </div>
      )}

      {tab === 'data' && (
        <div className="p-4">
          <p className="text-xs text-muted">No data bindings yet.</p>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 border-t border-border p-4">
        <button type="button" className="cursor-default rounded-md bg-ink py-2.5 text-[13px] font-semibold text-white">
          Copy CSS
        </button>
        <button type="button" className="cursor-default py-1 text-center text-[13px] font-semibold text-muted">
          Reset
        </button>
      </div>
    </PanelShell>
  )
}
