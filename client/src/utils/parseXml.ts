import type { Step } from '../types'
import { StepType } from '../types'

export function parseXml(xmlString: string): Step[] {
  const steps: Step[] = []
  
  // Match all boltAction tags
  const actionRegex = /<boltAction\s+type="([^"]+)"(?:\s+filePath="([^"]+)")?>([\s\S]*?)<\/boltAction>/g
  
  let match
  let id = 1
  
  while ((match = actionRegex.exec(xmlString)) !== null) {
    const [, type, filePath, content] = match
    
    const step: Step = {
      id: id++,
      title: getStepTitle(type, filePath),
      description: getStepDescription(type, filePath, content),
      status: 'pending',
      type: type === 'file' ? StepType.CreateFile : StepType.RunScript,
      code: content.trim(),
    }
    
    if (filePath) {
      step.filePath = filePath
    }
    
    steps.push(step)
  }
  
  return steps
}

function getStepTitle(type: string, filePath?: string): string {
  if (type === 'file' && filePath) {
    const fileName = filePath.split('/').pop() || filePath
    return `Create ${fileName}`
  }
  if (type === 'shell') {
    return 'Run command'
  }
  return 'Unknown action'
}

function getStepDescription(type: string, filePath?: string, content?: string): string {
  if (type === 'file' && filePath) {
    return `Create file: ${filePath}`
  }
  if (type === 'shell' && content) {
    const command = content.trim().split('\n')[0]
    return command.length > 50 ? command.substring(0, 50) + '...' : command
  }
  return ''
}

export function parseArtifactTitle(xmlString: string): string {
  const titleMatch = xmlString.match(/<boltArtifact[^>]+title="([^"]+)"/)
  return titleMatch ? titleMatch[1] : 'Project'
}
