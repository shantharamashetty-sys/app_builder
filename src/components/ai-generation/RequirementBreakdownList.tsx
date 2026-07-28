import type { RequirementBreakdownGroup } from '../../models/AppGeneration'

const CATEGORY_LABEL_CLASS: Record<RequirementBreakdownGroup['category'], string> = {
  'core-features': 'text-primary',
  'user-roles': 'text-success',
  'data-models': 'text-amber-400',
  integrations: 'text-primary',
}

interface RequirementBreakdownListProps {
  groups: RequirementBreakdownGroup[]
}

export default function RequirementBreakdownList({ groups }: RequirementBreakdownListProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {groups.map((group) => (
        <div
          key={group.id}
          className="w-full rounded-xl border-l-2 border-primary bg-white/5 p-4"
        >
          <p
            className={`text-[11px] font-bold tracking-wide uppercase ${CATEGORY_LABEL_CLASS[group.category]}`}
          >
            {group.category === 'integrations' ? 'External' : group.category.replace('-', ' ')}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{group.label}</p>
          <ul className="mt-2 flex flex-col gap-1">
            {group.items.map((item) => (
              <li key={item} className="text-sm text-white/60">
                · {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
