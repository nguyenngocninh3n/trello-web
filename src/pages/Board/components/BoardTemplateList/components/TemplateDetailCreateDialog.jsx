import { Lock as PrivateIcon, Public as PublicIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
const TemplateDetailCreateDialog = ({ board, visible, setVisible }) => {
  const [newBoardData, setNewBoardData] = useState({
    title: `${board.title} Copy`,
    description: board.description,
    type: 'private'
  })

  const handleCreateSubmit = () => {
    // Call API to create board from template
    console.log('Creating board from template:', { ...newBoardData, templateId: board._id })
    toast.success('This feature will be available soon!')
    setVisible(false)
  }

  return (
    <Dialog open={visible} onClose={() => setVisible(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Create board from template</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <TextField
            label="Board title"
            fullWidth
            value={newBoardData.title}
            onChange={e => setNewBoardData({ ...newBoardData, title: e.target.value })}
          />

          <TextField
            label="Board description"
            fullWidth
            multiline
            rows={3}
            value={newBoardData.description}
            onChange={e => setNewBoardData({ ...newBoardData, description: e.target.value })}
          />

          <FormControl fullWidth>
            <InputLabel>Visibility</InputLabel>
            <Select
              value={newBoardData.type}
              label="Visibility"
              onChange={e => setNewBoardData({ ...newBoardData, type: e.target.value })}
            >
              <MenuItem value="private">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PrivateIcon />
                  <Box>
                    <Typography>Private</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Only board members can see this board
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
              <MenuItem value="public">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PublicIcon />
                  <Box>
                    <Typography>Public</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Anyone can see this board
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setVisible(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleCreateSubmit} disabled={!newBoardData.title.trim()}>
          Create board
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TemplateDetailCreateDialog
