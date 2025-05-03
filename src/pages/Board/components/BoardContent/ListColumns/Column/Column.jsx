import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Button } from '@mui/material'
import AddCardComponent from './AddCardComponent'
import ColumnHeader from './ColumnHeader'
import ListCards from './ListCards'

function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: column
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Box
        {...listeners}
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
        <ColumnHeader title={column?.title} columnId={column._id} />
        <ListCards cards={column.cards} columnId={column._id} />
        <AddCardComponent boardId={column.boardId} columnId={column?._id} />
      </Box>
    </div>
  )
}

export default Column
