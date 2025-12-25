import { useState } from 'react'
import axios from 'axios'

const mockMessages = [
  { id: 1, role: 'user', content: 'Create a todo app' },
  { id: 2, role: 'assistant', content: 'I\'ll help you build a todo app. Let me set up the project structure...' },
]

// Type definitions
type TemplateResponse = {
  prompts: string[];
  uiPrompts: string[];
}

// For streaming, the response is a ReadableStream<Uint8Array>
// Each SSE event contains JSON-stringified text chunks

function ChatPanel() {
  const [message, setMessage] = useState('')
  const [streamedResponse, setStreamedResponse] = useState('')

  // Function to handle SSE streaming response
  async function hitLLM(llmprompt: string): Promise<string> {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: llmprompt + message }),
    });

    // The response.body is a ReadableStream<Uint8Array>
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    let completeText = '';

    if (!reader) {
      throw new Error('No reader available');
    }

    // Read the stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Decode the chunk to string
      const chunk = decoder.decode(value, { stream: true });
      
      // Parse SSE format: "data: {...}\n\n" or "event: end\ndata: {...}\n\n"
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonData = line.slice(6); // Remove "data: " prefix
          try {
            const parsedChunk = JSON.parse(jsonData) as string;
            completeText += parsedChunk;
            // Update state to show streaming response in real-time
            setStreamedResponse(completeText);
            console.log('Chunk received:', parsedChunk);
          } catch (e) {
            // Handle parse errors for incomplete JSON
          }
        }
      }
    }

    console.log('Complete response:', completeText);
    return completeText;
  }
  
  const handleSend = async () => {
    const { data } = await axios.post<TemplateResponse>('http://localhost:3000/template', { prompt: message });
    const llmprompt = data.prompts.join('\n');
    const uiPrompt = data.uiPrompts;
    
    // Reset streamed response before new request
    setStreamedResponse('');
    
    // Use the streaming function
    const finalResponse = await hitLLM(llmprompt);
    console.log('Final response string:', finalResponse);
    
    return uiPrompt;
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
