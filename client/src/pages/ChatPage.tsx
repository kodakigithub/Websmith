import { useState } from 'react'
import { ChatPanel } from '../components/ChatPanel'
import { StepsPanel } from '../components/StepsPanel'
import { EditorPanel } from '../components/EditorPanel'
import type { BoltAction } from '../types'

export function ChatPage() {
    const [actions, setActions] = useState<BoltAction[]>([])

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <ChatPanel onActionsChange={setActions} />
            <StepsPanel actions={actions} />
            <EditorPanel />
        </div>
    )
}