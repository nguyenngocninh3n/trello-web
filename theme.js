import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      // palette: {
      //   primary: {
      //     main: '#ff5252'
      //   }
      // }
    },
    dark: {}
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderWidth:'1px', borderColor:'white' } } },
    MuiInputLabel: { styleOverrides: { root: { fontSize: '0.875rem' } } },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '1px !important' },
          '&:hover fieldset': { borderWidth: '2px !important' },
          '&.Mui-focused fieldset': { borderWidth: '2px !important' }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({ color: theme.palette.primary.light, fontSize: '0.875em' })
      }
    }
  }
})

export default theme
