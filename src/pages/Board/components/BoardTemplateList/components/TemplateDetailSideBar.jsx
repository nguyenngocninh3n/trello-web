import {
  ContentCopy as CopyIcon,
  Person as PersonIcon,
  Preview as PreviewIcon,
  Lock as PrivateIcon,
  Public as PublicIcon
} from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
const TemplateDetailSideBar = ({ board, onOpenCreateDialog }) => {
  const getTotalCards = () => {
    if (!board.columns) return 0
    return board.columns.reduce((total, column) => total + getColumnCardCount(column), 0)
  }

  const getColumnCardCount = column => {
    return column.cards ? column.cards.length : 0
  }

  const formatDate = timestamp => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return (
    <Grid item xs={12} md={4}>
      <Stack spacing={3}>
        {/* Action Buttons */}
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<CopyIcon />}
              onClick={onOpenCreateDialog}
              sx={{
                mb: 2,
                bgcolor: '#0079bf',
                '&:hover': { bgcolor: '#026aa7' }
              }}
            >
              Use this template
            </Button>

            {/* <Button variant="outlined" fullWidth startIcon={<PreviewIcon />} sx={{ borderColor: '#ddd', color: '#666' }}>
              Preview
            </Button> */}
          </CardContent>
        </Card>

        {/* Template Stats */}
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Template Stats
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {board.columns?.length || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lists
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {getTotalCards()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cards
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {board.viewLength || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Views
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {board.copyLength || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Copies
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Template Info */}
        <Card sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              About this template
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Created
                </Typography>
                <Typography variant="body2">{formatDate(board.createdAt)}</Typography>
              </Box>

              {board.updatedAt && (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Last updated
                  </Typography>
                  <Typography variant="body2">{formatDate(board.updatedAt)}</Typography>
                </Box>
              )}

              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Visibility
                </Typography>
                <Chip
                  icon={board.type === 'public' ? <PublicIcon /> : <PrivateIcon />}
                  label={board.type === 'public' ? 'Public' : 'Private'}
                  size="small"
                  color={board.type === 'public' ? 'success' : 'warning'}
                />
              </Box>

              {board.ownerIds?.length > 0 && (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Created by
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="body2">Template Creator</Typography>
                  </Stack>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  )
}

export default TemplateDetailSideBar
