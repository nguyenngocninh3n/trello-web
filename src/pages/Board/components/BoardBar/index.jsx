import { Avatar, AvatarGroup, Box, Button, Chip, Typography } from '@mui/material'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
function BoardBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        borderBottom: '1px solid white',
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#31495e' : '#1976d2')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip
            sx={{ color: 'white' }}
            icon={<DashboardIcon color="white" />}
            label="NguyenNgocNinh - Trello"
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip
            sx={{ color: 'white' }}
            icon={<Typography color="white" />}
            label="Public/Private Workspace"
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip
            sx={{ color: 'white' }}
            icon={<AddToDriveIcon color="white" />}
            label=" Add To Google Drive"
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip
            sx={{ color: 'white' }}
            icon={<BoltIcon color="white" />}
            label="Automation"
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip
            sx={{ color: 'white' }}
            icon={<FilterListIcon color="white" />}
            label="Filters"
            clickable
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="outlined"
          sx={{
            color: 'white',
            gap: 0.5,
            borderWidth: 1,
            '&:hover': { borderColor: 'white', borderWidth: '2px' },
            '&.Mui-focused': { borderColor: 'white', borderWidth: '2px' }
          }}
        >
          <GroupAddOutlinedIcon fontSize="medium" />
          Invite
        </Button>
        <AvatarGroup
          total={10}
          max={5}
          sx={{ gap: '10px', '& .MuiAvatar-root': { cursor: 'pointer' } }}
        >
          <Avatar alt="nguyenngocninh" />
          <Avatar alt="nguyenngocninh" />
          <Avatar alt="nguyenngocninh" />
          <Avatar alt="nguyenngocninh" />
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
