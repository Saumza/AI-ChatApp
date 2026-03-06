import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './stores'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from './pages/authentication/LoginPage'
import SignupPage from './pages/authentication/SignupPage'
import ResetPasswordPage from './pages/authentication/ResetPasswordPage'
import VerifyEmail from './pages/authentication/VerifyEmail'
import ForgotPasswordPage from './pages/authentication/ForgotPasswordPage'
import VerifyForgotPasswordPage from './pages/authentication/VerifyForgotPasswordPage'
import PasswordChangePage from './pages/authentication/PasswordChangePage'
import SignupLoginPage from './pages/SignupLoginPage'
import ChatPage from './pages/conversation/ChatPage'
import AuthLogin from './components/AuthLogin'


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat" replace />,
      },
      {
        path: "/chat",
        element: (
          <AuthLogin>
            <ChatPage />
          </AuthLogin>
        )
      },
      {
        path: "/home",
        element: (
          <AuthLogin authentication={false}>
            <SignupLoginPage />
          </AuthLogin>
        )
      },
      {
        path: "/login",
        element: (
          <AuthLogin authentication={false}>
            <LoginPage />
          </AuthLogin>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLogin authentication={false}>
            <SignupPage />
          </AuthLogin>
        )
      },
      {
        path: "/resetPassword",
        element: (
          <AuthLogin authentication={false}>
            <ResetPasswordPage />
          </AuthLogin>
        )
      },
      {
        path: "/forgotPassword",
        element: (
          <AuthLogin authentication={false}>
            <ForgotPasswordPage />
          </AuthLogin>
        )
      },
      {
        path: "/verify_email/:verificationToken",
        element: (
          <AuthLogin authentication={false}>
            <VerifyEmail />
          </AuthLogin>
        )
      },
      {
        path: "/verify_passwordToken/:verificationToken",
        element: (
          <AuthLogin authentication={false}>
            <VerifyForgotPasswordPage />
          </AuthLogin>
        )
      },
      {
        path: "/passwordChange/:verificationToken",
        element: (
          <AuthLogin authentication={false}>
            <PasswordChangePage />
          </AuthLogin>
        )
      }
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>

)
