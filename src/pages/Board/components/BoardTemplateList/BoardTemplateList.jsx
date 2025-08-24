import { Box, Grid, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { getTemplatesAPI } from '~/api'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import TemplateCard from '../TemplateCard'
import BoardTemplateDetail from './_id'

const BoardTemplateList = () => {
  const [boards, setBoards] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callGetTemplatesAPI(), [])

  const callGetTemplatesAPI = () => {
    getTemplatesAPI().then(data => {
      if (isEmpty(data)) return
      setBoards(data)
    })
  }

  if (!boards) {
    return <PageLoadingSpinner caption={'Loading Boards...'} />
  }

  return (
    <Box  display={'flex'} flexDirection={'column'} item xs={12} sm={9}>
      {!selectedTemplate && (
        <Box flex={1} xs={12} sm={9}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Templates:
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
                <TemplateCard key={board._id} board={board} onselect={setSelectedTemplate} />
              ))}
            </Grid>
          )}
        </Box>
      )}
      {selectedTemplate && (
        <BoardTemplateDetail board={boards.find(b => b._id === selectedTemplate)} onBack={() => setSelectedTemplate(null)} />
      )}
    </Box>
  )
}

export default BoardTemplateList
