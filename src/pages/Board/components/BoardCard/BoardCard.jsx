import { ArrowRight } from '@mui/icons-material'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import randomColor from 'randomcolor'
import { Link } from 'react-router-dom'

const BoardCard = ({ board }) => {
  return (
    <Grid item >
      <Card sx={{ width: '250px' }}>
        {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
        <Box sx={{ height: '50px', backgroundColor: randomColor() }}></Box>

        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography gutterBottom variant="h6" component="div">
            {board.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          >
            {board.description}
          </Typography>
          <Box
            component={Link}
            to={`/boards/${board._id}`}
            sx={{
              mt: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: 'primary.main',
              '&:hover': { color: 'primary.light' }
            }}
          >
            Go to board <ArrowRight fontSize="small" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default BoardCard
