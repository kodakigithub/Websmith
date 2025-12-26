import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//const API_URL = 'http://localhost:3000'

export function LandingPage() {
    const [prompt, setPrompt] = useState('')
    const navigate = useNavigate()

    const handleSubmit = () => {
        if (!prompt.trim()) return;
        navigate('/chat', { state: { prompt } })
    }

    return (
        <div>
            <h1>Welcome to Websmith</h1><br></br><br></br>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your project..."
                rows={10}
                cols={50}
            />
            <br></br><br></br>
            <button
                onClick={handleSubmit}
            >
                Start Building
            </button>
        </div>
    )
}