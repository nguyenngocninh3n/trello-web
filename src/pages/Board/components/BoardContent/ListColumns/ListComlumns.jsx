import { Box, Button } from '@mui/material'
import Column from './Column'
import { NoteAdd } from '@mui/icons-material'

function ListComlumns({columns}) {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
    >
      {columns?.map(column => (<Column key={column._id} column={column} />))}
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor:'#ffffff3d'
        }}
      >
        <Button
          sx={{
            color: 'white',
            width:'100%',
            justifyContent:'flex-start',
            pl:2.5,
            py:1
          }}
          startIcon={<NoteAdd />}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListComlumns
