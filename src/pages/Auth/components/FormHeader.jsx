import TrelloIcon from '@assets/images/trello_logo.svg'
import LockIcon from '@mui/icons-material/Lock'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
const FormHeader = ({title}) => {
  return (
    <>
      <Box
        sx={{
          margin: '1em',
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <LockIcon />
        </Avatar>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <TrelloIcon />
        </Avatar>
      </Box>
      <Box
        sx={{
          marginTop: '1em',
          display: 'flex',
          justifyContent: 'center',
          color: theme => theme.palette.grey[500]
        }}
      >
        {title}
      </Box>
    </>
  )
}

export default FormHeader
