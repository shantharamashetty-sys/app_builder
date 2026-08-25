interface GenerationSummaryStatsProps {
  screensCount: number
  componentsCount: number
  dataModelsCount: number
}

export default function GenerationSummaryStats({
  screensCount,
  componentsCount,
  dataModelsCount,
}: GenerationSummaryStatsProps) {
  const stats = [
    { label: 'Screens', value: screensCount },
    { label: 'Components', value: componentsCount },
    { label: 'Data Models', value: dataModelsCount },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {stats.map((stat) => (
        <span
          key={stat.label}
          className="flex items-center gap-2 rounded-full bg-primary-tint px-4 py-1.5 text-sm"
        >
          <span className="size-2 rounded-sm bg-primary" />
          <span className="text-ink">{stat.label}</span>
          <span className="font-bold text-primary">{stat.value}</span>
        </span>
      ))}
    </div>
  )
}
