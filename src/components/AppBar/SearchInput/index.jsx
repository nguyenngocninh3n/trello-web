import { Box, TextField } from '@mui/material'

function SearchInput() {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" size='small' />
    </Box>
  )
}

export default SearchInput
