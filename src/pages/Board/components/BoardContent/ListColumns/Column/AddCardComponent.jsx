import { AddCard as AddCardIcon, DragHandle } from '@mui/icons-material'
import { Box, Button, TextField, Tooltip } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addNewCardAPI } from '~/api/card'
import { addCard } from '~/redux/activeBoard/activeBoardSlice'
const AddCardComponent = ({ boardId, columnId }) => {
  const dispatch = useDispatch()
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')

  const toggleAddingCard = () => setIsAddingCard(pre => !pre)
  const handleChangeTitle = event => setNewCardTitle(event.target.value)

  const handleClearTitle = () => {
    setNewCardTitle('')
    toggleAddingCard()
  }

  const handleAddCard = async () => {
    if (!newCardTitle) {
      toast('Title not be empty!')
    } else {
      const response = await addNewCardAPI({ boardId, columnId, title: newCardTitle })
      dispatch(addCard(response))
      handleClearTitle()
    }
  }

  return (
    <Box sx={{ height: theme => theme.trello.columnFooterHeight, p: 2 }}>
      {isAddingCard ? (
        <Box
          data-no-dnd
          component="form"
          sx={{ display: 'flex', alignItems: 'center' }}
          noValidate
          autoComplete="off"
          gap={1}
          pb={1}
        >
          <TextField
            id="outlined-basic"
            label="Add new card"
            variant="outlined"
            size="small"
            type="text"
            onChange={handleChangeTitle}
            value={newCardTitle}
            sx={{
              flex: 1,
              '& label': { color: 'text.primary' },
              '& input': {
                color: theme => theme.palette.primary.main,
                bgcolor: theme => (theme.palette.mode === 'dark' ? '#333643' : 'white')
              },
              '& label.Mui-focused': { color: theme => theme.palette.primary.main },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: theme => theme.palette.primary.main },
                '&:hover fieldset': { borderColor: theme => theme.palette.primary.main },
                '&.Mui-focused fieldset': { borderColor: theme => theme.palette.primary.main }
              },
              '& .MuiOutlinedInput-input': {
                borderRadius: 1
              }
            }}
          />
          <Button
            sx={{
              bgcolor: theme => theme.palette.primary.main,
              color: 'white'
            }}
            onClick={handleAddCard}
          >
            Add card
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button data-no-dnd startIcon={<AddCardIcon />} onClick={toggleAddingCard}>
            Add new card
          </Button>
          <Tooltip title="Drag to move">
            <DragHandle sx={{ cursor: 'pointer' }} />
          </Tooltip>
        </Box>
      )}
    </Box>
  )
}

export default AddCardComponent
