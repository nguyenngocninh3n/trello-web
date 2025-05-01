import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Box } from '@mui/material'
import AddColumn from './AddColumn'
import Column from './Column'
import { isEmpty } from 'lodash'
import { generate_placeholder_card } from '~/utils/mapOrder'

function ListComlumns({ columns, addNewColumn, addNewCard, deleteColumn }) {
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
          <Column key={column._id} column={column} addNewCard={addNewCard} deleteColumn={deleteColumn} />
        ))}
        <AddColumn addNewColumn={addNewColumn} />
      </Box>
    </SortableContext>
  )
}

export default ListComlumns
