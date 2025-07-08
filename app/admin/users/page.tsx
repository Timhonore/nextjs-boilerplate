'use client'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useAuth } from '../../../components/AuthProvider'

export default function UsersPage() {
  const { profile } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (profile?.role !== 'superadmin') return
    const unsub = onSnapshot(collection(db, 'users'), (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [profile])

  if (profile?.role !== 'superadmin') return <p>Ingen adgang</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Brugere</h1>
      <ul className="list-disc pl-4">
        {users.map((u) => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </div>
  )
}

