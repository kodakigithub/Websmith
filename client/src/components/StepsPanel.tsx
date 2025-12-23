
import { CheckCircle, Circle, Clock } from 'lucide-react'
import type { Step } from "../types"

interface StepsPanelProps {
    steps: Step[];
    currentStepId: number;
    onStepClick: (stepId: number) => void;
}

function StepsPanel({ steps, currentStepId, onStepClick }: StepsPanelProps) {
  return (
    <div className="w-1/4 border-r border-gray-700 flex flex-col bg-gray-900">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-100">Build Steps</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentStepId === step.id
                  ? 'bg-gray-800 border border-gray-700'
                  : 'hover:bg-gray-800'
              }`}
              onClick={() => onStepClick(step.id)}
            >
              <div className="flex items-center gap-2">
                {step.status === 'done' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : step.status === 'active' ? (
                  <Clock className="w-5 h-5 text-blue-400" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-600" />
                )}
                <h3 className="font-medium text-gray-100">{step.title}</h3>
              </div>
              {step.description && (
                <p className="text-sm text-gray-400 mt-2 ml-7">{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StepsPanel
