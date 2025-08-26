import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const drawerWidth = 240
const navItems = [
  {
    _id: 'home',
    name: 'Home',
    path: '/'
  },
  {
    _id: 'login',
    name: 'Login',
    path: '/login'
  },
  {
    _id: 'register',
    name: 'Register',
    path: '/register'
  }
]
const AppBarSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: theme => theme.trello?.appBarHeight,
        boxSizing: 'border-box',
        py: 1,
        px: 2,
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#2c3e50' : 'whitesmoke'),
        color: theme => theme.palette.text.primary,
        borderBottom: '1px solid',
        borderColor: 'divider',
        textDecoration: 'none'
      }}
    >
      <Box flex={1} display={'flex'} flexDirection={'row'} columnGap={2}>
        <Button variant="h6">Trello</Button>
      </Box>
      <Box display={'flex'} flexDirection={'row'} columnGap={2}>
        <Button sx={{ textDecoration: 'none', '&:hover': { color:'primary.main' } }} component={Link} to={'/login'} color="inherit" variant="h6">
          Login
        </Button>
        <Button sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }} component={Link} to={'/register'} color="inherit" variant="h6">
          Register
        </Button>
      </Box>
    </Box>
  )
}

export default AppBarSection
