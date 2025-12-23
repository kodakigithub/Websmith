import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ChatPanel from '../components/ChatPanel'
import StepsPanel from '../components/StepsPanel'
import WorkspacePanel from '../components/WorkspacePanel'
import type { Step } from '../types'
import { parseXml } from '../utils/parseXml'

function ChatPage() {
  const location = useLocation()
  const [steps, setSteps] = useState<Step[]>([])
  const [currentStepId, setCurrentStepId] = useState<number>(0)

  useEffect(() => {
    // Get uiPrompts from navigation state
    const state = location.state as { uiPrompts?: string[] } | null
    if (state?.uiPrompts && state.uiPrompts.length > 0) {
      const parsedSteps = parseXml(state.uiPrompts.join('\n'))
      setSteps(parsedSteps)
      if (parsedSteps.length > 0) {
        setCurrentStepId(parsedSteps[0].id)
      }
    }
  }, [location.state])

  const handleStepClick = (stepId: number) => {
    setCurrentStepId(stepId)
  }

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      <ChatPanel />
      <StepsPanel 
        steps={steps} 
        currentStepId={currentStepId} 
        onStepClick={handleStepClick} 
      />
      <WorkspacePanel />
    </div>
  )
}

export default ChatPage
