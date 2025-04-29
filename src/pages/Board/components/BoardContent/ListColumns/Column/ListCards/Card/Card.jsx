import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Attachment, Group, ModeComment } from '@mui/icons-material'
import { Button, CardActions, CardContent, CardMedia, Typography, Card as MuiCard } from '@mui/material'
import React from 'react'

function Card({ card, hidden }) {
  const membersLength = card?.memberIds?.length
  const attachmentsLength = card?.attachments?.length
  const commentsLength = card?.comments?.length
  const isShowActions = !!membersLength || !!attachmentsLength || !!commentsLength

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: card
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ maxWidth: '345px', overflow: 'unset', opacity: card?.hidden ? 0 : 1 }}
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
    </MuiCard>
  )
}

export default Card
