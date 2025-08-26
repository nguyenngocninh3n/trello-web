import { Box, Grid, Typography, Link } from '@mui/material'

const LinkComponent = ({ title, href, label }) => (
  <Link
    href={href}
    variant={label ? 'h6' : 'body2'}
    display="block"
    underline="hover"
    py={0.5}
    sx={{ color: label ? 'white' : 'default' }}
  >
    {title}
  </Link>
)

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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        mt: 'auto'
      }}
    >
      <Box display={'flex'} justifyContent={'space-around'} width={'100%'} >
        {/* Cột 1 */}
        <Box item xs={12} sm={4} gap={2}>
          <LinkComponent title="Contact" href="/" label />
          <LinkComponent title="Facebook" href="#" />
          <LinkComponent title="Github" href="#" />
          <LinkComponent title="Email" href="#" />
        </Box>

        {/* Cột 2 */}
        <Box item xs={12} sm={4} gap={2}>
          <LinkComponent title="About" href="/" label />
          <LinkComponent title="Introduce" href="#" />
          <LinkComponent title="Founder" href="#" />
          <LinkComponent title="Features" href="#" />
        </Box>

          {/* Cột 3 */}
        <Box item xs={12} sm={4} gap={2}>
          <LinkComponent title="Resources" href="/" label />
          <LinkComponent title="Blog" href="#" />
          <LinkComponent title="Documentation" href="#" />
          <LinkComponent title="API Reference" href="#" />
        </Box>

        {/* Cột 4 */}
        <Box item xs={12} sm={4} gap={2}>
          <LinkComponent title="Legal" href="/" label />
          <LinkComponent title="Help Center" href="#" />
          <LinkComponent title="Terms of Service" href="#" />
          <LinkComponent title="Privacy Policy" href="#" />
        </Box>
      </Box>
    </Box>
  )
}
