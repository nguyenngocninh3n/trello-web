import { DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material'
import { Box, FormControl, InputLabel, MenuItem, Select, useColorScheme } from '@mui/material'
function ModalModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = event => {
    const modeSelection = event.target.value
    console.log('mode selected: ', modeSelection)
    setMode(modeSelection)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        id="label-light-dark-system"
        sx={{ color: 'white', '&.Mui-focused': { color: 'white' } }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="label-light-dark-system"
        id="demo-select-small"
        value={mode}
        label="Age"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '.MuiSvgIcon-root': { color: 'white' }
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightMode /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkMode /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightness /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModalModeSelect
