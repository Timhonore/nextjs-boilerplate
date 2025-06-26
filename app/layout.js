'use client'
import '../styles/globals.css'
import Sidebar from '../components/Sidebar'
import { AuthProvider } from '../components/AuthProvider'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const hideSidebar = pathname.startsWith('/login') || pathname.includes('/view')

  return (
    <html lang="da">
      <body className="flex min-h-screen bg-gray-100 text-gray-900">
        <AuthProvider>
          {!hideSidebar && <Sidebar />}
          <main className="flex-1 p-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}

