import AppBar from '@components/AppBar'
import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { getBoardDetailByIdAPI, updateBoardAPI } from '~/api/board'
import { addNewCardAPI } from '~/api/card'
import { addNewColumnAPI } from '~/api/column'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
const BoardDetail = () => {
  const [board, setBoard] = useState()

  useEffect(() => {
    const boardId = '67fa7946f969361745ad3bcb'
    getBoardDetailByIdAPI(boardId).then(data => {
      console.log('getdata: ', data)
      setBoard(data)
    })
  }, [])

  const addNewColumn = async newColumnTitle => {
    const response = await addNewColumnAPI({ boardId: board._id, title: newColumnTitle })
    setBoard(preBoard => {
      const customBoard = { ...preBoard }
      console.log('custom boards: ', customBoard)
      // customBoard.columns = [...customBoard.columns].push(response)
      // customBoard.columnOrderIds = [...customBoard.columnOrderIds].push(response._id)
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
      customColumn.cards.push(response)
      customColumn.cardOrderIds.push(response._id)

      return customBoard
    })
  }

  const updateOrderedColumns = columnOrderIds => {
    setBoard(preboard => {
      const customBoard = { ...preboard }
      customBoard.columnOrderIds = columnOrderIds
      return customBoard
    })
    updateBoardAPI(board._id, { columnOrderIds })
  }

  return (
    <Container>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        addNewCard={addNewCard}
        addNewColumn={addNewColumn}
        updateOrderedColumns={updateOrderedColumns}
      />
      {/* <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} /> */}
    </Container>
  )
}

export default BoardDetail
