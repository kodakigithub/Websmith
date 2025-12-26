import { ChatPanel } from '../components/ChatPanel'
import { StepsPanel } from '../components/StepsPanel'
import { EditorPanel } from '../components/EditorPanel'

export function ChatPage() {
    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <ChatPanel />
            <StepsPanel />
            <EditorPanel />
        </div>
    )
}