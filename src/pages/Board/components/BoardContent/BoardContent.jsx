import { Box, Button } from '@mui/material'
import ListComlumns from './ListColumns'

const BoardContent = () => {
  return (
    <Box
      sx={{
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: theme => theme.trello.boardContentHeight,
        p: '10px 0'
      }}
    >
      <ListComlumns />
     </Box>
  )
}

export default BoardContent
