const mockSteps = [
  { id: 1, title: 'Initialize project', status: 'done' },
  { id: 2, title: 'Install dependencies', status: 'done' },
  { id: 3, title: 'Create components', status: 'active' },
  { id: 4, title: 'Add styling', status: 'pending' },
  { id: 5, title: 'Test application', status: 'pending' },
]

function StepsPanel() {
  return (
    <div className="w-1/4 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold">Steps</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-3">
          {mockSteps.map((step) => (
            <li
              key={step.id}
              className={`p-3 rounded border ${
                step.status === 'done'
                  ? 'border-green-600 bg-green-900/20'
                  : step.status === 'active'
                  ? 'border-blue-600 bg-blue-900/20'
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              <span className="text-sm">{step.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StepsPanel
