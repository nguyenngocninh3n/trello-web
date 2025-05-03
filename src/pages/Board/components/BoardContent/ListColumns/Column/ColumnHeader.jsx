import {
  AddCard,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever,
  ExpandMoreOutlined
} from '@mui/icons-material'
import { Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteColumnAPI } from '~/api/column'
import { deleteColumn } from '~/redux/activeBoard/activeBoardSlice'
function ColumnHeader({ title, columnId }) {
  const deleteConfirm = useConfirm()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleDeleteColumn = async () => {
    const result = await deleteConfirm({
      title: 'Delete this column?',
      description: 'This action will be delete selected Column belong with cards into!',
      cancellationText: 'Huy',
      confirmationText: 'Xac nhan'
    }).catch(error => {
      console.log('error when deleting column: ', error)
    })

    if (result.confirmed) {
      await deleteColumnAPI(columnId)
      dispatch(deleteColumn(columnId))
    }
    handleClose()
  }

  return (
    <Box
      data-no-dnd
      sx={{
        height: theme => theme.trello.columnHeaderHeight,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }}>
        {title}
      </Typography>
      <Box sx={{ alignItems: 'center', display: 'flex' }}>
        <Tooltip title="More options">
          <ExpandMoreOutlined
            sx={{ color: 'text.primary', cursor: 'pointer' }}
            id="basic-column-dropdown"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
        </Tooltip>

        <Menu
          data-no-dnd
          id="basic-menu-column-dropdown"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <AddCard fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add new card</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Past</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleDeleteColumn}>
            <ListItemIcon>
              <DeleteForever fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove this column</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Archive this column</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default ColumnHeader
