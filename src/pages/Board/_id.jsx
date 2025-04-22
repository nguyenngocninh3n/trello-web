import AppBar from '@components/AppBar'
import { Container } from '@mui/material'
import BoardBar from './components/BoardBar'
import BoardContent from './components/BoardContent'
import { mockData } from '~/api/mock-data'
const BoardDetail = () => {
  return (
    <Container>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData.board} />
    </Container>
  )
}

export default BoardDetail
