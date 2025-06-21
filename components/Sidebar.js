import Link from 'next/link'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/screens', label: 'Skærme' },
  { href: '/checkin', label: 'Check-in' },
  { href: '/settings', label: 'Indstillinger' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow h-screen sticky top-0">
      <div className="p-6 text-xl font-bold border-b">Skærmstyring.dk</div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-800">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
