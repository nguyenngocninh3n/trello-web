import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { useState } from 'react'

import { Grid } from '@mui/material'
import AppBar from '~/components/AppBar'
import BoardList from './components/BoardList'
import BoardSideBar from './components/BoardSideBar'
import BoardTemplateList from './components/BoardTemplateList'

function Boards() {
  const [selected, setSelected] = useState('boards')

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ pt: 4, paddingX: 2, height: theme => `calc(100vh - ${theme.trello.appBarHeight} - 16px)` }}>
        <Grid height={'100%'} container spacing={2}>
          <Grid item xs={12} sm={3}>
            <BoardSideBar onSelect={setSelected} />
          </Grid>
          <Grid item xs={12} sm={9}>
            {selected === 'boards' && <BoardList />}
            {selected === 'templates' && <BoardTemplateList />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
