import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { Box, Container, Grid, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Profile from './components/Profile'
import Career from './components/Career'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import AppBarSection from '../components/AppBarSection'
import AppBar from '~/components/AppBar'
import Footer from '~/components/Footer/Footer'

const Founder = () => {
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  console.log('user in introduce page: ', user)

  return (
    <Box sx={{ bgcolor: 'whitesmoke' }}>
      {/* Header */}
      {user ? <AppBar /> : <AppBarSection />}

      <Box maxWidth="lg" sx={{ marginTop: theme => `${theme.trello?.appBarHeight}`, mx: 'auto' }}>
        <Grid container columnSpacing={4} pb={4}>
          {/* Left Column - Profile */}
          <Profile />
          {/* Right Column - Content */}
          <Career />
        </Grid>
      </Box>
      <Footer />
    </Box>
  )
}

export default Founder
