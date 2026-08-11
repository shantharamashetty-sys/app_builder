import { CreditCard, FileText, MessageCircle, UserPlus, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from '../../components/ProjectCard'
import StatCard from '../../components/StatCard'
import OverallProgressRing from '../../components/OverallProgressRing'

const QUICK_ACTIONS = [
  { label: 'Invite Team Member', icon: UserPlus },
  { label: 'Explore API Docs', icon: FileText },
  { label: 'Community Forum', icon: MessageCircle },
]

const DEPLOYMENT_HEALTH_PERCENT = 88

/**
 * Reference view for the MVC pattern: composes presentational components
 * (StatCard, ProjectCard) fed by a controller hook (useProjects). No service
 * imports and no fetch logic live here — that all belongs to the hook/service
 * layers. Stats/quick-actions/deployment health are static design content,
 * not yet backed by a model — no module in the spec owns them yet.
 */
export default function DashboardView() {
  const { projects, isLoading, error } = useProjects()
  const navigate = useNavigate()

  return (
    <div className="flex w-full flex-col gap-6 sm:gap-8">
      <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold text-ink sm:text-[28px]">Hello, Creative Studio</p>
          <p className="text-sm text-muted sm:text-[15px]">
            Welcome back to your app command center.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/projects/new')}
          className="w-full shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white sm:w-auto"
        >
          + Create New App
        </button>
      </div>

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
        <StatCard
          label="Total Users"
          value="12,482"
          delta="+14.2%"
          deltaColorClassName="text-primary"
          tintClassName="bg-primary-tint"
          icon={Users}
        />
        <StatCard
          label="Monthly Revenue"
          value="$8,204"
          delta="+5.1%"
          deltaColorClassName="text-success"
          tintClassName="bg-success-tint"
          icon={CreditCard}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
        <div className="flex min-w-0 flex-col rounded-[20px] border-2 border-border bg-surface">
          <div className="flex w-full items-start justify-between border-b border-border p-6">
            <p className="text-lg font-bold text-ink">My Apps</p>
            <a href="#" className="text-sm font-semibold text-primary">
              View All
            </a>
          </div>

          {isLoading && <p className="p-6 text-sm text-muted">Loading projects...</p>}
          {error && <p className="p-6 text-sm text-red-600">{error}</p>}
          {!isLoading && !error && (
            <div className="flex w-full flex-col">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col items-center gap-5 rounded-[20px] border-2 border-border bg-surface p-6">
            <p className="w-full text-base font-bold text-ink">Deployment Status</p>
            <OverallProgressRing
              percent={DEPLOYMENT_HEALTH_PERCENT}
              label={`${DEPLOYMENT_HEALTH_PERCENT}%`}
              sublabel="Active"
            />
            <p className="text-center text-sm text-muted">
              8 of 9 services are running optimally.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-[20px] border-2 border-border bg-surface p-6">
            <p className="w-full text-base font-bold text-ink">Quick Actions</p>
            {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl bg-canvas p-3 text-left"
              >
                <Icon className="size-4 shrink-0 text-ink" />
                <span className="text-sm font-medium text-ink">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
