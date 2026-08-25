import { Lock } from 'lucide-react'
import type { ApiEndpoint, ApiMethod } from '../../models/AppGeneration'

const METHOD_BADGE_CLASS: Record<ApiMethod, string> = {
  GET: 'bg-primary-tint text-primary',
  POST: 'bg-success-tint text-success',
  PUT: 'bg-amber-100 text-amber-700',
  PATCH: 'bg-amber-100 text-amber-700',
  DELETE: 'bg-red-100 text-red-600',
}

interface ApiEndpointListProps {
  endpoints: ApiEndpoint[]
}

export default function ApiEndpointList({ endpoints }: ApiEndpointListProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {endpoints.map((endpoint) => (
        <div
          key={endpoint.id}
          className="flex flex-col gap-2 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-16 shrink-0 rounded-md px-2 py-1 text-center text-xs font-bold ${METHOD_BADGE_CLASS[endpoint.method]}`}
            >
              {endpoint.method}
            </span>
            <span className="font-mono text-sm text-ink">{endpoint.path}</span>
          </div>
          <div className="flex items-center gap-3 pl-[76px] sm:pl-0">
            <span className="text-xs text-muted">{endpoint.description}</span>
            {endpoint.authRequired && (
              <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted">
                <Lock className="size-3" /> Auth
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
