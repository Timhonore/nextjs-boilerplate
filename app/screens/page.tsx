'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useAuth } from '../../components/AuthProvider'

export default function ScreensPage() {
  const { profile } = useAuth()
  const [screens, setScreens] = useState([])

  useEffect(() => {
    if (!profile) return
    const q = query(
      collection(db, 'screens'),
      where('companyId', '==', profile.companyId || '')
    )
    const unsub = onSnapshot(q, (snap) => {
      setScreens(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [profile])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Skærme</h1>
      <Link href="/screens/create" className="btn mb-4 inline-block">
        Opret skærm
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Navn</th>
            <th>Lokation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {screens.map((s) => (
            <tr key={s.id} className="border-t">
              <td>
                <Link className="text-blue-600" href={`/screens/${s.id}/edit`}>
                  {s.name}
                </Link>
              </td>
              <td>{s.location}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

