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
        borderTop: '1px solid #ccc'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip icon={<DashboardIcon />} label="NguyenNgocNinh - Trello" clickable />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip icon={<Typography />} label="Public/Private Workspace" clickable />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip icon={<AddToDriveIcon />} label=" Add To Google Drive" clickable />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip icon={<BoltIcon />} label="Automation" clickable />
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Chip icon={<FilterListIcon />} label="Filters" clickable />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="outlined">
          <GroupAddOutlinedIcon fontSize="medium" />
          Invite
        </Button>
        <AvatarGroup total={10} max={3}>
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
