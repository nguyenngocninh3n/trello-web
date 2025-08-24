import { Box, Grid, Typography, Link } from '@mui/material'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000',
        py: 4,
        px: { xs: 2, sm: 6 },
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Grid container spacing={4}>
        {/* Cột 1 */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom color={'white'}>
            Company
          </Typography>
          <Link href="#" variant="body2" display="block" underline="hover">
            About Us
          </Link>
          <Link href="#" variant="body2" display="block" underline="hover">
            Careers
          </Link>
          <Link href="#" variant="body2" display="block" underline="hover">
            Press
          </Link>
        </Grid>

        {/* Cột 2 */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom color={'white'}>
            Resources
          </Typography>
          <Link href="#" variant="body2" display="block" underline="hover">
            Blog
          </Link>
          <Link href="#" variant="body2" display="block" underline="hover">
            Documentation
          </Link>
          <Link href="#" variant="body2" display="block" underline="hover">
            API Reference
          </Link>
        </Grid>

        {/* Cột 3 */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom color={'white'}>
            Support
          </Typography>
          <Link href="#" variant="body2" display="block" underline="hover">
            Help Center
          </Link>
          <Link href="#" variant="body2" display="block" underline="hover">
            Terms of Service
          </Link>
          <Link href="#" variant="body2" display="block" underline="hover">
            Privacy Policy
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}
