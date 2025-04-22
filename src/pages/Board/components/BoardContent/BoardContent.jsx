import { Box, Button } from '@mui/material'
import ListComlumns from './ListColumns'
import mapOrder from '~/utils/mapOrder'

const BoardContent = ({ board }) => {
  const orderColumns = mapOrder(board.columns, board.columnOrderIds, '_id')
  return (
    <Box
      sx={{
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: theme => theme.trello.boardContentHeight,
        p: '10px 0'
      }}
    >
      <ListComlumns columns={orderColumns} />
    </Box>
  )
}

export default BoardContent
