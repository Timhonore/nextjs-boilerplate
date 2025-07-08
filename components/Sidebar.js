'use client'
import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  if (!user) return null
  return (
    <aside className="w-60 bg-white border-r p-4 space-y-2">
      <h1 className="text-xl font-bold mb-4">Skemo</h1>
      <nav className="flex flex-col space-y-1">
        <Link className="p-2 hover:bg-gray-100 rounded" href="/dashboard">🏠 Dashboard</Link>
        <Link className="p-2 hover:bg-gray-100 rounded" href="/screens">🖥️ Skærme</Link>
        <Link className="p-2 hover:bg-gray-100 rounded" href="/checkin">✅ Check-ins</Link>
        <Link className="p-2 hover:bg-gray-100 rounded" href="/admin/companies">🏢 Firmaer</Link>
        <Link className="p-2 hover:bg-gray-100 rounded" href="/admin/users">👤 Brugere</Link>
      </nav>
      <button onClick={logout} className="btn mt-4 w-full">Log ud</button>
    </aside>
  )
}

