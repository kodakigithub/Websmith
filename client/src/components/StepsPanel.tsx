import type { BoltAction } from '../types'

interface StepsPanelProps {
    actions: BoltAction[]
}

export function StepsPanel({ actions }: StepsPanelProps) {
    return (
        <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '1rem', overflowY: 'auto' }}>
            <h2>Steps</h2>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', margin: 0 }}>
                {actions.map((action, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                        {action.type === 'file' 
                            ? `Create file: ${action.filePath}`
                            : `Run: ${action.command}`
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}
