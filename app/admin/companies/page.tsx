'use client'
import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import Link from 'next/link'
import { useAuth } from '../../../components/AuthProvider'

export default function CompaniesPage() {
  const { profile } = useAuth()
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (profile?.role !== 'superadmin') return
    const unsub = onSnapshot(collection(db, 'companies'), (snap) => {
      setCompanies(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [profile])

  if (profile?.role !== 'superadmin') {
    return <p>Ingen adgang</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Firmaer</h1>
      <ul className="list-disc pl-4">
        {companies.map((c) => (
          <li key={c.id}>
            <Link href={`/admin/companies/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

