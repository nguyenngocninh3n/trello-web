import AppBar from '@components/AppBar'
import { Container } from '@mui/material'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'

const BoardDetail = () => {
  return (
    <Container>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default BoardDetail
