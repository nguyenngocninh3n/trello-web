import { Alert, Typography } from '@mui/material'
import React from 'react'

const FormAlertVerifying = ({ email }) => {
  return (
    <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
      An email has been sent to&nbsp;
      <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
        {email}
      </Typography>
      <br />
      Please check and verify your account before logging in!
    </Alert>
  )
}

export default FormAlertVerifying
