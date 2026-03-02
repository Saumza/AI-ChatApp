import { useState } from 'react'
import SidebarComponent from "./components/sidebar/SidebarComponent"
import { RenameModal } from './components/RenameModal'
import Login from './components/Login'
import SignUp from './components/Signup'
import UpdateDetailsModal from './components/UpdateDetailsModal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <SidebarComponent />
    </div>
  )
}

export default App
