import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { Box, Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material'
import { useState } from 'react'
import TemplateDetailBody from './components/TemplateDetailBody'
import TemplateDetailSideBar from './components/TemplateDetailSideBar'
import TemplateDetailCreateDialog from './components/TemplateDetailCreateDialog'
import TemplateDetailBodyPreview from './components/TemplateDetailBodyPreview'

const BoardTemplateDetail = ({ board, onBack }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Header Navigation */}
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              underline="hover"
              color="inherit"
              onClick={onBack}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="small" onClick={onBack} />
              Templates
            </Link>
            <Typography color="text.primary">{board.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Template Preview */}
          <TemplateDetailBodyPreview board={board} />
          {/* Right Column - Template Info & Actions */}
          <TemplateDetailSideBar board={board} onOpenCreateDialog={() => setCreateDialogOpen(true)} />
        </Grid>

        {/* Create Board Dialog */}
        <TemplateDetailCreateDialog
          board={board}
          visible={createDialogOpen}
          setVisible={setCreateDialogOpen}
        />
      </Container>
    </Box>
  )
}

export default BoardTemplateDetail
