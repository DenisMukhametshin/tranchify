import type { ReactNode } from 'react'

type StatePlaceholderProps = {
  title: string
  description?: string
  action?: ReactNode
  tone?: 'default' | 'error'
}

export function StatePlaceholder({
  title,
  description,
  action,
  tone = 'default',
}: StatePlaceholderProps): JSX.Element {
  const toneClasses = tone === 'error' ? 'text-destructive' : 'text-muted-foreground'
  const descriptionClasses = tone === 'error' ? 'text-destructive/80' : 'text-muted-foreground'

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/30 px-6 py-12 text-center">
      <p className={`text-base font-semibold ${toneClasses}`}>{title}</p>
      {description ? <p className={`text-sm ${descriptionClasses}`}>{description}</p> : null}
      {action}
    </div>
  )
}

