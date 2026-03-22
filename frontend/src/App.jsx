import { useEffect, useState } from 'react'
import SidebarComponent from "./components/sidebar/SidebarComponent.jsx"
import { RenameModal } from './components/RenameModal.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/Signup.jsx'
import UpdateDetailsModal from './components/UpdateDetailsModal.jsx'
import { SidebarProvider, SidebarInset } from './components/ui/Sidebar.jsx'
import SidePage from './components/SideChat.jsx'
import SignupPage from './pages/SignupLoginPage.jsx'
import NewChat from './components/NewChat.jsx'
import { useDispatch, useSelector } from 'react-redux'
import ChatPage from './pages/conversation/ChatPage.jsx'
import { authService } from './services/authentication'
import { login, logout } from './stores/slices/authSlice'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'


function App() {
  const userStatus = useSelector((state) => state.auth.userStatus)
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")


  useEffect(() => {
    (async () => {
      try {
        const response = await authService.refreshToken()
        console.log(response);

        dispatch(login(response.data.data.user))
      } catch (error) {
        dispatch(logout())
      } finally {
        setLoader(false)
      }
    })()
  }, [userStatus])

  return (
    loader ? <div className="w-screen h-screen flex items-center justify-center gap-4 [--radius:1.2rem] font-giest">
      < Badge variant='outline' className="text-[1rem] px-4 py-2 h-fit rounded-lg flex items-center gap-2" >
        <Spinner data-icon="inline-start" className="size-6" />
        Processing...
      </Badge >
    </div > :
      <>
        {
          userStatus
            ? <Navigate to="/chat" />
            : <>
              <Navigate to="/home" />
            </>
        }
        <Outlet />
      </>
  )
}

export default App
