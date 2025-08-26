import { Check } from '@mui/icons-material'
import { Box, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material'

import { useState } from 'react'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { Link } from 'react-router-dom'
function AboutMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleMouseEnter = event => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleMouseLeave = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>
      <Button
        sx={{ color: 'white' }}
        id="basic-button-recent"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        About
        <ExpandMoreOutlinedIcon />
      </Button>

      <Menu
        id="basic-menu-workspace"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMouseLeave}
        MenuListProps={{
          onMouseEnter: handleMouseEnter, // giữ menu mở khi hover menu
          onMouseLeave: handleMouseLeave // rời khỏi menu thì đóng
        }}
      >
        <MenuItem  component={Link} to="/about/introduce">
          <ListItemText sx={{ py:1, px:3 }}>Introduce</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/about/founder">
          <ListItemText sx={{ py:1, px:3 }}>Founder</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default AboutMenu
