import { Box } from '@mui/material'
import ColumnFooter from './ColumnFooter'
import ColumnHeader from './ColumnHeader'
import ListCards from './ListCards'

function Column() {
  return (
    <Box
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#ebecf0'),
        ml: 2,
        borderRadius: '6px',
        height: 'fit-content',
        maxHeight: theme => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}
    >
      <ColumnHeader />
      <ListCards />
      <ColumnFooter />
    </Box>
  )
}

export default Column
