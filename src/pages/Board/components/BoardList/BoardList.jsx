import { Box, Grid, Pagination, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getBoardsAPI } from '~/api'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import BoardCard from '../BoardCard'

const BoardList = () => {
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Box display={'flex'} flexDirection={'column'} sx={{ height: '100%' }} gap={2}>
      <Box flex={1} xs={12} sm={9}>
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
      </Box>
      {totalBoards > 0 && <Pagination sx={{ display: 'flex', justifyContent: 'right' }} totalLength={totalBoards} currentPage={page} />}
    </Box>
  )
}

export default BoardList
