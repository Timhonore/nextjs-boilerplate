'use client'
import { useEffect, useState } from 'react'
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { useParams } from 'next/navigation'

export default function ViewScreen() {
  const { id } = useParams()
  const [blocks, setBlocks] = useState<any[]>([])
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, 'screens', id as string))
      setBlocks(snap.data()?.content || [])
    }
    load()
  }, [id])

  const handleCheckin = async (e: React.FormEvent) => {
    e.preventDefault()
    await addDoc(collection(db, 'checkins'), {
      screenId: id,
      name,
      createdAt: serverTimestamp(),
    })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 20000)
    setName('')
  }

  return (
    <div className="container max-w-xl py-6">
      {blocks.map((b, idx) => {
        if (b.type === 'text') return <p key={idx}>{b.text}</p>
        if (b.type === 'button')
          return (
            <a key={idx} href={b.link} className="btn inline-block mt-2">
              {b.label}
            </a>
          )
        if (b.type === 'checkin')
          return (
            <form key={idx} onSubmit={handleCheckin} className="space-y-2 mt-4">
              {submitted ? (
                <div className="alert">Tak for din ankomst!</div>
              ) : (
                <>
                  <input
                    className="form-control"
                    placeholder="Navn eller nummerplade"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button className="btn">Check ind</button>
                </>
              )}
            </form>
          )
        return null
      })}
    </div>
  )
}

