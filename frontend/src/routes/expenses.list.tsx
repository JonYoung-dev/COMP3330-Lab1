// App.tsx or your root layout component
import { Link, Outlet } from '@tanstack/react-router'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <h1 className="text-lg font-bold">Expenses App</h1>
          <nav className="flex gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/expenses" className="hover:text-blue-600">Expenses</Link>
            <Link to="/new" className="hover:text-blue-600">New</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 mx-auto w-full max-w-5xl p-6">
        <Outlet />
      </main>
    </div>
  )
}
