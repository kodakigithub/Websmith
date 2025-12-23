import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:3000' // adjust to your backend URL

function LandingPage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to get template')
      }

      const data = await response.json()

      // Navigate to chat with uiPrompts in state
      navigate('/chat', {
        state: {
          prompt,
          prompts: data.prompts,
          uiPrompts: data.uiPrompts,
        },
      })
    } catch (error) {
      console.error('Error:', error)
      // TODO: Show error to user
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Websmith</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xl px-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What do you want to build?"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
        >
          {loading ? 'Loading...' : 'Start Building'}
        </button>
      </form>
    </div>
  )
}

export default LandingPage
