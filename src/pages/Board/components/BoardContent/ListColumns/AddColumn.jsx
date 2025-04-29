import { Close, NoteAdd } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'

const AddColumn = ({ addNewColumn }) => {
  const [isAddingColumn, setIsAddingColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleAddingColumn = () => setIsAddingColumn(pre => !pre)
  const handleChangeTitle = event => setNewColumnTitle(event.target.value)

  const handleClearTitle = () => {
    setNewColumnTitle('')
    toggleAddingColumn()
  }

  const handleAddColumn = () => {
    addNewColumn(newColumnTitle)
    handleClearTitle()
  }
  return (
    <Box
      sx={{
        minWidth: '200px',
        maxWidth: '200px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        bgcolor: '#ffffff3d'
      }}
    >
      {isAddingColumn ? (
        <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Add new column"
            variant="outlined"
            size="small"
            type="text"
            onChange={handleChangeTitle}
            value={newColumnTitle}
            sx={{
              minWidth: '120px',
              maxWidth: '180px',
              '& label': { color: 'white' },
              '& input': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              }
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              sx={{
                bgcolor: theme => theme.palette.primary.main,
                color: 'white'
              }}
              onClick={handleAddColumn}
            >
              Add column
            </Button>
            <Close fontSize="small" sx={{ color: 'white' }} onClick={handleClearTitle} />
          </Box>
        </Box>
      ) : (
        <Button
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
          startIcon={<NoteAdd />}
          onClick={toggleAddingColumn}
        >
          Add new column
        </Button>
      )}
    </Box>
  )
}

export default AddColumn
