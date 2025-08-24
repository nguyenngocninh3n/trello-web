import {
  ContentCopy as CopyIcon,
  Lock as PrivateIcon,
  Public as PublicIcon,
  AccessTime as TimeIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Grid, Paper, Stack, Typography } from '@mui/material'
const TemplateDetailBody = ({ board }) => {
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
    <Grid item xs={12} md={8}>
      <Card sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
        {/* Template Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #0079bf 0%, #026aa7 100%)',
            color: 'white',
            p: 3
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {board.title}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
            {board.description}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
            <Chip
              icon={board.type === 'public' ? <PublicIcon /> : <PrivateIcon />}
              label={board.type === 'public' ? 'Public' : 'Private'}
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <VisibilityIcon fontSize="small" />
              <Typography variant="body2">{board.viewLength || 0} views</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <CopyIcon fontSize="small" />
              <Typography variant="body2">{board.copyLength || 0} copies</Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Board Preview */}
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Board Preview
            </Typography>
            {/* 
                  {/* Columns Preview */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                pb: 2,
                '&::-webkit-scrollbar': {
                  height: 8
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                  borderRadius: 4
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#c1c1c1',
                  borderRadius: 4
                }
              }}
            >
              {board.columns?.map((column, index) => (
                <Paper
                  key={column.columnId || index}
                  sx={{
                    minWidth: 280,
                    maxWidth: 280,
                    bgcolor: '#f8f9fa',
                    p: 2,
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {column.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getColumnCardCount(column)} cards
                    </Typography>
                  </Box>

                  <Stack spacing={1}>
                    {column.cards?.slice(0, 3).map((card, cardIndex) => (
                      <Paper
                        key={card.cardId || cardIndex}
                        sx={{
                          p: 1.5,
                          bgcolor: 'white',
                          border: '1px solid #e0e0e0',
                          borderRadius: 1,
                          '&:hover': {
                            boxShadow: 1
                          }
                        }}
                      >
                        <Typography variant="body2" fontWeight="medium">
                          {card.title}
                        </Typography>
                        {card.description && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {card.description}
                          </Typography>
                        )}

                        {/* Card badges */}
                        <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap">
                          {card.dueDate && (
                            <Chip
                              icon={<TimeIcon />}
                              label={formatDate(card.dueDate)}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          )}
                          {card.attachments?.length > 0 && (
                            <Chip
                              label={`${card.attachments.length} files`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          )}
                          {card.checklists?.length > 0 && (
                            <Chip
                              label={`${card.checklists.length} tasks`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          )}
                        </Stack>
                      </Paper>
                    ))}

                    {getColumnCardCount(column) > 3 && (
                      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', py: 1 }}>
                        +{getColumnCardCount(column) - 3} more cards
                      </Typography>
                    )}
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TemplateDetailBody
