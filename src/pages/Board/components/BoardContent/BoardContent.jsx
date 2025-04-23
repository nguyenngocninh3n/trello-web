import { Box, Button } from '@mui/material'
import ListComlumns from './ListColumns'
import mapOrder from '~/utils/mapOrder'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

const BoardContent = ({ board }) => {
  const orderColumns = mapOrder(board.columns, board.columnOrderIds, '_id')
  const [DndOrderedColumns, setDndOrderedColumns] = useState(orderColumns)

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)

  const sensors = useSensors(mouseSensor, touchSensor)
  useEffect(() => {
    setDndOrderedColumns(orderColumns)
  }, [board])

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = DndOrderedColumns.findIndex(column => column._id === active.id)
      const newIndex = DndOrderedColumns.findIndex(column => column._id === over.id)

      const updatedColumns = arrayMove(DndOrderedColumns, oldIndex, newIndex)
      // const updatedColumnIds = updatedColumns.map(column => column._id)
      // console.log('updatedColumns :', updatedColumns)
      //   console.log('updatedColumnIds :', updatedColumnIds)
      setDndOrderedColumns(updatedColumns)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: theme => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListComlumns columns={DndOrderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
