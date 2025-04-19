import { BorderColor } from '@mui/icons-material'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ff5252'
        }
      }
    },
    dark: {
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({ textTransform: 'none', color: theme.palette.primary.main })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({ color: theme.palette.primary.light, fontSize: '0.875em' })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            }
          },
          'fontSize': '0.875rem',
          '& fieldset': {
            borderWidth: '1px !important'
          }
        })
      }
    }
  }
})

export default theme
