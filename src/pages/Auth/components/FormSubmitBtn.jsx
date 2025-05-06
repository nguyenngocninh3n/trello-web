import { Button, CardActions } from '@mui/material'

const FormSubmitBtn = ({ title }) => {
  return (
    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
      <Button className='interceptor-loading' type="submit" variant="contained" color="primary" size="large" fullWidth>
        {title}
      </Button>
    </CardActions>
  )
}

export default FormSubmitBtn
