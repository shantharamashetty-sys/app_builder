/** Formats an ISO timestamp as "Edited 2h ago" style text. Presentation-only, no data access. */
export function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const minutes = Math.round(diffMs / 60_000)
  const hours = Math.round(diffMs / 3_600_000)
  const days = Math.round(diffMs / 86_400_000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`

  return new Date(isoDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
