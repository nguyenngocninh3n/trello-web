import AppBar from '@components/AppBar'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardDetailByIdAPI, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
const BoardDetail = () => {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  useEffect(() => {
    const boardId = '67fa7946f969361745ad3bcb'
    dispatch(getBoardDetailByIdAPI(boardId))
  }, [])

  return (
    <Container>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default BoardDetail
