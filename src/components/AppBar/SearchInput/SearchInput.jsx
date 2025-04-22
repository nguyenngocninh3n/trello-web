import { AccountCircle } from '@mui/icons-material'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
function SearchInput() {
  const [searchValue, setSearchValue] = useState('')
  const changeSearchValue = e => setSearchValue(e.target.value)
  const clearSearchValue = () => setSearchValue('')
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={searchValue}
        onChange={changeSearchValue}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'white' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <CloseIcon
                onClick={clearSearchValue}
                fontSize="small"
                sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
              />
            </InputAdornment>
          )
        }}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        size="small"
        type="text"
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
    </Box>
  )
}

export default SearchInput
