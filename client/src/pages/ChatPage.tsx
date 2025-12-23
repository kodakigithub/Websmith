import ChatPanel from '../components/ChatPanel'
import StepsPanel from '../components/StepsPanel.jsx'
import WorkspacePanel from '../components/WorkspacePanel.jsx'

function ChatPage() {
  return (
    <div className="h-screen flex bg-gray-900 text-white">
      <ChatPanel />
      <StepsPanel />
      <WorkspacePanel />
    </div>
  )
}

export default ChatPage
