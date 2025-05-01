import AppBar from '@components/AppBar'
import { Container } from '@mui/material'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { getBoardDetailByIdAPI, updateBoardAPI } from '~/api/board'
import { addNewCardAPI } from '~/api/card'
import { addNewColumnAPI, deleteColumnAPI, moveCardsInMultiColumnsAPI, updateColumnAPI } from '~/api/column'
import mapOrder, { generate_placeholder_card } from '~/utils/mapOrder'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
import { useConfirm } from 'material-ui-confirm'
const BoardDetail = () => {
  const [board, setBoard] = useState()

  useEffect(() => {
    const boardId = '67fa7946f969361745ad3bcb'
    getBoardDetailByIdAPI(boardId).then(data => {
      if (!isEmpty(data)) {
        const customBoard = { ...data }
        customBoard.columns = mapOrder(customBoard.columns, customBoard.columnOrderIds, '_id')
        customBoard.columns.forEach(column => {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        })
        setBoard(customBoard)
      }
    })
  }, [])

  const addNewColumn = async newColumnTitle => {
    const response = await addNewColumnAPI({ boardId: board._id, title: newColumnTitle })
    setBoard(preBoard => {
      const customBoard = { ...preBoard }
      customBoard.columns.push(response)
      customBoard.columnOrderIds.push(response._id)
      return customBoard
    })
  }

  const addNewCard = async (columnId, newCardTitle) => {
    const response = await addNewCardAPI({ boardId: board._id, columnId, title: newCardTitle })
    setBoard(preBoard => {
      const customBoard = { ...preBoard }
      const customColumn = customBoard.columns.find(columnn => columnn._id === columnId)
      if (
        customColumn.cardOrderIds.find(cardId => cardId === 'placeholder_card') &&
        customColumn.cardOrderIds.length === 1
      ) {
        customColumn.cards = []
        customColumn.cardOrderIds = []
      }
      customColumn.cards.push(response)
      customColumn.cardOrderIds.push(response._id)
      console.log('custom column: ', customColumn)
      return customBoard
    })
  }

  const moveColumns = (columnOrderIds, updatedColumns) => {
    console.log('moveColumns: ', { columnOrderIds, updatedColumns })
    setBoard(preboard => {
      const customBoard = { ...preboard }
      customBoard.columnOrderIds = columnOrderIds
      customBoard.columns = updatedColumns
      return customBoard
    })
    updateBoardAPI(board._id, { columnOrderIds })
  }

  const moveCardsInOneColumn = updatingColumn => {
    const { _id, boardId, cardOrderIds, cards } = updatingColumn
    setBoard(preBoard => {
      const customBoard = { ...preBoard }
      const customColumn = customBoard.columns.find(column => column._id === _id)
      customColumn.cards = cards
      customColumn.cardOrderIds = cardOrderIds
      return customBoard
    })
    updateColumnAPI(_id, boardId, { cardOrderIds })
  }

  const moveCardsInMultiColumns = (cardId, preColumn, nextColumn) => {
    setBoard(preBoard => {
      console.log('1: ', { preColumn, nextColumn })
      const customBoard = { ...preBoard }
      const customPreColumn = customBoard.columns.find(column => column._id === preColumn._id)
      customPreColumn.cards = preColumn.cards
      customPreColumn.cardOrderIds = preColumn.cardOrderIds

      const customNextColumn = customBoard.columns.find(column => column._id === nextColumn._id)
      customNextColumn.cards = nextColumn.cards
      customNextColumn.cardOrderIds = nextColumn.cardOrderIds

      moveCardsInMultiColumnsAPI(cardId, cloneDeep(customPreColumn), cloneDeep(customNextColumn))
      if (isEmpty(preColumn.cards)) {
        const placeholder_card = generate_placeholder_card(preColumn._id)
        customPreColumn.cards = [placeholder_card]
        customPreColumn.cardOrderIds = [placeholder_card._id]
      }
      // return preBoard
      return customBoard
    })
  }

  const deleteConfirm = useConfirm()

  const deleteColumn = columnId => {
    console.log('delete column: ')
    deleteConfirm({
      title: 'Delete this column?',
      description: 'This action will be delete selected Column belong with cards into!',
      cancellationText: 'Huy',
      confirmationText: 'Xac nhan'
    })
      .then(async result => {
        // console.log('result delete column: ', result)
        if (result.confirmed) {
          const response = await deleteColumnAPI(columnId)
          setBoard(preBoard => {
            const customBoard = { ...preBoard }
            customBoard.columns = customBoard.columns.filter(column => column._id !== columnId)
            customBoard.columnOrderIds = customBoard.columnOrderIds.filter(_id => _id !== columnId)
            return customBoard
          })
        }
      })
      .catch(error => {
        console.log('error when deleting column: ', error)
      })
  }

  return (
    <Container>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        addNewCard={addNewCard}
        addNewColumn={addNewColumn}
        moveColumns={moveColumns}
        moveCardsInOneColumn={moveCardsInOneColumn}
        moveCardsInMultiColumns={moveCardsInMultiColumns}
        deleteColumn={deleteColumn}
      />
      {/* <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} /> */}
    </Container>
  )
}

export default BoardDetail
