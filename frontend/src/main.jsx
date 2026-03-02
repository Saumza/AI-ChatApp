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

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/resetPassword",
    element: <ResetPasswordPage />
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordPage />
  },
  {
    path: "/verify_email/:verificationToken",
    element: <VerifyEmail />
  },
  {
    path: "/verify_passwordToken/:verificationToken",
    element: <VerifyForgotPasswordPage />
  },
  {
    path: "/passwordChange/:verificationToken",
    element: <PasswordChangePage />
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>

)
