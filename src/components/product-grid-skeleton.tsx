const PLACEHOLDER_COUNT = 6

export function ProductGridSkeleton(): JSX.Element {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
        <article
          key={index}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 text-card-foreground"
        >
          <div className="h-44 w-full animate-pulse bg-muted" />
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-muted" />
            <div className="mt-auto flex items-center justify-between gap-3">
              <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

