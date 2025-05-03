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
import { generate_placeholder_card } from '~/utils/mapOrder'
import ListComlumns from './ListColumns'
import Column from './ListColumns/Column'
import Card from './ListColumns/Column/ListCards/Card'
import { updateBoardAPI } from '~/api/board'
import { updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch } from 'react-redux'
import { moveCardsInMultiColumnsAPI, updateColumnAPI } from '~/api/column'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}

const BoardContent = ({ board }) => {
  const dispatch = useDispatch()
  const [DndOrderedColumns, setDndOrderedColumns] = useState(board?.columns ?? [])
  const [activeOriginColumn, setActiveOriginColumn] = useState(null)
  const [activeTempColumn, setActiveTempColumn] = useState(null)
  const [activeDragItemId, setActiveDragItemId] = useState()
  const [activeDragItemType, setActiveDragItemType] = useState()
  const [activeDragItemData, setActiveDragItemData] = useState()

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const lastOverId = useRef(null)

  useEffect(() => {
    setDndOrderedColumns(preState => {
      console.log('re-render: reSetState for DndOrderColumns')
      const customColumns = board?.columns?.map(column => {
        if (isEmpty(column?.cards)) {
          const customColumn = cloneDeep(column)
          const placeHolderCard = generate_placeholder_card(customColumn._id)
          customColumn.cards = [placeHolderCard]
          customColumn.cardOrderIds = [placeHolderCard._id]
          return customColumn
        }
        return column
      })
      console.log('dnd columns: ', customColumns)
      return customColumns ?? []
    })
    // if (!isEmpty(board?.columns)) {
    //   setDndOrderedColumns(board.columns)
    // }
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
      setActiveTempColumn(result)
    }
  }

  function handleDragOver(event) {
    const { active, over } = event
    console.log({ active, over })
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    if (!active || !over) return

    const { id: overCardId } = over
    let overColumn = findColumnById(overCardId)
    if (!activeOriginColumn || !overColumn) return

    if (activeOriginColumn._id !== overColumn._id) {
      handleDragCardsInMultiColumns(active, over, overColumn, 'handleDragOver')
    }
  }

  // *****FINISH
  const handleDragEndColumns = (active, over) => {
    const oldColumnIndex = DndOrderedColumns.findIndex(column => column._id === active.id)
    const newColumnIndex = DndOrderedColumns.findIndex(column => column._id === over.id)

    const columns = arrayMove(DndOrderedColumns, oldColumnIndex, newColumnIndex)
    const columnOrderIds = columns?.map(column => column._id)

    const customBoard = { ...board, columnOrderIds, columns }
    dispatch(updateCurrentActiveBoard(customBoard))
    updateBoardAPI(board._id, { columnOrderIds })
    setDndOrderedColumns(columns)
  }

  // *****FINISH
  const handleDragEndCardsInOneColumn = cardId => {
    const oldCardIndex = activeOriginColumn.cards.findIndex(card => card._id === activeDragItemId)
    const newCardIndex = activeOriginColumn.cards.findIndex(card => card._id === cardId)

    const columns = cloneDeep(DndOrderedColumns)
    const updatingColumn = columns.find(column => column._id === activeOriginColumn._id)
    updatingColumn.cards = arrayMove(updatingColumn.cards, oldCardIndex, newCardIndex)
    updatingColumn.cardOrderIds = updatingColumn.cards?.map(card => card._id)

    const customBoard = { ...board, columns }
    const { _id, boardId, cardOrderIds } = updatingColumn
    dispatch(updateCurrentActiveBoard(customBoard))
    updateColumnAPI(_id, boardId, { cardOrderIds })

    setDndOrderedColumns(columns)
  }

  // *****FINISH
  const handleDragCardsInMultiColumns = (active, over, overColumn, triggerFrom) => {
    const cardId = over.id
    const overCardIndex = overColumn.cards.findIndex(card => card._id === cardId)
    const activeTranslated = active.rect.current.translated
    const isBelowOverItem = activeTranslated && activeTranslated.top > over.rect.top + over.rect.height
    const modifier = isBelowOverItem ? 1 : 0
    let newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1

    const nextColumns = cloneDeep(DndOrderedColumns)
    const nextActiveColumn = nextColumns.find(column => column._id === activeTempColumn._id)
    nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragItemId)
    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)

    const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
    nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragItemId)
    if (triggerFrom === 'handleDragEnd') {
      const isHavingCards = !nextOverColumn?.cardOrderIds[0].includes('placeholder_card')
      nextOverColumn.cards = isHavingCards ? nextOverColumn.cards : []
    }
    nextOverColumn.cards.splice(newCardIndex, 0, activeDragItemData)
    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)

    setActiveTempColumn(nextOverColumn)
    if (triggerFrom === 'handleDragEnd') {
      moveCardsInMultiColumnsAPI(cardId, cloneDeep(nextActiveColumn), cloneDeep(nextOverColumn))

      if (isEmpty(nextActiveColumn.cards)) {
        const placeholder_card = generate_placeholder_card(nextActiveColumn._id)
        nextActiveColumn.cards = [placeholder_card]
        nextActiveColumn.cardOrderIds = [placeholder_card._id]
      }

      if (isEmpty(nextOverColumn.cards)) {
        const placeholder_card = generate_placeholder_card(nextOverColumn._id)
        nextOverColumn.cards = [placeholder_card]
        nextOverColumn.cardOrderIds = [placeholder_card._id]
      }
    }
    setDndOrderedColumns(nextColumns)
  }

  function handleDragEnd(event) {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event
    if (!active || !over) return

    const isDragToColumn = activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN
    const isDragToCard = activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD
    const overId = over.id

    if (isDragToColumn) {
      handleDragEndColumns(active, over)
    }

    if (isDragToCard) {
      const overColumn = findColumnById(overId)
      const isDragInOneColumn = activeOriginColumn._id === overColumn._id
      if (isDragInOneColumn) {
        handleDragEndCardsInOneColumn(overId)
      } else {
        handleDragCardsInMultiColumns(active, over, overColumn, 'handleDragEnd')
      }
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
        <ListComlumns columns={DndOrderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {isDragColumn && <Column column={activeDragItemData} />}
          {isDragCard && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
