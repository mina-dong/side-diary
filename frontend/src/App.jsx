import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-row items-center space-y-8 min-h-screen justify-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-64 h-auto rounded-lg" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-64 h-auto rounded-lg" alt="React logo" />
        </a>
      </div>
      <h1 className="font-bold text-5xl">Vite + React</h1>
      <div className="font-bold">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-3xl font-bold">
        Click on the Vite and React logos to learn more
      </p>


      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-5xl font-bold text-blue-40 underline">
          Tailwind CSS is working!
        </h1>
      </div>
    </>
  )
}

export default App
