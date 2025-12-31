import { useState } from 'react'
import { ChatPanel } from '../components/ChatPanel'
import { StepsPanel } from '../components/StepsPanel'
import { EditorPanel } from '../components/EditorPanel'
import type { BoltAction, FileAction } from '../types'

export function ChatPage() {
    const [actions, setActions] = useState<BoltAction[]>([])
    
    // Filter file actions for EditorPanel
    const fileActions = actions.filter((a): a is FileAction => a.type === 'file')

    return (
        <div style={{ 
            display: 'flex', 
            height: '100vh', 
            width: '100vw',
            backgroundColor: '#1e1e1e',
            color: '#e0e0e0'
        }}>
            <ChatPanel onActionsChange={setActions} />
            <StepsPanel actions={actions} />
            <EditorPanel files={fileActions} />
        </div>
    )
}