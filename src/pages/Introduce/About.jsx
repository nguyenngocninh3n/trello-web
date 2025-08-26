import React from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  IconButton,
  Button,
  Paper,
  Stack,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Code as CodeIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Lightbulb as LightbulbIcon,
  Launch as LaunchIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const AboutPage = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleSocialClick = url => {
    window.open(url, '_blank')
  }

  const achievements = [
    {
      icon: <CodeIcon />,
      title: '5+ Years Experience',
      description: 'Full-stack development with modern technologies',
      color: '#1976d2'
    },
    {
      icon: <PeopleIcon icon />,
      title: '10K+ Users',
      description: 'Successfully delivered apps to thousands of users',
      color: '#388e3c'
    },
    {
      icon: <StarIcon />,
      title: 'Award Winner',
      description: 'Recognized for innovative solutions',
      color: '#f57c00'
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Growth Expert',
      description: 'Scaling applications and teams',
      color: '#7b1fa2'
    }
  ]

  const skills = [
    'React.js',
    'Node.js',
    'MongoDB',
    'Material-UI',
    'TypeScript',
    'Express.js',
    'Redux',
    'JWT Authentication',
    'Socket.io',
    'AWS',
    'Docker',
    'Git'
  ]

  const timelineData = [
    {
      year: '2024',
      title: 'Launched Trello Clone',
      description: 'Created this full-featured project management application with modern tech stack',
      icon: <LaunchIcon />,
      color: '#1976d2'
    },
    {
      year: '2022',
      title: 'Founded Tech Startup',
      description: 'Started my own software development company focusing on productivity tools',
      icon: <WorkIcon />,
      color: '#388e3c'
    },
    {
      year: '2020',
      title: 'Senior Full-Stack Developer',
      description: 'Led development teams at major tech companies, specialized in React and Node.js',
      icon: <CodeIcon />,
      color: '#f57c00'
    },
    {
      year: '2018',
      title: 'Computer Science Degree',
      description: 'Graduated with honors in Computer Science, specialized in web technologies',
      icon: <SchoolIcon />,
      color: '#7b1fa2'
    }
  ]

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton sx={{ color: 'white', mr: 2 }} onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" fontWeight="bold">
              About the Founder
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Profile */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 24 }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    mb: 3,
                    border: '4px solid',
                    borderColor: 'primary.main'
                  }}
                />

                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  John Developer
                </Typography>

                <Typography variant="h6" color="primary" gutterBottom>
                  Founder & CEO
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 3 }}>
                  <LocationIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    San Francisco, CA
                  </Typography>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Social Links */}
                <Typography variant="h6" gutterBottom>
                  Connect With Me
                </Typography>

                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                  <IconButton
                    sx={{ color: '#0077B5' }}
                    onClick={() => handleSocialClick('https://linkedin.com/in/johndeveloper')}
                  >
                    <LinkedInIcon />
                  </IconButton>

                  <IconButton sx={{ color: '#333' }} onClick={() => handleSocialClick('https://github.com/johndeveloper')}>
                    <GitHubIcon />
                  </IconButton>

                  <IconButton sx={{ color: '#1DA1F2' }} onClick={() => handleSocialClick('https://twitter.com/johndeveloper')}>
                    <TwitterIcon />
                  </IconButton>

                  <IconButton sx={{ color: '#EA4335' }} onClick={() => handleSocialClick('mailto:john@example.com')}>
                    <EmailIcon />
                  </IconButton>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<EmailIcon />}
                  onClick={() => handleSocialClick('mailto:john@example.com')}
                >
                  Get In Touch
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Content */}
          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              {/* About Section */}
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    About Me
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    Passionate software engineer with a vision to revolutionize team collaboration and productivity. I created
                    this Trello clone to demonstrate modern development practices and provide teams with powerful project
                    management tools.
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    With over 5 years of experience in full-stack development, I specialize in creating scalable web applications
                    using cutting-edge technologies like React, Node.js, and modern cloud infrastructure.
                  </Typography>
                </CardContent>
              </Card>

              {/* Vision Section */}
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <LightbulbIcon sx={{ color: 'primary.main', mr: 2, fontSize: 32 }} />
                    <Typography variant="h5" fontWeight="bold">
                      Vision
                    </Typography>
                  </Box>

                  <Paper
                    sx={{
                      p: 3,
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      borderLeft: '4px solid',
                      borderLeftColor: 'primary.main'
                    }}
                  >
                    <Typography variant="h6" fontStyle="italic" textAlign="center">
                      To empower teams worldwide with intuitive, collaborative tools that transform the way people work together
                      and achieve their goals.
                    </Typography>
                  </Paper>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Key Achievements
                  </Typography>

                  <Grid container spacing={3}>
                    {achievements.map((achievement, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          sx={{
                            p: 3,
                            textAlign: 'center',
                            height: '100%',
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: theme.shadows[8]
                            }
                          }}
                        >
                          <Box sx={{ color: achievement.color, mb: 2 }}>
                            {React.cloneElement(achievement.icon, { fontSize: 'large' })}
                          </Box>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {achievement.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {achievement.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Technical Skills
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        color="primary"
                        variant="outlined"
                        sx={{
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'primary.contrastText'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* Custom Timeline */}
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    My Journey
                  </Typography>

                  <Box sx={{ position: 'relative', pl: 4 }}>
                    {/* Timeline Line */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 19,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        bgcolor: 'primary.light'
                      }}
                    />

                    {timelineData.map((item, index) => (
                      <Box key={index} sx={{ position: 'relative', mb: 4 }}>
                        {/* Timeline Dot */}
                        <Box
                          sx={{
                            position: 'absolute',
                            left: -20,
                            top: 8,
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: item.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: theme.shadows[4]
                          }}
                        >
                          {React.cloneElement(item.icon, { fontSize: 'small' })}
                        </Box>

                        {/* Timeline Content */}
                        <Paper 
                          sx={{ 
                            p: 3, 
                            ml: 3,
                            transition: 'transform 0.2s',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: theme.shadows[8]
                            }
                          }}
                        >
                          <Typography variant="h6" sx={{ color: item.color, fontWeight: 'bold', mb: 1 }}>
                            {item.year}
                          </Typography>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Paper>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              {/* App Info */}
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    About This Project
                  </Typography>

                  <Paper sx={{ p: 3, bgcolor: 'background.paper', borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      This Trello clone was built with modern technologies including React.js, Material-UI, Node.js, and MongoDB.
                      It demonstrates best practices in web development and serves as a showcase of my technical abilities.
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Tech Stack:
                      </Typography>
                      <Typography variant="body2" color="primary" fontWeight="medium">
                        React.js • Material-UI • Node.js • Express.js • MongoDB • JWT • Socket.io
                      </Typography>
                    </Box>
                  </Paper>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default AboutPage