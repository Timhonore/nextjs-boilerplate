'use client'
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import { useParams, useRouter } from 'next/navigation'

export default function EditScreen() {
  const { id } = useParams()
  const router = useRouter()
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, 'screens', id as string))
      setContent(JSON.stringify(snap.data()?.content || [], null, 2))
    }
    fetchData()
  }, [id])

  const handleSave = async () => {
    await updateDoc(doc(db, 'screens', id as string), {
      content: JSON.parse(content || '[]'),
    })
    router.push('/screens')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rediger skærm</h1>
      <textarea
        className="form-control h-40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="btn mt-2" onClick={handleSave}>
        Gem
      </button>
    </div>
  )
}

