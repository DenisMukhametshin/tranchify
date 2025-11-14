import { Link } from 'react-router-dom'

export function ProductsPage(): JSX.Element {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center gap-6 px-4 text-center">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary/70">Project Scaffold</p>
        <h1 className="text-4xl font-bold">React + TypeScript Starter</h1>
      </header>
      <p className="text-base text-muted-foreground">
        This project is preconfigured with routing, form, validation, and styling tooling. Replace this placeholder with the
        actual product listing experience once business requirements are ready to implement.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
          to="/product/preview"
        >
          Preview product route
        </Link>
        <a
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          href="https://dummyjson.com/products"
          rel="noreferrer"
          target="_blank"
        >
          DummyJSON products API
        </a>
      </div>
    </section>
  )
}
