import { Link } from 'react-router-dom'

export function NotFoundRoute(): JSX.Element {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted-foreground">
        The route you requested has not been implemented yet. Use the navigation below to return to the project overview.
      </p>
      <Link
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        to="/"
      >
        Back to home
      </Link>
    </section>
  )
}
