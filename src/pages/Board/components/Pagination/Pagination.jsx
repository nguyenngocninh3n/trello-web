import { Box, Pagination as MuiPagination, PaginationItem } from '@mui/material'
import { Link } from 'react-router-dom'

const Pagination = ({ totalLength, currentPage }) => {
  return (
    <Box sx={{ mt: 3, pr: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <MuiPagination
        size="large"
        color="secondary"
        showFirstButton
        showLastButton
        count={Math.ceil(totalLength / 12)}
        page={currentPage}
        renderItem={item => (
          <PaginationItem component={Link} to={`/boards${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
        )}
      />
    </Box>
  )
}

export default Pagination
