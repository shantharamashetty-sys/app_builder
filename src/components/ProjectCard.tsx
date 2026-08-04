import { MoreHorizontal } from 'lucide-react'
import type { Project } from '../models/Project'
import { formatRelativeTime } from '../utils/formatRelativeTime'

interface ProjectCardProps {
  project: Project
  onMoreClick?: (project: Project) => void
}

/** Pure presentation: renders a Project, fires callbacks, fetches nothing. */
export default function ProjectCard({ project, onMoreClick }: ProjectCardProps) {
  return (
    <div className="flex w-full items-center gap-4 border-b border-border p-4 last:border-b-0">
      <div
        className="size-14 shrink-0 rounded-xl border border-border"
        style={{ backgroundColor: project.accentColor }}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-[15px] font-semibold text-ink">{project.name}</p>
        <p className="truncate text-[13px] text-muted">
          Edited {formatRelativeTime(project.updatedAt)}
        </p>
      </div>
      <button
        type="button"
        aria-label={`More options for ${project.name}`}
        onClick={() => onMoreClick?.(project)}
        className="flex size-6 shrink-0 items-center justify-center"
      >
        <MoreHorizontal className="size-[22px] text-muted" />
      </button>
    </div>
  )
}
