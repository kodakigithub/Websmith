import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import type { ExpectedTemplateResponse, TemplateErrorResponse } from '../types'

export function ChatPanel() {
    const [input, setInput] = useState('')
    
    async function hitChatEP(message: string) {
        try {
            const llmResponse: string  = await axios.post('http://localhost:3000/chat', { message });
            console.log("LLM Response:", llmResponse);
        } catch (error) {
            console.error("Error hitting chat endpoint:", error);
        }
    }

    function handleStepResponse(uiPrompt: string) {
        console.log("UI Prompt for Steps Panel:", uiPrompt);
    }

    async function hitLLM(message: string) {
        try {
            const response = await axios.post<ExpectedTemplateResponse>('http://localhost:3000/template', { prompt: message });
            console.log("Sending message to LLM:", message);
            const llmPrompt = JSON.stringify(response.data.prompts) +'\n\n'+message;
            const uiPrompt = JSON.stringify(response.data.uiPrompts);
            hitChatEP(llmPrompt);
            handleStepResponse(uiPrompt);
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<TemplateErrorResponse>;
                console.error("LLM Error:", axiosError.response?.data?.msg);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    const handleSend = () => {
        if (!input.trim()) return;
        hitLLM(input);
        setInput('');
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
