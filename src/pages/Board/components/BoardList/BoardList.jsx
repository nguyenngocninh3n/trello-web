import { Box, Grid, Pagination, Typography } from '@mui/material'
import { isEmpty } from 'lodash'

import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import BoardCard from '../BoardCard'

const BoardList = ({ boards, totalBoards, page }) => {


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
      {totalBoards > 0 && (
        <Pagination sx={{ display: 'flex', justifyContent: 'right' }} totalLength={totalBoards} currentPage={page} />
      )}
    </Box>
  )
}

export default BoardList
