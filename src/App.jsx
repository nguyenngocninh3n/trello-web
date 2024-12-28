import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
  useMediaQuery
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { pink } from '@mui/material/colors'
import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material'
function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
  console.log('prefersDarkMode: ', prefersDarkMode)
  console.log('prefersLightMode: ', prefersLightMode)

  function ModalSelect() {
    const { mode, setMode } = useColorScheme()

    const handleChange = event => {
      const modeSelection = event.target.value
      console.log('mode selected: ', modeSelection)
      setMode(modeSelection)
    }

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="label-light-dark-system">Mode</InputLabel>
        <Select
          labelId="label-light-dark-system"
          id="demo-select-small"
          value={mode}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="light">
            <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
              <LightMode /> Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
              <DarkMode /> Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }} >
              <SettingsBrightness /> System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    )
  }

  function ModeToggle() {
    const { mode, setMode } = useColorScheme()
    return (
      <Button
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}
      >
        {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Button>
    )
  }

  return (
    <>
      <ModalSelect />
      <ModeToggle />
      <div>Xin chao</div>
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[800] }} />
    </>
  )
}

export default App
