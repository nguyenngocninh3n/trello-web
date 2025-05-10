import CancelIcon from '@mui/icons-material/Cancel'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'

import { toast } from 'react-toastify'
import { singleFileValidator } from '~/utils/validators'

import { useDispatch, useSelector } from 'react-redux'
import ToggleFocusInput from '~/components/ToggleFocusInput'
import { clearActiveCard, selectCurrentActiveCard, updateActiveCard } from '~/redux/activeCard/activeCardSlice'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import { updateCardAPI } from '~/api'
import { updateCardInline } from '~/redux/activeBoard/activeBoardSlice'

function ActiveCard() {
  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)
  const handleCloseModal = () => dispatch(clearActiveCard())

  const callUpdateCardAPI = async data => {
    await updateCardAPI(activeCard._id, data).then(response => {
      dispatch(updateActiveCard(response))
      dispatch(updateCardInline(response))
    })
  }

  const onUpdateCardTitle = newTitle => callUpdateCardAPI({ title: newTitle })

  const onUploadCardCover = event => {
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])
    toast.promise(callUpdateCardAPI(reqData), { pending: 'Changing card cover...', success: 'Update card cover successfully' })
    event.target.value = ''
  }

  const onUpdateCardDescription = description => {
    callUpdateCardAPI({ description })
  }

  const onCommentToCard = async commentData => {
    await callUpdateCardAPI(commentData)
  }

  return (
    <Modal disableScrollLock open={true} onClose={handleCloseModal} sx={{ overflowY: 'auto' }}>
      <Box
        sx={{
          position: 'relative',
          width: 900,
          maxWidth: 900,
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: '8px',
          border: 'none',
          outline: 0,
          padding: '40px 20px 20px',
          margin: '50px auto',
          backgroundColor: theme => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            right: '10px',
            cursor: 'pointer'
          }}
        >
          <CancelIcon color="error" sx={{ '&:hover': { color: 'error.light' } }} onClick={handleCloseModal} />
        </Box>

        {activeCard.cover && (
          <Box sx={{ mb: 4 }}>
            <img
              style={{ width: '100%', height: '320px', borderRadius: '6px', objectFit: 'cover' }}
              src={activeCard.cover}
              alt="card-cover"
            />
          </Box>
        )}

        <Box sx={{ mb: 1, mt: -3, pr: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCardIcon />
          <ToggleFocusInput inputFontSize="22px" value={activeCard.title} onChangedValue={onUpdateCardTitle} />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <LeftSide card={activeCard} onUpdateCardDescription={onUpdateCardDescription} onCommentToCard={onCommentToCard} />
          <RightSide card={activeCard} onUploadCardCover={onUploadCardCover} />
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard
