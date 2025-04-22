import { useMediaQuery } from '@mui/material'
import BoardDetail from '@pages/Board/_id'
function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  console.log('prefersDarkMode: ', prefersDarkMode)
  console.log('prefersLightMode: ', prefersLightMode)

  return (
    <>
      <BoardDetail />
    </>
  )
}

export default App
