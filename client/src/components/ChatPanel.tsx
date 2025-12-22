const mockMessages = [
  { id: 1, role: 'user', content: 'Create a todo app' },
  { id: 2, role: 'assistant', content: 'I\'ll help you build a todo app. Let me set up the project structure...' },
]

function ChatPanel() {
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
      <div className="p-4 border-t border-gray-700">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-sm"
        />
      </div>
    </div>
  )
}

export default ChatPanel
