import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import ProjectCard from '../../components/ProjectCard'

/**
 * Reference view for the MVC pattern: composes presentational components
 * (ProjectCard) fed by a controller hook (useProjects). No service imports
 * and no fetch logic live here — that all belongs to the hook/service layers.
 */
export default function DashboardView() {
  const { projects, isLoading, error } = useProjects()
  const navigate = useNavigate()

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full items-end justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[28px] font-bold text-ink">Hello, Creative Studio</p>
          <p className="text-[15px] text-muted">Welcome back to your app command center.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/generate')}
          className="shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white"
        >
          + Create New App
        </button>
      </div>

      <div className="flex w-full flex-col rounded-[20px] border-2 border-border bg-surface">
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
    </div>
  )
}
