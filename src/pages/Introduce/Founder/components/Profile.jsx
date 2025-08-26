import {
  Email as EmailIcon,
  Facebook,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material'
import { Avatar, Button, Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/material'
const Profile = () => {
  const handleSocialClick = url => {
    window.open(url, '_blank')
  }

  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ position: 'sticky', top: theme => `calc(${theme.trello?.appBarHeight} / 2)` }}>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Avatar
            src="https://res.cloudinary.com/ddmr1rqmy/image/upload/v1756212948/avatar_qcvg3q.jpg"
            sx={{
              width: 150,
              height: 150,
              mx: 'auto',
              mb: 3,
              border: '4px solid',
              borderColor: 'primary.main'
            }}
          />

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Nguyen Ngoc Ninh
          </Typography>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Fullstack Developer
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
            Founder & CEO
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 3 }}>
            <LocationIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Ho Chi Minh city, Viet Nam
            </Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Social Links */}
          <Typography variant="h6" gutterBottom>
            Connect With Me
          </Typography>

          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
            <IconButton sx={{ color: '#0077B5' }} onClick={() => handleSocialClick('https://facebook.com/ninhnguyen3n')}>
              <Facebook />
            </IconButton>

            <IconButton sx={{ color: '#333' }} onClick={() => handleSocialClick('https://github.com/nguyenngocninh3n')}>
              <GitHubIcon />
            </IconButton>

            <IconButton sx={{ color: '#EA4335' }} onClick={() => handleSocialClick('mailto:nguyenngocninh.3n@gmail.com')}>
              <EmailIcon />
            </IconButton>
          </Stack>

        </CardContent>
      </Card>
    </Grid>
  )
}

export default Profile
