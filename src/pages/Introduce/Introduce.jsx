import im_todolist from '@assets/images/todolist.png'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AppBar from '~/components/AppBar'
import { selectCurrentUser } from '~/redux/user/userSlice'
import AppBarSection from './components/AppBarSection'
import ValueSection from './components/ValueSection'
import Footer from '~/components/Footer/Footer'

export default function IntroducePage() {
  const user = useSelector(selectCurrentUser)
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {user ? <AppBar /> : <AppBarSection />}
      <Box flex={1} bgcolor={'#CEDFF2'}>
        <Grid marginTop={20} columns={12} container sx={{ p: 3 }}>
          <Grid item xs={6} md={6}>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
              Capture, organize, and tackle your tasks
            </Typography>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Trello Clone is a powerful task management tool that helps you stay organized and focused. Whether you are working
                on personal projects or collaborating with a team, Trello provides a flexible and intuitive platform to manage
                your tasks effectively.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/login">
                Get Started
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6} md={6} sx={{ display: { xs: 'none', sm: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
            <img src={im_todolist} alt="Todolist" style={{ maxWidth: '40%' }} />
          </Grid>
        </Grid>
        <Box marginTop={20} />
        <ValueSection />
      </Box>
      <Footer />
    </Box>
  )
}
