'use client'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useAuth } from '../../../components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function CreateScreen() {
  const { profile } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    const docRef = await addDoc(collection(db, 'screens'), {
      name,
      location,
      status: 'offline',
      companyId: profile.companyId,
      content: [],
    })
    router.push(`/screens/${docRef.id}/edit`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Opret skærm</h1>
      <form onSubmit={handleSubmit} className="space-y-2 max-w-sm">
        <input
          className="form-control"
          placeholder="Navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Lokation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn" type="submit">
          Gem
        </button>
      </form>
    </div>
  )
}

