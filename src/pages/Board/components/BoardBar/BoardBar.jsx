import { Avatar, AvatarGroup, Box, Button, Chip, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
function BoardBar({ board }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        borderBottom: '1px solid white',
        height: theme => theme.trello.boardBarHeight,
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#31495e' : '#1976d2'),
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip sx={{ color: 'white' }} icon={<DashboardIcon color="white" />} label={board?.title} clickable />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip sx={{ color: 'white' }} icon={<Typography color="white" />} label={board?.type} clickable />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip sx={{ color: 'white' }} icon={<AddToDriveIcon color="white" />} label=" Add To Google Drive" clickable />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip sx={{ color: 'white' }} icon={<BoltIcon color="white" />} label="Automation" clickable />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip sx={{ color: 'white' }} icon={<FilterListIcon color="white" />} label="Filters" clickable />
        </Box>
      </Box>
      <InviteBoardUser boardId={board?._id} />
      <BoardUserGroup boardUsers={board?.owners?.concat(board?.members)} />
    </Box>
  )
}

export default BoardBar
