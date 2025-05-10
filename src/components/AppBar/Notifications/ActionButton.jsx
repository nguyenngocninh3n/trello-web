import { Button } from '@mui/material'
import React from 'react'

const ActionButton = ({ title, onClick }) => {
  return (
    <Button className="interceptor-loading" type="submit" variant="contained" color="success" size="small" onClick={onClick}>
      {title}
    </Button>
  )
}

export default ActionButton
