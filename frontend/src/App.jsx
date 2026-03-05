import { useState } from 'react'
import SidebarComponent from "./components/sidebar/SidebarComponent"
import { RenameModal } from './components/RenameModal'
import Login from './components/Login'
import SignUp from './components/Signup'
import UpdateDetailsModal from './components/UpdateDetailsModal'
import { SidebarProvider, SidebarInset } from './components/ui/Sidebar'
import ChatPage from './components/ChatPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden">

        <SidebarComponent />

        <SidebarInset className="flex flex-col flex-1">
          <ChatPage />
        </SidebarInset>

      </div>
    </SidebarProvider>
  )
}

export default App
