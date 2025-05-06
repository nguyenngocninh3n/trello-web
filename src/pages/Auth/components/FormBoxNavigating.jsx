import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const FormBoxNavigating = ({ title, path, directText }) => {
  return (
    <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
      <Typography>{title}</Typography>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>{directText}</Typography>
      </Link>
    </Box>
  )
}

export default FormBoxNavigating
