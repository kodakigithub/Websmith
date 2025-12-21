import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      count is {count}
      <button onClick={() => setCount((count) => count + 1)}>
        increment
      </button>
    </>
  )
}

export default App
