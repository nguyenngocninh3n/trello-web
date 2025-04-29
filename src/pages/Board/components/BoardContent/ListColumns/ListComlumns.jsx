import { Box } from '@mui/material'
import Column from './Column'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import AddColumn from './AddColumn'

function ListComlumns({ columns, addNewColumn, addNewCard }) {
  const columnIds = columns?.map(column => column._id)
  return (
    <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}
      >
        {columns?.map(column => (
          <Column key={column._id} column={column} addNewCard={addNewCard} />
        ))}
        <AddColumn addNewColumn={addNewColumn} />
      </Box>
    </SortableContext>
  )
}

export default ListComlumns
