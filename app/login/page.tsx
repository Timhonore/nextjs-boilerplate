'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError('Login fejl')
    }
  }

  return (
    <div className="container max-w-sm py-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="form-control"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn w-full" type="submit">
          Log ind
        </button>
      </form>
    </div>
  )
}

