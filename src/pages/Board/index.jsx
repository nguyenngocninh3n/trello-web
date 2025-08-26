import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { Grid } from '@mui/material'
import AppBar from '~/components/AppBar'
import BoardList from './components/BoardList'
import BoardSideBar from './components/BoardSideBar'
import BoardTemplateList from './components/BoardTemplateList'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getBoardsAPI } from '~/api'
import { isEmpty } from 'lodash'
function Boards() {
  const [selected, setSelected] = useState('boards')
  const [refreshing, setRefreshing] = useState(false)

  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callGetBoardsAPI(), [page, location, refreshing])

  const callGetBoardsAPI = () => {
    const queyString = `?page=${page}`
    getBoardsAPI(queyString).then(data => {
      if (isEmpty(data)) return
      setBoards(data.boards)
      setTotalBoards(data.totalBoards)
    })
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ pt: 4, paddingX: 2, height: theme => `calc(100vh - ${theme.trello.appBarHeight} - 16px)` }}>
        <Grid height={'100%'} container spacing={2}>
          <Grid item xs={12} sm={3}>
            <BoardSideBar onSelect={setSelected} setRefreshing={setRefreshing} />
          </Grid>
          <Grid item xs={12} sm={9}>
            {selected === 'boards' && <BoardList boards={boards} totalBoards={totalBoards} page={page} />}
            {selected === 'templates' && <BoardTemplateList />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
