import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import SidebarCreateBoardModal from '../SideBarCreateBoardModal'
import SidebarItem from '../SideBarItem'

const BoardSideBar = ({ onSelect }) => {
  const [selectTab, setSelectTab] = useState('boards')
  const handleSelectTab = tab => {
    setSelectTab(tab)
    onSelect(tab)
    if (tab === 'templates') {
      // axios.get(`${SERVER_ADDRESS}/v1/templates/init`)
    }
  }
  return (
    <>
      <Stack direction="column" spacing={1}>
        <SidebarItem className={selectTab === 'boards' ? 'active' : ''} onClick={() => handleSelectTab('boards')}>
          <SpaceDashboardIcon fontSize="small" />
          Boards
        </SidebarItem>
        <SidebarItem className={selectTab === 'templates' ? 'active' : ''} onClick={() => handleSelectTab('templates')}>
          <ListAltIcon fontSize="small" />
          Templates
        </SidebarItem>
        {/* <SidebarItem className={selectTab === 'home' ? 'active' : ''} onClick={() => handleSelectTab('home')}>
          <HomeIcon fontSize="small" />
          Home
        </SidebarItem> */}
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack direction="column" spacing={1}>
        <SidebarCreateBoardModal />
      </Stack>
    </>
  )
}

export default BoardSideBar
