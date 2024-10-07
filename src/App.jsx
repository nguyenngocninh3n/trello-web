import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import {
  useColorScheme
} from '@mui/material/styles'

function App() {
  const { mode, setMode } = useColorScheme()

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          if (mode === 'light') {
            setMode('dark')
          } else {
            setMode('light')
          }
        }}
      >
        {mode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <br />
      <Button variant='text'>Text</Button>
      <Button variant='contained'>Contained</Button>
      <Button variant='outlined'>Outlined</Button>
      <br />
      <AccessAlarmIcon />
      <ThreeDRotation />
      <br />
      <HomeIcon />
      <HomeIcon color='primary' />
      <HomeIcon color='secondary' />
      <HomeIcon color='success' />
      <HomeIcon color='action' />
      <HomeIcon color='disabled' />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App
