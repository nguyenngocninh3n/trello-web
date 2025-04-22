import TrelloLogo from '@assets/images/trello_logo.svg'
import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { Badge, Box, Button, SvgIcon, Tooltip, Typography } from '@mui/material'
import { RecentMenu, StarredMenu, TemplateMenu, WorkspaceMenu } from './Menus'
import SearchInput from './SearchInput'
import ProfileSetting from './ProfileSetting'
import ModeSelect from '@components/ModeSelect'
const AppBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: theme => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} gap={2}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex' }} gap={1}>
          <SvgIcon sx={{ color: 'white' }}>
            <TrelloLogo />
          </SvgIcon>
          <Typography color="white">Trello</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex' }}>
            <WorkspaceMenu />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <RecentMenu />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <StarredMenu />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <TemplateMenu />
          </Box>
          <Button
            sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
            variant="outlined"
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
        <SearchInput />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" overlap="circular">
            <NotificationsNoneOutlinedIcon fontSize="medium" sx={{ cursor: 'pointer' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Helper">
          <HelpOutlineOutlinedIcon fontSize="medium" />
        </Tooltip>
        <ModeSelect />
        <ProfileSetting />
      </Box>
    </Box>
  )
}

export default AppBar
