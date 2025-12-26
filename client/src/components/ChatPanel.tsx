import { useState } from 'react'

export function ChatPanel() {
    const [input, setInput] = useState('')

    const handleSend = () => {
        // TODO: implement send logic
    }

    return (
        <div style={{ 
            width: '20%', 
            borderRight: '1px solid #ccc', 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%'
        }}>
            {/* Conversation Area - 80% */}
            <div style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '1rem',
                minHeight: 0
            }}>
                <h2>Chat</h2>
            </div>

            {/* Chat Input Area - 20% min, expands upward */}
            <div style={{ 
                borderTop: '1px solid #ccc', 
                padding: '1rem',
                maxHeight: '50%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        width: '100%',
                        minHeight: '60px',
                        maxHeight: '200px',
                        resize: 'none',
                        overflow: 'auto',
                        boxSizing: 'border-box'
                    }}
                    rows={1}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        target.style.height = 'auto'
                        target.style.height = `${Math.min(target.scrollHeight, 200)}px`
                    }}
                />
                <button 
                    onClick={handleSend}
                    style={{ alignSelf: 'flex-end' }}
                >
                    Send
                </button>
            </div>
        </div>
    )
}
