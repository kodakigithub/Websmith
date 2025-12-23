import { useState } from 'react'
import axios from 'axios'

const mockMessages = [
  { id: 1, role: 'user', content: 'Create a todo app' },
  { id: 2, role: 'assistant', content: 'I\'ll help you build a todo app. Let me set up the project structure...' },
]
type templateResponse = {
  prompt: string;
  uiPrompt: string;
}

function ChatPanel() {
  const [message, setMessage] = useState('')

  async function hitLLM(llmprompt: string) {
    const response = await axios.post('/chat', { message: llmprompt + message } );
    console.log(response.data);
  }
  const handleSend = async () => {
    const response: templateResponse = await axios.post('/template', { message }) as any;
    const llmprompt = response.prompt;
    const uiPrompt = response.uiPrompt;
    hitLLM(llmprompt);
    

    const finalResponse: string = await axios.post('/chat', { message: llmprompt + "\n" + message })
    console.log(finalResponse);
    return uiPrompt
  }

  return (
    <div className="w-1/4 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold">Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'
            }`}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
