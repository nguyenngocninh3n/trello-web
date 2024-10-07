import { red } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
// A custom theme for this app
const theme = extendTheme({
  palette: {
    mode: 'light',
    primary: {
      main: red[500]
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    text: {
      primary: red[200]
    }
  }
})

export default theme