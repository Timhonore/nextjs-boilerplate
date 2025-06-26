'use client'
import { useEffect, useState } from 'react'
import { doc, getDoc, collection, onSnapshot, where, query } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { useParams } from 'next/navigation'

export default function CompanyDetail() {
  const { id } = useParams()
  const [company, setCompany] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'companies', id as string))
      setCompany(snap.data())
    }
    load()
    const uq = query(collection(db, 'users'), where('companyId', '==', id))
    const unsub = onSnapshot(uq, (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [id])

  if (!company) return null

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
      <h2 className="font-semibold mb-2">Brugere</h2>
      <ul className="list-disc pl-4">
        {users.map((u) => (
          <li key={u.id}>{u.name || u.email}</li>
        ))}
      </ul>
    </div>
  )
}

