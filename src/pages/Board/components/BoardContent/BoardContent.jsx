import { Box } from '@mui/material'
import ListComlumns from './ListColumns'
import mapOrder from '~/utils/mapOrder'
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback, useEffect, useRef, useState } from 'react'
import Column from './ListColumns/Column'
import Card from './ListColumns/Column/ListCards/Card'
import { cloneDeep } from 'lodash'
import { MouseSensor, TouchSensor } from '~/hooks/DndKit'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}

const BoardContent = ({ board, addNewCard, addNewColumn, updateOrderedColumns }) => {
  const orderColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  const [DndOrderedColumns, setDndOrderedColumns] = useState(orderColumns)
  const [activeOriginColumn, setActiveOriginColumn] = useState(null)
  const [activeDragItemId, setActiveDragItemId] = useState()
  const [activeDragItemType, setActiveDragItemType] = useState()
  const [activeDragItemData, setActiveDragItemData] = useState()

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const lastOverId = useRef(null)
  useEffect(() => {
    setDndOrderedColumns(orderColumns)
  }, [board])

  function findColumnById(cardId) {
    return DndOrderedColumns?.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  function handleDragStart(event) {
    const itemId = event?.active?.id
    const columnId = event?.active?.data?.current?.columnId
    setActiveDragItemId(itemId)
    setActiveDragItemType(columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    if (columnId) {
      const result = findColumnById(itemId)
      setActiveOriginColumn(result)
    }
  }

  function handleDragOver(event) {
    console.log('drag over: ', event.over)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return
    }
    const { active, over } = event
    if (!active || !over) return

    const { id: overCardId } = over
    let overColumn =
      findColumnById(overCardId) ?? board?.columns?.find(column => column?._id === over.data.current.columnId)

    if (!activeOriginColumn || !overColumn) return

    console.log('activeColumnId: ', activeOriginColumn._id)
    if (activeOriginColumn._id !== overColumn._id) {
      setDndOrderedColumns(preColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        console.log('into')
        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(preColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeOriginColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragItemId)
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragItemId)
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDragItemData)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        return nextColumns
      })
    }
  }

  const handleDragEndColumns = (active, over) => {
    const oldColumnIndex = DndOrderedColumns.findIndex(column => column._id === active.id)
    const newColumnIndex = DndOrderedColumns.findIndex(column => column._id === over.id)

    const updatedColumns = arrayMove(DndOrderedColumns, oldColumnIndex, newColumnIndex)
    const updatedColumnIds = updatedColumns.map(column => column._id)

    updateOrderedColumns(updatedColumnIds)
    setDndOrderedColumns(updatedColumns)
  }

  const handleDragEndCardsInOneColumn = async (targetColumn, targetCardId) => {
    setDndOrderedColumns(preColumns => {
      const oldCardIndex = activeOriginColumn.cards.findIndex(card => card._id === activeDragItemId)
      const newCardIndex = targetColumn.cards.findIndex(card => card._id === targetCardId)

      const nextColumns = cloneDeep(preColumns)
      const updatingColumn = nextColumns.find(column => column._id === targetColumn._id)
      updatingColumn.cards = arrayMove(updatingColumn.cards, oldCardIndex, newCardIndex)
      updatingColumn.cardOrderIds = updatingColumn.cards.map(card => card._id)
      return nextColumns
    })
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (!active || !over) return

    const isDragToColumn = activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN
    const isDragToCard = activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD
    const isNotEqualActiveIdAndOverID = active.id !== over.id

    if (isDragToCard && isNotEqualActiveIdAndOverID) {
      const targetCardId = over.id
      const targetColumn = findColumnById(targetCardId)
      const isDragInOneColumn = activeOriginColumn._id === targetColumn._id
      if (isDragInOneColumn) {
        handleDragEndCardsInOneColumn(targetColumn, targetCardId)
      } else {
        // code in here
      }
    }

    if (isDragToColumn && isNotEqualActiveIdAndOverID) {
      handleDragEndColumns(active, over)
    }

    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveOriginColumn(null)
  }

  const collisionDetectionStrategy = useCallback(
    args => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      const pointerIntersections = pointerWithin(args)
      if (!pointerIntersections?.length) return
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        const checkColumn = DndOrderedColumns.find(column => column._id === overId)

        if (checkColumn) {
          if (!args?.droppableContainers) {
            console.log('args undefined')
          }
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(container => {
              return container.id === overId && checkColumn?.cardOrderIds?.includes(container?.id)
            })
          })[0]?.id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }
      lastOverId.current = overId
      return lastOverId.current ? [{ id: overId }] : []
    },
    [activeDragItemType, DndOrderedColumns]
  )

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const isDragColumn = activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN
  const isDragCard = activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: theme => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListComlumns columns={DndOrderedColumns} addNewColumn={addNewColumn} addNewCard={addNewCard} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {isDragColumn && <Column column={activeDragItemData} />}
          {isDragCard && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
