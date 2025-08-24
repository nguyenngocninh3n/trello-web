import {
  Attachment,
  ContentCopy as CopyIcon,
  Group,
  ModeComment,
  Lock as PrivateIcon,
  Public as PublicIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material'
const TemplateDetailBodyPreview = ({ board }) => {
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
        <CardContent
          sx={{
            p: 0,
            '&::-webkit-scrollbar': {
              height: 8
            }
          }}
        >
          <Box sx={{ p: 3, bgcolor:'#1976d2' }}>
            <Typography color={'white'} variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Board Preview
            </Typography>
            {/* Columns Preview */}

            <Box
              style={{
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#040e25ff',
                  borderRadius: 4
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#3e2929ff',
                  borderRadius: 4
                }
              }}
              sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                // overflowY: 'hidden',
                pb: 2
              }}
            >
              {board?.columns?.map(column => (
                <Box
                  key={column.columnId}
                  sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: theme => (theme.palette.mode === 'dark' ? '#34495e' : '#ebecf0'),
                    ml: 2,
                    pb: 2,
                    borderRadius: '6px',
                  }}
                >
                    <Typography variant='h6' sx={{py:1,  fontWeight: 'bold'}}>{column?.title}</Typography>
                  
                  <Box
                    sx={{
                      p: '0 5px',
                      m: '0 5px',
                      display: 'flex',
                      flexDirection: 'column',
                      overflowX: 'hidden',
                      // overflowY: 'auto',
                      gap: 1,
                      maxHeight: theme =>
                        `calc(${theme.trello.boardContentHeight} 
                        })`,
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#6176deff',
                        borderRadius: '8px'
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#5268c6ff'
                      }
                    }}
                  >
                    {column.cards?.map(card => {
                      const membersLength = card?.memberIds?.length
                      const attachmentsLength = card?.attachments?.length
                      const commentsLength = card?.comments?.length
                      const isShowActions = !!membersLength || !!attachmentsLength || !!commentsLength
                      return (
                        <Card
                          key={card.cardId}
                          sx={{
                            maxWidth: '345px',
                            overflow: 'unset',
                            opacity: card?.hidden ? 0 : 1,
                            height: card?.hidden ? '10px' : undefined
                            // display: card?.hidden ? 'none' : 'block'
                            // height: card?.hidden ? '0px' : undefined
                          }}
                        >
                          {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} title="green iguana" />}
                          <CardContent sx={{ p: 1.5, overflow: 'unset', '&:last-child': { p: 1.5 } }}>
                            <Typography>{card?.title}</Typography>
                          </CardContent>
                          {isShowActions && (
                            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                              <Button size="small" startIcon={<Group />}>
                                {membersLength}
                              </Button>
                              <Button size="small" startIcon={<ModeComment />}>
                                {commentsLength}
                              </Button>
                              <Button size="small" startIcon={<Attachment />}>
                                {attachmentsLength}
                              </Button>
                            </CardActions>
                          )}
                        </Card>
                      )
                    })}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TemplateDetailBodyPreview
