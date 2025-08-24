import { useEffect, useState } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { useDispatch, useSelector } from 'react-redux'
import ActionButton from './ActionButton'
import {
  addNewNotification,
  fetchNotificationsAPI,
  selectCurrentNotifications,
  updateNotificationStatus
} from '~/redux/notification/notificationSlice'
import { isEmpty } from 'lodash'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { updateInvitationStatusAPI } from '~/api'
import { socketInstance } from '~/main'
import { toast } from 'react-toastify'

const BOARD_INVITATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
}

function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const notifications = useSelector(selectCurrentNotifications)
  const user = useSelector(selectCurrentUser)
  const open = Boolean(anchorEl)
  const handleClickNotificationIcon = event => {
    console.log(event.target)
    // setAnchorEl(event.currentTarget)
    toast.info('This feature will be available soon!')
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const updateBoardInvitation = (invitationId, status) => {
    updateInvitationStatusAPI(invitationId, status).then(response => {
      dispatch(updateNotificationStatus(response))
      socketInstance.emit('FE_INVITATION_BOARD_UPDATE', response)
    })
  }

  useEffect(() => {
    dispatch(fetchNotificationsAPI())
    socketInstance.on('BE_INVITATION_BOARD_UPDATE', data => {
      dispatch(updateNotificationStatus(data))
    })


    socketInstance.on('BE_INVITATION_BOARD_INVITE', data => {
      console.log('INVITE', data)
      dispatch(addNewNotification(data))
    })

    return () => {
      socketInstance.off('BE_INVITATION_BOARD_INVITE')
      socketInstance.off('BE_INVITATION_BOARD_UPDATE')
    }
  }, [dispatch])

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="error"
          variant="dot"
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon
            sx={{
              color: 'green'
            }}
          />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {isEmpty(notifications) && <MenuItem sx={{ minWidth: 200 }}>You do not have any new notifications.</MenuItem>}
        {notifications?.map((notify, index) => (
          <Box key={index}>
            <MenuItem
              sx={{
                minWidth: 200,
                maxWidth: 360,
                overflowY: 'auto'
              }}
            >
              <Box
                sx={{
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box>
                    <GroupAddIcon fontSize="small" />
                  </Box>
                  <Box>
                    <strong>{notify.inviter.displayName}</strong> had invited you to join the board{' '}
                    <strong>MERN Stack Advanced</strong>
                  </Box>
                </Box>
                {notify.status === BOARD_INVITATION_STATUS.PENDING && notify.invited._id === user._id ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    <ActionButton
                      title="Accept"
                      onClick={() => updateBoardInvitation(notify._id, BOARD_INVITATION_STATUS.ACCEPTED)}
                    />
                    <ActionButton
                      title="Reject"
                      onClick={() => updateBoardInvitation(notify._id, BOARD_INVITATION_STATUS.REJECTED)}
                    />
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    {notify.status === BOARD_INVITATION_STATUS.ACCEPTED && (
                      <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />
                    )}{' '}
                    {notify.status === BOARD_INVITATION_STATUS.REJECTED && (
                      <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />
                    )}
                  </Box>
                )}

                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {moment(notify.createdAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {index !== notifications.length - 1 && <Divider />}
          </Box>
        ))}
      </Menu>
    </Box>
  )
}

export default Notifications
