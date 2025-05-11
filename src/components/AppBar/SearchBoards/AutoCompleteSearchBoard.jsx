import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { getBoardDetailByIdAPI } from '~/redux/activeBoard/activeBoardSlice'
import { getBoardsAPI } from '~/api'
import { useDebounceFn } from '~/hooks/useDebounceFn'

function AutoCompleteSearchBoard() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [searchBoards, setSearchBoards] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setSearchBoards(null)
  }

  const handleInputSearchChange = event => {
    const searchValue = event.target?.value
    if (!searchValue) return

    const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`
    getBoardsAPI(searchPath).then(response => {
      setSearchBoards(response?.boards)
    })
  }

  const debounceHandleInputSearchChange = useDebounceFn(handleInputSearchChange)

  const handleSelectedBoard = (event, selectedBoard) => {
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`)
    }
  }

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      noOptionsText={!searchBoards ? 'Type to search board...' : 'No board found!'}
      loading={loading}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={searchBoards || []}
      getOptionLabel={board => board.title}
      getOptionKey={board => board?._id}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      onInputChange={debounceHandleInputSearchChange}
      onChange={handleSelectedBoard}
      renderInput={params => (
        <TextField
          {...params}
          label="Type to search..."
          size="small"
          key={params.id}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            },
            '.MuiSvgIcon-root': { color: 'white' }
          }}
        />
      )}
    />
  )
}

export default AutoCompleteSearchBoard
