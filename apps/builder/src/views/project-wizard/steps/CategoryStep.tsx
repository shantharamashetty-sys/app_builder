import { BarChart3, Check, Edit3, ShoppingBag, Sparkles, Toolbox, Users, type LucideIcon } from 'lucide-react'
import type { CategoryOption, ProjectWizardDraft } from '../../../models/ProjectWizard'
import StepCard from '../../../components/project-wizard/StepCard'

const CATEGORY_ICONS: Record<ProjectWizardDraft['category'], LucideIcon> = {
  dashboard: BarChart3,
  ecommerce: ShoppingBag,
  blog: Edit3,
  saas: Toolbox,
  social: Users,
  custom: Sparkles,
}

interface CategoryStepProps {
  categories: CategoryOption[]
  category: ProjectWizardDraft['category']
  setCategory: (category: ProjectWizardDraft['category']) => void
}

export default function CategoryStep({ categories, category, setCategory }: CategoryStepProps) {
  return (
    <StepCard title="Select App Category" subtitle="What kind of app are you building?">
      <div className="flex flex-col gap-3">
        {categories.map((option) => {
          const Icon = CATEGORY_ICONS[option.id]
          const isSelected = category === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setCategory(option.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border-2 p-5 text-left ${
                isSelected ? 'border-primary bg-primary-tint' : 'border-border bg-surface'
              }`}
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-tint">
                <Icon className="size-6 text-primary" />
              </div>
              <p className="flex-1 text-[15px] font-bold text-ink">{option.name}</p>
              {isSelected && <Check className="size-[18px] shrink-0 text-primary" />}
            </button>
          )
        })}
      </div>
    </StepCard>
  )
}
