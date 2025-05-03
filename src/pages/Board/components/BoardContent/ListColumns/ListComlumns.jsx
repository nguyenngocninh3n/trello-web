import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Box } from '@mui/material'
import AddColumn from './AddColumn'
import Column from './Column'

function ListComlumns({ columns }) {
  const columnIds = columns?.map(column => column._id)

  const customColumns = [...columns]
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
        {customColumns?.map(column => (
          <Column key={column._id} column={column} />
        ))}
        <AddColumn />
      </Box>
    </SortableContext>
  )
}

export default ListComlumns
