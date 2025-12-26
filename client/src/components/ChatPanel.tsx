import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import type { ExpectedTemplateResponse, TemplateErrorResponse, ChatResponse, BoltAction } from '../types'
import { parseArtifact, extractExplanation } from '../utils/parseResponse'

interface ChatPanelProps {
    onActionsChange: (actions: BoltAction[]) => void
}

export function ChatPanel({ onActionsChange }: ChatPanelProps) {
    const [input, setInput] = useState('')
    const [llmText, setLlmText] = useState('')
    
    async function hitChatEP(message: string) {
        try {
            const response = await axios.post<ChatResponse>('http://localhost:3000/chat', { message });
            const llmResponse = response.data.response;
            
            // Extract explanation from boltExplanation tag
            const explanation = extractExplanation(llmResponse);
            
            // Set the LLM text response for display
            setLlmText(explanation);
            
            // Parse the artifact containing actions
            const artifact = parseArtifact(llmResponse);
            
            console.log("Explanation:", explanation);
            console.log("Parsed artifact:", artifact);
            
            if (artifact) {
                // Separate file and shell actions
                const fileActions = artifact.actions.filter(a => a.type === 'file');
                const shellActions = artifact.actions.filter(a => a.type === 'shell');
                
                console.log("File actions:", fileActions);
                console.log("Shell actions:", shellActions);
                
                // Pass actions to parent component
                onActionsChange(artifact.actions);
            }
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
                {llmText && <p>{llmText}</p>}
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
