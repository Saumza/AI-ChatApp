import { useState } from 'react'
import NewChatLight from './components/icon/NewChatLight'
import NewChatDark from './components/icon/NewChatDark'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <div className="block dark:hidden">
        <NewChatLight />
      </div>

      <div className="hidden dark:block">
        <NewChatDark />
      </div>
    </div>
  )
}

export default App
