import { Attachment, Group, ModeComment } from '@mui/icons-material'
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Card as MuiCard
} from '@mui/material'
import React from 'react'

function Card({ card }) {
  const membersLength = card?.memberIds?.length
  const attachmentsLength = card?.attachments?.length
  const commentsLength = card?.comments?.length
  const isShowActions = !!membersLength || !!attachmentsLength || !!commentsLength
  return (
    <MuiCard sx={{ maxWidth: 345, overflow: 'unset', boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)' }}>
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
    </MuiCard>
  )
}

export default Card
