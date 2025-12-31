import type { BoltAction } from '../types'

interface StepsPanelProps {
    actions: BoltAction[]
}

export function StepsPanel({ actions }: StepsPanelProps) {
    return (
        <div style={{ 
            width: '20%', 
            borderRight: '1px solid #3a3a3a', 
            padding: '1rem', 
            overflowY: 'auto',
            backgroundColor: '#252526'
        }}>
            <h2>Steps</h2>
            <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', margin: 0, color: '#e0e0e0' }}>
                {actions.map((action, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                        {action.type === 'file' 
                            ? `Create file: ${action.filePath}`
                            : `Run: ${action.command}`
                        }
                    </li>
                ))}
            </ol>
        </div>
    )
}
