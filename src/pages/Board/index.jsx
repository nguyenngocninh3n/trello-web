import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'

import { isEmpty } from 'lodash'
import { getBoardsAPI } from '~/api'
import PageLoadingSpinner from '~/components/PageLoadingSpinner/PageLoadingSpinner'
import BoardCard from './components/BoardCard'
import Pagination from './components/Pagination'
import { Grid } from '@mui/material'
import BoardSideBar from './components/BoardSideBar'

function Boards() {
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  useEffect(() => callGetBoardsAPI(), [page, location])

  const callGetBoardsAPI = () => {
    const queyString = `?page=${page}`
    getBoardsAPI(queyString).then(data => {
      if (isEmpty(data)) return
      setBoards(data.boards)
      setTotalBoards(data.totalBoards)
    })
  }

  if (!boards) {
    return <PageLoadingSpinner caption={'Loading Boards...'} />
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ paddingX: 2, my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <BoardSideBar refreshBoards={callGetBoardsAPI} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
              Your boards:
            </Typography>
            {isEmpty(boards) && (
              <Typography variant="span" sx={{ fontWeight: 'bold', mb: 3 }}>
                {' '}
                No result found!{' '}
              </Typography>
            )}
            {!isEmpty(boards) && (
              <Grid container gridRow={{ xs: 2, sm: 3, md: 4 }} justifyContent="flex-start" spacing={2}>
                {boards.map(board => (
                  <BoardCard key={board._id} board={board} />
                ))}
              </Grid>
            )}
            {totalBoards > 0 && <Pagination totalLength={totalBoards} currentPage={page} />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
