import { Link, NavLink, Outlet } from 'react-router-dom'

import { EditedProductsProvider } from '@/contexts/edited-products-context'
import { useAuth } from '@/hooks'

export function RootLayout(): JSX.Element {
  const { isAuthenticated, login, logout } = useAuth()

  return (
    <EditedProductsProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <Link className="text-base font-semibold sm:text-lg" to="/">
              Tranchify
            </Link>
            <nav className="flex items-center gap-2 text-xs sm:gap-4 sm:text-sm">
              <NavLink className={({ isActive }) => navLinkStyles(isActive)} to="/">
                Home
              </NavLink>
              {isAuthenticated ? (
                <button
                  className="rounded-md px-2 py-1.5 text-xs transition hover:bg-muted hover:text-foreground sm:px-3 sm:py-2 sm:text-sm"
                  onClick={logout}
                  type="button"
                >
                  Logout
                </button>
              ) : (
                <button
                  className="rounded-md px-2 py-1.5 text-xs transition hover:bg-muted hover:text-foreground sm:px-3 sm:py-2 sm:text-sm"
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
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-3 text-[10px] text-muted-foreground sm:flex-row sm:justify-between sm:gap-0 sm:px-6 sm:py-4 sm:text-xs">
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
    'rounded-md px-2 py-1.5 text-xs transition sm:px-3 sm:py-2 sm:text-sm',
    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted hover:text-foreground',
  ].join(' ')
}
