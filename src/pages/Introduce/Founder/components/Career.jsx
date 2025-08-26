import { useTheme } from '@emotion/react'
import {
  Code as CodeIcon,
  Launch as LaunchIcon,
  Lightbulb as LightbulbIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Work as WorkIcon
} from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Grid, Paper, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
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

const skillList = [
  {
    category: 'Frontend',
    values: [
      'HTML',
      'CSS',
      'Javascript',
      'Typescript',
      'React Native',
      'React JS',
      'TailwindCss',
      'Material UI',
      'Redux Toolkit',
      'Zustand'
    ]
  },
  {
    category: 'Backend',
    values: ['Javascript', 'Typescript', 'NodeJS', 'ExpressJS', 'JWT', 'Socket.io', 'Python', 'FastAPI', 'Resful API', 'GraphQL']
  },
  {
    category: 'Databases, Caches & Cloud',
    values: ['MongoDB', 'Firebase', 'PostgreSQL', 'Redis', 'Cloudinary', 'Google Cloud API']
  },
  {
    category: 'Tools & Platforms',
    values: ['Git', 'GitHub', 'Postman', 'Vercel', 'Render', 'VSCode']
  }
]

const timelineData = [
  {
    time: '07/2025',
    title: 'Tiximax Joint Stock Company ',
    description:
      'Participated in the development of an internal ERP system supporting business operations such as accounting, HR, inventory, and sales',
    icon: <WorkIcon />,
    color: '#7b1fa2'
  },

  {
    time: '06/2025',
    title: 'Launched Trello Clone',
    description: 'Created this fullstack project management application with modern tech stack',
    icon: <LaunchIcon />,
    color: '#7b1fa2'
  },
  {
    time: '2020 - 03/2025',
    title: 'Information Technology Degree',
    description: 'Finish the course in Information Technology at Thu Dau Mot University',
    icon: <SchoolIcon />,
    color: '#7b1fa2'
  }
]

const Career = () => {
  const theme = useTheme()

  return (
    <Grid item xs={12} md={8}>
      <Stack spacing={4}>
        {/* About Section */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              About Me
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}>
              I am Nguyen Ngoc Ninh, a fresher Fullstack Developer based in Ho Chi Minh City, Vietnam. I have a passion for
              building web applications that are not only functional but also provide an excellent user experience. With a strong
              foundation in both frontend and backend technologies, I enjoy creating solutions that solve real-world problems.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, textAlign: 'justify' }}></Typography>
          </CardContent>
        </Card>

        {/* Vision Section */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LightbulbIcon sx={{ color: 'primary.main', mr: 2, fontSize: 32 }} />
              <Typography variant="h5" fontWeight="bold">
                Career Objective
              </Typography>
            </Box>

            {/* <Paper
              sx={{
                p: 3,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                borderLeft: '4px solid',
                borderLeftColor: 'primary.main'
              }}
            >
              <Typography variant="h6" fontStyle="italic" textAlign="center">
                To empower teams worldwide with intuitive, collaborative tools that transform the way people work together and
                achieve their goals.
              </Typography>

            </Paper> */}
            <Box>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Short-term goal: I am looking for an opportunity to apply my knowledge, enhance my skills, and gain experience in
                a professional environment.
              </Typography>

              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                Long-term goal: Become a proficient Fullstack Developer, deepen my knowledge in both web and app development,
                focus on building personal projects that bring value to the community.
              </Typography>
            </Box>
          </CardContent>
        </Card>
        {/* Achievements */}
        {/* <Card>
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
        </Card> */}

        {/* Skills */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Technical Skills
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skillList.map((skill, index) => (
                <Box key={index} sx={{ mb: 2, minWidth: 120 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {skill.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skill.values.map((value, idx) => (
                      <Chip key={idx} label={value} color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Box>
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
                      {item.time}
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
                A website that lets you organize tasks into boards, columns, and cards with intuitive drag-and-drop controls. It
                delivers real-time updates via Socket.IO and allows multiple users to join and contribute on the same board
                seamlessly.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Tech Stack:
                </Typography>
                <Typography variant="body2" color="primary" fontWeight="medium">
                  {[
                    'ReactJs',
                    'NodeJs',
                    'ExpressJs',
                    'MongoDB',
                    'Socket.io',
                    'Material UI',
                    'Cloudinary',
                    'JWT',
                    'Access Token',
                    'Refresh Token',
                    'Socket.io'
                  ].map((tech, index) => (
                    <Chip key={index} label={tech} sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Typography>
              </Box>
            </Paper>
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  )
}

export default Career
