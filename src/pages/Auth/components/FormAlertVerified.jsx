import { Alert, Typography } from '@mui/material'
import React from 'react'

const FormAlertVerified = ({ email }) => {
  return (
    <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
      Your email&nbsp;
      <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
        {email}
      </Typography>
      &nbsp;has been verified.
      <br />
      Now you can login to enjoy our services! Have a good day!
    </Alert>
  )
}

export default FormAlertVerified
