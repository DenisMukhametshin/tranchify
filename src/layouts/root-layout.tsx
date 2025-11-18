import { Link, NavLink, Outlet } from 'react-router-dom'

import { EditedProductsProvider } from '@/contexts/edited-products-context'
import { useAuth } from '@/hooks'

export function RootLayout(): JSX.Element {
  const { isAuthenticated, login, logout } = useAuth()

  return (
    <EditedProductsProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link className="text-lg font-semibold" to="/">
              Tranchify
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <NavLink className={({ isActive }) => navLinkStyles(isActive)} to="/">
                Home
              </NavLink>
              {isAuthenticated ? (
                <button
                  className="rounded-md px-3 py-2 transition hover:bg-muted hover:text-foreground"
                  onClick={logout}
                  type="button"
                >
                  Logout
                </button>
              ) : (
                <button
                  className="rounded-md px-3 py-2 transition hover:bg-muted hover:text-foreground"
                  onClick={login}
                  type="button"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-border bg-card">
          <div className="mx-auto flex w-full max-w-6xl justify-between px-6 py-4 text-xs text-muted-foreground">
            <span>Scaffold ready for feature implementation.</span>
            <span>AI-assisted setup via Cursor + GPT-5 Codex.</span>
          </div>
        </footer>
      </div>
    </EditedProductsProvider>
  )
}

function navLinkStyles(isActive: boolean): string {
  return [
    'rounded-md px-3 py-2 transition',
    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted hover:text-foreground',
  ].join(' ')
}
