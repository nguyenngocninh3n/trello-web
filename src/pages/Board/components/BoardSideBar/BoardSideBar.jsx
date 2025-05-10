import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import SidebarItem from '../SideBarItem'
import SidebarCreateBoardModal from '../SideBarCreateBoardModal'

const BoardSideBar = ({ refreshBoards }) => {
  return (
    <>
      <Stack direction="column" spacing={1}>
        <SidebarItem className="active">
          <SpaceDashboardIcon fontSize="small" />
          Boards
        </SidebarItem>
        <SidebarItem>
          <ListAltIcon fontSize="small" />
          Templates
        </SidebarItem>
        <SidebarItem>
          <HomeIcon fontSize="small" />
          Home
        </SidebarItem>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack direction="column" spacing={1}>
        <SidebarCreateBoardModal refreshBoards={refreshBoards} />
      </Stack>
    </>
  )
}

export default BoardSideBar
