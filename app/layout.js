import '../styles/globals.css'
import Sidebar from '../components/Sidebar'

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className="flex min-h-screen bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  )
}
