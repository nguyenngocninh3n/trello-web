import AppBar from '@components/AppBar'
import { Container } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoardDetailByIdAPI, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
const BoardDetail = () => {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const activeBoard = useSelector(selectCurrentActiveBoard)
  const activeCard = useSelector(selectCurrentActiveCard)

  useEffect(() => {
    console.log('boardId: ', boardId)
    dispatch(getBoardDetailByIdAPI(boardId))
  }, [boardId])

  return (
    <Container>
      {activeCard && <ActiveCard />}
      <AppBar />
      <BoardBar board={activeBoard} />
      <BoardContent board={activeBoard} />
    </Container>
  )
}

export default BoardDetail
