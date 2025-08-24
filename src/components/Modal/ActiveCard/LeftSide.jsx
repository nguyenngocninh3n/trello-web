import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CardUserGroup from './CardUserGroup'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CardActivitySection from './CardActivitySection'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined'

/**
 * LeftSide component displays the main content of an active Trello card, including members, description, important notes, and activity.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.card - The card object containing details such as member IDs, description, and comments.
 * @param {Function} props.onUpdateCardMember - Callback function to update card members.
 * @param {Function} props.onUpdateCardDescription - Callback function to update the card description.
 * @param {Function} props.onCommentToCard - Callback function to add a comment to the card.
 * @returns {JSX.Element} The rendered LeftSide component.
 */
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
          <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>
            Important!
          </Typography>
        <Typography  variant="span" sx={{ fontWeight: '400', fontSize: '16px', color: 'gray',whiteSpace:'pre-line'  }}>
           {
            `
             Which features currently are active in EditCard: 
            - Update card title
            - Assign members to cards
            - Add comments to cards
            - Add description to cards
            - Add cover (image) to cards
            `
           }
        </Typography>
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
