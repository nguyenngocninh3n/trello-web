import { useMediaQuery } from '@mui/material'
import BoardDetail from '@pages/Board/_id'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import NotFound from './pages/NotFound'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
import Settings from './pages/Settings/Settings'
import Boards from './pages/Board'
import IntroducePage from './pages/Introduce/Introduce'
import AboutPage from './pages/Introduce/About'
import Founder from './pages/Introduce/Founder'

const ProtectedRoute = ({ user, path }) => {
  if (!user && path !== '/') {
    return <Navigate to={'/login'} replace />
  }
  return <Outlet />
}

function App() {
  const user = useSelector(selectCurrentUser)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  console.log('prefersDarkMode: ', prefersDarkMode)
  console.log('prefersLightMode: ', prefersLightMode)

  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/verify" element={<AccountVerification />} />
      <Route path="/about/founder" element={<Founder />} />
      <Route path="/about/introduce" element={<IntroducePage />} />
      <Route path="/" element={user ? <Boards /> : <IntroducePage />} />

      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/introduce" element={<IntroducePage />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<BoardDetail />} />
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
