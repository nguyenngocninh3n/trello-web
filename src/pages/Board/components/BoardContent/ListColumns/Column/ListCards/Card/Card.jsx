import { Attachment, Group, ModeComment } from '@mui/icons-material'
import { Button, CardActions, CardContent, CardMedia, Typography, Card as MuiCard } from '@mui/material'
import React from 'react'

function Card() {
  return (
    <MuiCard sx={{ maxWidth: 345, overflow: 'unset', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://i.ytimg.com/vi/gqMfKMnKHXw/hqdefault.jpg?sqp=-oaymwEmCKgBEF5IWvKriqkDGQgBFQAAiEIYAdgBAeIBCggYEAIYBjgBQAE=&rs=AOn4CLC3pMgB2CjPZP2j2BSuocfa8WAp1w"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, overflow: 'unset', '&:last-child': { p: 1.5 } }}>
        <Typography>Trello web</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<Group />}>
          20
        </Button>
        <Button size="small" startIcon={<ModeComment />}>
          15
        </Button>
        <Button size="small" startIcon={<Attachment />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
