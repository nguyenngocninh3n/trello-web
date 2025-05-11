import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CardUserGroup from './CardUserGroup'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardActivitySection from './CardActivitySection'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'

const LeftSide = ({ card, onUpdateCardMember, onUpdateCardDescription, onCommentToCard }) => {
  console.log('left side: card description: ', card)
  return (
    <Grid item xs={12} sm={9}>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Members</Typography>
        <CardUserGroup onUpdateCardMember={onUpdateCardMember} cardMemberIds={card.memberIds} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SubjectRoundedIcon />
          <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>
            Description
          </Typography>
        </Box>
        <CardDescriptionMdEditor description={card.description} onUpdateCardDescription={onUpdateCardDescription} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <DvrOutlinedIcon />
          <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>
            Activity
          </Typography>
        </Box>
        <CardActivitySection comments={card.comments} onCommentToCard={onCommentToCard} />
      </Box>
    </Grid>
  )
}

export default LeftSide
