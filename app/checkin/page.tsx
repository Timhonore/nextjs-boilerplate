'use client'
import { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useAuth } from '../../components/AuthProvider'

export default function CheckinPage() {
  const { profile } = useAuth()
  const [list, setList] = useState([])

  useEffect(() => {
    if (!profile) return
    const q = query(
      collection(db, 'checkins'),
      where('companyId', '==', profile.companyId || ''),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, (snap) => {
      setList(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [profile])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Check-ins</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Navn / nummerplade</th>
            <th>Tidspunkt</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id} className="border-t">
              <td>{c.name}</td>
              <td>{c.createdAt?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

