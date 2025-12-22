import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const [prompt, setPrompt] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle prompt submission (e.g., send to backend)
    console.log('Submitted prompt:', prompt)
    navigate('/chat')
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
        />
        <button
          type="submit"
          className="mt-4 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Start Building
        </button>
      </form>
    </div>
  )
}

export default LandingPage
