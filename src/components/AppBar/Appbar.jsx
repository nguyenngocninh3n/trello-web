import TrelloLogo from '@assets/images/trello_logo.svg'
import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import { Box, Button, SvgIcon, Tooltip, Typography } from '@mui/material'
import { AboutMenu, RecentMenu, StarredMenu, TemplateMenu, WorkspaceMenu } from './Menus'
import ProfileSetting from './ProfileSetting'
import ModeSelect from '@components/ModeSelect'
import { Link, useNavigate } from 'react-router-dom'
import Notifications from './Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
import { toast } from 'react-toastify'
const AppBar = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: '100%',
        height: theme => theme.trello.appBarHeight,
        padding: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        overflowX: 'auto',
        overflowY: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} gap={2}>
        <AppsIcon onClick={() => navigate('/')} sx={{ color: 'white', cursor: 'pointer' }} />
        <Box onClick={() => navigate('/introduce')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} gap={1}>
          <SvgIcon sx={{ color: 'white' }}>
            <TrelloLogo />
          </SvgIcon>
          <Typography color="white">Trello</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          {/* <Box sx={{ display: 'flex' }}>
            <WorkspaceMenu />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <RecentMenu />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <StarredMenu />
          </Box> */}
          {/* <Box sx={{ display: 'flex' }}>
            <TemplateMenu />
          </Box> */}
          <Button
            color="success"
            LinkComponent={Link}
            to="/boards"
            sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
            variant="outlined"
          >
            Your Boards
          </Button>
          <Button
            color="success"
            LinkComponent={Link}
            to="/introduce"
            sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
            variant="outlined"
          >
            Home
          </Button>
  
            <AboutMenu />
          {/* <Button sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }} variant="outlined">
            Create New Board
          </Button>
          <RecentMenu /> */}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
        {/* <SearchInput /> */}
        <AutoCompleteSearchBoard />
        <Notifications />
        <Tooltip title="Helper" sx={{ cursor: 'pointer' }} onClick={() => toast.info('This feature will be available soon!')}>
          <HelpOutlineOutlinedIcon fontSize="medium" />
        </Tooltip>
        <ModeSelect />
        <ProfileSetting />
      </Box>
    </Box>
  )
}

export default AppBar
