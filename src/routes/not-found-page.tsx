import { Link } from 'react-router-dom'

export function NotFoundPage(): JSX.Element {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-3 px-4 py-6 text-center sm:gap-4 sm:py-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Page not found</h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        The route you requested has not been implemented yet. Use the navigation below to return to the project overview.
      </p>
      <Link
        className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition hover:opacity-90 sm:text-sm"
        to="/"
      >
        Back to home
      </Link>
    </section>
  )
}
