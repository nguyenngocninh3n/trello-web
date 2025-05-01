import {
  closestCorners,
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Box } from '@mui/material'
import { cloneDeep, isEmpty } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MouseSensor, TouchSensor } from '~/hooks/DndKit'
import ListComlumns from './ListColumns'
import Column from './ListColumns/Column'
import Card from './ListColumns/Column/ListCards/Card'
import { generate_placeholder_card } from '~/utils/mapOrder'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}

const BoardContent = ({
  board,
  addNewCard,
  addNewColumn,
  moveColumns,
  moveCardsInOneColumn,
  moveCardsInMultiColumns,
  deleteColumn
}) => {
  const [DndOrderedColumns, setDndOrderedColumns] = useState(board?.columns ?? [])
  const [activeOriginColumn, setActiveOriginColumn] = useState(null)
  const [activeDragItemId, setActiveDragItemId] = useState()
  const [activeDragItemType, setActiveDragItemType] = useState()
  const [activeDragItemData, setActiveDragItemData] = useState()

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const lastOverId = useRef(null)

  useEffect(() => {
    setDndOrderedColumns(preState => {
      const customColumns = board?.columns?.map(column => {
        if (isEmpty(column?.cards)) {
          const placeHolderCard = generate_placeholder_card(column._id)
          column.cards = [placeHolderCard]
          column.cardOrderIds = [placeHolderCard._id]
        }
        return column
      })
      return customColumns ?? []
    })
  }, [board])

  function findColumnById(cardId) {
    return DndOrderedColumns?.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  function handleFinishDrag() {
    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveOriginColumn(null)
  }

  function handleDragCardsInMultiColumns(active, over, overColumn, triggerFrom) {
    setDndOrderedColumns(preColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === over.id)
      const activeTranslated = active.rect.current.translated
      const isBelowOverItem = activeTranslated && activeTranslated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      let newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(preColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeOriginColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragItemId)
      nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragItemId)

      nextActiveColumn.cardOrderIds = nextActiveColumn.cards?.map(card => card._id)
      nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDragItemData)
      nextOverColumn.cardOrderIds = nextOverColumn.cards?.map(card => card._id)
      if (triggerFrom === 'handleDragEnd') {
        console.log('handleDragCardsInMultiColumns: nextActiveCOlumn: ', nextActiveColumn)

        console.log()
        if (nextOverColumn.cardOrderIds.find(card => card === 'placeholder_card')) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== 'placeholder_card')
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        moveCardsInMultiColumns(activeDragItemId, cloneDeep(nextActiveColumn), cloneDeep(nextOverColumn))
        if (isEmpty(nextActiveColumn.cards)) {
          const placeholder_card = generate_placeholder_card(nextActiveColumn)
          nextActiveColumn.cards = [placeholder_card]
          nextActiveColumn.cardOrderIds = [placeholder_card._id]
        }
      }

      return nextColumns
    })
  }

  function handleDragStart(event) {
    const { active } = event
    const itemId = active?.id
    const itemData = active?.data?.current
    const columnId = itemData?.columnId
    const itemType = columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    setActiveDragItemId(itemId)
    setActiveDragItemType(itemType)
    setActiveDragItemData(itemData)
    if (columnId) {
      const result = findColumnById(itemId)
      setActiveOriginColumn(result)
    }
  }

  function handleDragOver(event) {
    const { active, over } = event
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    if (!active || !over) return

    const { id: overCardId } = over
    let overColumn = findColumnById(overCardId)
    if (!activeOriginColumn || !overColumn) return

    if (activeOriginColumn._id !== overColumn._id) {
      handleDragCardsInMultiColumns(active, over, overColumn, 'handleDragOver')
    }
  }

  const handleDragEndColumns = (active, over) => {
    const oldColumnIndex = DndOrderedColumns.findIndex(column => column._id === active.id)
    const newColumnIndex = DndOrderedColumns.findIndex(column => column._id === over.id)

    const updatedColumns = arrayMove(DndOrderedColumns, oldColumnIndex, newColumnIndex)
    const updatedColumnIds = updatedColumns?.map(column => column._id)

    moveColumns(updatedColumnIds, updatedColumns)
    setDndOrderedColumns(updatedColumns)
  }

  const handleDragEndCardsInOneColumn = targetCardId => {
    setDndOrderedColumns(preColumns => {
      const oldCardIndex = activeOriginColumn.cards.findIndex(card => card._id === activeDragItemId)
      const newCardIndex = activeOriginColumn.cards.findIndex(card => card._id === targetCardId)
      const nextColumns = cloneDeep(preColumns)
      const updatingColumn = nextColumns.find(column => column._id === activeOriginColumn._id)
      updatingColumn.cards = arrayMove(updatingColumn.cards, oldCardIndex, newCardIndex)
      updatingColumn.cardOrderIds = updatingColumn.cards?.map(card => card._id)
      moveCardsInOneColumn(updatingColumn)
      return nextColumns
    })
  }

  function handleDragEnd(event) {
    console.log('handleDragEnd: ', event)
    const { active, over } = event
    if (!active || !over) return

    const isDragToColumn = activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN
    const isDragToCard = activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD

    if (isDragToCard) {
      const targetCardId = over.id
      const overColumn = findColumnById(targetCardId)
      const isDragInOneColumn = activeOriginColumn._id === overColumn._id
      if (isDragInOneColumn) {
        // console.log('isDragCardInOneColumn')
        handleDragEndCardsInOneColumn(targetCardId)
      } else {
        // console.log('isDragCardInMultiColumn')

        handleDragCardsInMultiColumns(active, over, overColumn, 'handleDragEnd')
      }
    }

    if (isDragToColumn) {
      handleDragEndColumns(active, over)
    }

    handleFinishDrag()
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
            console.log('args is undefined')
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
        <ListComlumns
          columns={DndOrderedColumns}
          addNewColumn={addNewColumn}
          addNewCard={addNewCard}
          deleteColumn={deleteColumn}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {isDragColumn && <Column column={activeDragItemData} />}
          {isDragCard && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
